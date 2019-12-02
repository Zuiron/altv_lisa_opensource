import * as alt from "alt";

import "./modules/commands.mjs";
import "./modules/events.mjs";

//sync dimension to client.
//run every 2 seconds.

setInterval(() => {

    alt.Player.all.forEach((player) => {
        let currdim = player.dimension;
        player.setSyncedMeta("dimension", currdim);
    });

}, 1000);