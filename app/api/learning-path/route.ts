import { NextRequest, NextResponse } from "next/server";
import { generateLearningPath } from "@/lib/geminiAgents";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { missingSkills, targetRole } = body;
    const path = await generateLearningPath(missingSkills ?? [], targetRole ?? "Software Engineer");
    return NextResponse.json({ success: true, data: path });
  } catch (error) {
    console.error("Learning path error:", error);
    return NextResponse.json({ error: "Failed to generate learning path" }, { status: 500 });
  }
}
