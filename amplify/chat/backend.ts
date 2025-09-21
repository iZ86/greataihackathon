import { BedrockAgentRuntimeClient, InvokeAgentCommand } from "@aws-sdk/client-bedrock-agent-runtime";

const client = new BedrockAgentRuntimeClient({ region: "us-east-1" });

export async function queryMedicalAgent(question: string, sessionId: string) {
  const command = new InvokeAgentCommand({
    agentId: process.env.AGENT_ID,
    agentAliasId: process.env.AGENT_ALIAS_ID,
    sessionId: sessionId,
    inputText: question,
  });

  const response = await client.send(command);

  if (response.completion) {
    for await (const event of response.completion) {
      if (event.chunk?.bytes) {
        const decodedChunk = new TextDecoder("utf-8").decode(event.chunk.bytes);
        console.log(decodedChunk);
        return decodedChunk;
      }
    }
  }
}