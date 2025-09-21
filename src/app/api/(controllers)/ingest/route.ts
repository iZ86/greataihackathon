import { NextResponse } from 'next/server';
import { BedrockAgentClient, StartIngestionJobCommand } from "@aws-sdk/client-bedrock-agent";



export async function POST() {
  try {
    // Initialize Bedrock client
    const client = new BedrockAgentClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: "AKIAX323SOFQLXFSOG4H",
        secretAccessKey: "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",
      }
    });

    const command = new StartIngestionJobCommand({
      knowledgeBaseId: "FD7BZIWC56",
      dataSourceId: "B22NLSNUFV",
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