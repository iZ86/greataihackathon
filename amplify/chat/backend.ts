import { BedrockAgentRuntimeClient, InvokeAgentCommand } from "@aws-sdk/client-bedrock-agent-runtime";

const client = new BedrockAgentRuntimeClient({ region: "us-east-1" });

export async function queryMedicalAgent(question: string) {
  const command = new InvokeAgentCommand({
    agentId: "C1FVFTYN4U",
    agentAliasId: "MOGZDO2GZK",
    sessionId: "12345", // TODO: change with patient ID as session
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