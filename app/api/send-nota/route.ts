import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { base64, telepon, nama } = body;

    if (!base64 || !telepon) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // Ubah nomor ke format WhatsApp (62...@c.us)
    const formattedPhone = telepon
      .replace(/\D/g, "") // hapus karakter non-digit
      .replace(/^0/, "62"); // ubah 08.. jadi 628..

    // Kirim ke server bot
    await axios.post("http://localhost:4000/api/wa/send-image", {
      base64,
      telepon: formattedPhone,
      nama,
    });

    return NextResponse.json({ status: "ok" });
  } catch (err: any) {
    console.error("Gagal kirim ke bot:", err.message);
    return NextResponse.json({ error: "Gagal kirim ke bot" }, { status: 500 });
  }
}
