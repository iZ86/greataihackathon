import { NextResponse } from "next/server";
import { queryMedicalAgent } from "@/../amplify/chat/backend";

export async function POST(req: Request) {
  const { question } = await req.json();
  const answer = await queryMedicalAgent(question);

  return NextResponse.json({ answer });
}
