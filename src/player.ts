import { Team, Player, PlayerClass } from "./types";
import { classConfigs } from "./classes";

//functions like this act as a controlled entry point for creating data.
//  They keep the rest of the code clean and prevent inconsistent state from the start.
export function createPlayer(id: number, name: string, team: Team, playerClass: PlayerClass): Player {
  const config = classConfigs[playerClass]
  return {
    id,
    name,
    team,
    health: config.hp,
    status: "alive",
    shotType: "standard",
    playerClass: playerClass,
    ammo: 30,
    disabledUntil: 0,
    disablingCharges: config.disablingCharges,
    lastShotTime: 0,
    invulnerableUntil:0,
    respawnAt: 0,
  };
}
