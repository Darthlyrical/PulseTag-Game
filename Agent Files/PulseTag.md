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