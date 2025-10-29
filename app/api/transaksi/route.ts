import { NextResponse } from "next/server";
import { getPrisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const prisma = await getPrisma();
    const body = await req.json();

    const { pelanggan, barang, transaksi } = body;

    // 🧍 Simpan pelanggan
    const pelangganBaru = await prisma.pelanggan.create({
      data: {
        nama: pelanggan.nama,
        alamat: pelanggan.alamat,
        telepon: pelanggan.telepon,
      },
    });

    // 💾 Simpan transaksi
    const transaksiBaru = await prisma.transaksi.create({
      data: {
        id_pelanggan: pelangganBaru.id,
        total: transaksi.total,
      },
    });

    // 📦 Simpan daftar barang
    const barangData = barang.map((b: any) => ({
      nama_barang: b.nama_barang,
      qty: b.qty,
      harga: b.harga,
      total: b.total,
      id_transaksi: transaksiBaru.id,
    }));
    await prisma.barang.createMany({ data: barangData });

    return NextResponse.json({
      ok: true,
      message: "Transaksi berhasil disimpan!",
      data: {
        pelanggan: pelangganBaru,
        transaksi: transaksiBaru,
      },
    });
  } catch (err) {
    console.error("❌ POST Error:", err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const prisma = await getPrisma();

    if (id) {
      // 🔹 Ambil detail transaksi berdasarkan ID
      const data = await prisma.transaksi.findUnique({
        where: { id },
        include: { pelanggan: true, barang: true },
      });
      if (!data) {
        return NextResponse.json(
          { ok: false, error: "Transaksi tidak ditemukan" },
          { status: 404 }
        );
      }
      return NextResponse.json({ ok: true, data });
    }

    // 🔹 Ambil semua transaksi
    const data = await prisma.transaksi.findMany({
      orderBy: { created_at: "desc" },
      include: { pelanggan: true },
    });

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("❌ GET Error:", err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
