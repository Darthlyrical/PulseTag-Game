import { GameStatus, Player, ShotEvent, ShotType, CommsSignal } from "./types";
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

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function startGame(): Promise<void> {
  state.status = "countdown";
  await sleep(3000);
  state.status = "active";
}

export function getState(): GameState {
  return state;
}

export function fireShot(shot: ShotEvent): void {
  const target = state.players.find((player) => player.id !== shot.shooterId);
  const shooter = state.players.find((player) => player.id === shot.shooterId);

  if (!target || !shooter) return;

  if (shooter.disabledUntil > Date.now()) return;

  if (shot.timestamp - shooter.lastShotTime < 300) return;

  if (shot.shotType === "disabling" && shooter.disablingCharges === 0) return;

  const result = processHit(target, shot, state.status);

  if (result.type === "ignored") return;

  //review later. getting confused on how this logic is working
  state.players = state.players.map((player) =>
    player.id === result.updatedPlayer.id ? result.updatedPlayer : player,
  ) as [Player, Player];

  if (result.type === "eliminated") {
    state.players = state.players.map((player) =>
      player.id === result.updatedPlayer.id
        ? { ...player, respawnAt: shot.timestamp + 5000 }
        : player,
    ) as [Player, Player];
  }

  if (result.type === "disabled") {
    state.players = state.players.map((player) =>
      player.id === shot.shooterId
        ? { ...player, disablingCharges: shooter.disablingCharges - 1 }
        : player,
    ) as [Player, Player];
  }

  state.players = state.players.map((player) =>
    player.id === shot.shooterId
      ? { ...player, lastShotTime: shot.timestamp }
      : player,
  ) as [Player, Player];

  if (result.type === "hit" || result.type === "eliminated") {
    state.score[shot.shooterTeam]++;
  }
  if (state.score[shot.shooterTeam] >= 5) {
    state.status = "finished";
  }
}

export function checkRespawns(): void {
  const now = Date.now();
  state.players = state.players.map((player) =>
    player.status === "eliminated" &&
    player.respawnAt > 0 &&
    now >= player.respawnAt
      ? { ...player, health: 100, status: "alive", respawnAt: 0 }
      : player,
  ) as [Player, Player];
}

export function selectShotType(playerId: number, shotType: ShotType): void {
  state.players = state.players.map((player) =>
    player.id === playerId ? { ...player, shotType } : player,
  ) as [Player, Player];
}

export function sendComms(senderId: number, signal: CommsSignal): void {
  const sender = state.players.find((player) => player.id === senderId);
  if (!sender) return;
  console.log(`[COMMS] ${sender.name} → ${signal}`);
}
