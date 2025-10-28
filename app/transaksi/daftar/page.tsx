"use client";

import { useEffect, useState, useRef } from "react";
import { Search, Eye, Download } from "lucide-react";
import * as htmlToImage from "html-to-image";
import NotaModal from "@/app/components/NotaModal";

export default function DaftarTransaksiPage() {
  const [data, setData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // State untuk modal nota
  const [showNota, setShowNota] = useState(false);
  const [notaData, setNotaData] = useState<any>(null);
  const notaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/transaksi");
        const result = await res.json();
        if (result.ok) {
          setData(result.data);
          setFiltered(result.data);
        }
      } catch (err) {
        console.error("Gagal fetch transaksi:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter pencarian
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value.toLowerCase();
    setQuery(q);
    const filteredData = data.filter(
      (trx) =>
        trx.pelanggan.nama.toLowerCase().includes(q) ||
        trx.nota_no?.toString().includes(q)
    );
    setFiltered(filteredData);
  };

  // Ambil detail transaksi saat klik “Lihat”
  const handleLihat = async (id: string) => {
    try {
      const res = await fetch(`/api/transaksi?id=${id}`);
      const result = await res.json();
      if (result.ok) {
        setNotaData(result.data);
        setShowNota(true);
      }
    } catch (err) {
      console.error("Gagal fetch detail:", err);
    }
  };

  // Simpan nota ke PNG
  const handleSavePng = async () => {
    if (notaRef.current && notaData) {
      const dataUrl = await htmlToImage.toPng(notaRef.current, {
        quality: 1,
        pixelRatio: 2,
      });
      const namaFile =
        `Nota_${notaData.pelanggan.nama}_${notaData.nota_no}.png`.replace(
          /\s+/g,
          "_"
        );
      const link = document.createElement("a");
      link.download = namaFile;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-emerald-700">
          📋 Daftar Transaksi
        </h1>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Cari nama pelanggan atau nota..."
            value={query}
            onChange={handleSearch}
            className="w-full border border-emerald-200 rounded-md pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 bg-white shadow-sm text-slate-800 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-slate-700">Memuat data...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-6 text-center text-slate-700 rounded-xl border border-emerald-100 shadow-sm">
          Belum ada transaksi ditemukan.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border border-emerald-100 rounded-xl shadow-sm">
          <table className="w-full border-collapse text-sm text-slate-800">
            <thead className="bg-emerald-100 text-emerald-900 font-semibold uppercase">
              <tr>
                <th className="p-3 text-left w-[50px]">No</th>
                <th className="p-3 text-left">Nama Pelanggan</th>
                <th className="p-3 text-center">Tanggal</th>
                <th className="p-3 text-right">Total (Rp)</th>
                <th className="p-3 text-center w-[100px]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((trx, i) => (
                <tr
                  key={trx.id}
                  className="border-t border-emerald-50 hover:bg-emerald-50 transition-colors"
                >
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium text-slate-900">
                    {trx.pelanggan.nama}
                  </td>
                  <td className="p-3 text-center text-slate-700">
                    {new Date(trx.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="p-3 text-right text-emerald-700 font-semibold">
                    {trx.total.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleLihat(trx.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md flex items-center justify-center gap-1 mx-auto"
                    >
                      <Eye size={16} /> Lihat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showNota && notaData && (
        <NotaModal notaData={notaData} onClose={() => setShowNota(false)} />
      )}
    </div>
  );
}
