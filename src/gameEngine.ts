import {
  GameStatus,
  Player,
  ShotEvent,
  ShotType,
  CommsSignal,
  PlayerClass,
} from "./types";
import { processHit } from "./combat";
import { classConfigs } from "./classes";
import { createPlayer } from "./player";

type GameState = {
  status: GameStatus;
  players: [Player, Player];
  score: { red: number; blue: number };
};

let state: GameState = {
  status: "waiting",
  players: [
    createPlayer(1, "player1", "red", "assault"),
    createPlayer(2, "player2", "blue", "assault"),
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

  if (
    shot.timestamp - shooter.lastShotTime <
    classConfigs[shooter.playerClass].cooldown
  )
    return;

  if (shot.shotType === "disabling" && shooter.disablingCharges === 0) return;

  const ammoCost =
    shot.shotType === "charged" && shooter.playerClass === "sniper"
      ? 2
      : shot.shotType === "charged"
        ? 3
        : shot.shotType === "disabling"
          ? 0
          : 1;
  if (shooter.ammo < ammoCost) return;

  const result = processHit(target, shot, state.status, shooter.playerClass);

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
      ? {
          ...player,
          lastShotTime: shot.timestamp,
          ammo: shooter.ammo - ammoCost,
        }
      : player,
  ) as [Player, Player];

  if (result.type === "hit" || result.type === "eliminated") {
    state.score[shot.shooterTeam]++;
  }

  if (
    shooter.playerClass === "support" &&
    (result.type === "hit" || result.type === "eliminated")
  ) {
    const healAmount = shot.isHeadshot ? 5 : 2;
    state.players = state.players.map((player) =>
      player.id === shot.shooterId
        ? {
            ...player,
            health: Math.min(
              player.health + healAmount,
              classConfigs[shooter.playerClass].hp,
            ),
          }
        : player,
    ) as [Player, Player];
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
  const player = state.players.find((p) => p.id === playerId);
  if (!player) return;
  if (!classConfigs[player.playerClass].allowedShotTypes.includes(shotType))
    return;
  state.players = state.players.map((p) =>
    p.id === playerId ? { ...p, shotType } : p,
  ) as [Player, Player];
}

export function restockAmmo(playerId: number): void {
  state.players = state.players.map((player) =>
    player.id === playerId ? { ...player, ammo: 30 } : player,
  ) as [Player, Player];
}

export function sendComms(senderId: number, signal: CommsSignal): void {
  const sender = state.players.find((player) => player.id === senderId);
  if (!sender) return;
  console.log(`[COMMS] ${sender.name} → ${signal}`);
}
