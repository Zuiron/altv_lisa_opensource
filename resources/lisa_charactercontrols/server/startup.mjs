import * as alt from "alt";

// credits to rootcause. https://rage.mp/files/file/79-crouch/
// translated to alt:v by zuiron.

alt.on('playerDeath', (target, killer, weapon) => {
    if(target.getSyncedMeta('characterControls:isCrouched')) {
        target.setSyncedMeta('characterControls:isCrouched', false);
    }
    if(target.getSyncedMeta('characterControls:isProned')) {
        target.setSyncedMeta('characterControls:isProned', false);
    }
});

alt.on('playerConnect', (player) => {
    player.setMeta('characterControls:enabled', false);
    player.setSyncedMeta('characterControls:isCrouched', false);
    player.setSyncedMeta('characterControls:isProned', false);
});

alt.onClient("characterControls:crouchToggle", (player) => {
    if(!player.getMeta('characterControls:enabled'))
        return;

    let isCrouched = player.getSyncedMeta('characterControls:isCrouched');
    if(isCrouched === undefined) {
        player.setSyncedMeta('characterControls:isCrouched', true);
    } else {
        player.setSyncedMeta('characterControls:isCrouched', !isCrouched);
    }
});

alt.onClient("characterControls:proneToggle", (player) => {
    if(!player.getMeta('characterControls:enabled'))
        return;
    
    let isProned = player.getSyncedMeta('characterControls:isProned');
    if(isProned === undefined) {
        player.setSyncedMeta('characterControls:isProned', true);
    } else {
        player.setSyncedMeta('characterControls:isProned', !isProned);
    }
});