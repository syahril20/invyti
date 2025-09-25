"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";

type Visit = { userId: string; name: string; visitCount: number; };
type Props = { initialVisits: Visit[]; totalPages: number; };

export default function VisitTable({ initialVisits, totalPages: totalInitialPages }: Props) {
  const [visits, setVisits] = useState(initialVisits);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(totalInitialPages);
  const [loading, setLoading] = useState(false);

  // 🔹 Simpan di sini
  const fetchPage = async (pageNum: number) => {
    setLoading(true);
    const res = await fetch(`/api/visits?page=${pageNum}`);
    const result = await res.json();
    setVisits(result.visits);
    setTotalPages(result.totalPages || 1);
    setLoading(false);
  };

  const handlePrev = () => { if (page > 0) { const newPage = page - 1; setPage(newPage); fetchPage(newPage); } };
  const handleNext = () => { if (page + 1 < totalPages) { const newPage = page + 1; setPage(newPage); fetchPage(newPage); } };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  UserId
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Name
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Visit Count
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableRow>
                  <TableCell className="px-4 py-3 text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                visits.map((v) => (
                  <TableRow key={v.userId}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {v.userId}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {v.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {v.visitCount}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === 0 || loading}
          onClick={handlePrev}
        >
          Prev
        </button>
        <span className="px-3 py-1">
          {page + 1} / {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={page + 1 >= totalPages || loading}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
