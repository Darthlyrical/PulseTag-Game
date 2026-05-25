# PulseTag — Project Handoff

_Last updated: 2026-05-25_

---

## What This File Is

This is a living document. It gets updated every time work is pushed to the repo. Use it to pick up the project on a new machine without losing context.

---

## Project Summary

**PulseTag** is a 2-player IR laser tag system with wearable vests and handheld blasters, controlled by TypeScript game logic. Built as a real hardware/software learning project.

**Primary goal:** Learn TypeScript through a meaningful, tangible project.

---

## Current Phase

**Phase 1 — Complete. Phase 2 — Local Game Engine in progress.**

Phase 1 simulation is fully working. The terminal simulation runs a complete match, processes shots, tracks health and score, and declares a winner.

Phase 2 is in progress. Countdown is fully complete — `startGame()` is async with a 3-second sleep, and `index.ts` is wrapped in `async main()`. Arm piece implementation has begun: Phase A (types) and Phase B (player defaults) are done and compiling clean. Phase C (combat logic) is next.

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
- [x] Phase 2: `sleep()` helper added to `gameEngine.ts`
- [x] Phase 2: `startGame()` updated — now async, 3 second countdown before game goes active
- [x] Phase 2: `index.ts` wrapped in `async main()` — `await startGame()` works, countdown fires correctly
- [x] Phase 2: `tsconfig.json` updated — `practice/` folder excluded to fix rootDir error
- [x] Phase 2: Arm piece Phase A — `types.ts` updated with `ShotType`, `CommsSignal`, new `Player` fields (`shotType`, `disabledUntil`, `disablingCharges`), `shotType` on `ShotEvent`, `"disabled"` and `"already_disabled"` on `HitResult`
- [x] Phase 2: Arm piece Phase B — `player.ts` updated with new field defaults (`shotType: "standard"`, `disabledUntil: 0`, `disablingCharges: 3`)
- [x] Phase 2: Arm piece Phase C — `combat.ts` updated with damage lookup table, disabling shot logic, already-disabled guard, and disabledUntil reset on damage

---

## What's Next

- [ ] Phase 2: Arm piece — Phase D: update `gameEngine.ts` (disable guard, charge guard, selectShotType, sendComms) ← NEXT
- [ ] Phase 2: Arm piece — Phase E: new `armPiece.ts` (showArmPiece display)
- [ ] Phase 2: Add cooldown logic (300ms between shots)
- [ ] Phase 2: Add invulnerability timer (~1 second after being hit)
- [ ] Phase 2: Add respawn timer (~5 seconds after elimination)

---

## Known Limitations (Phase 1)

- Invulnerability check is disabled — players can be hit repeatedly with no protection window. Will be re-enabled in Phase 2 with a real timer.
- Shots are hardcoded in `index.ts` — no real input system yet.
- `damage` field on `ShotEvent` is still used in `index.ts` test calls but will be replaced by shot type damage lookup in Phase C.

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
# 1. Clone the repo into a clean location (not the Desktop)
git clone https://github.com/Darthlyrical/PulseTag-Game.git ~/Projects/PulseTag-Game
cd ~/Projects/PulseTag-Game

# 2. Install dependencies
npm install

# 3. Read this file, then read Agent Files/PulseTag.md for full spec
```

Then open Claude Code from inside the project folder:
```bash
cd ~/Projects/PulseTag-Game
claude
```

> "Read the HANDOFF.md and let's continue from where we left off."

**Important:** Always open Claude Code from the local clone on whichever machine you're on. Do not open it from an iCloud-synced copy of another machine's desktop — Claude Code won't have full file access and the workflow breaks.

**Before switching machines:** push all changes and update this file.
**After switching machines:** `git pull` first, then open Claude Code.

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
│   ├── gameEngine.ts       ← game state, startGame() (async), fireShot(), getState()
│   └── index.ts            ← terminal simulation entry point, wrapped in async main()
├── dist/                   ← compiled JavaScript output (auto-generated, don't edit)
├── Agent Files/
│   └── PulseTag.md         ← full project spec
└── memory/                 ← Claude's persistent memory (not game code)
```

---

## Hardware Platform (future, Phase 3+)

Likely **ESP32** — low cost, WiFi/Bluetooth, good hobby ecosystem.
