import { query, type SDKMessage } from "@anthropic-ai/claude-code";

async function main() {
  const messages: SDKMessage[] = [];

  for await (const message of query({
    prompt: "hello world",
    abortController: new AbortController(),
  })) {
    messages.push(message);
  }

  console.log(messages);
}

main().catch(console.error);
