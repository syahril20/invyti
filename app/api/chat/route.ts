import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const AUTH_TOKEN = process.env.AUTH_TOKEN || "supersecret123";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { action, prompt, source, name, scripts, description, path } = body;

  let finalPrompt = "";

  // ============================================================
  // UNIVERSAL MODE — bebas tanya apa saja
  // ============================================================
  if (action === "prompt") {
    finalPrompt = `
Kamu adalah asisten AI untuk proyek Roblox. Jawab dalam format JSON VALID.
User prompt:
"${prompt}"

Format balasan:
{
  "response": "jawaban apapun di sini"
}
`;
  }

  // ============================================================
  // ORIGINAL: ANALYZE SCRIPT
  // ============================================================
  else if (action === "analyze_script") {
    finalPrompt = `
⚠ WAJIB balas hanya dalam JSON VALID.
⚠ TANPA teks tambahan, TANPA markdown.

Perbaiki script Roblox berikut jika perlu:

Nama: ${name}
Path: ${path}

Source:
${source}

Format balasan:
{
  "updated_source": "print(\\"...\\" )",
  "message": "..."
}
`;
  }

  // ============================================================
  // ORIGINAL: SCAN FOLDER
  // ============================================================
  else if (action === "scan_folder") {
    finalPrompt = `
⚠ WAJIB balas dalam JSON VALID.

Ini kumpulan script Roblox.
Berikan ringkasan dan potensi error.

Format balasan:
{
  "message": "...",
  "suggestions": "..."
}

Jumlah script: ${scripts?.length}
Contoh nama script: ${scripts?.[0]?.name}
`;
  }

  // ============================================================
  // ORIGINAL: CREATE FILE
  // ============================================================
  else if (action === "create_file") {
    finalPrompt = `
⚠ WAJIB balas hanya dalam JSON VALID.
⚠ TANPA markdown.

Buatkan 1 script Roblox sesuai deskripsi berikut:

"${description}"

Format balasan:
{
  "generated_source": "print(\\"Hello\\")"
}
`;
  }

  // ============================================================
  // UNKNOWN ACTION
  // ============================================================
  else {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  // ============================================================
  // SEND TO OPENAI
  // ============================================================
  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 2000,
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: finalPrompt }],
      }),
    });

    const data = await openaiRes.json();
    const raw = data?.choices?.[0]?.message?.content;

    if (!raw) {
      return NextResponse.json({
        error: "Empty response from OpenAI",
        openaiRaw: data,
      });
    }

    try {
      const json = JSON.parse(raw);
      return NextResponse.json(json);
    } catch {
      return NextResponse.json({
        error: "JSON parse error",
        rawResponse: raw,
      });
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: err },
      { status: 500 }
    );
  }
}
