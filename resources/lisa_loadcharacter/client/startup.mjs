import * as alt from "alt";
import * as game from "natives";
import * as clientitemuse from "client/clientitemuse.mjs";

import {
    ENTITY_STREAM_IN_EVENT, 
    ENTITY_STREAM_OUT_EVENT
} from "altmp-js-network-streamer";

var inventorygui = new alt.WebView("http://resource/client/inventory_gui/index.html");
var alwaysgui = new alt.WebView("http://resource/client/always_gui/index.html");

var mouseon = false;
var isfullviewon = false;

alt.onServer("maxAllStats", () => {
    //Set "all" stats to 100 for SP2 (Trevor) - trevor is SP2   
    game.statSetInt(game.getHashKey("SP2_SPECIAL_ABILITY_UNLOCKED") , 100, true);
    game.statSetInt(game.getHashKey("SP2_STAMINA") , 100, true);
    game.statSetInt(game.getHashKey("SP2_STEALTH_ABILITY") , 100, true);
    game.statSetInt(game.getHashKey("SP2_LUNG_CAPACITY") , 100, true);
    game.statSetInt(game.getHashKey("SP2_FLYING_ABILITY") , 100, true);
    game.statSetInt(game.getHashKey("SP2_SHOOTING_ABILITY") , 100, true);
    game.statSetInt(game.getHashKey("SP2_STRENGTH") , 100, true);
    game.statSetInt(game.getHashKey("SP2_WHEELIE_ABILITY") , 100, true);
    alt.log("yay, max stats achieved!");
});

alt.onServer("spawnWhenSwitchHasEnded", (pos) => {
    var checkIfLoaded = alt.setInterval(function() {
        let WL = game.isPlayerSwitchInProgress();
        if(!WL) { //no longer switching, end interval and spawn correct position..
            alt.log("switching ended, setting coords!");
            game.setEntityCoords(alt.Player.local.scriptID, pos.x, pos.y, pos.z, 0, 0, 0, 0);
            alt.emitServer("mySwitchingIsEnded");

            alt.clearInterval(checkIfLoaded);
        } else { alt.log("still switching..."); game.setEntityCoords(alt.Player.local.scriptID, pos.x, pos.y, pos.z, 0, 0, 0, 0); game.setEntityAlpha(alt.Player.local.scriptID, 0, false); }
    }, 250); //was 1000. better now?
});

alt.onServer("loadAnimDicts", () => {
    game.requestAnimDict('friends@grifing@vehicle@franklin');
    game.requestAnimDict('mp_player_intdrink');
    game.requestAnimDict('mp_player_inteat@burger');
});

//from inventory gui
inventorygui.on('onRequestEquip', (invid) => {
    alt.emitServer('onRequestEquip', invid);
});
inventorygui.on('onRequestUnEquip', (invid) => {
    alt.emitServer('onRequestUnEquip', invid);
});
inventorygui.on('onRequestUse', (invid) => {
    alt.emitServer('onRequestUse', invid);
});
inventorygui.on('onRequestDrop', (invid) => {
    alt.emitServer('onRequestDrop', invid);
});
inventorygui.on('onRequestPickup', (invid) => {
    alt.emitServer('onRequestPickup', invid);
});
//--------------------


//recieve from server

alt.onServer("energy", (energy) => {
    alwaysgui.emit('energy', energy);
});

alt.onServer("hunger", (hunger) => {
    alwaysgui.emit('hunger', hunger);
});

alt.onServer("thirst", (thirst) => {
    alwaysgui.emit('thirst', thirst);
});

alt.onServer("updateInvDurability", (invenid, newdura, duraintcur, duraintmax, duraintnew) => {
    inventorygui.emit('updateInvDurability', invenid, newdura, duraintcur, duraintmax, duraintnew);
});

alt.onServer("constructCharacterInventoryItem", (invenid, itemid, itemname, itemdesc, itemdesclong, durability, use, equip, unequip, drop, icon) => {
    inventorygui.emit('constructCharacterInventoryItem', invenid, itemid, itemname, itemdesc, itemdesclong, durability, use, equip, unequip, drop, icon);
    
    alt.emitServer('inventory:reCalcWearWeight');
});

alt.onServer("constructCharacterEquippedItem", (invenid, itemid, slot, itemname, itemdesc, itemdesclong, durability, unequip, icon) => {
    inventorygui.emit('constructCharacterEquippedItem', invenid, itemid, slot, itemname, itemdesc, itemdesclong, durability, unequip, icon);

    alt.emitServer('inventory:reCalcWearWeight');
});

alt.onServer("removeItemFromCharacterInventory", (invenid) => {
    inventorygui.emit('removeItemFromCharacterInventory', invenid);

    alt.emitServer('inventory:reCalcWearWeight');
});

alt.onServer("removeItemFromCharacterEquippedInventory", (invenid) => {
    inventorygui.emit('removeItemFromCharacterEquippedInventory', invenid);

    alt.emitServer('inventory:reCalcWearWeight');
});

var blockInventory = false;
alt.onServer("blockInventory", (toggle) => {
    blockInventory = toggle;

    //close if open.
    if(blockInventory) {
        if(isfullviewon) { //if inventory open, close it.
            inventorygui.emit('toggleInventoryFullView');
            isfullviewon = false;
        }
        if(mouseon) { //if mouse on, turn off.
            inventorygui.unfocus();
            alt.showCursor(false);
            mouseon = false;
        }
    } else {
        alt.emit('enableChat');
        alwaysgui.emit('toggleAlwaysGui', true); //display alwaysgui, hunger thirst thingy.
        game.displayHud(true);
        if(alt.Player.local.vehicle != null) {
            alt.emit("togglevehiclegui", true);
            game.displayRadar(true);
        }
    }
});

alt.onServer("lisa_loadcharacter", (arg1, evalcode) => {
    if(arg1 == "runEval") {
        eval(evalcode);
    }
});
//--------------------
/*
var isshiftheld = false;
alt.on('keydown', (key) => {
    if (key == 0x10) { //shift
        isshiftheld = true;
    }
});

var charinvennearbypane = false;
var charequipaneasd = false;
*/
//TODO only activate mouse if any panes are on.

//toggleInventoryFullView

alt.on('keyup', (key) => {
    if (key == "220" && blockInventory == false) { // 220 | "tilde?" key. opens inventory.
        inventorygui.emit('toggleInventoryFullView');
        if(isfullviewon) {
            if(mouseon) {
                inventorygui.unfocus();
                alt.showCursor(false);
                mouseon = false;
            }
            //game.transitionFromBlurred(250); //on closing inventory
            alt.emit('enableChat');
        } 
        else { //game.transitionToBlurred(450); //on opening inventory
            alt.emit('disableChat');
        }
        isfullviewon = !isfullviewon;

        if(!isfullviewon) {
            alwaysgui.emit('toggleAlwaysGui', true); //display alwaysgui, hunger thirst thingy.
            game.displayHud(true);
            if(alt.Player.local.vehicle != null) {
                alt.emit("togglevehiclegui", true);
                game.displayRadar(true);
            }
        } else { 
            alwaysgui.emit('toggleAlwaysGui', false); //hide alwaysgui, hunger thirst thingy.
            game.displayHud(false);
            game.displayRadar(false);
            alt.emit("togglevehiclegui", false);
        }
    }
});

alt.on('updateInventoryLisaValue', (lisaid, value) => {
    inventorygui.emit('updateInventoryLisaValue', lisaid, value);
});
alt.onServer("updateInventoryLisaValue", (lisaid, value) => {
    inventorygui.emit('updateInventoryLisaValue', lisaid, value);
});

alt.onServer('setCashBalance', (value) => {
    inventorygui.emit('updateInventoryLisaValue', 'actual_money_value', Number(value).toFixed(2));
    alt.log('got setCashBalance from srv in inventory_gui, setting value '+value);
});


alt.onServer("toggleAlwaysGui", (toggle) => {
    alwaysgui.emit('toggleAlwaysGui', toggle);
});

alt.on('keyup', (key) => {
    if (key == 0x12) { //alt
        if(isfullviewon) {
            if(!mouseon) {
                inventorygui.focus();
                alt.showCursor(true);
                mouseon = true;
            } else {
                inventorygui.unfocus();
                alt.showCursor(false);
                mouseon = false;
            }
        }
    }
});

/*
alt.on('keyup', (key) => {
    if (key == 0x12) { //alt
        if(charinvennearbypane) { //only continue if charinven is open. - or any other like chartab. third tab is target and inv dependant.
            if(!isshiftheld) { //disable if shift is held.
                if(!mouseon) {
                    inventorygui.focus();
                    alt.showCursor(true);
                    mouseon = true;
                } else {
                    inventorygui.unfocus();
                    alt.showCursor(false);
                    mouseon = false;
                }
            }
        } else {
            if(mouseon) { //if we opened inven, then mouseon then close inven, mouse cant turn off. this fix.
                alt.showCursor(false);
                mouseon = false;
            }
        }
    }
});
*/

alt.setInterval(() => {
    if(mouseon) {
        //game.showCursorThisFrame(); //dont need this anymore...
        //game.disableAllControlActions(2); //2 disables both 0 and 1 - 0 mouse and keyboard. 1 gamepad

        //this only disables melee hit left click and mouse camera movement.
        game.disableControlAction(0, 1, true); //-- LookLeftRight
        game.disableControlAction(0, 2, true); //-- LookUpDown
        game.disableControlAction(0, 14, true); //scroll wep
        game.disableControlAction(0, 15, true); //scroll wep
        game.disableControlAction(0, 16, true); //scroll wep
        game.disableControlAction(0, 17, true); //scroll wep
        game.disableControlAction(0, 85, true); //radio wheel in vehicle
        game.disableControlAction(0, 99, true); //scroll wep
        game.disableControlAction(0, 142, true); //-- MeleeAttackAlternate
        game.disableControlAction(0, 106, true); //-- VehicleMouseControlOverride

        //disable all right clicking.
        game.disableControlAction(0, 347, true);
        game.disableControlAction(0, 330, true);
        game.disableControlAction(0, 331, true);
        game.disableControlAction(0, 225, true);
        game.disableControlAction(0, 222, true);
        game.disableControlAction(0, 114, true);
        game.disableControlAction(0, 91, true);
        game.disableControlAction(0, 70, true);
        game.disableControlAction(0, 68, true);
        game.disableControlAction(0, 25, true);
        game.disableControlAction(0, 6, true);
    }
}, 0);
/*
alt.on('keyup', (key) => {
    if (key == 0x49) { //i
        //open inventory only - charinvennearbypane
        inventorygui.emit('togglepane', 'charinvennearbypane');
        charinvennearbypane = !charinvennearbypane;
    }
    else if(key == 0x10) { //shift
        isshiftheld = false;
    }
    else if (key == 0x43) { //c
        if(isshiftheld) { //open inventory also. shift+c
            if(!charinvennearbypane) { //if inven off, turn on
                inventorygui.emit('togglepane', 'charinvennearbypane');
                charinvennearbypane = !charinvennearbypane;
                if(!charequipaneasd) {
                    inventorygui.emit('togglepane', 'charequipane');
                    charequipaneasd = !charequipaneasd;
                }
            }
            else {
                inventorygui.emit('togglepane', 'charinvennearbypane');
                charinvennearbypane = !charinvennearbypane;
                if(charequipaneasd) {
                    inventorygui.emit('togglepane', 'charequipane');
                    charequipaneasd = !charequipaneasd;
                }
            }
        }
        else { //only open character equipment view
            inventorygui.emit('togglepane', 'charequipane');
            charequipaneasd = !charequipaneasd;
        }
    }
});
*/




//let pos = alt.Player.local.pos;
let zoneNamesShort = ["AIRP","ALAMO","ALTA","ARMYB","BANHAMC","BANNING","BEACH","BHAMCA","BRADP","BRADT","BURTON","CALAFB","CANNY","CCREAK","CHAMH","CHIL","CHU","CMSW","CYPRE","DAVIS","DELBE",
"DELPE","DELSOL","DESRT","DOWNT","DTVINE", "EAST_V","EBURO","ELGORL","ELYSIAN","GALFISH","GOLF","GRAPES","GREATC","HARMO","HAWICK","HORS","HUMLAB","JAIL","KOREAT","LACT","LAGO","LDAM","LEGSQU",
"LMESA","LOSPUER","MIRR","MORN","MOVIE","MTCHIL","MTGORDO", "MTJOSE","MURRI","NCHU","NOOSE","OCEANA","PALCOV","PALETO","PALFOR","PALHIGH","PALMPOW","PBLUFF","PBOX","PROCOB","RANCHO","RGLEN",
"RICHM","ROCKF","RTRAK","SANAND","SANCHIA","SANDY","SKID","SLAB","STAD","STRAW", "TATAMO","TERMINA","TEXTI","TONGVAH","TONGVAV","VCANA","VESP","VINE","WINDF","WVINE","ZANCUDO","ZP_ORT","ZQ_UAR"];
let zoneNames = ["Los Santos International Airport","Alamo Sea","Alta","Fort Zancudo","Banham Canyon Dr","Banning","Vespucci Beach","Banham Canyon","Braddock Pass","Braddock Tunnel","Burton",
"Calafia Bridge","Raton Canyon","Cassidy Creek","Chamberlain Hills","Vinewood Hills","Chumash","Chiliad Mountain State Wilderness","Cypress Flats","Davis","Del Perro Beach","Del Perro",
"La Puerta","Grand Senora Desert","Downtown","Downtown Vinewood","East Vinewood","El Burro Heights","El Gordo Lighthouse","Elysian Island","Galilee","GWC and Golfing Society","Grapeseed",
"Great Chaparral","Harmony","Hawick","Vinewood Racetrack","Humane Labs and Research","Bolingbroke Penitentiary","Little Seoul","Land Act Reservoir","Lago Zancudo","Land Act Dam","Legion Square",
"La Mesa","La Puerta","Mirror Park","Morningwood","Richards Majestic","Mount Chiliad","Mount Gordo","Mount Josiah","Murrieta Heights","North Chumash","N.O.O.S.E","Pacific Ocean","Paleto Cove",
"Paleto Bay","Paleto Forest","Palomino Highlands","Palmer-Taylor Power Station","Pacific Bluffs","Pillbox Hill","Procopio Beach","Rancho","Richman Glen","Richman","Rockford Hills","Redwood Lights Track",
"San Andreas","San Chianski Mountain Range","Sandy Shores","Mission Row","Stab City","Maze Bank Arena","Strawberry","Tataviam Mountains","Terminal","Textile City","Tongva Hills","Tongva Valley",
"Vespucci Canals","Vespucci","Vinewood","Ron Alternates Wind Farm","West Vinewood","Zancudo River","Port of South Los Santos","Davis Quartz"];
alt.setInterval(() => {
    let pos = alt.Player.local.pos;
    let [bol, _1, _2] = game.getStreetNameAtCoord(pos.x, pos.y, pos.z);
    let str1 = game.getStreetNameFromHashKey(_1);
    let str2 = game.getStreetNameFromHashKey(_2);

    let zoneName = game.getNameOfZone(pos.x, pos.y, pos.z);
    let realZoneName = zoneName;
    if(zoneNamesShort.includes(zoneName)) {
        let zoneID = zoneNamesShort.indexOf(zoneName);
        realZoneName = zoneNames[zoneID];
    }

    //alt.log(str1+', '+str2+', '+realZoneName);
    let realstr = '';
    if(str1 != '') { realstr += str1; }
    realstr += ', '+realZoneName;
    if(str2 != '') { realstr += ', '+str2; }

    //alwaysgui.emit('setAreaZoneNames', str1+', '+str2+', '+realZoneName);
    alwaysgui.emit('setAreaZoneNames', realstr);
}, 1500);


function getDegreeName(d) {
    if (typeof d !== 'number' || isNaN(d)) {
        return -1;
    }

    // keep within the range: 0 <= d < 360
    d = d % 360;

    if (11.25 <= d && d < 33.75) {
        return "NNE";
    } else if (33.75 <= d && d < 56.25) {
        return "NE";
    } else if (56.25 <= d && d < 78.75) {
        return "ENE";
    } else if (78.75 <= d && d < 101.25) {
        return "E";
    } else if (101.25 <= d && d < 123.75) {
        return "ESE";
    } else if (123.75 <= d && d < 146.25) {
        return "SE";
    } else if (146.25 <= d && d < 168.75) {
        return "SSE";
    } else if (168.75 <= d && d < 191.25) {
        return "S";
    } else if (191.25 <= d && d < 213.75) {
        return "SSW";
    } else if (213.75 <= d && d < 236.25) {
        return "SW";
    } else if (236.25 <= d && d < 258.75) {
        return "WSW";
    } else if (258.75 <= d && d < 281.25) {
        return "W";
    } else if (281.25 <= d && d < 303.75) {
        return "WNW";
    } else if (303.75 <= d && d < 326.25) {
        return "NW";
    } else if (326.25 <= d && d < 348.75) {
        return "NNW";
    } else {
        return "N";
    }
};

alt.setInterval(() => {
    let heading = game.getEntityHeading(alt.Player.local.scriptID);
    let h2n = getDegreeName(heading);
    alwaysgui.emit('setCompass', h2n);
}, 500);

/* hide radar if not in vehicle. */
alt.setInterval(() => {
    if(isfullviewon)
        return;
    
    const radarstatus = game.isMinimapRendering();
    if(alt.Player.local.vehicle == null) {
        if(radarstatus) {
            game.displayRadar(false);
            alwaysgui.emit('pushEnergyBar', 'down');
        }
    } else { 
        if(!radarstatus) {
            game.displayRadar(true);
            alwaysgui.emit('pushEnergyBar', 'up');
        }
    }
}, 1000);












const PICKUPRANGE = 4;
let nearbyItems = {};
let nearbyItemsProp = {};

alt.onServer(
    ENTITY_STREAM_IN_EVENT,
    (entity) => {
        if(entity.data.type === 'DROPPED_ITEM') {
            alt.log("Item should be spawned. (TODO)");

            alt.log('dropitem obj: '+JSON.stringify(entity.data.itemdata)); //item object
            alt.log('dropitem id: '+JSON.stringify(entity.id)); //same as on serverside.
            alt.log('dropitem prop: '+entity.data.prop);

            nearbyItems[entity.id] = {
                entity: entity
            };

            let itemPropObj = game.createObject(game.getHashKey(entity.data.prop), entity.pos.x, entity.pos.y, entity.pos.z, false, false, false);
            game.placeObjectOnGroundProperly(itemPropObj);
            game.setEntityCollision(itemPropObj, false, false); //disable interactive physics/collision.
            //game.setEntityNoCollisionEntity(itemPropObj, alt.Player.local.scriptID, false);
            nearbyItemsProp[entity.id] = {
                obj: itemPropObj
            };
        }
    }
);

alt.onServer(
    ENTITY_STREAM_OUT_EVENT,
    (entity) => {
        if(entity.data.type === 'DROPPED_ITEM') {
            alt.log("Item should be despawned. (TODO)");
            alt.log(JSON.stringify(entity.data.itemdata));

            inventorygui.emit('removeItemFromNearbyItems', entity.id);

            game.deleteObject(nearbyItemsProp[entity.id].obj);

            delete nearbyItems[entity.id];
        }
    }
);

function drawText(msg, x, y, scale, fontType, r, g, b, a, useOutline = true, useDropShadow = true) {
    game.beginTextCommandDisplayText('STRING');
    game.addTextComponentSubstringPlayerName(msg);
    game.setTextFont(fontType);
    game.setTextScale(1, scale);
    game.setTextWrap(0.0, 1.0);
    game.setTextCentre(true);
    game.setTextColour(r, g, b, a);

    if (useOutline)
        game.setTextOutline();

    if (useDropShadow)
        game.setTextDropShadow();

    game.endTextCommandDisplayText(x, y);
}

//draw plates over items in list.
alt.setInterval(() => {
    let N1 = Object.keys(nearbyItems);
    let N2 = Object.values(nearbyItems);
    for (let index = 0; index < N1.length; index++) {
        //const element = array[index];
        let ipos = N2[index].entity.pos;
        
        let distanceFromLocal = distance(alt.Player.local.pos, {x: ipos.x, y: ipos.y, z: ipos.z});
        if (distanceFromLocal >= 400)
            return;
        
        let result = game.getScreenCoordFromWorldCoord(ipos.x, ipos.y, ipos.z - 0.1, undefined, undefined);
        if (!result[0])
            return;

        let scale = distanceFromLocal / 25;
        if (scale < 0.5) {
            scale = 0.5;
        }

        if (scale > 0.6)
            scale = 0.6;

        let yModifier = (distanceFromLocal / 25) / 8;
        if (yModifier > 0.05)
            yModifier = 0.05;

        //let y = result[2] - yModifier; //fuck this
        let y = result[2];

        if (y <= 0)
            y = 0;

        let name2draw = N2[index].entity.data.itemname; //fixes itemnames with html.
        let name2draw2 = name2draw.replace(/<[^>]+>/g, '');

        let fontType = 6; //6
        drawText(`${name2draw2}`, result[1], y, 0.3, fontType, 255, 255, 255, 255, true, false);
    }
}, 0);

function distance(distOne, distTwo) {
    let distSqr = Math.pow(distOne.x - distTwo.x, 2) + Math.pow(distOne.y - distTwo.y, 2) + Math.pow(distOne.z - distTwo.z, 2);
    return distSqr;
}

alt.setInterval(() => {
    const keys = Object.keys(nearbyItems);
    const values = Object.values(nearbyItems);

    //alt.log('pickup range-------------------------------------');
    for (let index = 0; index < keys.length; index++) {

        if(distance(values[index].entity.pos, alt.Player.local.pos) > PICKUPRANGE) {
            inventorygui.emit('removeItemFromNearbyItems', values[index].entity.id);

            continue;
        }
        
        //in range, send to inventory gui as pickupable.
        let invenid = values[index].entity.id;
        let itemid = values[index].entity.data.itemid;
        let itemname = values[index].entity.data.itemname;
        let itemdesc = values[index].entity.data.itemdesc;
        let itemdesc2 = values[index].entity.data.itemdesc2;
        let itemicon = values[index].entity.data.itemicon;

        //                                        invenid, itemid,  itemname,   itemdesc, itemdesclng,  icon
        inventorygui.emit('constructDroppedItem', invenid, itemid, itemname, itemdesc, itemdesc2, itemicon);
        alt.log('dropID: '+values[index].entity.id+', '+JSON.stringify(values[index].entity.data.itemdata));
    }
    //alt.log('pickup range end---------------------------------');
}, 1000);