# PulseTag — Hardware Parts List

_Last updated: 2026-05-26_

All quantities are for **2 players** unless noted. Prices are estimates — AliExpress for budget/slow shipping, Amazon for fast delivery.

---

## Phase 3 — Vest (Brain + Hit Detection + Feedback)

| Part | Qty | Notes | AliExpress | Amazon |
|------|-----|-------|-----------|--------|
| ESP32-WROOM-32 dev board | 2 | Single brain per vest, drives all peripherals | ~$4 ea / $8 | ~$7 ea / $14 |
| LiPo battery, 3.7V 2000–3000mAh | 2 | Higher mAh = longer playtime | ~$6 ea / $12 | ~$10 ea / $20 |
| TP4056 LiPo charging module | 2 | Safe USB charging for LiPo — get USB-C version | ~$1 ea / $2 | ~$3 ea / $6 |
| TSOP38238 IR receiver, 38kHz | 6 | 3 per vest (left/center/right panels) | ~$0.50 ea / $3 | ~$1.30 ea / $8 |
| WS2812B addressable RGB LED strip, 1m | 2 | 30 LEDs/m is fine for chest strip | ~$4 ea / $8 | ~$8 ea / $16 |
| Passive buzzer | 2 | Must be PASSIVE — active buzzers can't play tones | ~$1 ea / $2 | ~$2.50 ea / $5 |
| Coin cell vibration motor | 2 | Small, mounts inside vest shell | ~$1.50 ea / $3 | ~$3 ea / $6 |
| Half-size breadboard | 2 | For prototyping before final assembly | ~$2 ea / $4 | ~$5 ea / $10 |
| Jumper wires (M-M, M-F, F-F assortment) | 1 pack | One pack covers both vests | ~$3 | ~$8 |
| 100Ω resistors (pack of 100) | 1 | LED data line protection | ~$1 | ~$3 |
| 100µF electrolytic capacitor | 4 | Power smoothing for LED strip, 2 per vest | ~$1 | ~$3 |
| USB-C breakout board | 2 | Charging port on the vest | ~$2 ea / $4 | ~$4 ea / $8 |

**Phase 3 Subtotal: ~$50–60 (AliExpress) / ~$107 (Amazon)**

> **Recommendation:** Order ESP32, LiPo batteries, and LED strips from Amazon for fast delivery — these are the first things you'll prototype with. Get IR receivers, buzzers, motors, and resistors from AliExpress since they're cheap and you won't need them until a bit later.

---

## Phase 4 — Blaster + Armband + Headband

> Gun frames are PVC — not listed here.

### Blaster (×2 guns)

| Part | Qty | Notes | AliExpress | Amazon |
|------|-----|-------|-----------|--------|
| IR emitter LED, 940nm (TSAL6200 or equiv.) | 2 | Barrel tip — fires the IR signal | ~$0.50 ea / $1 | ~$2 ea / $4 |
| 5mm RGB LED | 2 | Barrel tip visual indicator — color = shot type | ~$0.30 ea / $0.60 | ~$5 (pack) |
| Microswitch, snap action (small) | 2 | Trigger mechanism — satisfying click | ~$0.50 ea / $1 | ~$6 (pack of 5) |
| Momentary tactile push buttons | 20 | 10 per gun: 4 nav + 2 confirm/back + 1 safety + extras | ~$3 (pack of 50) | ~$8 (pack of 50) |
| NPN transistor (2N2222 or equiv.) | 2 | Drives IR emitter at 38kHz via ESP32 PWM | ~$1 (pack) | ~$6 (pack) |

### Armband (×2)

| Part | Qty | Notes | AliExpress | Amazon |
|------|-----|-------|-----------|--------|
| 2.4" TFT display, SPI (ILI9341 driver) | 2 | Landscape orientation, color — wired to vest ESP32 | ~$4 ea / $8 | ~$12 ea / $24 |
| PN532 NFC reader module | 2 | I2C connection to vest ESP32 — reads restock tags | ~$4 ea / $8 | ~$10 ea / $20 |
| NTAG213 passive NFC tags | 10 | Arena restock stations — no power needed | ~$3 (pack of 10) | ~$8 (pack of 10) |
| Watch-style adjustable straps | 2 sets | For mounting to inner forearm | ~$3 ea / $6 | ~$8 ea / $16 |
| Small perfboard | 2 | Mounts display + NFC reader cleanly | ~$1 ea / $2 | ~$5 ea / $10 |

### Headband (×2)

| Part | Qty | Notes | AliExpress | Amazon |
|------|-----|-------|-----------|--------|
| TSOP38238 IR receiver, 38kHz | 4 | 2 per headband, one each side | ~$0.50 ea / $2 | ~$1.30 ea / $5 |
| Elastic headband | 2 | Base to mount receivers on | ~$2 ea / $4 | ~$3 ea / $6 |
| Small perfboard | 2 | Holds receivers in place | ~$1 ea / $2 | ~$2.50 ea / $5 |

### Cabling

| Part | Qty | Notes | AliExpress | Amazon |
|------|-----|-------|-----------|--------|
| Multi-conductor wire, 6–8 core, 2m lengths | 2 | Gun cable runs — one per player | ~$3 ea / $6 | ~$8 ea / $16 |
| Braided cable sleeving | 2m | Aesthetic housing for gun cable | ~$3 | ~$8 |
| Thin 4-core wire | 3m total | Armband + headband cable runs | ~$3 | ~$7 |
| JST 2.0mm connector pairs | 12 | Quick-disconnect at each junction | ~$3 (pack) | ~$8 (pack) |
| Heat shrink tubing (assorted) | 1 pack | Clean wire terminations | ~$2 | ~$6 |

**Phase 4 Subtotal: ~$56 (AliExpress) / ~$118 (Amazon)**

---

## Tools (One-Time)

Buy these once — they last years.

| Tool | Notes | Budget Pick | Recommended Pick |
|------|-------|-------------|-----------------|
| Soldering iron | Don't cheap out here | $15 (TS100 clone) | TS100 or Hakko FX-888D ~$50–100 |
| Solder | 60/40 rosin core, 0.8mm | ~$8 | ~$12 |
| Flux pen | Makes small joints much easier | ~$5 | ~$8 |
| Wire strippers | Get a ratcheting one | ~$8 | ~$15 |
| JST crimping tool | Required if using JST connectors | ~$15 | ~$25 |
| Multimeter | Essential for debugging dead circuits | ~$15 | Fluke 101 ~$30 |
| Helping hands / PCB holder | Holds boards while soldering | ~$8 | ~$15 |
| USB-to-serial adapter (CP2102) | Flashes some ESP32 variants | ~$3 | ~$8 |

**Tools Subtotal: ~$77–195 depending on what you already own**

> **Recommendation:** The soldering iron is the most important purchase. A $15 iron will frustrate you constantly. The TS100 (~$50) is the hobbyist standard — fast heat-up, portable, interchangeable tips.

---

## Prototyping Overhead

| Item | Notes | Estimate |
|------|-------|---------|
| Spare components | Budget 20–30% extra — you will fry things | +$20–40 |
| M2/M3 screw + standoff assortment | For mounting PCBs inside enclosures | ~$8 |
| Velcro strips (industrial strength) | Used everywhere | ~$8 |
| Hot glue + sticks | Securing components | ~$5 |
| Vest / tactical vest base | Something to mount electronics onto | ~$15–35 |
| PLA/PETG filament | For trigger levers + any printed parts | ~$20–25 per spool |

---

## Full Cost Summary

| Category | AliExpress | Amazon |
|----------|-----------|--------|
| Phase 3 — Vest | ~$50–60 | ~$107 |
| Phase 4 — Blaster + Armband + Headband | ~$56 | ~$118 |
| Tools (if starting from scratch) | ~$77 | ~$195 |
| Prototyping overhead | ~$76 | ~$76 |
| **Grand Total (with tools)** | **~$259–269** | **~$496** |
| **Grand Total (tools already owned)** | **~$106–116** | **~$225** |

> **Smart approach:** Order ESP32s and LED strips from Amazon now to start Phase 3. Order everything else from AliExpress in parallel — it arrives by the time you need it.
