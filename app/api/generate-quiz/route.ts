import { NextRequest, NextResponse } from "next/server";
import { generateQuiz } from "@/lib/geminiAgents";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, role, topics } = body;
    const quiz = await generateQuiz(company ?? "TCS", role ?? "Software Engineer", topics ?? []);
    return NextResponse.json({ success: true, data: quiz });
  } catch (error) {
    console.error("Quiz error:", error);
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 });
  }
}
