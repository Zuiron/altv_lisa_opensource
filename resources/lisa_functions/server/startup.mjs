import * as alt from "alt";
import chat from "chat";
import * as dbstore from "lisa_dbstore";
import * as extended from 'altv-extended';

alt.on('playerConnect', (player) => {
    extended.SetupExportsForPlayer(player);
});

export function Distance(vector1, vector2) {
	if (vector1 === undefined || vector2 === undefined) {
		throw new Error('AddVector => vector1 or vector2 is undefined');
	}

	return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2));
}

export function GetPlayersInRange(pos, range) {
	if (pos === undefined || range === undefined) {
		throw new Error('GetPlayersInRange => pos or range is undefined');
	}
    
	var inRange = [];
    
	alt.Player.all.forEach((value) => {
		if (Distance(pos, value.pos) > range)
			return;
		inRange.push(value);
	});

	return inRange;
}

export function GetVehiclesInRange(pos, range) {
	if (pos === undefined || range === undefined) {
		throw new Error('GetVehiclesInRange => pos or range is undefined');
	}
    
	var inRange = [];
    
	alt.Vehicle.all.forEach((value) => {
		if (Distance(pos, value.pos) > range)
			return;
		inRange.push(value);
	});

	return inRange;
}

export function IsAnyVehicleInRange(pos, range, dimension) {
	if (pos === undefined || range === undefined) {
		throw new Error('IsAnyVehicleInRange => pos or range is undefined');
	}
	if(dimension === undefined) { //assume we dont need to check dimension. setting to 0.
		dimension = 0;
	}
    
	var inRange = false;
    
	alt.Vehicle.all.forEach((value) => {
		if (Distance(pos, value.pos) > range)
			return; //too far away.
		
		if(value.dimension == dimension) {
			inRange = true; //detected in range
			console.log("we saw a vehicle in range!");
		}
	});

	return inRange;
}

var LastUsedVehicle = [];
alt.on('playerEnteredVehicle', (player, vehicle, seat) => {
	LastUsedVehicle[player.id] = vehicle;
});

export function getLastUsedVehicle(player) {
	if(LastUsedVehicle[player.id] != undefined) {
		return LastUsedVehicle[player.id];
	}
}

/*
chat.registerCmd("test", (player, args) => {
	let test = IsAnyVehicleInRange(player.pos, 2, player.dimension); //5 as range is perfect for vehicle exit garage distance/range.
	chat.send(player, `func says: ${test}`);
});
*/



export function getClosestVehicleFromPos(pos) {
	var currentClosestVehicle = false;
    
	alt.Vehicle.all.forEach((vehicle) => {
        let dist_nextveh = Distance(pos, vehicle.pos);
		if (dist_nextveh < 100) {
            if(!currentClosestVehicle) {
                currentClosestVehicle = vehicle;
            }
            else {
                let dist_prev = Distance(pos, currentClosestVehicle.pos);
                if(dist_nextveh < dist_prev) {
                    currentClosestVehicle = vehicle;
                }
            }
        }
	});

	return currentClosestVehicle;
}

//working.
chat.registerCmd("closestveh", (player) => {
	player.forwardVector((result) => {
		let distance = 2;
		var pos = {
			x: player.pos.x + result.x * distance,
			y: player.pos.y + result.y * distance,
			z: player.pos.z + result.z * distance
		}
		let veh = getClosestVehicleFromPos(pos);

		console.log(JSON.stringify(veh));
		if(!veh) {
			console.log('no vehicles within 100 distance');
		}
		else {
			console.log(JSON.stringify(veh.pos));
			alt.emitClient(player, 'LisaFunc:blinkVehicle', veh);
		}
	});
});


















chat.registerCmd("forward", (player) => {
	player.forwardVector((result) => {
		let distance = 4;
		var pos = {
			x: player.pos.x + result.x * distance,
			y: player.pos.y + result.y * distance,
			z: player.pos.z + result.z * distance
		}
		alt.emitClient(player, 'LisaFunc:tempObj', pos);
	});
});