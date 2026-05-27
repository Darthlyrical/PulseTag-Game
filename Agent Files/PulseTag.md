# PulseTag — Structured Memory Export

Last Updated: 2026-05-26

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

### Current Values
- Each player starts with **100 HP** (updated from original 5 HP prototype)
- Damage values per shot type TBD — to be finalized once all classes are balanced

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
- Microswitch trigger with 3D printed lever — real trigger pull feel, one GPIO pin
- IR emitter
- LED firing feedback (barrel tip)
- Buzzer sound
- Fire cooldown system

### Initial Cooldown
300ms between shots

### Barrel Tip LED

- Located at the barrel tip alongside the IR emitter
- Blinks on every shot fired
- Color reflects the currently active shot type
- Exact color per shot type: TBD
- No extra wiring needed — same location as IR emitter

### Shot Types
- standard
- rapid
- charged
- disabling

---

## Hit Detection

### Planned Components
- IR receivers on vest (body hits)
- IR receivers on headband (headshots)
- Team validation
- Damage processing

### Planned Logic
- Receive IR signal
- Determine enemy or friendly shot
- Determine body hit or headshot
- Apply damage (with headshot multiplier if applicable) if valid
- Trigger feedback effects

---

## Feedback System

### Vest Feedback
- LEDs flash when hit
- Different LED flash pattern for headshot vs body hit
- Vibration motor
- Buzzer sound — distinct tones for body hit, headshot, elimination, respawn ready
- Elimination animation/sound

### Gun Feedback
- Barrel tip LED blinks on fire, color = shot type
- Firing sound
- Cooldown indicator

### Armband Feedback
- HUD updates on hit (health bar drops)
- "HEADSHOT" briefly displayed on shooter's armband when headshot lands

---

## Respawn System

### Planned Features
- Temporary invulnerability after hit
- Respawn timer after elimination

### Planned Values
- Invulnerability: ~1 second
- Respawn: ~5 seconds (10 seconds in Time Attack mode)

---

## Score System

### Rules by Mode
- Classic / Ranked: first to score limit or last standing
- Time Attack: most points when timer expires (see Game Modes)

### Score Events (Ranked / Classic)
- Hit: +1 score
- Elimination: win condition met if score limit reached
- Disabling shot: does not count toward score

---

## Game State System

### Planned Game States
- waiting
- countdown
- active
- paused
- finished

### Planned Match Flow
1. Players select profile, class, team, handedness, arm on armband
2. Countdown starts
3. Game becomes active
4. Shots and hits processed
5. Winner determined
6. Game ends

---

# Planned Hardware

## Core Components
- IR emitters
- IR receivers (vest + headband)
- LEDs (vest strip + barrel tip)
- Buzzers
- Microswitch trigger + 3D printed lever
- NFC reader (armband — ammo restock)
- NFC tags (arena — ammo restock stations)
- Rechargeable LiPo battery (vest only)

---

## Confirmed Hardware Platform

### ESP32
Confirmed platform for Phase 3+:
- Low cost
- WiFi/Bluetooth built in (BLE used for proximity radar)
- Good hobby ecosystem
- Single unit in vest drives all peripherals via GPIO, SPI, I2C, PWM

---

# System Architecture

## Single Brain Design

One ESP32 and one LiPo battery live in the vest. Everything else is dumb hardware wired back to the vest.

```
VEST (ESP32 + LiPo)
  ├── IR receivers ×3       (body hit detection, vest panels)
  ├── LED strip              (health + team color + hit flash)
  ├── Buzzer                 (hit + elimination + respawn sounds)
  ├── BLE radio              (built-in — cross-player proximity)
  ├── [cable → armband]      (display output + NFC reader data via SPI/I2C)
  ├── [cable → blaster]      (GPIO input lines + IR emitter output)
  └── [cable → headband]     (GPIO input lines — headshot detection)

ARMBAND (display + NFC reader — no processor, no battery)
  ├── Landscape TFT display  (driven by vest ESP32)
  └── NFC reader             (detects NFC restock tags — wired to vest ESP32)

BLASTER (inputs + IR emitter — no processor, no battery)
  ├── IR emitter             (barrel tip — fires shots)
  ├── LED                    (barrel tip — blinks on fire, color = shot type)
  ├── Trigger                (microswitch + 3D printed lever — GPIO → vest ESP32)
  ├── Safety button          (GPIO → vest ESP32, hold-to-enable)
  ├── Nav buttons ×4         (2 per side — GPIO → vest ESP32)
  └── Confirm + back ×2      (GPIO → vest ESP32, thumb side)

HEADBAND (input only — no processor, no battery)
  └── IR receivers ×2        (one each side — headshot detection, wired to vest ESP32)
```

## Architecture Principle

Separate game logic from hardware logic.

```
Hardware input
↓
TypeScript game engine
↓
Hardware output
```

---

# Cable Routing

Three separate cable paths, all originating from the vest:

**Gun cable:**
- Exits the bottom of the vest
- Runs down the side of the body
- Enters the grip/handle of the blaster
- Straight braided cable in an armored/insulated housing (like Time Crisis arcade gun tether)
- Fixed length

**Armband cable:**
- Routes from the vest through the chest area near the armpit
- Runs down the inner arm to the armband
- Carries both display signal and NFC reader data back to ESP32
- Shorter run, no armored housing — tucked under armband strap

**Headband cable:**
- Routes from the vest up through the back of the collar area
- Runs up the back of the neck to the headband
- Thin, lightweight cable — minimal movement interference
- Tucked under clothing or along inside of collar/hood where possible

---

# Software Architecture

## Recommended Architecture Principle

Separate:
- game logic
from
- hardware logic

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
  shotType: ShotType;
  disabledUntil: number;
  disablingCharges: number;
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
  shotType: ShotType;
  timestamp: number;
  isHeadshot: boolean;
};
```

### Hit Result

```ts
type HitResult =
  | { type: "hit"; updatedPlayer: Player }
  | { type: "eliminated"; updatedPlayer: Player }
  | { type: "disabled"; updatedPlayer: Player }
  | {
      type: "ignored";
      reason:
        | "friendly_fire"
        | "invulnerable"
        | "game_not_active"
        | "already_disabled";
    };
```

---

# Recommended Development Phases

## Phase 1 — Pure TypeScript Simulation ✅
No hardware. Terminal simulation of complete match.

## Phase 2 — Local Game Engine ← current
Build:
- event system
- state transitions
- cooldown logic
- win conditions
- arm piece display

## Phase 3 — Hardware Integration
Connect:
- Vest ESP32 + IR receivers + LED strip + buzzer

## Phase 4 — Physical Prototype
Build:
- Braided gun cable + blaster (microswitch trigger + buttons) + IR emitter + barrel LED
- Armband display + NFC reader
- Headband

## Phase 5 — Polish
- BLE proximity radar
- Display polish
- Comms system
- Mobile companion app or Bluetooth scoreboard

---

# Stretch Features

## Gameplay Ideas
- Shields
- Powerups
- Team battles (4+ players)
- Prestige system

## Hardware Ideas
- Rechargeable docks
- OLED upgrade
- 3D-printed shell (Phase 4)

## Software Ideas
- Mobile companion app
- Online leaderboard
- Match history
- Firmware OTA updates

---

# Naming Notes

## Selected Project Name
PulseTag

## Reasoning
- Sounds modern
- Scales well as a brand
- Works for hardware/software
- Avoids locking into "laser" terminology

### Possible Branding
- PulseTag Core Vest
- PulseTag MK1 Blaster
- PulseTag Arena App

---

# Long-Term Potential

Possible future directions:
- STEM educational project
- Portfolio centerpiece
- Party/event rental concept
- Indie hardware startup
- Multiplayer arena platform

---

# User Learning Preferences

## Preferred Learning Style
- Step-by-step explanations
- Understanding WHY, not just HOW
- Detailed inline comments
- Guidance before full solutions
- Real projects over abstract exercises

## Preferred Technologies
- TypeScript
- JavaScript
- React
- PostgreSQL
- Express

## Known Learning Challenges
- Over-scoping too early
- Gets overwhelmed by large architecture
- Confidence dips during complex phases

## Recommended Development Strategy
Build small vertical slices first before expanding scope.

---

# Arm Piece Feature — Full Plan

Last Updated: 2026-05-24

---

## Overview

The arm piece is a wearable display worn on each player's inner forearm. It serves two purposes:

1. **Stats display** — shows health, score, game status, active shot type, disabled status, radar
2. **Menu navigation** — all input comes from blaster buttons (no touch screen)

In Phase 1/2 (simulation), the arm piece is a console readout and a set of functions. In Phase 4 it becomes a physical TFT display driven by the vest ESP32.

---

## Shot Types — Finalized Design

| Type        | Damage | Notes                                      |
|-------------|--------|--------------------------------------------|
| `standard`  | 2      | Baseline shot                              |
| `rapid`     | 1      | Lowest damage, fast cooldown               |
| `charged`   | 3      | Highest damage, slow cooldown              |
| `disabling` | 0      | Disables target from firing for 10 seconds |

> Note: Damage values above are placeholder — to be rebalanced at 100 HP scale.

---

## Disabling Shot Rules

- Deals **0 damage**
- Prevents the target from firing for **10 seconds**
- The disable is **cancelled immediately** if the disabled player takes any damage
- If the target is **already disabled**, the shot does **nothing** — timer is not reset or extended
- Each player has **exactly 3 disabling shots per game** — charges do not refill
- A charge is only spent when the shot **successfully disables** the target

---

## Implementation Phases

### Phase A — `types.ts` ✅
Added `ShotType`, `CommsSignal`, updated `Player`, `ShotEvent`, `HitResult`.

### Phase B — `player.ts` ✅
Updated `createPlayer` defaults: `shotType: "standard"`, `disabledUntil: 0`, `disablingCharges: 3`.

### Phase C — `combat.ts` ✅
Damage lookup table, disabling shot logic, already-disabled guard, disabledUntil reset on damage.

### Phase D — `gameEngine.ts` ✅
Disable guard, charge guard, disabling charge decrement, score fix, `selectShotType()`, `sendComms()`.

### Phase E — `armPiece.ts` (next)
Export `showArmPiece(playerId: number): void` — formatted console readout of player state.

---

## File Change Summary

| File            | Status     | What changes                                               |
|-----------------|------------|------------------------------------------------------------|
| `types.ts`      | Done ✅    | ShotType, Player fields, ShotEvent, HitResult              |
| `player.ts`     | Done ✅    | createPlayer defaults                                      |
| `combat.ts`     | Done ✅    | Damage lookup, disable logic, clear-on-damage              |
| `gameEngine.ts` | Done ✅    | Disable guard, charge guard, selectShotType, sendComms     |
| `armPiece.ts`   | Next       | showArmPiece display function                              |

---

# Leveling System — Plan

Last Updated: 2026-05-25

## How Leveling Works

Two layers of progression that stack:

- **Per-game leveling** — gain XP and level up mid-match as you score hits
- **Persistent leveling** — levels carry over across games, rewards class loyalty

## What Levels Up

- All shot types (damage, cooldown, or both)
- All class-specific abilities
- Overheal cap (Support class)

## XP / Level Thresholds

Not yet defined. To decide:
- What actions grant XP (hits, eliminations, heals, assists)
- How many levels exist per class
- Whether there is a level cap or prestige system

---

# Class System — Design

Last Updated: 2026-05-25

Players choose a class before the match. Classes define base stats, available shot types, and unique abilities. All abilities and shot types level up with the player's class level.

---

## Assault

**Role:** Balanced all-rounder
**Stats:** 100 HP, standard cooldowns
**Shot types:** All four (standard, rapid, charged, disabling)
**Ability:** None — full tool access is the identity
**Notes:** Good entry-level class.

---

## Tank

**Role:** Frontline absorber
**Stats:** Higher HP (TBD), slower fire cooldown
**Shot types:** Standard, charged
**Ability:** Immune to disabling shots
**Notes:** Trades speed for durability.

---

## Sniper

**Role:** High-damage single shot
**Stats:** Standard HP, long cooldown
**Shot types:** Charged only (higher base damage, scales with level)
**Ability:** Extended invulnerability window after hit + enhanced headshot multiplier (scales with level)
**Notes:** High risk, high reward. Headshot bonus makes placement matter.

---

## Scout

**Role:** Fast harasser and intel gatherer
**Stats:** Lower HP (TBD), fastest cooldown
**Shot types:** Rapid (default), standard
**Ability:** UAV — reveals enemy health, shot type, and class on arm piece for a short duration (scales with level)
**Notes:** Fragile but hard to pin down.

---

## Demolitions

**Role:** Area control
**Stats:** Standard HP, standard cooldowns
**Shot types:** Standard, charged
**Ability:** Grenade — physical device that emits erratic IR signals in all directions. Number per game scales with level.
**Notes:** In simulation, modeled as a hit against all players within a defined radius.

---

## Support

**Role:** Team sustain and control
**Stats:** Standard HP, slightly slower cooldown
**Shot types:** Standard, disabling (more charges than Assault, scales with level)
**Ability:** Heal shot — fires at a teammate to restore HP. Same IR emitter, different signal pattern. Friendly fire detection flips for this shot type.

**Heal shot details:**
- Starts at 1 HP restored per shot (scales with level)
- Can overheal up to a cap above max HP (starts ~10%, cap increases with level)
- Cannot heal enemies

**Notes:** Useless in 1v1, strongest class in coordinated team play.

---

# Headshot Mechanic

Last Updated: 2026-05-26

## Overview

Headshots deal bonus damage via a configurable multiplier. Detected by IR receivers on the headband.

## Hardware

- Headband with two IR receivers (one each side)
- Wired to vest ESP32 via cable routed up the back of the neck
- No processor or battery on the headband itself

## Damage Multiplier

- Applied on top of shot type base damage
- Default multiplier: TBD — set as pre-game host config
- Sniper class gets enhanced multiplier above default, scales with level
- All other classes use default multiplier

## How to Apply

```
headshot damage = base shot damage × headshot multiplier
```

Example (placeholder values):
- Standard (2 dmg) × 2.0 = 4 headshot damage
- Charged (3 dmg) × 2.0 = 6 headshot damage

## Simulation (Phase 2)

`isHeadshot: boolean` flag on `ShotEvent`. Multiplier read from game config and applied in `combat.ts`.

## In-game Feedback

- Distinct buzzer tone on headshot received
- Different LED flash pattern on vest vs body hit
- Shooter's arm piece briefly shows "HEADSHOT"

---

# Ammo System

Last Updated: 2026-05-26

## Overview

Ammo is **limited by default** in Ranked mode. Players manage finite shots throughout the match.

**Unlimited ammo** available as a toggle in Classic and Time Attack modes.

## NFC Restock Stations

Physical NFC tags placed around the play area act as ammo restock stations. The player taps their **armband** against the tag to restock — natural motion, no need to stop or fumble with the gun.

- The armband has an NFC reader chip wired back to the vest ESP32
- When the NFC reader detects a valid tag, ESP32 triggers `restockAmmo(playerId)`
- NFC tags are passive — no power needed at the station itself
- Tag placement is part of arena setup — different layouts for different scenarios
- In simulation (Phase 1/2): ammo restock modeled as a function call `restockAmmo(playerId)`

## Ammo Design (TBD)

- Starting ammo count per shot type: TBD
- Whether different shot types cost different ammo: TBD
- Whether disabling shots pull from shared pool or dedicated charge pool: TBD
- NFC tag restock amount: TBD (full refill vs partial)

---

# Game Modes

Last Updated: 2026-05-26

## Mode Overview

| Mode | Classes | Leveling | Ammo | Win Condition |
|------|---------|----------|------|---------------|
| Classic | No | No | Unlimited or limited (setting) | First to score limit or last standing |
| Ranked | Yes | Yes | Limited (NFC armband restock) | First to score limit or last standing |
| Time Attack | No | No | Unlimited or limited (setting) | Most points when timer ends |

---

## Classic Mode

- No classes — all players use same base stats and shot types
- No leveling or persistent progression
- Ammo: unlimited by default, can be set to limited in pre-game setup
- Win condition: first to reach score limit, or last player standing

---

## Ranked Mode

- Full class system with abilities, leveling, and persistent progression
- Limited ammo — player taps armband against NFC station to restock
- Win condition: first to reach score limit, or last player standing
- Disabling shots, shot type selection, and all arm piece features active

---

## Time Attack Mode

- Classic ruleset — no classes, no leveling
- Match timer set in pre-game setup (adjustable length, TBD default)
- Both players respawn after elimination — plays until clock runs out

**Starting points:** 100 each

**Scoring:**

| Event | Shooter effect | Target effect |
|-------|---------------|---------------|
| Vest hit | +50 pts | -1 pt |
| Headshot | +100 pts | -1 pt |
| Elimination | +300 pts | Halve current points |

**Rules:**
- Score cannot go below 0
- On elimination: target respawns after 10 seconds at full health
- Winner: most points when timer expires
- Tie: TBD

---

# Future Feature Backlog

Last Updated: 2026-05-25

---

## UAV System

Scout class ability. In simulation: reveals enemy stats on arm piece for a few seconds. In hardware: physical drone with IR emitter, or passive camera/sensor relay.

**Open questions:**
- Can the UAV be shot down?
- Does it move or hover?
- Cooldown between uses?

---

## Grenade

Demolitions class ability. Small physical device that emits erratic IR signals in all directions on activation.

**Open questions:**
- Activation method (button, pin pull, timer)?
- Damage, disable, or both?
- Duration values TBD

---

## Persistent Player Profiles

Tied to leveling. Each player profile tracks:
- Main class
- Persistent level per class
- Match history
- Unlockable cosmetics or titles

Phase 5 — mobile companion app or Bluetooth scoreboard.

---

# Useful Commands

## Git

Check current branch:
```bash
git branch
```
The branch with `*` is your current one.
