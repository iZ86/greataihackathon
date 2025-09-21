import { NextResponse } from "next/server";
import { queryMedicalAgent } from "@/../amplify/chat/backend";

export async function POST(req: Request) {
  const { question, sessionId } = await req.json();
  const answer = await queryMedicalAgent(question, sessionId);

  return NextResponse.json({ answer });
}
