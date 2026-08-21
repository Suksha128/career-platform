import { NextRequest, NextResponse } from "next/server";
import { parseResume } from "@/lib/geminiAgents";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText, userInputs } = body;
    if (!resumeText && !userInputs) {
      return NextResponse.json({ error: "Missing resume or user inputs" }, { status: 400 });
    }
    const profile = await parseResume(resumeText ?? "", userInputs ?? {});
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error("Parse resume error:", error);
    return NextResponse.json({ error: "Failed to parse resume" }, { status: 500 });
  }
}
