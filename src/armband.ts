import { getState } from "./gameEngine";

export function showArmPiece(playerId: number): void {
  const state = getState();
  const player = state.players.find((player) => player.id === playerId);

  if (!player) return;

  const filledBars = Math.round((player.health / 100) * 10);
  const healthBar = "█".repeat(filledBars) + "░".repeat(10 - filledBars);

  const isDisabled = player.disabledUntil > Date.now();
  const disabledText = isDisabled
    ? `DISABLED (${Math.ceil((player.disabledUntil - Date.now()) / 1000)}s remaining)`
    : "active";

  console.log(
    `\n--- ARM PIECE: ${player.name} [${player.team.toUpperCase()}] ---`,
  );
  console.log(`HP:       ${healthBar} ${player.health}/100`);
  console.log(`Score:    red ${state.score.red} | blue ${state.score.blue}`);
  console.log(`Shot:     ${player.shotType}`);
  console.log(`Disable:  ${player.disablingCharges} charges`);
  console.log(`Status:   ${disabledText}`);
  console.log(`Game:     ${state.status}`);
  console.log(`-------------------------------------------`);
}
