import * as alt from "alt";
import chat from "chat";

//console.log("events.mjs has loaded!");

alt.on('playerDeath', (target, killer, weapon) => {
    //target.pos = target.pos;
    //target.health = 100;
    target.spawn(target.pos.x, target.pos.y, target.pos.z, 3000);
});

alt.on('playerConnect', (player) => {
    console.log(`${player.name} has joined the server!`);
    chat.broadcast(`${player.name} has joined the server!`);
});

alt.on('playerDisconnect', (player, reason) => {
    console.log(`${player.name} has disconnected.`);
    chat.broadcast(`${player.name} has disconnected.`);
});