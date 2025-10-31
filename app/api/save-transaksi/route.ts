import { NextResponse } from "next/server";
import { getPrisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();

  try {
    const data = await req.json();
    const { nama, alamat, telepon, barang } = data;

    if (!nama || !barang?.length) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    // 🔹 Cek pelanggan
    let pelanggan = await prisma.pelanggan.findFirst({
      where: { telepon },
    });

    if (!pelanggan) {
      pelanggan = await prisma.pelanggan.create({
        data: { nama, alamat, telepon },
      });
    }

    // 🔹 Hitung total
    const total = barang.reduce(
      (sum: number, b: any) => sum + Number(b.harga) * Number(b.qty),
      0
    );

    // 🔹 Buat transaksi
    const transaksi = await prisma.transaksi.create({
      data: {
        id_pelanggan: pelanggan.id,
        total,
        barang: {
          create: barang.map((b: any) => ({
            nama_barang: b.nama,
            qty: Number(b.qty),
            harga: Number(b.harga),
            total: Number(b.qty) * Number(b.harga),
          })),
        },
      },
    });

    return NextResponse.json({ status: "ok", nota_no: transaksi.nota_no });
  } catch (err: any) {
    console.error("❌ Gagal simpan transaksi:", err.message);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}
