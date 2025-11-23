# CLAUDE.md

## Project Overview

A React Native chess puzzles app designed for a 6-year-old who is learning to read. The child already knows how chess pieces move but needs to practice and learn strategies. The UI should be simple, colorful, and accessible for early readers.

## Tech Stack

- **Framework**: React Native (no backend)
- **Language**: TypeScript
- **Package Manager**: npm
- **Testing**: Vitest

## Code Style

- **Paradigm**: Functional programming patterns
- **Components**: Functional components with hooks
- **State Management**: React hooks only (useState, useReducer, useContext)

## File Structure

Organize files by type:
```
src/
  components/
  hooks/
  styles/
  screens/
  utils/
```

## Naming Conventions

- **Files**: kebab-case (e.g., `chess-board.tsx`, `use-puzzle.ts`)
- **Components**: PascalCase exports (e.g., `export function ChessBoard()`)
- **Hooks**: camelCase with `use` prefix (e.g., `usePuzzle`)

## Common Commands

```bash
npm install     # Install dependencies
npm start       # Start the app
npm test        # Run tests
```

## Design Guidelines

- Keep UI simple and colorful for young children
- Use large, tappable elements
- Minimize text; use icons and visual cues where possible
- When text is needed, keep it simple for early readers
- Provide positive feedback and encouragement
