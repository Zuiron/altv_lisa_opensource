import * as alt from "alt";
import * as chat from "chat";
import * as dbstore from "lisa_dbstore";
import * as lisafunc from "lisa_functions";
import * as extended from 'altv-extended';


alt.on('playerConnect', (player) => {
    extended.SetupExportsForPlayer(player);
});

export function regenThirst(player, thirst, delay, times, anim, animtype) { //500, 1000, 3 - 500 thirst every 1second, 3 times. so 500 thirst over 3seconds.
    let thirstpertimes = thirst / times;
    var counter = 0;
    var i = setInterval(function(){

        const currthirst = dbstore.CharacterValue(player.id, "Thirst");
        let newthirst = currthirst + thirstpertimes;
        //update client
        let newthirstpercent = ((newthirst - 0) * 100) / (1000 - 0);

        if(newthirstpercent >= 100 || currthirst >= 1000){
            alt.emitClient(player, "thirst", 100);
            dbstore.CharacterValue(player.id, "Thirst", 1000);
            clearInterval(i);
            return;
        }
        console.log("thirst + "+thirstpertimes);

        alt.emitClient(player, "thirst", newthirstpercent);
        dbstore.CharacterValue(player.id, "Thirst", newthirst);

        counter++;
        if(counter === times) {
            clearInterval(i);
        }
    }, delay);

    //if animation.
    if(anim != undefined) {
        if(animtype == 0) {
            alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.taskPlayAnim(alt.Player.local.scriptID, 'mp_player_intdrink', 'intro_bottle', 8.0, 1.0, -1, 48, 0, 0, 0, 0);`);
        }
    }
}

export function regenHunger(player, hunger, delay, times, anim, animtype) { //500, 1000, 3 - 500 hunger every 1second, 3 times. so 500 hunger over 3seconds.
    let hungerpertimes = hunger / times;
    var counter = 0;
    var i = setInterval(function(){

        const currhunger = dbstore.CharacterValue(player.id, "Hunger");
        let newhunger = currhunger + hungerpertimes;
        //update client
        let newhungerpercent = ((newhunger - 0) * 100) / (1000 - 0);

        if(newhungerpercent >= 100 || currhunger >= 1000){
            alt.emitClient(player, "hunger", 100);
            dbstore.CharacterValue(player.id, "Hunger", 1000);
            clearInterval(i);
            return;
        }
        console.log("hunger + "+hungerpertimes);

        alt.emitClient(player, "hunger", newhungerpercent);
        dbstore.CharacterValue(player.id, "Hunger", newhunger);

        counter++;
        if(counter === times) {
            clearInterval(i);
        }
    }, delay);

    //if animation.
    if(anim != undefined) {
        if(animtype == 0) {
            alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.taskPlayAnim(alt.Player.local.scriptID, 'mp_player_inteat@burger', 'mp_player_int_eat_burger', 8.0, 1.0, -1, 48, 0, 0, 0, 0);`);
        }
    }
}

export function regenEnergy(player, thirst, delay, times, anim, animtype) { //500, 1000, 3 - 500 thirst every 1second, 3 times. so 500 thirst over 3seconds.
    let thirstpertimes = thirst / times;
    var counter = 0;
    var i = setInterval(function(){

        const currthirst = dbstore.CharacterValue(player.id, "Energy");
        let newthirst = currthirst + thirstpertimes;
        //update client
        let newthirstpercent = ((newthirst - 0) * 100) / (1000 - 0);

        if(newthirstpercent >= 100 || currthirst >= 1000){
            alt.emitClient(player, "energy", 100);
            dbstore.CharacterValue(player.id, "Energy", 1000);
            clearInterval(i);
            return;
        }
        console.log("energy + "+thirstpertimes);

        alt.emitClient(player, "energy", newthirstpercent);
        dbstore.CharacterValue(player.id, "Energy", newthirst);

        counter++;
        if(counter === times) {
            clearInterval(i);
        }
    }, delay);

    //if animation.
    if(anim != undefined) {
        if(animtype == 0) {
            alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.taskPlayAnim(alt.Player.local.scriptID, 'mp_player_intdrink', 'intro_bottle', 8.0, 1.0, -1, 48, 0, 0, 0, 0);`);
        }
    }
}

export function vehicleRepairKit(player, mk, itemid) {
    console.log('Item-Used: vehicle repair kit, mk: '+mk);

    player.forwardVector((result) => {
		let distance = 2;
		var pos = {
			x: player.pos.x + result.x * distance,
			y: player.pos.y + result.y * distance,
			z: player.pos.z + result.z * distance
		}
		let veh = lisafunc.getClosestVehicleFromPos(pos);

		console.log(JSON.stringify(veh));
		if(!veh) {
			console.log('no vehicles within 100 distance');
		}
		else {
			console.log(JSON.stringify(veh.pos));
            alt.emitClient(player, 'LisaFunc:blinkVehicle', veh);
            

            alt.emitClient(player, 'itemuse:vehicleRepairKit', veh, mk, itemid);
		}
	});
}

alt.onClient('itemuse:interruptTimeout', (player) => {
    clearTimeout(player.itemUseTimeout);
    player.setSyncedMeta('itemUseActiveTimeout', false);

    alt.emitClient(player, 'progress:clear');
    alt.emitClient(player, 'itemuse:clearPedTasks');
    alt.emitClient(player, "blockInventory", false);
});

alt.onClient('itemuse:vehicleRepairKit', (player, mk, enginepos, cont, vehicle, itemid) => {
    if(!cont) {
        console.log('could not repair this vehicle.');
        return;
    }

    let dist2eng = lisafunc.Distance(player.pos, enginepos); //MAX 1.7
    if(dist2eng > 1.7) {
        console.log('get closer to engine.');
        return;
    }

    console.log('spawn temp object on engine pos, dist2engine: '+dist2eng);
    alt.emitClient(player, 'LisaFunc:tempObj', enginepos);

    alt.emitClient(player, 'itemuse:runRepairKitAnim', vehicle);
    alt.emitClient(player, 'progress:new', 'Repairing engine', '20', 10000, 'anim-ldsmooth');

    alt.emitClient(player, "blockInventory", true);

    player.itemUseTimeout = setTimeout(() => {
        vehicle.engineHealth = 1000;
        console.log('vehicle should be repaired?');
        alt.emitClient(player, 'itemuse:clearPedTasks');

        alt.emit('subItemUseDura', player, itemid);

        alt.emitClient(player, "blockInventory", false);
        player.setSyncedMeta('itemUseActiveTimeout', false);
    }, 10000);

    player.setSyncedMeta('itemUseActiveTimeout', true);
});