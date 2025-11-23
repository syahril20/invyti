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
  const { action, prompt, messages, source, name, scripts, description, path } = body;

  let finalPrompt = "";

  // ============================================================
  // 1) UNIVERSAL MODE WITH SESSION MEMORY
  // ============================================================
  if (action === "prompt") {
    if (messages && Array.isArray(messages)) {
      return await callChatWithMessages(messages);
    }

    // fallback old mode
    finalPrompt = `
Kamu adalah asisten AI Roblox. Jawab dalam JSON VALID.
User prompt:
"${prompt}"

Format:
{
  "response": "jawaban"
}
`;
  }

  // ============================================================
  // 2) ANALYZE SCRIPT
  // ============================================================
  else if (action === "analyze_script") {
    finalPrompt = `
⚠ WAJIB JSON VALID.

Perbaiki script berikut jika ada error:

Nama: ${name}
Path: ${path}

Source:
${source}

Format:
{
  "updated_source": "print(\\"...\")",
  "message": "..."
}
`;
  }

  // ============================================================
  // 3) SCAN FOLDER
  // ============================================================
  else if (action === "scan_folder") {
    finalPrompt = `
⚠ WAJIB JSON VALID.

Scan kumpulan script berikut dan berikan potensi error.

Jumlah file: ${scripts?.length}

Format:
{
  "message": "...",
  "suggestions": "..."
}
`;
  }

  // ============================================================
  // 4) CREATE FILE
  // ============================================================
  else if (action === "create_file") {
    finalPrompt = `
⚠ JSON VALID SAJA.

Buatkan script ROBLOX sesuai deskripsi:

"${description}"

Format:
{
  "generated_source": "print(\\"test\\")"
}
`;
  }

  else {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  // ============================================================
  // CLASSIC PROMPT MODE
  // ============================================================
  try {
    const data = await openaiClassic(finalPrompt);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: err },
      { status: 500 }
    );
  }
}

//////////////////////////////////////////////////////////////
// 🔥 FUNCTION 1 — Universal Chat Mode (SESSION MEMORY)
//////////////////////////////////////////////////////////////
async function callChatWithMessages(messages: any[]) {
  try {
    const formatted = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0,
        max_tokens: 2000,
        response_format: { type: "json_object" },
        messages: formatted,
      }),
    });

    const json = await res.json();
    const raw = json?.choices?.[0]?.message?.content;

    try {
      return JSON.parse(raw);
    } catch {
      return { response: raw };
    }
  } catch (err) {
    return NextResponse.json(
      { error: "GPT error", details: err },
      { status: 500 }
    );
  }
}

//////////////////////////////////////////////////////////////
// 🔥 FUNCTION 2 — Fallback Classic Prompt Mode
//////////////////////////////////////////////////////////////
async function openaiClassic(prompt: string) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0,
      max_tokens: 2000,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content;

  try {
    return JSON.parse(raw);
  } catch {
    return { response: raw };
  }
}
