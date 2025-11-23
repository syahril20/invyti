import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const AUTH_TOKEN = process.env.AUTH_TOKEN || "supersecret123";

// patch type globalThis to allow dynamic memory
declare global {
  // eslint-disable-next-line no-var
  var __UNIFIED_AI_MEMORY__: Record<string, any> | undefined;
}

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
You are GPT Builder AI for Roblox Studio.

Your responsibilities:
- If the user asks to create something (UI, button, event, script, module, function),
  you MUST return it inside "files" array.

- If the user is chatting normally, return mode: "chat".

- If the user sends scripts array, analyze errors
  and return mode: "fix" with fixes[].

=====================
RESPONSE MUST ALWAYS BE VALID JSON:
{
  "mode": "chat | generate | autoclass | fix",
  "message": "string",
  "files": [
    {
      "name": "FileName",
      "type": "Script | LocalScript | ModuleScript | ScreenGui | RemoteEvent | RemoteFunction",
      "path": "StarterGui/FolderName",
      "source": "lua code here"
    }
  ],
  "fixes": [
    {
      "name": "ScriptName",
      "path": "Full.Path.To.Script",
      "old_source": "...",
      "fixed_source": "...",
      "reason": "..."
    }
  ]
}
=====================

RULES:
- When user says "buat", "generate", "tolong buatkan", "bikin",
  ALWAYS return mode = "generate" and include files[].

- If user requests UI elements like Button, ScreenGui, Frame:
  YOU MUST create a ScreenGui file AND a LocalScript file to make it functional.

DO NOT RETURN ANYTHING OUTSIDE JSON.
NO MARKDOWN, NO \`\`\`, NO ENGLISH UNLESS WRITTEN INSIDE JSON.

UI RULES (IMPORTANT):
- Do NOT create UI objects directly in files[].
- NO ScreenGui, NO TextButton, NO Frame, NO Instance.new() objects returned as files.

INSTEAD:
- Always create a Script or LocalScript that generates UI dynamically using Instance.new inside the script.

EXAMPLE:
files: [
  {
    "name": "CreateTeleportButton",
    "type": "LocalScript",
    "path": "StarterPlayerScripts",
    "source": "
      local gui = Instance.new('ScreenGui', game.Players.LocalPlayer:WaitForChild('PlayerGui'))
      gui.Name = 'TeleportUI'

      local btn = Instance.new('TextButton', gui)
      btn.Size = UDim2.new(0, 200, 0, 50)
      btn.Text = 'Teleport'
      btn.Position = UDim2.new(0.5, -100, 0.8, -25)

      btn.MouseButton1Click:Connect(function()
         print('Teleport clicked')
      end)
    "
  }
]

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
