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
      const node = notaRef.current;
      const originalWidth = node.style.width;
      node.style.width = "600px";

      const dataUrl = await htmlToImage.toPng(node, {
        quality: 1,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });

      node.style.width = originalWidth;

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto font-mono">
      <div className="bg-white w-full max-w-md rounded-xl p-4 sm:p-6 shadow-xl relative">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Area Nota */}
        <div
          ref={notaRef}
          className="bg-white rounded-b-xl mx-auto overflow-hidden shadow-sm"
          style={{
            backgroundColor: "#ffffff",
            width: "100%",
            maxWidth: "420px",
            padding: "24px 24px 48px", // kurangi padding atas biar rapat
            margin: "0 auto", // hilangkan margin atas
            boxSizing: "border-box",
            borderLeft: "1px solid #e5e7eb",
            borderRight: "1px solid #e5e7eb",
            borderBottom: "1px solid #e5e7eb",
            borderTop: "none", // hilangkan garis atas
          }}
        >
          {/* Header */}
          <div className="text-center mb-3">
            <img
              src="/logo.png"
              alt="Logo Mustari Tani"
              className="mx-auto mb-1 w-36 h-36 object-contain"
              style={{ marginTop: "0" }} // pastikan logo nempel atas
            />
            <div className="text-[12px] text-gray-700 leading-tight mt-1">
              Jl. Terusan Sersan Bajuri, Cihideung, Kec. Parongpong, <br />
              Kab. Bandung Barat, Jawa Barat 40559 <br /> Telp: 081312399873
            </div>
            <hr className="border-t border-gray-300 mt-2 mb-3" />{" "}
            {/* garis rapi di bawah logo */}
          </div>

          {/* Info Nota */}
          <div className="text-[13px] text-gray-800 space-y-1 mb-3">
            <div className="flex justify-between">
              <span>No. Nota:</span>
              <span className="font-bold text-gray-900">
                {notaData.nota_no || notaData.transaksi?.nota_no}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tanggal:</span>
              <span>
                {new Date(notaData.created_at).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Pelanggan:</span>
              <span>{notaData.pelanggan?.nama || "-"}</span>
            </div>
            <div className="flex justify-between gap-2 items-start">
              <span>Alamat:</span>
              <span className="text-right break-words max-w-[65%]">
                {notaData.pelanggan?.alamat || "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Telepon:</span>
              <span>{notaData.pelanggan?.telepon || "-"}</span>
            </div>
          </div>

          {/* Barang */}
          <table className="w-full text-[13px] text-gray-900 border-collapse">
            <thead>
              <tr className="border-b border-gray-300 font-bold">
                <th className="text-left py-1">No</th>
                <th className="text-left py-1">Barang</th>
                <th className="text-center py-1">Qty</th>
                <th className="text-center py-1">Harga</th>
                <th className="text-right py-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {(notaData.barang || []).map((b: any, i: number) => (
                <tr
                  key={i}
                  className="border-b border-dashed border-gray-300 last:border-b-0"
                >
                  <td className="py-1">{i + 1}</td>
                  <td className="py-1 break-words break-all whitespace-normal">
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

          <hr className="border-t-2 border-emerald-600 my-2" />

          {/* Total */}
          <div className="text-right mt-1 font-bold text-[15px] text-emerald-700">
            Total: Rp {notaData.total?.toLocaleString("id-ID")}
          </div>

          {/* Footer */}
          <hr className="border-t border-gray-400 mt-5 mb-3" />
          <div className="text-center text-gray-700 text-[12px] leading-snug">
            Terima kasih telah berbelanja di{" "}
            <b className="text-green-700">Mustari Tani</b>
          </div>
        </div>

        {/* Tombol Simpan PNG */}
        <button
          onClick={handleSavePng}
          className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2 font-sans"
        >
          <Download size={18} /> Simpan Nota sebagai PNG
        </button>
      </div>
    </div>
  );
}
