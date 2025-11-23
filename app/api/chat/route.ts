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
  const { action, messages, prompt, name, source, scripts, description, path } = body;

  // ==============================================================
  // MODE CHAT (session-based)
  // ==============================================================
  if (action === "prompt") {
    if (messages && Array.isArray(messages)) {
      return await callChat(messages);
    }

    // fallback legacy
    return await callChat([
      { role: "system", content: "You are a Lua/Roblox assistant. Only output JSON." },
      { role: "user", content: prompt }
    ]);
  }

  // ==============================================================  
  // ANALYZE SCRIPT
  // ==============================================================
  if (action === "analyze_script") {
    return await callChat([
      { role: "system", content: "You are a Lua analyzer. Output JSON only." },
      {
        role: "user",
        content: `
Perbaiki script berikut jika perlu. Output JSON VALID:

Nama: ${name}
Path: ${path}

Source:
${source}

Format:
{
  "updated_source": "...",
  "message": "..."
}
`
      }
    ]);
  }

  // ==============================================================  
  // SCAN FOLDER
  // ==============================================================
  if (action === "scan_folder") {
    return await callChat([
      {
        role: "user",
        content: `
Scan kumpulan script untuk potensi error.
Jumlah script: ${scripts?.length}

Format JSON:
{
  "message": "...",
  "suggestions": "..."
}
`
      }
    ]);
  }

  // ==============================================================  
  // CREATE FILE
  // ==============================================================
  if (action === "create_file") {
    return await callChat([
      {
        role: "user",
        content: `
Buatkan script ROBLOX dari deskripsi berikut.
Output JSON VALID.

Deskripsi:
"${description}"

Format:
{
  "generated_source": "..."
}
`
      }
    ]);
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

///////////////////////////////////////////////////////////////
// 🔥 CHAT HANDLER — ALWAYS RETURNS JSON VALID
///////////////////////////////////////////////////////////////
async function callChat(messagesArray: any[]) {
  try {
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
        messages: messagesArray
      }),
    });

    const json = await res.json();
    const raw = json?.choices?.[0]?.message?.content;

    try {
      return NextResponse.json(JSON.parse(raw));
    } catch {
      return NextResponse.json({ response: raw });
    }

  } catch (err) {
    return NextResponse.json({
      error: "Server error",
      details: err
    }, { status: 500 });
  }
}
