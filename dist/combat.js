"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processHit = processHit;
// Returns the outcome of a shot — hit, eliminated, or ignored with a reason
function processHit(target, shot, gameStatus) {
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
        type: "hit", updatedPlayer: { ...target, health: newHealth, status: 'hit' }
    };
}
