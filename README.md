# PulseTag

A 2-player IR laser tag system with wearable vests, handheld blasters, and a TypeScript game engine.

---

## What It Is

PulseTag is a hardware/software project combining infrared communication, wearable electronics, and a TypeScript game engine. Players pick a team (Red or Blue), choose a class, and fire IR signals at each other using blasters wired to an ESP32-powered vest. Hits are detected by IR receivers on the vest and headband, processed through the game engine, and fed back through LEDs, buzzers, and an armband display.

---

## What's Built

The game engine is functional in simulation. The following systems are implemented in TypeScript:

- **Class system** — 5 classes (Assault, Tank, Sniper, Scout, Support) with distinct HP, cooldowns, allowed shot types, and disabling charge pools
- **Combat engine** — processes hits with team validation, invulnerability windows, headshot multiplier (2x default, 2.5x for Sniper), and elimination at 0 HP
- **Shot types** — standard (2 dmg), rapid (1 dmg), charged (3 dmg), disabling (0 dmg, disables target for 10s)
- **Ammo system** — finite ammo pool with per-shot-type costs and NFC restock function
- **Respawn system** — 5-second respawn timer after elimination, 1-second invulnerability after hit
- **Armband display** — console readout showing health bar, score, active shot type, disable charges, and game status
- **Comms system** — quick signal broadcasts (reloading, incoming, attacking, need healing)
- **Game state machine** — waiting → countdown → active → finished, with score-based win condition

---

## Game Rules

| Rule | Value |
|------|-------|
| Players | 2 |
| Teams | Red vs Blue |
| Health | 100 HP (varies by class) |
| Win condition | First to 5 scoring hits |
| Fire cooldown | 150–700ms (varies by class) |
| Friendly fire | Disabled |
| Headshot multiplier | 2x (2.5x for Sniper) |
| Respawn timer | 5 seconds |
| Invulnerability after hit | 1 second |

---

## Classes

| Class | HP | Cooldown | Shot Types | Ability |
|-------|-----|---------|------------|---------|
| Assault | 100 | 300ms | All four | None — full tool access |
| Tank | 150 | 300ms | Standard, Charged | Immune to disabling shots |
| Sniper | 100 | 700ms | Charged, Disabling | Enhanced headshot multiplier (2.5x) |
| Scout | 80 | 150ms | Rapid, Standard, Disabling | Fastest cooldown, lowest HP |
| Support | 100 | 300ms | Standard, Disabling (5 charges) | Self-heal on successful hits |

---

## Game Modes (Designed, Not Yet Implemented)

| Mode | Classes | Ammo | Win Condition |
|------|---------|------|---------------|
| Classic | No | Unlimited or limited | First to score limit / last standing |
| Ranked | Yes | Limited (NFC restock) | First to score limit / last standing |
| Time Attack | No | Unlimited or limited | Most points when timer expires |

---

## Project Structure

```
src/
  types.ts        — Type definitions (Team, Player, ShotEvent, HitResult, etc.)
  classes.ts      — Class configs (HP, cooldown, allowed shots, disable charges)
  player.ts       — Player factory function
  combat.ts       — Hit processing, damage calculation, headshot multiplier
  gameEngine.ts   — Game state, shot firing, respawns, ammo, shot selection
  armband.ts      — Console HUD readout per player
  index.ts        — Simulation entry point
```

---

## Development Phases

| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Pure TypeScript simulation | Done |
| 2 | Local game engine — classes, combat, ammo, armband | **In progress** |
| 3 | Hardware integration — ESP32, IR, LEDs, buzzers | Planned |
| 4 | Physical prototype — vest, blaster, armband, headband | Planned |
| 5 | Polish — BLE proximity, displays, mobile companion | Planned |

---

## Hardware Plan

Single ESP32 + LiPo battery in the vest drives everything. Blaster, armband, and headband are dumb peripherals wired back to the vest.

- **Vest** — ESP32, IR receivers (x3), LED strip, buzzer, vibration motor
- **Blaster** — IR emitter, barrel tip LED, microswitch trigger, nav/confirm buttons
- **Armband** — TFT display, NFC reader (for ammo restock stations)
- **Headband** — IR receivers (x2) for headshot detection

See [PARTS_LIST.md](PARTS_LIST.md) for the full bill of materials.

---

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Hardware (Phase 3+):** ESP32-WROOM-32
