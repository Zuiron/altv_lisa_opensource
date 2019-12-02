import * as alt from "alt";
import * as game from "natives";

alt.onServer("LF_PutPlayerInVehicle", (vehicle) => { //TODO FIX NOT WORKING...
    //var lastveh = game.getPlayersLastVehicle();
    game.setPedIntoVehicle(alt.Player.local.scriptID, vehicle.scriptID, -1);
    console.log('attempting to put player in last vehicle.');
});

// Fade Out Screen
alt.onServer('fadeOutScreen', (state, time) => {
	if (state) {
		game.doScreenFadeOut(time);
	} else {
		game.doScreenFadeIn(time);
	}
});

// Blur Out Screen
alt.onServer('blurOutScreen', (state, time) => {
	if (state) {
		game.transitionToBlurred(time);
	} else {
		game.transitionFromBlurred(time);
	}
});

alt.onServer('freezePlayer', (state) => {
	game.freezeEntityPosition(alt.Player.local.scriptID, state);
});







var Blips_storage = [];
function createBLIP(x, y, z, sprite, color, scale, shortrange, name) {
    let blip = game.addBlipForCoord(x, y, z);
    game.setBlipSprite(blip, sprite);
    game.setBlipColour(blip, color);
    game.setBlipScale(blip, scale);
    game.setBlipAsShortRange(blip, shortrange);
    game.beginTextCommandSetBlipName('STRING');
    game.addTextComponentSubstringPlayerName(name);
    game.endTextCommandSetBlipName(blip);
    Blips_storage.push(blip);
}

var Blips = [];
alt.onServer("createStartupBlip", (blip) => {
    Blips.push(blip);
});
alt.on("createStartupBlip", (blip) => {
    Blips.push(blip);
});

function createStartupBlip(blip) { //static ones. straight from here.
    Blips.push(blip);
}
//alt.emitClient(player, "createStartupBlip", markerPositions[i]);
//createBLIP(649.6879272460938, -10.61538314819336, 82.778076171875, 526, 4, 1, true, "Vinewood Police Station");

alt.onServer("renderStartupBlips", () => {
    //render on map
    for(var i = 0; i < Blips.length; i++) {
        createBLIP(Blips[i].x, Blips[i].y, Blips[i].z, Blips[i].sprite, Blips[i].color, Blips[i].scale, Blips[i].shortrange, Blips[i].name);
	}
	alt.log("rendered startup blips.");
});

alt.on("clientMapIsNowReady", () => {
    for(var i = 0; i < Blips.length; i++) {
        alt.emit("addLandmarkUsingInGameCoords", Blips[i].x, Blips[i].y, Blips[i].z, "blip_"+Blips[i].sprite, Blips[i].name, 0, true); //0 at all zooms.
    }
    alt.log('are we getting this?');
});

//remove blips on disconnect.
alt.on('disconnect', () => {
    for(var i = 0; i < Blips_storage.length; i++) {
        game.removeBlip(Blips_storage[i]);
    }
    alt.log('You disconnected.');
});

//STATIC BLIPS

//createBLIP(x, y, z, sprite, color, 1, true, "name");
//Police stations & prison 188 handcuffs, 526 police badge, 
createStartupBlip({x: 649.6879272460938, y: -10.61538314819336, z: 82.778076171875, sprite: 60, color: 4, scale: 0.6, shortrange: true, name: "Vinewood Police Station"});
createStartupBlip({x: -560.6505737304688, y: -134.08351135253906, z: 38.09228515625, sprite: 60, color: 4, scale: 0.6, shortrange: true, name: "Rockford Hills Police Station"});
createStartupBlip({x: -1094.5714111328125, y: -805.4637451171875, z: 19.3048095703125, sprite: 60, color: 4, scale: 0.6, shortrange: true, name: "Vespucci Police Station"});
createStartupBlip({x: 423.5208740234375, y: -979.1736450195312, z: 30.6951904296875, sprite: 60, color: 4, scale: 0.6, shortrange: true, name: "Mission Row Police Station"});
createStartupBlip({x: 818.6901245117188, y: -1290, z: 26.2974853515625, sprite: 60, color: 4, scale: 0.6, shortrange: true, name: "La Mesa Police Station"});
createStartupBlip({x: 365.8945007324219, y: -1574.3472900390625, z: 29.229248046875, sprite: 60, color: 4, scale: 0.6, shortrange: true, name: "Davis Sheriff's Station"});
createStartupBlip({x: 1857.5736083984375, y: 3679.68798828125, z: 33.761962890625, sprite: 60, color: 4, scale: 0.6, shortrange: true, name: "Sandy Shores Sheriff's Station"});
createStartupBlip({x: -438.5406494140625, y: 6021.138671875, z: 31.4871826171875, sprite: 60, color: 4, scale: 0.6, shortrange: true, name: "Paleto Bay Sheriff's Station"});
createStartupBlip({x: 1855.015380859375, y: 2585.74951171875, z: 45.6578369140625, sprite: 60, color: 4, scale: 0.6, shortrange: true, name: "Bolingbroke Penitentiary"});


//Fire stations 436 fire icon, 
createStartupBlip({x: -664.1538696289062, y: -69.5208740234375, z: 38.6483154296875, sprite: 436, color: 4, scale: 0.6, shortrange: true, name: "Rockford Hills Fire Station"});
createStartupBlip({x: 217.23956298828125, y: -1638.052734375, z: 29.4820556640625, sprite: 436, color: 4, scale: 0.6, shortrange: true, name: "Davis Fire Station"});
createStartupBlip({x: 1196.1494140625, y: -1455.82421875, z: 34.958251953125, sprite: 436, color: 4, scale: 0.6, shortrange: true, name: "El Burro Heights Fire Station"});
createStartupBlip({x: -389.3274841308594, y: 6127.37158203125, z: 31.4703369140625, sprite: 436, color: 4, scale: 0.6, shortrange: true, name: "Paleto Bay Fire Station"});
createStartupBlip({x: -1032.06591796875, y: -2387.024169921875, z: 13.9296875, sprite: 436, color: 4, scale: 0.6, shortrange: true, name: "LSIA Fire Station"});
createStartupBlip({x: -2113.305419921875, y: 2838.685791015625, z: 32.801513671875, sprite: 436, color: 4, scale: 0.6, shortrange: true, name: "Fort Zancudo Fire Station"});
createStartupBlip({x: 1699.859375, y: 3582.17138671875, z: 35.4805908203125, sprite: 436, color: 4, scale: 0.6, shortrange: true, name: "Sandy Shores Fire Station"});

//Hospitals 51 pill, 61 medical star, 621 hearth, 
createStartupBlip({x: 315.8769226074219, y: -1375.4110107421875, z: 31.908447265625, sprite: 61, color: 4, scale: 0.6, shortrange: true, name: "Central Los Santos Medical Center"});
createStartupBlip({x: -475.5560302734375, y: -338.75604248046875, z: 34.3685302734375, sprite: 61, color: 4, scale: 0.6, shortrange: true, name: "Mount Zonah Medical Center"});
createStartupBlip({x: 279.29669189453125, y: -586.087890625, z: 43.2989501953125, sprite: 61, color: 4, scale: 0.6, shortrange: true, name: "Pillbox Hill Medical Center"}); //upstairs
createStartupBlip({x: 374.00439453125, y: -595.081298828125, z: 28.824951171875, sprite: 61, color: 4, scale: 0.6, shortrange: true, name: "Pillbox Hill Medical Center"}); //downstairs
createStartupBlip({x: -233.23516845703125, y: 6314.6240234375, z: 31.4703369140625, sprite: 61, color: 4, scale: 0.6, shortrange: true, name: "Paleto Bay Care Center"});
createStartupBlip({x: 1824.3428955078125, y: 3698.953857421875, z: 33.795654296875, sprite: 61, color: 4, scale: 0.6, shortrange: true, name: "Sandy Shores Medical Center"});
//createStartupBlip(x, y, z, 61, 4, 1, true, "Eclipse Medical Tower");
//createStartupBlip(x, y, z, 61, 4, 1, true, "St. Fiacre Hospital");
//createStartupBlip(x, y, z, 61, 4, 1, true, "Portola Trinity Medical Center");
createStartupBlip({x: -1209.4813232421875, y: -1798.15380859375, z: 3.904052734375, sprite: 61, color: 4, scale: 0.6, shortrange: true, name: "Lifeguard Headquarters"});


//POI
createStartupBlip({x: 432.4087829589844, y: -645.6527709960938, z: 28.7237548828125, sprite: 513, color: 29, scale: 0.6, shortrange: true, name: "Dashound Bus Center"});



alt.onServer('LisaFunc:blinkVehicle', (veh) => {
    game.setEntityAlpha(veh.scriptID, 120, false);
    alt.setTimeout(() => { 
        game.setEntityAlpha(veh.scriptID, 255, false);
        alt.setTimeout(() => { 
            game.setEntityAlpha(veh.scriptID, 120, false);
            alt.setTimeout(() => { 
                game.setEntityAlpha(veh.scriptID, 255, false); 
            }, 150);
        }, 150);
    }, 150);
});

alt.onServer('LisaFunc:tempObj', (pos) => {
    let tempObj = game.createObject(game.getHashKey("prop_dock_float_1b"), pos.x, pos.y, pos.z, false, false, false);
    alt.setTimeout(() => {
        game.deleteObject(tempObj); 
    }, 1000);
});