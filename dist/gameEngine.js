"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGame = startGame;
exports.getState = getState;
exports.fireShot = fireShot;
const combat_1 = require("./combat");
const player_1 = require("./player");
let state = {
    status: "waiting",
    players: [
        (0, player_1.createPlayer)(1, "player1", "red"),
        (0, player_1.createPlayer)(2, "player2", "blue"),
    ],
    score: { red: 0, blue: 0 },
};
function startGame() {
    state.status = "countdown";
    state.status = "active";
}
function getState() {
    return state;
}
function fireShot(shot) {
    const target = state.players.find((player) => player.id !== shot.shooterId);
    if (!target)
        return;
    const result = (0, combat_1.processHit)(target, shot, state.status);
    if (result.type === "ignored")
        return;
    //review later. getting confused on how this logic is working
    state.players = state.players.map((player) => player.id === result.updatedPlayer.id ? result.updatedPlayer : player);
    state.score[shot.shooterTeam]++;
    if (state.score[shot.shooterTeam] >= 5) {
        state.status = 'finished';
    }
}
