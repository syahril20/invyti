// route.ts (Server V5) — Drop-in replacement
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const AUTH_TOKEN = process.env.AUTH_TOKEN || "supersecret123";

// CONFIG
const CHAT_MAX_MESSAGES = 12;       // keep last N messages
const CHAT_MAX_CHARS = 12000;       // keep approx this many chars total from messages
const OPENAI_TIMEOUT_MS = 25000;    // 25s timeout to avoid route hanging
const OPENAI_MODEL = "gpt-4o-mini";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON body", details: String(err) }, { status: 400 });
  }

  const { action } = body;

  // Helper: short-circuit unknown action
  if (!action) {
    return NextResponse.json({ error: "Missing action" }, { status: 400 });
  }

  try {
    if (action === "prompt") {
      // Messages mode (chat with session memory)
      const messages = Array.isArray(body.messages) ? body.messages : (body.messages ? [body.messages] : []);
      if (!messages || messages.length === 0) {
        // fallback to single prompt string
        const prompt = body.prompt || "";
        return await handleChat([{ role: "system", content: "You are a helpful Roblox/Lua assistant." }, { role: "user", content: prompt }]);
      }
      // trim messages for size
      const trimmed = trimMessages(messages, CHAT_MAX_MESSAGES, CHAT_MAX_CHARS);
      return await handleChat(trimmed);
    }

    if (action === "analyze_script") {
      // expected body: { name, path, source }
      const { name = "unnamed", path = "", source = "" } = body;
      const userContent = `Perbaiki atau jelaskan masalah pada script ini. Balas hanya JSON dengan fields "updated_source" (jika diperbaiki) dan "message".\n\nName: ${name}\nPath: ${path}\n\nSource:\n${source}`;
      return await callOpenAIWithJsonResponse([
        { role: "system", content: "You are a Lua/Roblox code analyzer. Output JSON only." },
        { role: "user", content: userContent }
      ]);
    }

    if (action === "edit_line") {
      // expected body: { name, path, source, line, instruction }
      const { name = "unnamed", path = "", source = "", line, instruction = "" } = body;
      if (notPositiveInteger(line)) {
        return NextResponse.json({ error: "Invalid or missing 'line' (positive integer required)" }, { status: 400 });
      }
      const userContent = `Edit baris ${line} dari script berikut. Instruksi: ${instruction}\n\nName: ${name}\nPath: ${path}\n\nSource:\n${source}`;
      return await callOpenAIWithJsonResponse([
        { role: "system", content: "You are a Lua/Roblox code editor. Output JSON only." },
        { role: "user", content: userContent }
      ]);
    }

    if (action === "create_file") {
      // expected body: { description }
      const { description = "" } = body;
      const userContent = `Buatkan 1 script Roblox sesuai deskripsi berikut. Output JSON with \"generated_source\".\n\nDescription:\n${description}`;
      return await callOpenAIWithJsonResponse([
        { role: "system", content: "You are a Lua/Roblox generator. Output JSON only." },
        { role: "user", content: userContent }
      ]);
    }

    if (action === "scan_folder") {
      // expected body: { scripts: [{name, source}, ...] }
      const scripts = Array.isArray(body.scripts) ? body.scripts : [];
      const count = scripts.length;
      const sampleName = count > 0 ? scripts[0].name : "none";
      const userContent = `Scan ${count} scripts (sample: ${sampleName}) for potential errors and suggestions. Return JSON { "message": "...", "suggestions": "..." }.\n\nDo not include long source dumps unless necessary.`;
      return await callOpenAIWithJsonResponse([
        { role: "system", content: "You are a Lua/Roblox linter. Output JSON only." },
        { role: "user", content: userContent }
      ]);
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "Server error", details: String(err) }, { status: 500 });
  }
}

/* -------------------------
   Helpers
   ------------------------- */

function notPositiveInteger(v: any) {
  return !(typeof v === "number" && Number.isInteger(v) && v >= 1);
}

// Trim messages keeping last up to maxMessages and total chars under maxChars
function trimMessages(messages: any[], maxMessages: number, maxChars: number) {
  // Keep last maxMessages first
  const sliceStart = Math.max(0, messages.length - maxMessages);
  let kept = messages.slice(sliceStart);
  // If chars exceed maxChars, drop oldest until within limit
  let total = kept.reduce((acc, m) => acc + (String(m.content || "").length), 0);
  while (kept.length > 1 && total > maxChars) {
    const removed = kept.shift();
    total -= String(removed?.content || "").length;
  }
  return kept;
}

// Call OpenAI in chat mode (returns NextResponse JSON with { response: "..." })
async function handleChat(messages: any[]) {
  // For speed, do not force response_format — return raw text as response
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: messages,
        temperature: 0,
        max_tokens: 1500
      })
    });

    clearTimeout(id);

    if (!res.ok) {
      const txt = await safeText(res);
      return NextResponse.json({ error: "OpenAI error", status: res.status, body: txt }, { status: 502 });
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content;
    return NextResponse.json({ response: raw ?? "" });
  } catch (err: any) {
    const isAbort = err?.name === "AbortError";
    return NextResponse.json({ error: isAbort ? "OpenAI timeout" : "OpenAI request failed", details: String(err) }, { status: 504 });
  }
}

// Call OpenAI forcing JSON object in response (for analyze/edit/create)
async function callOpenAIWithJsonResponse(messages: any[]) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: messages,
        temperature: 0,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      })
    });

    clearTimeout(id);

    if (!res.ok) {
      const txt = await safeText(res);
      return NextResponse.json({ error: "OpenAI error", status: res.status, body: txt }, { status: 502 });
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content;

    // Try parse JSON string; if fails, return raw under `response`
    try {
      const parsed = JSON.parse(raw);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({ response: raw ?? "" });
    }
  } catch (err: any) {
    const isAbort = err?.name === "AbortError";
    return NextResponse.json({ error: isAbort ? "OpenAI timeout" : "OpenAI request failed", details: String(err) }, { status: 504 });
  }
}

async function safeText(res: Response) {
  try {
    return await res.text();
  } catch {
    return "<no body>";
  }
}
