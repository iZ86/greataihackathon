import { NextRequest, NextResponse } from 'next/server';
import { BedrockAgentClient, StartIngestionJobCommand } from "@aws-sdk/client-bedrock-agent";

export async function POST(request: NextRequest) {
  try {
    // Initialize Bedrock client
    const client = new BedrockAgentClient({
      region: 'us-east-1'
    });

    const command = new StartIngestionJobCommand({
      knowledgeBaseId: 'FD7BZIWC56',
      dataSourceId: 'B22NLSNUFV'
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