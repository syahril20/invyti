"use client";

import * as htmlToImage from "html-to-image";
import { Download } from "lucide-react";
import { useRef } from "react";

export default function NotaModal({
  notaData,
  onClose,
}: {
  notaData: any;
  onClose: () => void;
}) {
  const notaRef = useRef<HTMLDivElement>(null);

  const handleSavePng = async () => {
    if (notaRef.current && notaData) {
      const dataUrl = await htmlToImage.toPng(notaRef.current, {
        quality: 1,
        pixelRatio: 2,
      });
      const namaFile = `${notaData.transaksi?.nomorNota || notaData.nota_no}_${
        notaData.pelanggan?.nama || "nota"
      }.png`.replace(/\s+/g, "_");
      const link = document.createElement("a");
      link.download = namaFile;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-2xl relative font-poppins">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div ref={notaRef}>
          {/* Header Nota */}
          <div className="text-center border-b pb-3 mb-3">
            <img
              src="/logo.png"
              alt="Logo Mustari Tani"
              className="mx-auto mb-2 w-30 h-30 object-contain"
            />
            <div className="text-sm text-gray-600">
              Jl. Terusan Sersan Bajuri, Cihideung, Kec. Parongpong, Kabupaten
              Bandung Barat, Jawa Barat 40559 — Telp: 89656190041
            </div>
          </div>

          {/* Info Transaksi */}
          <div className="text-sm text-gray-800 space-y-1 mb-3">
            {[
              ["No. Nota", notaData.transaksi?.nomorNota || notaData.nota_no],
              [
                "Tanggal",
                new Date(
                  notaData.transaksi?.tanggal || notaData.created_at
                ).toLocaleDateString("id-ID"),
              ],
              ["Pelanggan", notaData.pelanggan?.nama],
              ["Alamat", notaData.pelanggan?.alamat || "-"],
              ["Telepon", notaData.pelanggan?.telepon],
            ].map(([label, value], i) => (
              <div
                key={i}
                className="flex justify-between gap-2 items-start leading-snug"
              >
                <span className="font-medium text-gray-700 flex-shrink-0">
                  {label}:
                </span>
                <span className="text-right text-gray-900 break-words whitespace-normal max-w-[65%]">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <hr className="my-2 border-gray-300" />

          {/* Tabel Barang */}
          <table className="w-full text-sm border-b text-gray-900 table-fixed font-['Roboto_Mono']">
            <thead>
              <tr className="border-b border-gray-300 font-semibold text-gray-800">
                <th className="text-left w-[8%]">No</th>
                <th className="text-left w-[45%]">Barang</th>
                <th className="text-center w-[10%]">Qty</th>
                <th className="text-center w-[17%]">Harga</th>
                <th className="text-right w-[20%]">Total</th>
              </tr>
            </thead>
            <tbody>
              {(notaData.barang || []).map((b: any, i: number) => (
                <tr
                  key={i}
                  className="border-b border-dashed last:border-b-0 text-gray-800 align-top"
                >
                  <td className="py-1">{i + 1}</td>
                  <td className="break-words whitespace-normal py-1 pr-2 font-poppins">
                    {b.nama_barang}
                  </td>
                  <td className="text-center py-1">{b.qty}</td>
                  <td className="text-center py-1">
                    {b.harga.toLocaleString("id-ID")}
                  </td>
                  <td className="text-right py-1">
                    {b.total.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total */}
          <div className="text-right mt-3 font-semibold text-lg text-emerald-700 border-t pt-2 font-['Roboto_Mono']">
            Total: Rp{" "}
            {(notaData.transaksi?.total || notaData.total)?.toLocaleString(
              "id-ID"
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-gray-700 text-xs mt-4 border-t pt-3 italic">
            Terima kasih telah berbelanja di{" "}
            <b className="text-emerald-700">Mustari Tani</b>
          </div>
        </div>

        {/* Tombol Save PNG */}
        <button
          onClick={handleSavePng}
          className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <Download size={18} /> Simpan Nota sebagai PNG
        </button>
      </div>
    </div>
  );
}
