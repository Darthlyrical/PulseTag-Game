"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlayer = createPlayer;
//functions like this act as a controlled entry point for creating data.
//  They keep the rest of the code clean and prevent inconsistent state from the start.
function createPlayer(id, name, team) {
    return {
        id,
        name,
        team,
        health: 5,
        status: "alive",
    };
}
