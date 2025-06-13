import { query, type SDKMessage } from "@anthropic-ai/claude-code";
import { formatSDKMessage } from "../../utils/format-sdk-message";

interface GameRequest {
  description: string;
  iterations?: number;
}

async function createThreeJSGame(gameRequest: GameRequest) {
  const messages: SDKMessage[] = [];
  const maxIterations = gameRequest.iterations || 5;
  let currentIteration = 0;

  // Initial prompt to create the game structure
  const initialPrompt = `
I want you to create a Three.js game based on the following description:
"${gameRequest.description}"

Please create a complete, playable game with the following requirements:
1. Create an HTML file that includes Three.js from CDN
2. Implement the game logic in JavaScript (can be inline in the HTML)
3. Make it visually appealing with proper lighting, materials, and camera setup
4. Include basic user controls (keyboard/mouse as appropriate)
5. Add a simple UI to show game state (score, lives, etc. as needed)

Start by creating the main game file in the output directory.
`;

  console.log(`🎮 Starting Three.js game creation: "${gameRequest.description}"`);
  console.log(`📝 Maximum iterations: ${maxIterations}`);

  // First iteration - create the basic game
  for await (const message of query({
    prompt: initialPrompt,
    options: {
      cwd: 'output',
      allowedTools: ["Task", "Bash", "Glob", "Grep", "LS", "exit_plan_mode", "Read", "Edit", "MultiEdit", "Write", "NotebookRead", "NotebookEdit", "WebFetch", "TodoRead", "TodoWrite", "WebSearch"],
      permissionMode: 'acceptEdits'
    }
  })) {
    formatSDKMessage(message);
    messages.push(message);
  }

  currentIteration++;

  // Iterative improvements
  while (currentIteration < maxIterations) {
    console.log(`\n🔄 Iteration ${currentIteration + 1}/${maxIterations}`);

    const improvementPrompt = `
Please review the game you've created and make improvements:
1. Add more game features or mechanics
2. Improve the visual appearance (better textures, effects, animations)
3. Enhance the gameplay experience
4. Fix any bugs or issues
5. Add sound effects or background music if appropriate (using Web Audio API)

Make the game more polished and fun to play.
`;

    for await (const message of query({
      prompt: improvementPrompt,
      options:
      {
        cwd: 'output',
        allowedTools: ["Task", "Bash", "Glob", "Grep", "LS", "exit_plan_mode", "Read", "Edit", "MultiEdit", "Write", "NotebookRead", "NotebookEdit", "WebFetch", "TodoRead", "TodoWrite", "WebSearch"],
        permissionMode: 'acceptEdits'
      },
    })) {
      formatSDKMessage(message);
      messages.push(message);
    }

    currentIteration++;
  }

  console.log(`\n✅ Game creation complete after ${currentIteration} iterations!`);
  console.log(`📁 Check the created files in the output directory`);

  return messages;
}

// Example usage
async function main() {
  console.log('start');
  // Get game description from command line args or use default
  const args = process.argv.slice(2);
  const gameDescription = args[0] || "a simple 3D platformer game where a cube character jumps between floating platforms to reach the goal";
  const iterations = args[1] ? parseInt(args[1]) : 3;

  await createThreeJSGame({
    description: gameDescription,
    iterations: iterations
  });
}

main().catch(console.error);