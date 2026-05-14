# PulseTag — Project Handoff

_Last updated: 2026-05-14_

---

## What This File Is

This is a living document. It gets updated every time work is pushed to the repo. Use it to pick up the project on a new machine without losing context.

---

## Project Summary

**PulseTag** is a 2-player IR laser tag system with wearable vests and handheld blasters, controlled by TypeScript game logic. Built as a real hardware/software learning project.

**Primary goal:** Learn TypeScript through a meaningful, tangible project.

---

## Current Phase

**Phase 1 — Pure TypeScript Simulation**

Nothing has been built yet. The project is in initial setup. No TypeScript source files exist. The next step is to scaffold the TypeScript project and begin building the core types and game engine.

---

## V1 Game Rules (locked in)

| Rule | Value |
|------|-------|
| Players | 2 |
| Teams | Red vs Blue |
| Starting health | 5 |
| Damage per hit | 1 |
| Fire cooldown | 300ms |
| Friendly fire | Disabled |
| Win condition | First to 5 successful hits |

---

## What's Been Done

- [x] Project spec written (`Agent Files/PulseTag.md`)
- [x] Git repo initialized
- [x] GitHub repo created (`Darthlyrical/PulseTag-Game`, private)
- [x] Initial project structure committed
- [x] TypeScript installed as dev dependency (`typescript ^6.0.3`)
- [x] `tsconfig.json` configured (target: ES2020, commonjs, strict mode, src/ → dist/)
- [x] Core types defined in `src/types.ts` — `Team`, `PlayerStatus`, `GameStatus`, `Player`, `ShotEvent`, `HitResult`

---

## What's Next

- [ ] Build player logic (`src/player.ts`) — function to create and initialize a player
- [ ] Build hit processing logic (validates team, invulnerability, applies damage)
- [ ] Build game state machine (waiting → countdown → active → finished)
- [ ] Build terminal simulation to run a full game

---

## Key Decisions Made

| Decision | Rationale |
|----------|-----------|
| TypeScript over JavaScript | Learning goal; catches errors at compile time |
| Simulate first, hardware second | Reduces complexity; validates logic before wiring |
| Discriminated unions for `HitResult` | Forces exhaustive handling of all outcomes |
| Vertical slices over big architecture | Prevents over-scoping and overwhelm |

---

## How to Pick Up On a New Machine

```bash
# 1. Clone the repo
git clone https://github.com/Darthlyrical/PulseTag-Game.git
cd PulseTag-Game

# 2. Install dependencies (once TypeScript is set up)
npm install

# 3. Read this file, then read Agent Files/PulseTag.md for full spec
```

Then open this project with Claude Code and say:
> "Read the HANDOFF.md and let's continue from where we left off."

---

## Architecture Principle

```
Hardware input
      ↓
TypeScript game engine   ← We are building this first
      ↓
Hardware output
```

Game logic is always kept separate from hardware logic. The simulation phase proves out the game engine before any hardware is connected.

---

## File Structure (current)

```
PulseTag-Game/
├── HANDOFF.md              ← you are here
├── README.md
├── package.json
├── tsconfig.json
├── src/
│   └── types.ts            ← all shared types (Team, Player, ShotEvent, HitResult, etc.)
├── Agent Files/
│   └── PulseTag.md         ← full project spec
└── memory/                 ← Claude's persistent memory (not game code)
```

---

## Hardware Platform (future, Phase 3+)

Likely **ESP32** — low cost, WiFi/Bluetooth, good hobby ecosystem.
