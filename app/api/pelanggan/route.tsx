import { NextResponse } from "next/server";
import { getPrisma } from "@/app/lib/prisma"; // ✅ pakai getPrisma dari file kamu

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, alamat, telepon } = body;

    if (!nama) {
      return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
    }

    const prisma = await getPrisma(); // ✅ ambil prisma instance

    // Cek apakah pelanggan sudah terdaftar berdasarkan nomor telepon
    const existing = await prisma.pelanggan.findFirst({
      where: { telepon },
    });

    if (existing) {
      return NextResponse.json({ message: "Pelanggan sudah terdaftar" });
    }

    // Simpan pelanggan baru
    const pelanggan = await prisma.pelanggan.create({
      data: { nama, alamat, telepon },
    });

    return NextResponse.json({ status: "success", data: pelanggan });
  } catch (err) {
    console.error("Error di /api/pelanggan:", err);
    return NextResponse.json({ error: "Gagal menyimpan pelanggan" }, { status: 500 });
  }
}
