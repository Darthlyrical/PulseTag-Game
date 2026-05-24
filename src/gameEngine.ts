import { GameStatus, Player, ShotEvent } from "./types";
import { processHit } from "./combat";
import { createPlayer } from "./player";

type GameState = {
  status: GameStatus;
  players: [Player, Player];
  score: { red: number; blue: number };
};

let state: GameState = {
  status: "waiting",
  players: [
    createPlayer(1, "player1", "red"),
    createPlayer(2, "player2", "blue"),
  ],
  score: { red: 0, blue: 0 },
};

function sleep(ms: number): Promise<void>{
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function startGame(): void {
  state.status = "countdown";
  state.status = "active";
}

export function getState(): GameState {
  return state;
}

export function fireShot(shot: ShotEvent): void {
  const target = state.players.find((player) => player.id !== shot.shooterId);

  if (!target) return;

  const result = processHit(target, shot, state.status);

  if (result.type === "ignored") return;

  //review later. getting confused on how this logic is working
  state.players = state.players.map((player) =>
    player.id === result.updatedPlayer.id ? result.updatedPlayer : player,
  ) as [Player, Player];

  state.score[shot.shooterTeam]++;

  if (state.score[shot.shooterTeam] >= 5) {
    state.status = 'finished'
  }
}
