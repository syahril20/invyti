import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const AUTH_TOKEN = process.env.AUTH_TOKEN || "supersecret123";

const memory =
  globalThis.__UNIFIED_AI_MEMORY__ || (globalThis.__UNIFIED_AI_MEMORY__ = {});

function getHistory(userId: string) {
  if (!memory[userId]) memory[userId] = [];
  return memory[userId];
}

function pushHistory(userId: string, role: "user" | "assistant", content: string) {
  const list = getHistory(userId);
  list.push({ role, content });
  if (list.length > 60) list.shift();
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { message, description, scripts, userId = "default" } = body;

  const userMsg = message || description;
  if (!userMsg) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  // Save user message FIRST
  pushHistory(userId, "user", userMsg);

  // ===== SYSTEM PROMPT =====
  const systemPrompt = `
You are a Roblox development AI. 
Always reply in valid JSON ONLY.

Output format example:
{
  "mode": "chat | analyze | autoclass | fix | generate",
  "message": "...",
  "files": [...],
  "fixes": [...]
}
  `;

  // ===== BUILD MESSAGES =====
  const savedHistory = getHistory(userId);

  const messages: any[] = [
    { role: "system", content: systemPrompt },
    ...savedHistory
  ];

  // If client sends scripts (for auto-fix analysis)
  if (Array.isArray(scripts) && scripts.length > 0) {
    const scriptsJson = JSON.stringify(
      scripts.map(s => ({
        name: s.name,
        path: s.path,
        class: s.class,
        source: s.source
      }))
    );

    const trimmed =
      scriptsJson.length > 12000
        ? scriptsJson.slice(0, 12000) + "...(TRUNCATED)"
        : scriptsJson;

    messages.push({
      role: "user",
      content: "PROJECT_SCRIPTS_JSON: " + trimmed
    });
  }

  // ===== CALL OPENAI =====
  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages
    })
  });

  const data = await openaiRes.json();
  const content = data?.choices?.[0]?.message?.content || "{}";

  // Save assistant reply
  pushHistory(userId, "assistant", content);

  // ===== PARSE JSON =====
  try {
    return NextResponse.json(JSON.parse(content));
  } catch {
    // fallback extract
    const maybe = content.match(/\{[\s\S]*\}/m);
    if (maybe) {
      try {
        return NextResponse.json(JSON.parse(maybe[0]));
      } catch {}
    }
    return NextResponse.json({
      error: "Invalid JSON returned by AI",
      raw: content
    });
  }
}
