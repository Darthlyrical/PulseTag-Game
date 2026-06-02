//A union of two string literals. The export keyword makes it available to other files.
// Using a union instead of plain string means TypeScript will catch a typo like "erd" at compile time instead of silently breaking the game.
export type Team = "red" | "blue";

export type PlayerClass = "assault" | "tank" | "sniper" | "scout" | "support";
//Same idea — a union of all the states a player can be in.
// Anywhere you use a PlayerStatus, TypeScript knows exactly which values are valid.
export type PlayerStatus = "alive" | "hit" | "respawning" | "eliminated";

export type ShotType = "standard" | "rapid" | "charged" | "disabling";

export type CommsSignal =
  | "reloading"
  | "incoming"
  | "attacking"
  | "need healing";

//All the states the game itself can be in.
export type GameStatus =
  | "waiting"
  | "countdown"
  | "active"
  | "paused"
  | "finished";

//Notice team and status use the types we just defined — not raw strings.
// So if you try to set team: "green", TypeScript rejects it.
export type Player = {
  id: number;
  name: string;
  team: Team;
  health: number;
  status: PlayerStatus;
  shotType: ShotType;
  playerClass: PlayerClass;
  ammo: number;
  disabledUntil: number;
  disablingCharges: number;
  lastShotTime: number;
  invulnerableUntil: number;
  respawnAt: number;
};

//Represents a single shot being fired. timestamp will be used for the cooldown and invulnerability logic.
export type ShotEvent = {
  shotType: ShotType;
  shooterId: number;
  shooterTeam: Team;
  damage: number;
  timestamp: number;
  isHeadshot: boolean;
};

//This is a discriminated union — the most powerful type here.
// Every possible outcome of a shot has its own shape. The type field is the discriminator.
// When you handle a HitResult later, TypeScript will force you to handle all three cases — you can't forget one.
export type HitResult =
  | { type: "hit"; updatedPlayer: Player }
  | {
      type: "ignored";
      reason:
        | "friendly_fire"
        | "invulnerable"
        | "game_not_active"
        | "already_disabled"
        | "immune_to_disabling";
    }
  | { type: "eliminated"; updatedPlayer: Player }
  | { type: "disabled"; updatedPlayer: Player };
