import { Player, ShotEvent, HitResult, GameStatus, ShotType } from "./types";

const shotDamage: Record<ShotType, number> = {
  standard: 2,
  rapid: 1,
  charged: 3,
  disabling: 0,
};
// Returns the outcome of a shot — hit, eliminated, or ignored with a reason
export function processHit(
  target: Player,
  shot: ShotEvent,
  gameStatus: GameStatus,
): HitResult {
  if (gameStatus !== "active") {
    return { type: "ignored", reason: "game_not_active" };
  }

  if (shot.shooterTeam === target.team) {
    return { type: "ignored", reason: "friendly_fire" };
  }

  if (target.invulnerableUntil > shot.timestamp)
    return { type: "ignored", reason: "invulnerable" };

  if (shot.shotType === "disabling" && target.disabledUntil > shot.timestamp) {
    return { type: "ignored", reason: "already_disabled" };
  }

  if (shot.shotType === "disabling") {
    return {
      type: "disabled",
      updatedPlayer: { ...target, disabledUntil: shot.timestamp + 10000 },
    };
  }

  // if (target.status === "hit" || target.status === "respawning") {
  //   return { type: "ignored", reason: "invulnerable" };
  // }
  const damage = shotDamage[shot.shotType];
  const newHealth = target.health - damage;

  if (newHealth <= 0) {
    return {
      type: "eliminated",
      updatedPlayer: {
        ...target,
        health: 0,
        status: "eliminated",
        disabledUntil: 0,
        invulnerableUntil: 0,
      },
    };
  }

  return {
    type: "hit",
    updatedPlayer: {
      ...target,
      health: newHealth,
      status: "hit",
      disabledUntil: 0,
      invulnerableUntil: shot.timestamp + 1000
    },
  };
}
