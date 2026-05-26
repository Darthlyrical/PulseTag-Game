# PulseTag — Project Handoff

_Last updated: 2026-05-26_

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

Phase 2 is in progress. Countdown is fully complete — `startGame()` is async with a 3-second sleep, and `index.ts` is wrapped in `async main()`. Arm piece Phases A, B, and C are done and compiling clean. Phase D (gameEngine updates) is next.

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
- [x] Hardware design session — full physical system designed and diagrammed (see Hardware Design section below)

---

## What's Next

- [ ] Phase 2: Arm piece — Phase D: update `gameEngine.ts` (disable guard, charge guard, selectShotType, sendComms) ← NEXT
- [ ] Phase 2: Arm piece — Phase E: new `armPiece.ts` (showArmPiece display)
- [ ] Phase 2: Add cooldown logic (300ms between shots)
- [ ] Phase 2: Add invulnerability timer (~1 second after being hit)
- [ ] Phase 2: Add respawn timer (~5 seconds after elimination)

---

## Known Limitations (Phase 2)

- Invulnerability check is disabled — players can be hit repeatedly with no protection window. Will be re-enabled in Phase 2 with a real timer.
- Shots are hardcoded in `index.ts` — no real input system yet.

---

## Key Decisions Made

| Decision | Rationale |
|----------|-----------|
| TypeScript over JavaScript | Learning goal; catches errors at compile time |
| Simulate first, hardware second | Reduces complexity; validates logic before wiring |
| Discriminated unions for `HitResult` | Forces exhaustive handling of all outcomes |
| Vertical slices over big architecture | Prevents over-scoping and overwhelm |
| Single ESP32 + LiPo in vest | One brain, one battery — drives everything. Less weight, fewer failure points, one charge |
| All input from gun buttons | Consistent input model pre-game and in-game. Armband is display-only |
| Hold-to-enable safety | Safest option — buttons lock the moment thumb leaves. Can't accidentally leave unlocked |
| Ambidextrous button layout | Same 4 GPIO pins, role flips in software via handedness setting in player profile |
| BLE proximity radar (zones only) | ESP32 BLE built-in, no extra hardware. RSSI → 3 zones (close/medium/far). No direction — honest about what BLE can deliver |
| Headband for headshot detection | IR receivers on the head add a skill-based damage layer without complicating the vest. Sniper class gets a multiplier bonus to reward precision. |
| Barrel tip LED (shot type indicator) | Same location as IR emitter — doubles as visual feedback for firing and shot mode at a glance. No extra wiring run needed. |

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

## Hardware Design (Phase 3+)

All hardware design was diagrammed and locked in during a planning session on 2026-05-26. This section captures every decision. Nothing gets built until Phase 3, but these decisions are final for V1.

### System Architecture

One ESP32 and one LiPo battery live in the vest. They power and drive everything — the armband display and the blaster are both dumb hardware wired back to the single brain.

```
VEST (ESP32 + LiPo)
  ├── IR receivers ×3       (hit detection, on vest panels)
  ├── LED strip              (health + team color + hit flash)
  ├── Buzzer                 (hit + elimination + respawn sounds)
  ├── BLE radio              (built-in ESP32 — cross-player proximity)
  ├── [cable → armband]      (display output via SPI/I2C)
  └── [cable → blaster]      (GPIO input lines + IR emitter output)

ARMBAND (display only — no processor, no battery)
  └── Landscape TFT display  (driven by vest ESP32)

BLASTER (inputs + IR emitter — no processor, no battery)
  ├── IR emitter             (barrel tip — fires shots)
  ├── LED                    (barrel tip — blinks on fire, color = shot type, TBD colors)
  ├── Trigger                (GPIO → vest ESP32)
  ├── Safety button          (GPIO → vest ESP32, hold-to-enable)
  ├── Nav buttons ×4         (2 per side — GPIO → vest ESP32)
  └── Confirm + back ×2      (GPIO → vest ESP32, thumb side)

HEADBAND (input only — no processor, no battery)
  └── IR receivers ×2        (one each side — headshot detection, wired to vest ESP32)
```

### Cable Routing

Two separate cable paths, both originating from the vest:

**Gun cable:**
- Exits the bottom of the vest
- Runs down the side of the body
- Enters the grip/handle of the blaster
- Straight braided cable in an armored/insulated housing (like Time Crisis arcade gun tether)
- Fixed length

**Armband cable:**
- Routes from the vest through the chest area near the armpit
- Runs down the inner arm to the armband display
- Shorter run, no armored housing needed — tucked under armband strap

### Vest

- ESP32 + LiPo battery are the only active electronics
- Three IR receivers spread across the front panels (left, center, right) for hit detection from multiple angles
- LED strip runs across the chest — shows health bar, team color (red/blue), and flashes on hit
- Buzzer mounted inside the shell — different tones for hit, elimination, respawn ready, game over (passive buzzer so ESP32 can play different tones via PWM)
- Vibration motor for haptic hit feedback

### Blaster

- M16-style long barrel
- IR emitter at the barrel tip
- 4 nav buttons total — 2 on each face of the barrel (left face, right face), clustered near the front of the barrel in the support hand zone
- Confirm + back buttons in the thumb zone (same face as nav buttons, same side — determined by handedness)
- Safety button on the top-back of the gun in the trigger hand thumb zone
- LED at the barrel tip alongside the IR emitter — blinks on every shot, color changes based on active shot type (exact colors TBD)

**Ambidextrous button layout:**
- Same 4 GPIO pins regardless of handedness
- Right-handed: left face = scroll up/down (index finger), right face = confirm/back (thumb)
- Left-handed: right face = scroll up/down (index finger), left face = confirm/back (thumb)
- Handedness is a setting in the player profile — ESP32 remaps GPIO roles on load, no hardware changes

**Safety — hold to enable:**
- Holding the safety button enables the 4 nav buttons
- Releasing immediately locks them again
- Prevents accidental menu inputs during combat
- Implemented as `safetyEngaged: boolean` in the input config — button handler checks it before passing any input to game engine

### Armband

- Landscape TFT display on the inner forearm
- Two independent watch-style strap sets — one near each short end of the display, each wrapping fully around the forearm circumference and clasping on the outer side
- Adjustable — each strap tightens/loosens independently for different forearm sizes/shapes
- Can be positioned anywhere from mid-forearm to near-elbow (user preference, saved in profile)
- No touch screen — all input comes from blaster buttons
- Display inverts 180° in software based on arm setting (left arm = normal, right arm = flipped) so it reads upright when glancing at inner forearm
- Arm preference stored in player profile, ESP32 reads on boot

**Display contexts (all driven by same gun buttons):**

| Context | Trigger | Radar visible |
|---------|---------|---------------|
| Pre-game setup | Game not started | No |
| In-game HUD | Game active | Yes |
| Comms menu | Safety held + comms mode | No — radar hides |
| Shot type select | Safety held + shot mode | No — radar hides |

**In-game HUD shows:**
- Health bar + HP value
- Score
- Shot type
- Class
- Match timer
- Radar (proximity only — see below)
- Last comms message received

**Pre-game setup screens (navigated with gun buttons):**
- Select user profile
- Select class
- Select team
- Set handedness (left/right)
- Set arm (left/right) — controls display inversion

### Headband

- Worn on the head — IR receivers detect incoming shots that hit the head
- Two IR receivers, one on each side of the headband
- Wired back to the vest ESP32 (same as blaster and armband cable pattern)
- Headshots deal more damage than body shots via a damage multiplier

**Headshot multiplier:**
- Default multiplier value TBD (set as a pre-game/host config option)
- Sniper class has an enhanced headshot multiplier as part of their class ability — scales with level
- Other classes use the default multiplier
- Multiplier is a configurable value in game settings, not hardcoded

### Proximity Radar

- Built on ESP32 BLE RSSI — no extra hardware required
- Each vest broadcasts a BLE beacon every ~200ms with player ID + team
- Other vests scan for beacons and read signal strength
- RSSI mapped to 3 proximity zones — smoothed with rolling average to prevent flickering

| Zone | Distance | Dot position |
|------|----------|--------------|
| Close | < 5m | Inner ring |
| Medium | 5–15m | Mid ring |
| Far | > 15m | Outer ring |
| Out of range | — | Hidden |

- Dot only moves toward/away from center — no directional data (BLE can't provide direction)
- Friendly dots shown in team color, enemy dots in red
- True directional radar (dot moves around the ring) requires UWB hardware — Phase 5 consideration

### Hardware Platform

**ESP32** — confirmed platform for Phase 3+.
- Low cost
- WiFi + Bluetooth built in (BLE used for proximity radar)
- Good hobby ecosystem
- Single unit drives all peripherals via GPIO, SPI, I2C, PWM

### Phase Build Order

| Phase | Focus |
|-------|-------|
| 1 | Pure TypeScript simulation ✅ |
| 2 | Local game engine — events, state, cooldowns ← current |
| 3 | Vest ESP32 + IR receivers + LED strip + buzzer |
| 4 | Braided gun cable + blaster buttons + IR emitter + barrel LED + armband display + headband |
| 5 | BLE proximity radar + display polish + comms system |
