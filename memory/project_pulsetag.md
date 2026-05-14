---
name: project-pulsetag
description: PulseTag is a 2-player IR laser tag system built in TypeScript phases; currently at Phase 1 (pure TypeScript simulation, no hardware)
metadata:
  type: project
---

PulseTag is a 2-player IR laser tag game with wearable vests and handheld blasters.

**Why:** Primary goal is learning TypeScript through a real hardware/software project with portfolio and potential startup value.

**V1 Scope:**
- 2 players, 2 teams (Red / Blue)
- 5 health per player, 1 damage per hit
- 300ms fire cooldown
- Win condition: first to 5 successful hits
- No friendly fire

**Development phases:**
1. Pure TypeScript simulation (terminal/console) — **start here**
2. Local game engine (events, state transitions, cooldowns, win conditions)
3. Hardware integration (buttons, IR, LEDs, buzzers)
4. Physical prototype (vest + blaster shell + battery)
5. Polish (OLED, Bluetooth, mobile scoreboard)

**Key types defined:**
- `Team = "red" | "blue"`
- `PlayerStatus = "alive" | "hit" | "respawning" | "eliminated"`
- `GameStatus = "waiting" | "countdown" | "active" | "paused" | "finished"`
- `ShotEvent`, `HitResult` (discriminated union)

**Architecture principle:** Separate game logic from hardware logic. Hardware input → TypeScript game engine → Hardware output.

**How to apply:** Stay in Phase 1 until simulation is solid. Don't introduce hardware or networking concerns early. Keep scope tight to V1 rules.
