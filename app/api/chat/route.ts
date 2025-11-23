import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // WAJIB untuk OpenAI di App Router

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const AUTH_TOKEN = process.env.AUTH_TOKEN || "supersecret123";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { action, source, name, scripts, description, path } = body;

  let prompt = "";

  if (action === "analyze_script") {
    prompt = `
Kamu adalah asisten developer Roblox.
Analisa dan perbaiki script berikut.

⚠ WAJIB balas dalam format JSON valid saja tanpa teks tambahan.
Contoh:
{
  "updated_source": "print('abc')",
  "message": "ok"
}

Script:
${source}
`;
  } else if (action === "scan_folder") {
    prompt = `
Ini kumpulan script Roblox. Ringkas dan temukan potensi error.

Kembalikan JSON:
{
  "message": "...",
  "suggestions": "..."
}

Jumlah script: ${scripts?.length}
Nama pertama: ${scripts?.[0]?.name}
`;
  } else if (action === "create_file") {
    prompt = `
Buat script Roblox berdasarkan deskripsi berikut:

${description}

Kembalikan JSON:
{
  "generated_source": "..."
}
`;
  } else {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  try {
    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 2000,
          temperature: 0,
          response_format: { type: "json_object" },
        }),
      }
    );

    const data = await openaiRes.json();

    const raw = data?.choices?.[0]?.message?.content;

    if (!raw) {
      return NextResponse.json({
        error: "OpenAI returned empty",
        rawOpenAI: data,
      });
    }

    try {
      const parsed = JSON.parse(raw);
      return NextResponse.json(parsed);
    } catch (err) {
      return NextResponse.json({
        message: "Raw OpenAI response (parsing failed)",
        raw,
      });
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: "Server crash",
        details: err,
      },
      { status: 500 }
    );
  }
}
