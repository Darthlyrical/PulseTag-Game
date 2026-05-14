# PulseTag

A 2-player IR laser tag system with wearable vests and handheld blasters, powered by TypeScript game logic.

---

## What It Is

PulseTag is a hardware/software project combining infrared communication, wearable electronics, and a TypeScript game engine. Players join a team, fire IR signals at each other, and the first to land 5 hits wins.

---

## V1 Game Rules

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

## Development Phases

| Phase | Focus |
|-------|-------|
| 1 | Pure TypeScript simulation — no hardware |
| 2 | Local game engine — events, state machine, cooldowns |
| 3 | Hardware integration — IR, LEDs, buzzers, buttons |
| 4 | Physical prototype — vest, blaster shell, battery |
| 5 | Polish — displays, Bluetooth, mobile scoreboard |

---

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Hardware (Phase 3+):** ESP32

---

## Status

Currently in **Phase 1** — building and simulating the core game engine in TypeScript before any hardware is connected.
