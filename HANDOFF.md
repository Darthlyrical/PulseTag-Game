# PulseTag — Project Handoff

_Last updated: 2026-05-15_

---

## What This File Is

This is a living document. It gets updated every time work is pushed to the repo. Use it to pick up the project on a new machine without losing context.

---

## Project Summary

**PulseTag** is a 2-player IR laser tag system with wearable vests and handheld blasters, controlled by TypeScript game logic. Built as a real hardware/software learning project.

**Primary goal:** Learn TypeScript through a meaningful, tangible project.

---

## Current Phase

**Phase 1 — Complete. Moving to Phase 2 — Local Game Engine.**

Phase 1 simulation is fully working. The terminal simulation runs a complete match, processes shots, tracks health and score, and declares a winner.

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
- [x] Player creation logic — `src/player.ts` — `createPlayer()` with defaults (health: 5, status: "alive")
- [x] Hit processing logic — `src/combat.ts` — `processHit()` validates team and applies damage
- [x] Game engine — `src/gameEngine.ts` — manages full game state, score, and win condition
- [x] Terminal simulation — `src/index.ts` — runs a complete match and declares a winner

---

## What's Next

- [ ] Phase 2: Add event system (emit events on hit, elimination, game over)
- [ ] Phase 2: Add proper cooldown logic (300ms between shots)
- [ ] Phase 2: Add invulnerability timer (~1 second after being hit)
- [ ] Phase 2: Add respawn timer (~5 seconds after elimination)
- [ ] Phase 2: Refine state transitions with proper countdown logic

---

## Known Limitations (Phase 1)

- Invulnerability check is disabled — players can be hit repeatedly with no protection window. Will be re-enabled in Phase 2 with a real timer.
- `startGame()` skips the countdown instantly — no delay between `"countdown"` and `"active"`.
- Shots are hardcoded in `index.ts` — no real input system yet.

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
│   ├── types.ts            ← all shared types (Team, Player, ShotEvent, HitResult, etc.)
│   ├── player.ts           ← createPlayer() factory function
│   ├── combat.ts           ← processHit() — validates and applies a shot
│   ├── gameEngine.ts       ← game state, startGame(), fireShot(), getState()
│   └── index.ts            ← terminal simulation entry point
├── dist/                   ← compiled JavaScript output (auto-generated, don't edit)
├── Agent Files/
│   └── PulseTag.md         ← full project spec
└── memory/                 ← Claude's persistent memory (not game code)
```

---

## Hardware Platform (future, Phase 3+)

Likely **ESP32** — low cost, WiFi/Bluetooth, good hobby ecosystem.
