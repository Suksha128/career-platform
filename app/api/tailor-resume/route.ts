import { NextRequest, NextResponse } from "next/server";
import { tailorResume } from "@/lib/geminiAgents";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { profile, targetJob } = body;
    const result = await tailorResume(profile ?? {}, targetJob ?? {});
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Tailor resume error:", error);
    return NextResponse.json({ error: "Failed to tailor resume" }, { status: 500 });
  }
}
