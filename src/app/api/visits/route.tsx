import { NextResponse } from "next/server";

const BASE_URL = "https://stg.invyti.com/api";

export async function GET(req: Request) {
  const page = new URL(req.url).searchParams.get("page") || "0";
  try {
    const res = await fetch(`${BASE_URL}/v1/users/visit?page=${page}`);
    if (!res.ok) return NextResponse.json({ visits: [], totalPages: 0 }, { status: 500 });

    const json = await res.json();
    return NextResponse.json({
      visits: json.message?.data || [],
      totalPages: json.message?.totalPages || 0,
    });
  } catch {
    return NextResponse.json({ visits: [], totalPages: 0 }, { status: 500 });
  }
}
