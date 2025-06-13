# Three.js Game Creator Agent

This agent automatically creates Three.js games using Claude Code.

## Usage

### Installation
```bash
cd agents/threejs-game-creator
npm install
```

### Creating Games
```bash
# Create default game (3D platformer)
npm start

# Create custom game
npm start "Create a racing game" 5

# Arguments:
# 1st argument: Game description
# 2nd argument: Number of iterations (default: 3)
```

## Examples

### Simple Shooting Game
```bash
npm start "Simple shooting game set in space"
```

### Puzzle Game
```bash
npm start "Block-matching puzzle game" 4
```

### Action Game
```bash
npm start "Action game where a ninja avoids enemies while advancing" 5
```

## Generated Files

The agent generates the following files:
- `output/index.html` - Main game file (includes Three.js and game logic)
- Other asset files as needed

## How It Works

1. Creates the basic game structure in the first iteration
2. Repeats improvements for the specified number of iterations
3. Each iteration improves:
   - Game features
   - Visual enhancements
   - Gameplay improvements
   - Bug fixes
   - Sound effects (when appropriate)