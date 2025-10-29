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
        style: {
          paddingTop: "40px",
          paddingBottom: "60px",
          backgroundColor: "#ffffff",
        },
      });
      const namaFile = `${
        notaData.nota_no || notaData.transaksi?.nota_no || "nota"
      }_${notaData.pelanggan?.nama || "pelanggan"}.png`.replace(/\s+/g, "_");
      const link = document.createElement("a");
      link.download = namaFile;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Wrapper tambahan untuk area aman export */}
        <div
          ref={notaRef}
          className="bg-white rounded-xl border border-gray-300 shadow-md mx-auto"
          style={{
            backgroundColor: "#ffffff",
            width: "100%",
            maxWidth: "420px",
            padding: "40px 28px 60px", // extra bawah biar lega saat disave
            margin: "20px auto",
            boxSizing: "border-box",
          }}
        >
          {/* Header */}
          <div className="text-center border-b pb-3 mb-3">
            <img
              src="/logo.png"
              alt="Logo Mustari Tani"
              className="mx-auto mb-2 w-30 h-30 object-contain"
            />
            <div className="text-sm text-gray-700">
              Jl. Terusan Sersan Bajuri, Cihideung, Kec. Parongpong, Kabupaten
              Bandung Barat, Jawa Barat 40559 — Telp: 0813-1239-9873
            </div>
          </div>

          {/* Info */}
          <div className="text-sm text-gray-800 space-y-1 mb-3">
            <div className="flex justify-between gap-2">
              <span>No. Nota:</span>
              <span className="font-semibold text-gray-900">
                {notaData.nota_no || notaData.transaksi?.nota_no}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span>Tanggal:</span>
              <span className="text-gray-900">
                {new Date(notaData.created_at).toLocaleDateString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span>Pelanggan:</span>
              <span className="text-gray-900">{notaData.pelanggan?.nama}</span>
            </div>
            <div className="flex justify-between gap-2 items-start">
              <span>Alamat:</span>
              <span className="text-gray-900 text-right break-words max-w-[65%]">
                {notaData.pelanggan?.alamat || "-"}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span>Telepon:</span>
              <span className="text-gray-900">
                {notaData.pelanggan?.telepon}
              </span>
            </div>
          </div>

          {/* Barang */}
          <table className="w-full text-sm border-b text-gray-900 table-fixed">
            <thead>
              <tr className="border-b border-gray-300 font-semibold">
                <th className="text-left w-[8%]">No</th>
                <th className="text-left w-[45%]">Barang</th>
                <th className="text-center w-[10%]">Qty</th>
                <th className="text-center w-[17%]">Harga</th>
                <th className="text-right w-[20%]">Total</th>
              </tr>
            </thead>
            <tbody>
              {(notaData.barang || []).map((b: any, i: number) => (
                <tr key={i} className="border-b border-dashed last:border-b-0">
                  <td className="py-1">{i + 1}</td>
                  <td className="break-words py-1 pr-2">{b.nama_barang}</td>
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
          <div className="text-right mt-3 font-semibold text-lg text-emerald-700 border-t pt-2">
            Total: Rp {notaData.total?.toLocaleString("id-ID")}
          </div>

          <div className="text-center text-gray-700 text-xs mt-5 border-t pt-3">
            Terima kasih telah berbelanja di <b>Mustari Tani</b> 🌾
          </div>
        </div>

        <button
          onClick={handleSavePng}
          className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2"
        >
          <Download size={18} /> Simpan Nota sebagai PNG
        </button>
      </div>
    </div>
  );
}
