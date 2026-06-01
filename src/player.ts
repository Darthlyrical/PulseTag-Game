import { Team, Player } from "./types";

//functions like this act as a controlled entry point for creating data.
//  They keep the rest of the code clean and prevent inconsistent state from the start.
export function createPlayer(id: number, name: string, team: Team): Player {
  return {
    id,
    name,
    team,
    health: 100,
    status: "alive",
    shotType: "standard",
    disabledUntil: 0,
    disablingCharges: 3
  };
}
