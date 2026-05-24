# PulseTag — Structured Memory Export

Last Updated: 2026-05-13

---

# Project Overview

## Project Name
PulseTag

## Project Type
Multiplayer IR laser tag system

## Primary Purpose
Learn TypeScript through building a real hardware/software project.

## Secondary Goals
- Learn embedded systems concepts
- Learn game state architecture
- Learn event-driven programming
- Build portfolio-worthy technical project
- Explore future startup/product potential

---

# Core Concept

PulseTag is a 2-player laser tag system using:
- IR communication
- wearable vests
- handheld blasters
- TypeScript-based game logic

Each player belongs to a colored team:
- Red
- Blue

Players fire IR signals at each other to score hits and reduce health.

---

# Planned Gameplay Features

## Teams
- Red team
- Blue team

### Team Rules
- Enemy shots cause damage
- Friendly fire may be disabled
- Team colors represented through LEDs

---

## Health System

### Initial Rules
- Each player starts with 5 health
- Each successful hit deals 1 damage

### Planned States
- alive
- hit
- respawning
- eliminated

### Planned Behaviors
- health decreases on valid hit
- player eliminated at 0 health
- temporary invulnerability after being hit

---

## Gun System

### Planned Features
- Trigger button
- IR emitter
- LED firing feedback
- Buzzer sound
- Fire cooldown system

### Initial Cooldown
300ms between shots

### Shot Types (Future Ideas)
- standard shot
- charged shot
- power shot

---

## Hit Detection

### Planned Components
- IR receivers on vest
- Team validation
- Damage processing

### Planned Logic
- Receive IR signal
- Determine enemy or friendly shot
- Apply damage if valid
- Trigger feedback effects

---

## Feedback System

### Vest Feedback
- LEDs flash when hit
- vibration motor
- buzzer sound
- elimination animation/sound

### Gun Feedback
- firing LED
- firing sound
- cooldown indicator

---

## Respawn System

### Planned Features
- temporary invulnerability after hit
- respawn timer after elimination

### Planned Values
- invulnerability: ~1 second
- respawn: ~5 seconds

---

## Score System

### Initial Rules
- points awarded for successful hits
- possible bonus for elimination

### Possible Win Conditions
- first to eliminate opponent
- first to score limit
- highest score after timer

### Recommended Version 1 Rule
First player to 5 successful hits wins.

---

## Game State System

### Planned Game States
- waiting
- countdown
- active
- paused
- finished

### Planned Match Flow
1. players ready up
2. countdown starts
3. game becomes active
4. shots and hits processed
5. winner determined
6. game ends

---

# Planned Hardware

## Core Components
- IR emitters
- IR receivers
- LEDs
- buzzers
- buttons/triggers
- rechargeable battery systems

---

## Potential Hardware Platforms

### ESP32
Likely preferred platform due to:
- low cost
- WiFi/Bluetooth support
- good hobby ecosystem
- TypeScript/JavaScript compatibility options

### Espruino
Previously discussed as a JavaScript-capable microcontroller platform.

---

# Software Architecture

## Recommended Architecture Principle

Separate:
- game logic
from
- hardware logic

### Desired Structure

Hardware input
↓
TypeScript game engine
↓
Hardware output

---

# Planned TypeScript Concepts

## Learning Goals

### Core TypeScript Topics
- type aliases
- interfaces
- unions
- literal types
- discriminated unions
- typed events
- function typing
- state management

---

## Example Planned Types

### Team

```ts
type Team = "red" | "blue";
```

### Player Status

```ts
type PlayerStatus =
  | "alive"
  | "hit"
  | "respawning"
  | "eliminated";
```

### Player

```ts
type Player = {
  id: number;
  name: string;
  team: Team;
  health: number;
  status: PlayerStatus;
};
```

### Game Status

```ts
type GameStatus =
  | "waiting"
  | "countdown"
  | "active"
  | "paused"
  | "finished";
```

### Shot Event

```ts
type ShotEvent = {
  shooterId: number;
  shooterTeam: Team;
  damage: number;
  timestamp: number;
};
```

### Hit Result

```ts
type HitResult =
  | {
      type: "hit";
      updatedPlayer: Player;
    }
  | {
      type: "ignored";
      reason:
        | "friendly_fire"
        | "invulnerable"
        | "game_not_active";
    }
  | {
      type: "eliminated";
      updatedPlayer: Player;
    };
```

---

# Recommended Development Phases

## Phase 1 — Pure TypeScript Simulation
No hardware.

Focus on:
- players
- health
- hits
- scoring
- game states

Simulate everything in terminal/console.

---

## Phase 2 — Local Game Engine
Build:
- event system
- state transitions
- cooldown logic
- win conditions

---

## Phase 3 — Hardware Integration
Connect:
- buttons
- IR emitters
- IR receivers
- LEDs
- buzzers

---

## Phase 4 — Physical Prototype
Build:
- wearable vest
- handheld blaster shell
- battery integration

---

## Phase 5 — Polish
Potential additions:
- OLED displays
- Bluetooth
- mobile scoreboard
- player profiles
- advanced game modes

---

# Stretch Features

## Gameplay Ideas
- ammo system
- reload mechanic
- shields
- powerups
- team battles
- timer-based matches

---

## Hardware Ideas
- OLED display
- LED health bar
- haptic feedback
- rechargeable docks
- 3D-printed shell

---

## Software Ideas
- mobile companion app
- online leaderboard
- match history
- Bluetooth pairing
- firmware updates

---

# Recommended Version 1 Scope

## Initial Build Goals
- 2 players
- 2 teams
- 5 health
- 1 damage per hit
- 300ms cooldown
- hit feedback
- simple win condition

---

# Naming Notes

## Selected Project Name
PulseTag

## Reasoning
Chosen because it:
- sounds modern
- scales well as a brand
- works for hardware/software
- avoids locking into "laser" terminology

### Possible Branding
- PulseTag Core Vest
- PulseTag MK1 Blaster
- PulseTag Arena App

---

# Long-Term Potential

Possible future directions:
- STEM educational project
- portfolio centerpiece
- party/event rental concept
- indie hardware startup
- multiplayer arena platform

---

# User Learning Preferences Relevant To Project

## Preferred Learning Style
- step-by-step explanations
- understanding WHY, not just HOW
- detailed inline comments
- guidance before full solutions
- real projects over abstract exercises

## Preferred Technologies
- TypeScript
- JavaScript
- React
- PostgreSQL
- Express

## Known Learning Challenges
- over-scoping too early
- getting overwhelmed by large architecture
- confidence dips during complex implementation phases

## Recommended Development Strategy
Build small vertical slices first before expanding scope.

---

# Arm Piece Feature — Full Plan

Last Updated: 2026-05-24

---

## Overview

The arm piece is a wearable display/controller worn on each player's arm. It serves three purposes:

1. **Stats display** — shows health, score, game status, active shot type, and disabled status
2. **Shot type selection** — lets the player cycle between shot modes before firing
3. **Comms** — lets players send preset quick signals to each other

In Phase 1 (simulation), the arm piece is a console readout and a set of functions. In later phases it becomes a physical OLED screen + buttons on the wrist.

---

## Shot Types — Finalized Design

| Type        | Damage | Notes                                      |
|-------------|--------|--------------------------------------------|
| `standard`  | 2      | Baseline shot                              |
| `rapid`     | 1      | Lowest damage, fast cooldown               |
| `charged`   | 3      | Highest damage, slow cooldown              |
| `disabling` | 0      | Disables target from firing for 10 seconds |

---

## Disabling Shot Rules

- Deals **0 damage**
- Prevents the target from firing for **10 seconds**
- The disable is **cancelled immediately** if the disabled player takes any damage
- If the target is **already disabled**, the shot does **nothing** — timer is not reset or extended
- Each player has **exactly 3 disabling shots per game** — charges do not refill
- A charge is only spent when the shot **successfully disables** the target (i.e. not when ignored)

---

## Comms System

A preset quick-signal system. One player sends a signal, both players see it in the terminal.

### Planned Signals
- `"reloading"`
- `"incoming"`
- `"attacking"`

### Hardware future: buzzer pattern or LED flash on both vests to represent the signal.

---

## Type Changes Required

### New types to add to `types.ts`

```ts
type ShotType = "standard" | "rapid" | "charged" | "disabling";

type CommsSignal = "reloading" | "incoming" | "attacking";
```

### Updated `Player` type

Add two new fields:

```ts
shotType: ShotType;       // currently selected shot mode, defaults to "standard"
disabledUntil: number;    // timestamp; 0 = not disabled; >0 = disabled until that time
disablingCharges: number; // starts at 3, counts down on successful disables
```

### Updated `ShotEvent` type

Add one new field:

```ts
shotType: ShotType; // what type of shot was fired
```

### Updated `HitResult` discriminated union

Add one new variant:

```ts
| { type: "disabled"; updatedPlayer: Player }
```

Add one new ignored reason:

```ts
reason: "friendly_fire" | "invulnerable" | "game_not_active" | "already_disabled"
```

---

## Implementation Phases

---

### Phase A — `types.ts`

**Goal:** Add all new types and update existing ones.

**Changes:**
1. Add `ShotType` union
2. Add `CommsSignal` union
3. Add `shotType`, `disabledUntil`, `disablingCharges` to `Player`
4. Add `shotType` to `ShotEvent`
5. Add `{ type: "disabled"; updatedPlayer: Player }` to `HitResult`
6. Add `"already_disabled"` to the ignored reasons in `HitResult`

**No logic yet — types only.**

---

### Phase B — `player.ts`

**Goal:** Update `createPlayer` to include the new fields with correct defaults.

**Changes:**
- `shotType` defaults to `"standard"`
- `disabledUntil` defaults to `0`
- `disablingCharges` defaults to `3`

---

### Phase C — `combat.ts`

**Goal:** Update hit processing to handle all four shot types and disable logic.

**Changes:**
1. Add a damage lookup object that maps each `ShotType` to its damage value
2. Replace the hardcoded `shot.damage` usage with a lookup on `shot.shotType`
3. Add an early-exit check: if `shot.shotType === "disabling"` and `target.disabledUntil > shot.timestamp`, return `{ type: "ignored", reason: "already_disabled" }`
4. Add disabling shot handling: if `shot.shotType === "disabling"`, return `{ type: "disabled", updatedPlayer: { ...target, disabledUntil: shot.timestamp + 10000 } }`
5. For `hit` and `eliminated` results: always set `disabledUntil: 0` on the `updatedPlayer` (damage cancels the disable)

---

### Phase D — `gameEngine.ts`

**Goal:** Enforce disable blocking, charge spending, shot type selection, and comms.

**Changes:**
1. In `fireShot`: find the shooter in state, check `shooter.disabledUntil > Date.now()` — if true, return early (blocked)
2. In `fireShot`: if shot type is `"disabling"` and `shooter.disablingCharges === 0`, return early (out of charges)
3. In `fireShot`: after `processHit`, if result is `type: "disabled"`, decrement the shooter's `disablingCharges` by 1
4. In `fireShot`: score only increments when the result is `"hit"` or `"eliminated"` (disabling shot does not count toward 5-hit win)
5. Add `selectShotType(playerId: number, shotType: ShotType): void` — updates that player's `shotType` in state
6. Add `sendComms(senderId: number, signal: CommsSignal): void` — logs a formatted line like `[COMMS] Player1 → incoming`

---

### Phase E — `armPiece.ts` (new file)

**Goal:** Create the arm piece display function.

**Changes:**
- Export one function: `showArmPiece(playerId: number): void`
- Reads current game state
- Prints a formatted readout showing:
  - Player name and team
  - Current health (e.g. `HP: ███░░ 3/5`)
  - Current score
  - Active shot type
  - Disabling charges remaining
  - Disabled status (if active, show time remaining in seconds)
  - Game status

---

## File Change Summary

| File            | Status     | What changes                                               |
|-----------------|------------|------------------------------------------------------------|
| `types.ts`      | Update     | ShotType, CommsSignal, Player fields, ShotEvent, HitResult |
| `player.ts`     | Update     | createPlayer defaults                                      |
| `combat.ts`     | Update     | Damage lookup, disable logic, clear-on-damage              |
| `gameEngine.ts` | Update     | Disable guard, charge guard, selectShotType, sendComms     |
| `armPiece.ts`   | New file   | showArmPiece display function                              |

---

# Useful Commands

## Git

Check current branch:
```bash
git branch
```
The branch with `*` is your current one.
