import { NextResponse } from 'next/server';
import { BedrockAgentClient, StartIngestionJobCommand } from "@aws-sdk/client-bedrock-agent";

const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID as string;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY as string;
const KNOWLEDGE_BASE_ID = process.env.KNOWLEDGE_BASE_ID as string;
const DATA_SOURCE_ID = process.env.DATA_SOURCE_ID as string;
const REGION = process.env.REGION as string;

export async function POST() {
  try {
    // Initialize Bedrock client
    const client = new BedrockAgentClient({
      region: REGION,
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
      }
    });

    const command = new StartIngestionJobCommand({
      knowledgeBaseId: KNOWLEDGE_BASE_ID,
      dataSourceId: DATA_SOURCE_ID,
    });

    const response = await client.send(command);
    console.log(response)
    return NextResponse.json({
      success: true,
      jobId: response.ingestionJob?.ingestionJobId
    });
  } catch (error) {
    console.error('Ingestion error:', error);
    return NextResponse.json(
      { error: 'Failed to start ingestion job' },
      { status: 500 }
    );
  }
}