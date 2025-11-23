import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const AUTH_TOKEN = process.env.AUTH_TOKEN || "supersecret123";

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
  if (list.length > 60) list.shift();
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { message, source, description, scripts, userId = "default" } = body;

  if (!message && !description) {
    return NextResponse.json({ error: "Message or description required" }, { status: 400 });
  }

  // Build system prompt
  const systemPrompt = `
You are a specialized AI for Roblox development. Always respond with valid JSON.
Supported modes: chat, analyze, autoclass, fix, generate.
If scripts are provided, analyze them and return fixes if needed in "fixes" array.
When returning files, include: name, path, type, source.
When returning fixes, include: name, path, old_source, fixed_source, reason.

Example output JSON:
{
  "mode": "autoclass",
  "message": "...",
  "files": [...],
  "fixes": [...]
}

Make sure JSON is parseable.
`;

  // Save user message (for history)
  const userMsg = message || description || "request";
  pushHistory(userId, "user", userMsg);

  // If scripts are provided, add an additional user message with their content
  const messages = [
    { role: "system", content: systemPrompt },
    ...getHistory(userId)
  ];

  if (Array.isArray(scripts) && scripts.length > 0) {
    // include scripts in manageable chunks
    const scriptsJson = JSON.stringify(scripts.map(s => ({ name: s.name, path: s.path, class: s.class, source: s.source })));
    // if huge, truncate
    const trimmed = scriptsJson.length > 12000 ? scriptsJson.slice(0, 12000) + "...(TRUNCATED)" : scriptsJson;
    messages.push({ role: "user", content: "PROJECT_SCRIPTS_JSON: " + trimmed });
  }

  // Call OpenAI
  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages
    })
  });

  const data = await openaiRes.json();
  const content = data?.choices?.[0]?.message?.content || "{}";

  // Save assistant reply into history
  pushHistory(userId, "assistant", content);

  // Try to parse JSON
  try {
    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch (err) {
    // fallback: try to extract JSON block from content
    const maybe = content.match(/\{[\s\S]*\}$/m);
    if (maybe) {
      try {
        return NextResponse.json(JSON.parse(maybe[0]));
      } catch {}
    }
    return NextResponse.json({
      error: "Invalid JSON returned from AI",
      raw: content
    });
  }
}
