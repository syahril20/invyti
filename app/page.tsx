"use client";

import { useState, useRef } from "react";
import { Trash2, Plus } from "lucide-react";
import * as htmlToImage from "html-to-image";

export default function Page() {
  const [pelanggan, setPelanggan] = useState({
    nama: "",
    alamat: "",
    telepon: "",
  });

  const [barangList, setBarangList] = useState([
    { nama_barang: "", qty: 1, harga: 0, total: 0 },
  ]);

  const [transaksi, setTransaksi] = useState({
    total: 0,
  });

  const notaRef = useRef<HTMLDivElement>(null);
  const [notaData, setNotaData] = useState<any>(null);
  const [showNota, setShowNota] = useState(false);

  // 💰 Hitung total harga barang
  const hitungTotal = (list = barangList) => {
    const totalSemua = list.reduce(
      (acc, item) => acc + item.qty * item.harga,
      0
    );
    setTransaksi({ total: totalSemua });
  };

  // ➕ Tambah barang baru
  const tambahBarang = () => {
    const newList = [
      ...barangList,
      { nama_barang: "", qty: 1, harga: 0, total: 0 },
    ];
    setBarangList(newList);
    hitungTotal(newList);
  };

  // ❌ Hapus barang
  const hapusBarang = (index: number) => {
    const newList = barangList.filter((_, i) => i !== index);
    setBarangList(newList);
    hitungTotal(newList);
  };

  // 🔄 Handle perubahan data barang
  const handleBarangChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newList = [...barangList];
    // @ts-ignore
    newList[index][field] =
      field === "qty" || field === "harga" ? Number(value) : value;
    setBarangList(newList);
    hitungTotal(newList);
  };

  // 💾 Simpan Transaksi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    hitungTotal();

    const now = new Date();
    const nomorNota = "MT-" + now.getTime().toString().slice(-6);
    const tanggal = now.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const payload = {
      pelanggan,
      barang: barangList.map((b) => ({
        ...b,
        total: b.qty * b.harga,
      })),
      transaksi: {
        total: transaksi.total,
        nomorNota,
        tanggal,
      },
    };

    setNotaData(payload);
    setShowNota(true);

    // Tunggu tampilan nota muncul dulu
    setTimeout(async () => {
      // 📸 Generate PNG nota
      if (notaRef.current) {
        const dataUrl = await htmlToImage.toPng(notaRef.current, {
          quality: 1,
          pixelRatio: 2,
        });

        const link = document.createElement("a");
        const namaFile = `${payload.transaksi.nomorNota}_${payload.pelanggan.nama}.png`.replace(
          /\s+/g,
          "_"
        );
        link.download = namaFile;
        link.href = dataUrl;
        link.click();
      }

      // 🗄️ Simpan ke database
      try {
        const res = await fetch("/api/transaksi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await res.json();
        if (!result.ok) throw new Error(result.error);
        console.log("✅ Transaksi tersimpan:", result);
      } catch (err) {
        console.error("Gagal simpan ke database:", err);
        alert("❌ Gagal menyimpan transaksi ke database!");
      }
    }, 500);
  };

  return (
    <main className="min-h-screen bg-emerald-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-md border border-emerald-100">
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-10">
          🧾 Form Transaksi Mustari Tani
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 🧍 Data Pelanggan */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-emerald-800 mb-5">
              Data Pelanggan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Nama Pelanggan", key: "nama", required: true },
                { label: "Alamat", key: "alamat" },
                { label: "Nomor Telepon", key: "telepon" },
              ].map((field) => (
                <div className="flex flex-col" key={field.key}>
                  <label className="text-gray-700 font-medium mb-2">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={
                      // @ts-ignore
                      pelanggan[field.key]
                    }
                    onChange={(e) =>
                      setPelanggan({
                        ...pelanggan,
                        [field.key]:
                          field.key === "telepon"
                            ? e.target.value.replace(/\D/g, "")
                            : e.target.value,
                      })
                    }
                    required={field.required || false}
                    className="border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 rounded-md text-gray-900 outline-none bg-white shadow-sm"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 📦 Data Barang */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-emerald-800">
                Data Barang
              </h2>
              <button
                type="button"
                onClick={tambahBarang}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md shadow-sm"
              >
                <Plus size={18} /> Tambah Barang
              </button>
            </div>

            <div className="space-y-4">
              {barangList.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">
                      Nama Barang
                    </label>
                    <input
                      type="text"
                      value={item.nama_barang}
                      onChange={(e) =>
                        handleBarangChange(index, "nama_barang", e.target.value)
                      }
                      className="border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-2 rounded-md text-gray-900 bg-white shadow-sm outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">Qty</label>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        handleBarangChange(index, "qty", e.target.value)
                      }
                      className="border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-2 rounded-md text-gray-900 text-center bg-white shadow-sm outline-none"
                      min={1}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">
                      Harga (Rp)
                    </label>
                    <input
                      type="number"
                      value={item.harga}
                      onChange={(e) =>
                        handleBarangChange(index, "harga", e.target.value)
                      }
                      className="border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-2 rounded-md text-gray-900 text-right bg-white shadow-sm outline-none"
                      min={0}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">
                      Subtotal
                    </label>
                    <div className="p-2 border border-gray-300 bg-gray-50 rounded-md text-right font-semibold text-emerald-700 shadow-sm">
                      Rp {(item.qty * item.harga).toLocaleString("id-ID")}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => hapusBarang(index)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-md p-2 mt-6 shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 💰 Ringkasan */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-emerald-800 mb-3">
              Ringkasan Transaksi
            </h2>
            <div className="text-right">
              <p className="text-lg text-gray-700">
                Total Barang: <span className="font-semibold">{barangList.length}</span>
              </p>
              <p className="text-3xl font-bold text-emerald-700 mt-2">
                Total: Rp {transaksi.total.toLocaleString("id-ID")}
              </p>
            </div>
          </section>

          {/* 🔘 Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-10 py-3 rounded-lg font-semibold text-lg shadow-md transition-all"
            >
              Simpan Transaksi
            </button>
          </div>
        </form>
      </div>

      {/* 🧾 Modal Nota */}
      {showNota && notaData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={notaRef}
            className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl relative font-mono"
          >
            <button
              onClick={() => setShowNota(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Header Nota */}
            <div className="text-center border-b pb-3 mb-3">
              <img
                src="/logo.png"
                alt="Logo Mustari Tani"
                className="mx-auto mb-2 w-16 h-16 object-contain"
              />
              <div className="text-xl font-bold text-emerald-700">
                Mustari Tani
              </div>
              <div className="text-sm text-gray-700">
                Jl. Kenangan No. 1, Cianjur — Telp: 0812-3456-7890
              </div>
            </div>

            {/* Info Transaksi */}
            <div className="text-sm text-gray-800 space-y-1 mb-3">
              <div className="flex justify-between gap-2">
                <span className="flex-shrink-0">No. Nota:</span>
                <span className="font-semibold text-gray-900 text-right break-words whitespace-normal">
                  {notaData.transaksi.nomorNota}
                </span>
              </div>

              <div className="flex justify-between gap-2">
                <span className="flex-shrink-0">Tanggal:</span>
                <span className="text-gray-900 text-right break-words whitespace-normal">
                  {notaData.transaksi.tanggal}
                </span>
              </div>

              <div className="flex justify-between gap-2">
                <span className="flex-shrink-0">Pelanggan:</span>
                <span className="text-gray-900 text-right break-words whitespace-normal">
                  {notaData.pelanggan.nama}
                </span>
              </div>

              <div className="flex justify-between gap-2 items-start">
                <span className="flex-shrink-0">Alamat:</span>
                <span className="text-gray-900 text-right break-words whitespace-normal leading-snug max-w-[65%]">
                  {notaData.pelanggan.alamat || "-"}
                </span>
              </div>

              <div className="flex justify-between gap-2">
                <span className="flex-shrink-0">Telepon:</span>
                <span className="text-gray-900 text-right break-words whitespace-normal">
                  {notaData.pelanggan.telepon}
                </span>
              </div>
            </div>

            <hr className="my-2" />

            {/* Tabel Barang */}
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
                {notaData.barang.map((b: any, i: number) => (
                  <tr
                    key={i}
                    className="border-b border-dashed last:border-b-0 text-gray-800 align-top"
                  >
                    <td className="py-1">{i + 1}</td>
                    <td className="break-words whitespace-normal py-1 pr-2">
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
            <div className="text-right mt-3 font-semibold text-lg text-emerald-700 border-t pt-2">
              Total: Rp {notaData.transaksi.total.toLocaleString("id-ID")}
            </div>

            <div className="text-center text-gray-700 text-xs mt-4 border-t pt-3">
              Terima kasih telah berbelanja di <b>Mustari Tani</b> 🌾
              <br />
              Barang yang sudah dibeli tidak dapat dikembalikan.
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
