import { NextResponse } from "next/server";
import { getPrisma } from "@/app/lib/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pelanggan, transaksi, barang } = body;

    if (!pelanggan?.nama || !barang?.length) {
      return NextResponse.json(
        { ok: false, error: "Data pelanggan atau barang tidak lengkap" },
        { status: 400 }
      );
    }

    // 🔹 Cari atau buat pelanggan
    let pelangganData = await prisma.pelanggan.findFirst({
      where: {
        nama: pelanggan.nama,
        telepon: pelanggan.telepon,
      },
    });

    if (!pelangganData) {
      pelangganData = await prisma.pelanggan.create({
        data: {
          nama: pelanggan.nama,
          alamat: pelanggan.alamat,
          telepon: pelanggan.telepon,
        },
      });
    }

    // 🔹 Simpan transaksi & barang dalam satu transaksi Prisma (atomic)
    const result = await prisma.$transaction(async (tx) => {
      const transaksiData = await tx.transaksi.create({
        data: {
          id_pelanggan: pelangganData.id,
          total: transaksi.total,
        },
      });

      // Debug log: cek isi barang
      console.log("Barang diterima:", barang);

      // Simpan semua barang terkait transaksi ini
      const barangData = await Promise.all(
        barang.map((b: any) =>
          tx.barang.create({
            data: {
              nama_barang: b.nama_barang,
              qty: b.qty,
              harga: b.harga,
              total: b.total,
              id_transaksi: transaksiData.id,
            },
          })
        )
      );

      return { pelangganData, transaksiData, barangData };
    });

    return NextResponse.json({
      ok: true,
      message: "Transaksi dan barang berhasil disimpan!",
      data: result,
    });
  } catch (err) {
    console.error("❌ Error saving transaksi:", err);
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
    if (id) {
      // 🔹 GET DETAIL TRANSAKSI
      const data = await prisma.transaksi.findUnique({
        where: { id },
        include: {
          pelanggan: true,
          barang: true,
        },
      });

      if (!data) {
        return NextResponse.json(
          { ok: false, error: "Transaksi tidak ditemukan" },
          { status: 404 }
        );
      }

      return NextResponse.json({ ok: true, data });
    }

    // 🔹 GET SEMUA TRANSAKSI
    const data = await prisma.transaksi.findMany({
      orderBy: { created_at: "desc" },
      include: { pelanggan: true },
    });

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("❌ Error saat GET transaksi:", err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
