"use client";

import { useState, useRef } from "react";
import { Trash2, Plus } from "lucide-react";
import * as htmlToImage from "html-to-image";
import NotaModal from "@/app/components/NotaModal";

export default function Page() {
  const [pelanggan, setPelanggan] = useState({
    nama: "",
    alamat: "",
    telepon: "",
  });

  const [barangList, setBarangList] = useState([
    { nama_barang: "", qty: 1, harga: 0, total: 0 },
  ]);

  const [transaksi, setTransaksi] = useState({ total: 0 });
  const [notaData, setNotaData] = useState<any>(null);
  const [showNota, setShowNota] = useState(false);
  const notaRef = useRef<HTMLDivElement>(null);

  const hitungTotal = (list = barangList) => {
    const totalSemua = list.reduce(
      (acc, item) => acc + item.qty * item.harga,
      0
    );
    setTransaksi({ total: totalSemua });
  };

  const tambahBarang = () => {
    const newList = [
      ...barangList,
      { nama_barang: "", qty: 1, harga: 0, total: 0 },
    ];
    setBarangList(newList);
    hitungTotal(newList);
  };

  const hapusBarang = (index: number) => {
    const newList = barangList.filter((_, i) => i !== index);
    setBarangList(newList);
    hitungTotal(newList);
  };

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
    const tanggal = now.toISOString();

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

    try {
      const res = await fetch("/api/transaksi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!result.ok) throw new Error(result.error);

      const transaksiId = result.data.transaksi.id;
      const fetchRes = await fetch(`/api/transaksi?id=${transaksiId}`);
      const fetchData = await fetchRes.json();

      if (!fetchData.ok) throw new Error(fetchData.error);

      setNotaData(fetchData.data);
      setShowNota(true);

      // Simpan PNG otomatis
      setTimeout(async () => {
        if (notaRef.current) {
          const dataUrl = await htmlToImage.toPng(notaRef.current, {
            quality: 1,
            pixelRatio: 2,
          });

          const link = document.createElement("a");
          const namaFile = `${fetchData.data.nota_no || "nota"}_${
            fetchData.data.pelanggan?.nama || "pelanggan"
          }.png`.replace(/\s+/g, "_");
          link.download = namaFile;
          link.href = dataUrl;
          link.click();
        }
      }, 500);
    } catch (err) {
      console.error("❌ Gagal simpan:", err);
      alert("Gagal menyimpan transaksi!");
    }
  };

  return (
    <main className="min-h-screen bg-emerald-50 flex flex-col items-center py-6 px-3 sm:px-6">
      <div className="w-full max-w-4xl bg-white p-5 sm:p-8 rounded-2xl shadow-md border border-emerald-100">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-700 mb-8">
          🧾 Form Transaksi Mustari Tani
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 🧍 Data Pelanggan */}
          <section className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-800 mb-4">
              Data Pelanggan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { label: "Nama Pelanggan", key: "nama", required: true },
                { label: "Alamat", key: "alamat" },
                { label: "Nomor Telepon", key: "telepon" },
              ].map((field) => (
                <div className="flex flex-col" key={field.key}>
                  <label className="text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
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
                    className="border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-2 sm:p-3 rounded-md text-gray-900 outline-none bg-white shadow-sm w-full text-sm sm:text-base"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 📦 Data Barang */}
          <section className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 gap-3">
              <h2 className="text-lg sm:text-xl font-semibold text-emerald-800">
                Data Barang
              </h2>
              <button
                type="button"
                onClick={tambahBarang}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md shadow-sm w-full sm:w-auto"
              >
                <Plus size={18} /> Tambah Barang
              </button>
            </div>

            <div className="space-y-4">
              {barangList.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4 items-end bg-white border border-gray-200 p-3 sm:p-4 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col sm:col-span-2">
                    <label className="text-gray-700 font-medium mb-1 text-sm sm:text-base">
                      Nama Barang
                    </label>
                    <input
                      type="text"
                      value={item.nama_barang}
                      onChange={(e) =>
                        handleBarangChange(index, "nama_barang", e.target.value)
                      }
                      className="border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-2 rounded-md text-gray-900 bg-white shadow-sm outline-none text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1 text-sm sm:text-base">
                      Qty
                    </label>
                    <input
                      type="number"
                      value={item.qty === 0 ? "" : item.qty}
                      onChange={(e) =>
                        handleBarangChange(index, "qty", e.target.value)
                      }
                      className="border border-gray-300 text-center focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-2 rounded-md text-gray-900 shadow-sm outline-none text-sm sm:text-base"
                      min={1}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1 text-sm sm:text-base">
                      Harga (Rp)
                    </label>
                    <input
                      type="number"
                      value={item.harga === 0 ? "" : item.harga}
                      onChange={(e) =>
                        handleBarangChange(index, "harga", e.target.value)
                      }
                      className="border border-gray-300 text-right focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-2 rounded-md text-gray-900 shadow-sm outline-none text-sm sm:text-base"
                      min={0}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1 text-sm sm:text-base">
                      Subtotal
                    </label>
                    <div className="p-2 border border-gray-300 bg-gray-50 rounded-md text-right font-semibold text-emerald-700 shadow-sm text-sm sm:text-base">
                      Rp {(item.qty * item.harga).toLocaleString("id-ID")}
                    </div>
                  </div>

                  <div className="flex justify-end sm:justify-center">
                    <button
                      type="button"
                      onClick={() => hapusBarang(index)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-md p-2 sm:p-2.5 mt-3 sm:mt-6 shadow-sm w-9 sm:w-auto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 💰 Ringkasan */}
          <section className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-800 mb-3">
              Ringkasan Transaksi
            </h2>
            <div className="text-right">
              <p className="text-base sm:text-lg text-gray-700">
                Total Barang:{" "}
                <span className="font-semibold">{barangList.length}</span>
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-700 mt-1 sm:mt-2">
                Total: Rp {transaksi.total.toLocaleString("id-ID")}
              </p>
            </div>
          </section>

          {/* 🔘 Submit */}
          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white px-6 sm:px-10 py-3 rounded-lg font-semibold text-base sm:text-lg shadow-md transition-all"
            >
              Simpan Transaksi
            </button>
          </div>
        </form>
      </div>

      {showNota && notaData && (
        <NotaModal notaData={notaData} onClose={() => setShowNota(false)} />
      )}
    </main>
  );
}
