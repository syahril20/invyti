import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const AUTH_TOKEN = process.env.AUTH_TOKEN || "supersecret123";

// memory konteks
const memory =
  // @ts-ignore
  globalThis.__CHAT_MEMORY__ || (globalThis.__CHAT_MEMORY__ = {});

function getHistory(userId: string) {
  if (!memory[userId]) memory[userId] = [];
  return memory[userId];
}

function pushHistory(userId: string, role: string, content: string) {
  const list = getHistory(userId);
  list.push({ role, content });

  // biar tidak terlalu panjang
  if (list.length > 20) list.shift();
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { message, userId = "default" } = body;

  if (!message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  // simpan pesan user ke history
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
        {
          role: "system",
          content: "Kamu adalah asisten yang sopan dan menjelaskan dengan jelas."
        },
        ...getHistory(userId)
      ]
    })
  });

  const data = await openaiRes.json();
  const reply = data?.choices?.[0]?.message?.content || "No reply";

  // simpan jawaban AI ke memory
  pushHistory(userId, "assistant", reply);

  return NextResponse.json({
    reply,
    history: getHistory(userId)
  });
}
