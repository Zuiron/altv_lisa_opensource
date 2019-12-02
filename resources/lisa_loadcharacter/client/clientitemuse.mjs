/* client item use shit */
import * as alt from "alt";
import * as game from "natives";

game.requestAnimDict('amb@prop_human_bum_bin@base'); //repair vehicle anim

alt.onServer('itemuse:vehicleRepairKit', (veh, mk, itemid) => {
    //figure out engine position.
    const boneIndex = game.getEntityBoneIndexByName(veh.scriptID, 'engine'); //-1 is false? then dont continue.
    const enginepos = game.getWorldPositionOfEntityBone(veh.scriptID, boneIndex);

    let cont = true;

    alt.emitServer('itemuse:vehicleRepairKit', mk, enginepos, cont, veh, itemid);
});

alt.onServer('itemuse:clearPedTasks', () => {
    game.clearPedTasks(alt.Player.local.scriptID);
});

alt.onServer('itemuse:runRepairKitAnim', (veh) => {
    let flag = 1;
    game.taskPlayAnim(alt.Player.local.scriptID, 'amb@prop_human_bum_bin@base', 'base', 8.0, 1.0, -1, flag, 0, 0, 0, 0);
});



//interrupt item timeouts.
alt.on('keyup', (key) => {
    if(key == 0x57 || key == 0x41 || key == 0x53 || key == 0x44) { //if WASD
        if(alt.Player.local.getSyncedMeta('itemUseActiveTimeout')) {
            alt.emitServer('itemuse:interruptTimeout');
        }
    }
});