"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, List, PlusCircle, Menu, X } from "lucide-react";
import clsx from "clsx";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="id">
      <body className="flex min-h-screen bg-emerald-50 text-slate-800">
        {/* Sidebar */}
        <aside
          className={clsx(
            "fixed md:static z-40 w-64 bg-white border-r border-emerald-100 shadow-lg flex flex-col transform transition-transform duration-300",
            sidebarOpen ? "translate-x-0" : "-translate-x-64 md:translate-x-0"
          )}
        >
          {/* Header */}
          <div className="p-5 border-b border-emerald-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="text-emerald-700" size={22} />
              <h1 className="text-xl font-bold text-emerald-700">
                Mustari Tani
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-700 hover:text-emerald-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-3">
            <div>
              <p className="text-xs font-semibold text-emerald-700 uppercase mb-2">
                Transaksi
              </p>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/transaksi/daftar"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-slate-800 hover:bg-emerald-100 hover:text-emerald-800 font-medium transition-colors"
                  >
                    <List size={18} /> Daftar Transaksi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/transaksi/buat"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-slate-800 hover:bg-emerald-100 hover:text-emerald-800 font-medium transition-colors"
                  >
                    <PlusCircle size={18} /> Buat Transaksi
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Footer */}
          <footer className="p-4 border-t border-emerald-100 text-xs text-slate-700 text-center">
            © {new Date().getFullYear()} Mustari Tani
          </footer>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header bar */}
          <header className="bg-white border-b border-emerald-100 shadow-sm flex items-center justify-between px-6 py-3 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-slate-700 hover:text-emerald-700 transition"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-lg font-semibold text-emerald-700">
                Dashboard Mustari Tani
              </h2>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6 md:p-8 bg-emerald-50 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
