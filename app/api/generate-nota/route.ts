import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { getPrisma } from "@/app/lib/prisma";

// 🧠 Rate limiter sederhana (per IP)
const rateLimitMap = new Map(); // { ip: [timestamps] }
const MAX_REQUESTS = 5; // maksimal 5 hit
const WINDOW_MS = 60 * 1000; // 1 menit

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [now]);
    return false;
  }

  const timestamps = rateLimitMap.get(ip)!.filter((t) => t > windowStart);
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  return timestamps.length > MAX_REQUESTS;
}

export async function POST(req: Request) {
  try {
    // 🔒 Dapatkan IP user (fallback jika di localhost)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    // 🚫 Cek limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan, coba lagi dalam 1 menit." },
        { status: 429 }
      );
    }

    const { nota_no } = await req.json();

    if (!nota_no) {
      return NextResponse.json(
        { error: "nota_no tidak diberikan" },
        { status: 400 }
      );
    }

    const prisma = await getPrisma();

    const transaksi = await prisma.transaksi.findUnique({
      where: { nota_no: Number(nota_no) },
      include: {
        pelanggan: true,
        barang: true,
      },
    });

    if (!transaksi) {
      return NextResponse.json(
        { error: "Transaksi tidak ditemukan" },
        { status: 404 }
      );
    }

    // Baca logo
    const { readFile } = await import("fs/promises");
    const path = await import("path");
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    const logoBuffer = await readFile(logoPath);
    const logoBase64 = logoBuffer.toString("base64");

    // === HTML dengan tampilan profesional ===
    const html = `
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="UTF-8" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            * { box-sizing: border-box; }
            body {
              font-family: 'Poppins', Arial, sans-serif;
              background: #f9fafb;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
            }
            .container {
              background: #fff;
              width: 480px;
              min-height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding: 32px 32px 20px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            }
            .header {
              text-align: center;
              margin-bottom: 16px;
            }
            .header img {
              width: 200px;
              height: 200px;
              object-fit: contain;
              margin-bottom: 4px;
            }
            .header h1 {
              font-size: 18px;
              color: #1a8a3a;
              margin: 4px 0;
            }
            .header p {
              font-size: 12px;
              color: #444;
              line-height: 1.4;
              margin: 0;
            }
            hr {
              border: none;
              border-top: 1px solid #ddd;
              margin: 16px 0;
            }
            .info {
              font-size: 13px;
              color: #333;
              line-height: 1.6;
              margin-bottom: 8px;
            }
            .info .row {
              display: flex;
              justify-content: space-between;
            }
            .info strong {
              font-weight: 500;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 8px;
              font-size: 13px;
            }
            th, td {
              padding: 8px 4px;
              text-align: left;
            }
            th {
              border-bottom: 1.5px solid #ccc;
              font-weight: 600;
              color: #111;
            }
            tr:not(:last-child) td {
              border-bottom: 1px dashed #ddd;
            }
            td:nth-child(3), th:nth-child(3),
            td:nth-child(4), th:nth-child(4) {
              text-align: center;
            }
            td:nth-child(5), th:nth-child(5) {
              text-align: right;
            }
            .total {
              text-align: right;
              font-weight: 600;
              font-size: 15px;
              color: #1a8a3a;
              margin-top: 10px;
              border-top: 2px solid #1a8a3a;
              padding-top: 6px;
              margin-bottom: 70px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #555;
              margin-top: 0;
              padding-bottom: 0;
              margin-bottom: 30px;
            }
            .footer b {
              color: #1a8a3a;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div>
              <div class="header">
                <img src="data:image/png;base64,${logoBase64}" alt="Logo Mustari Tani" />
                <p>
                  Jl. Terusan Sersan Bajuri, Cihideung, Kec. Parongpong,<br/>
                  Kab. Bandung Barat, Jawa Barat 40559<br/>
                  Telp: 081312399873
                </p>
              </div>

              <hr />

              <div class="info">
                <div class="row"><strong>No. Nota:</strong><span>${
                  transaksi.nota_no
                }</span></div>
                <div class="row"><strong>Tanggal:</strong><span>${new Date(
                  transaksi.created_at
                ).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}</span></div>
                <div class="row"><strong>Pelanggan:</strong><span>${
                  transaksi.pelanggan?.nama || "-"
                }</span></div>
                <div class="row"><strong>Alamat:</strong><span>${
                  transaksi.pelanggan?.alamat || "-"
                }</span></div>
                <div class="row"><strong>Telepon:</strong><span>${
                  transaksi.pelanggan?.telepon || "-"
                }</span></div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Barang</th>
                    <th>Qty</th>
                    <th>Harga</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${(transaksi.barang || [])
                    .map(
                      (b: any, i: number) => `
                      <tr>
                        <td>${i + 1}</td>
                        <td>${b.nama_barang}</td>
                        <td>${b.qty}</td>
                        <td>${Number(b.harga).toLocaleString("id-ID")}</td>
                        <td>${Number(b.total).toLocaleString("id-ID")}</td>
                      </tr>`
                    )
                    .join("")}
                </tbody>
              </table>

              <div class="total">Total: Rp ${transaksi.total.toLocaleString(
                "id-ID"
              )}</div>
            </div>

            <div class="footer">
              Terima kasih telah berbelanja di <b>Mustari Tani</b>
            </div>
          </div>
        </body>
      </html>
    `;

    // === Puppeteer Screenshot ===
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Ambil tinggi asli konten
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    await page.setViewport({ width: 480, height: bodyHeight });

    // Screenshot hanya sesuai tinggi konten
    const buffer = await page.screenshot({
      type: "png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 480, height: bodyHeight },
    });

    await browser.close();

    const base64 = buffer.toString("base64");
    return NextResponse.json({ base64 });
  } catch (err: any) {
    console.error("❌ Error generate nota:", err.message);
    return NextResponse.json({ error: "Gagal generate nota" }, { status: 500 });
  }
}
