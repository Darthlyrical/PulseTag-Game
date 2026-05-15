import { Player, ShotEvent, HitResult, GameStatus } from "./types";


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

  // if (target.status === "hit" || target.status === "respawning") {
  //   return { type: "ignored", reason: "invulnerable" };
  // }

  const newHealth = target.health - shot.damage;

  if (newHealth <= 0) {
    return {
      type: "eliminated",
      updatedPlayer: { ...target, health: 0, status: "eliminated" },
    };
  }

  return {
    type: "hit", updatedPlayer: { ...target, health: newHealth, status: 'hit'}
  }
}
