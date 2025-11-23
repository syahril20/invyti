import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const AUTH_TOKEN = process.env.AUTH_TOKEN || "supersecret123";

// ====== MEMORY FOR UNIFIED AI =======
const memory =
  // @ts-ignore
  globalThis.__UNIFIED_AI_MEMORY__ || (globalThis.__UNIFIED_AI_MEMORY__ = {});

function getHistory(userId: string) {
  if (!memory[userId]) memory[userId] = [];
  return memory[userId];
}

function pushHistory(userId: string, role: "user" | "assistant", content: string) {
  const list = getHistory(userId);
  list.push({ role, content });

  if (list.length > 40) list.shift();
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { message, source, description, scripts, userId = "default" } = body;

  if (!message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const systemPrompt = `
Kamu adalah AI khusus untuk Roblox development.
Bayangkan kamu adalah asisten developer Roblox yang sangat pintar.
Kamu membantu user membuat/memperbaiki/menganalisa project Roblox

Kamu WAJIB melakukan hal berikut secara otomatis:
- Deteksi maksud user (auto-intent).
- Jika hanya tanya biasa → jawaban biasa.
- Jika user ingin generate sistem/new feature → lakukan auto-class.
- Jika user memberi code → lakukan analyze & auto-fix.
- Jika user bilang ada error → perbaiki berdasarkan memori.
- Jika perlu file baru → buat list file.
- Jika user melanjutkan diskusi → gunakan entire history.

Format jawaban WAJIB JSON valid:

{
  "mode": "chat | analyze | autoclass | fix | generate",
  "message": "penjelasan ke user",
  "files": [
    {
      "name": "NamaFile",
      "path": "e.g. StarterPlayerScripts",
      "type": "LocalScript / Script / ModuleScript / ScreenGui / RemoteEvent",
      "source": "kode (bisa kosong jika event)"
    }
  ]
}

Jika tidak ada file → files: [].
WAJIB: JSON VALID.
`;

  // Save user message
  pushHistory(userId, "user", message);

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...getHistory(userId)
      ]
    })
  });

  const data = await openaiRes.json();
  const content = data?.choices?.[0]?.message?.content || "{}";

  // Save AI reply to history
  pushHistory(userId, "assistant", content);

  try {
    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({
      error: "Invalid JSON returned from AI",
      raw: content
    });
  }
}
