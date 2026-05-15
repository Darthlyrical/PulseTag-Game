"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameEngine_1 = require("./gameEngine");
(0, gameEngine_1.startGame)();
console.log("PulseTag simulation started");
console.log(JSON.stringify((0, gameEngine_1.getState)(), null, 2));
(0, gameEngine_1.fireShot)({
    shooterId: 1,
    shooterTeam: "red",
    damage: 1,
    timestamp: Date.now(),
});
(0, gameEngine_1.fireShot)({
    shooterId: 2,
    shooterTeam: "blue",
    damage: 1,
    timestamp: Date.now(),
});
(0, gameEngine_1.fireShot)({
    shooterId: 1,
    shooterTeam: "red",
    damage: 1,
    timestamp: Date.now(),
});
(0, gameEngine_1.fireShot)({
    shooterId: 2,
    shooterTeam: "blue",
    damage: 1,
    timestamp: Date.now(),
});
(0, gameEngine_1.fireShot)({
    shooterId: 2,
    shooterTeam: "blue",
    damage: 1,
    timestamp: Date.now(),
});
(0, gameEngine_1.fireShot)({
    shooterId: 2,
    shooterTeam: "blue",
    damage: 1,
    timestamp: Date.now(),
});
(0, gameEngine_1.fireShot)({
    shooterId: 2,
    shooterTeam: "blue",
    damage: 1,
    timestamp: Date.now(),
});
(0, gameEngine_1.fireShot)({
    shooterId: 2,
    shooterTeam: "blue",
    damage: 1,
    timestamp: Date.now(),
});
console.log("Game after shots");
console.log(JSON.stringify((0, gameEngine_1.getState)(), null, 2));
const finalState = (0, gameEngine_1.getState)();
if (finalState.status === "finished") {
    const winner = finalState.score.red >= 5 ? "red" : "blue";
    console.log(`Game over! ${winner} team wins!`);
}
