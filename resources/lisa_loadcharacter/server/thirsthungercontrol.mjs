import * as alt from "alt";
import * as chat from "chat";
import * as dbstore from "lisa_dbstore";

alt.on('playerDisconnect', (player, reason) => {
    const playertempval = dbstore.CharacterTempValue(player.id, "thirsthungercontrol");
    if(playertempval != undefined || playertempval != null) {
        dbstore.CharacterTempValue(player.id, "thirsthungercontrol", null); //remove this from script when player disconnects. this is enabled when player is finished loading.
    }
});


export function initHungerThirstControlForPlayer(player) {
    dbstore.CharacterTempValue(player.id, "thirsthungercontrol", true);
    dbstore.CharacterTempValue(player.id, "faintforplayer", false);

    const current_thirst = dbstore.CharacterValue(player.id, "Thirst");
    const current_hunger = dbstore.CharacterValue(player.id, "Hunger");

    if(current_thirst < 1) {
        dbstore.CharacterTempValue(player.id, "faintforplayer", true);
        dbstore.CharacterTempValue(player.id, "faintforplayer_t", true);
    }
    if(current_hunger < 1) {
        dbstore.CharacterTempValue(player.id, "faintforplayer", true);
        dbstore.CharacterTempValue(player.id, "faintforplayer_h", true);
    }
}
/* didnt test.
for(const player of alt.Player.all) { 
        console.log(player.name);
}
*/



//loops thrue every online player which is logged inn. --- 100% - 0% in ~2hours.
//controls thirst de-regeneration.
//lose 83 thirst every 10minutes.

var thirst_timer = setInterval(function(){ //-83 thirst per tick.
    alt.Player.all.forEach(player => {
        const playertempval = dbstore.CharacterTempValue(player.id, "thirsthungercontrol");
        if(playertempval) {
            const current_thirst = dbstore.CharacterValue(player.id, "Thirst");
            if(current_thirst >= 20) {
                const newthirst = current_thirst - 20;
                const newthirstpercent = ((newthirst - 0) * 100) / (1000 - 0);
                
                dbstore.CharacterValue(player.id, "Thirst", newthirst);
                alt.emitClient(player, "thirst", newthirstpercent);
            }
            else if(current_thirst < 20) {
                if(current_thirst != 0) {
                    dbstore.CharacterValue(player.id, "Thirst", 0);
                    alt.emitClient(player, "thirst", 0);
                }

                dbstore.CharacterTempValue(player.id, "faintforplayer", true);
                dbstore.CharacterTempValue(player.id, "faintforplayer_t", true);
            }
        }
    });
}, 600000); //10min -- 600000

//loops thrue every online player which is logged inn. --- 100% - 0% in ~4hours.
//controls hunger de-regeneration.
//lose 41 hunger every 10minutes

//if hunger is above 50%, regenerate health.

var hunger_timer = setInterval(function(){ //-41 hunger per tick.
    alt.Player.all.forEach(player => {
        const playertempval = dbstore.CharacterTempValue(player.id, "thirsthungercontrol");
        if(playertempval) {
            const current_hunger = dbstore.CharacterValue(player.id, "Hunger");
            if(current_hunger >= 25) {
                const newhunger = current_hunger - 25;
                const newhungerpercent = ((newhunger - 0) * 100) / (1000 - 0);

                dbstore.CharacterValue(player.id, "Hunger", newhunger);
                alt.emitClient(player, "hunger", newhungerpercent);
            }
            else if(current_hunger < 25) {
                if(current_hunger != 0) {
                    dbstore.CharacterValue(player.id, "Hunger", 0);
                    alt.emitClient(player, "hunger", 0);
                }

                dbstore.CharacterTempValue(player.id, "faintforplayer", true);
                dbstore.CharacterTempValue(player.id, "faintforplayer_h", true);
            }
            //regen health if hunger over 500.
            if(current_hunger >= 500) {
                if(player.health <= 190) {
                    let chp = player.health;
                    let newchp = chp + 10;
                    player.health = newchp;
                } 
            }
        }
    });
}, 600000); //10min - 600000






//loops thrue every online player which is logged inn. every 1min. check, faintforplayer for players we need to scan.
//if thirst is 0, start fainting.
//if hunger is 0, start fainting.

var fainter_timer = setInterval(function(){
    alt.Player.all.forEach(player => {
        const playertempval = dbstore.CharacterTempValue(player.id, "thirsthungercontrol");
        const isfainting = dbstore.CharacterTempValue(player.id, "faintforplayer");
        if(playertempval && isfainting) {
            const current_hunger = dbstore.CharacterValue(player.id, "Hunger");
            const current_thirst = dbstore.CharacterValue(player.id, "Thirst");
            if(current_hunger > 0) {
                dbstore.CharacterTempValue(player.id, "faintforplayer_h", false);
            }
            if(current_thirst > 0) {
                dbstore.CharacterTempValue(player.id, "faintforplayer_t", false);
            }
            if(current_thirst > 0 && current_hunger > 0) {
                dbstore.CharacterTempValue(player.id, "faintforplayer", false);
                alt.emitClient(player, "blockInventory", false);
            }
            //are we still fainting?
            const isfainting2 = dbstore.CharacterTempValue(player.id, "faintforplayer");
            if(isfainting2) {
                if(current_hunger == 0 || current_thirst == 0) {
                    //faint player, if onfoot and on bike, should fall over ragdoll mode.
                    alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.switchOutPlayer(alt.Player.local.scriptID, 0, 3);`); //cool effect.
                    alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.transitionToBlurred(5000)`);

                    //if in car, play anim. or else ragdoll.
                    if(player.vehicle != null) {
                        if(player.vehicle.wheelsCount == 4) {
                            const anim = `game.taskPlayAnim(alt.Player.local.scriptID, 'friends@grifing@vehicle@franklin', 'car_knockout_player', 8.0, 1.0, 30000, 2, 0, 0, 0, 0);`;
                            alt.emitClient(player, "lisa_loadcharacter", "runEval", anim);
                        }
                        else if(player.vehicle.wheelsCount == 2 || player.vehicle.wheelsCount == 3) {
                            alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.setPedToRagdoll(alt.Player.local.scriptID, 30000, 30000, 0, false, false, false);`);
                        }
                    }
                    else {
                        alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.setPedToRagdoll(alt.Player.local.scriptID, 30000, 30000, 0, false, false, false);`);
                    }

                    //remove controls. //remove controls, also prevents user from using vehicle.
                    alt.emitClient(player, "lisa_loadcharacter", "runEval", `alt.toggleGameControls(false);`);
                    var xtimer = setTimeout(() => {
                        //give back access to controls & inventory.
                        alt.emitClient(player, "lisa_loadcharacter", "runEval", `alt.toggleGameControls(true);`);
                        alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.transitionFromBlurred(500)`);
                        alt.emitClient(player, "blockInventory", false);
                        clearTimeout(xtimer);
                    }, 30000);

                    //we also need to block useage of inventory. somehow.
                    alt.emitClient(player, "blockInventory", true);

                    let thirst = dbstore.CharacterTempValue(player.id, "faintforplayer_t");
                    let hunger = dbstore.CharacterTempValue(player.id, "faintforplayer_h");
                    if(thirst && !hunger) {
                        chat.send(player, "You fainted from thirst. (30s)");
                        console.log(player.name + " fainted from thirst. (30s)");
                    }
                    else if(!thirst && hunger) {
                        chat.send(player, "You fainted from hunger. (30s)");
                        console.log(player.name + " fainted from hunger. (30s)");
                    }
                    else if(thirst && hunger) {
                        chat.send(player, "You fainted from thirst & hunger. (30s)");
                        console.log(player.name + " fainted from thirst & hunger. (30s)");
                    }
                }
            }
        }
    });
}, 61000); //1min1sec - 60000