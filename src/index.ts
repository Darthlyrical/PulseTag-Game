import { startGame, fireShot, getState } from "./gameEngine";

startGame();

console.log("PulseTag simulation started");
console.log(JSON.stringify(getState(), null, 2));

fireShot({
  shooterId: 1,
  shooterTeam: "red",
  damage: 1,
  timestamp: Date.now(),
});
fireShot({
  shooterId: 2,
  shooterTeam: "blue",
  damage: 1,
  timestamp: Date.now(),
});
fireShot({
  shooterId: 1,
  shooterTeam: "red",
  damage: 1,
  timestamp: Date.now(),
});
fireShot({
  shooterId: 2,
  shooterTeam: "blue",
  damage: 1,
  timestamp: Date.now(),
});
fireShot({
  shooterId: 2,
  shooterTeam: "blue",
  damage: 1,
  timestamp: Date.now(),
});
fireShot({
  shooterId: 2,
  shooterTeam: "blue",
  damage: 1,
  timestamp: Date.now(),
});
fireShot({
  shooterId: 2,
  shooterTeam: "blue",
  damage: 1,
  timestamp: Date.now(),
});
fireShot({
  shooterId: 2,
  shooterTeam: "blue",
  damage: 1,
  timestamp: Date.now(),
});

console.log("Game after shots");
console.log(JSON.stringify(getState(), null, 2));

const finalState = getState();

if (finalState.status === "finished") {
  const winner = finalState.score.red >= 5 ? "red" : "blue";
  console.log(`Game over! ${winner} team wins!`);
}
