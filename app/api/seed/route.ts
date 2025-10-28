// app/api/seed/route.ts
import { NextResponse } from "next/server";
import { getPrisma } from "@/app/lib/prisma";

export async function POST() {
  try {
    const prisma = await getPrisma();

    // contoh data pelanggan baru
    const pelanggan = await prisma.pelanggan.create({
      data: {
        nama: "Budi",
        alamat: "Jl. Kenangan No. 1",
        telepon: "08123456789",
      },
    });

    // contoh transaksi milik pelanggan Budi
    const transaksi = await prisma.transaksi.create({
      data: {
        id_pelanggan: pelanggan.id,
        total: 50000,
        barang: {
          create: [
            {
              nama_barang: "Sabun",
              qty: 2,
              harga: 10000,
              total: 20000,
            },
            {
              nama_barang: "Sampo",
              qty: 1,
              harga: 30000,
              total: 30000,
            },
          ],
        },
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Data seed berhasil dimasukkan!",
      data: { pelanggan, transaksi },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const prisma = await getPrisma();

    // ambil semua pelanggan beserta transaksi & barang-nya
    const data = await prisma.pelanggan.findMany({
      include: {
        transaksi: {
          include: { barang: true },
        },
      },
    });

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
