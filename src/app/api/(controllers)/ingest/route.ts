import { NextRequest, NextResponse } from 'next/server';
import { BedrockAgentClient, StartIngestionJobCommand } from "@aws-sdk/client-bedrock-agent";

export async function POST(request: NextRequest) {
  try {
    await request.json();

    // Initialize Bedrock client
    const client = new BedrockAgentClient({
      region: process.env.AWS_REGION || 'us-east-1'
    });

    const command = new StartIngestionJobCommand({
      knowledgeBaseId: process.env.BEDROCK_KNOWLEDGE_BASE_ID || 'FD7BZIWC56',
      dataSourceId: process.env.BEDROCK_DATA_SOURCE_ID || 'B22NLSNUFV'
    });

    const response = await client.send(command);

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