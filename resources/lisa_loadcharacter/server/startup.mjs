import * as alt from "alt";
import * as chat from "chat";
import * as dbstore from "lisa_dbstore";
import * as itemstore from "lisa_itemstore";
import * as lisa_residence from "lisa_residence";
import * as itemfuncs from "./itemusefunctions.mjs";
import * as thirsthungercontrolscript from "./thirsthungercontrol.mjs";
import { createEntity, getEntityData, destroyEntity } from "altmp-js-network-streamer";

import * as extended from 'altv-extended';

alt.on('playerConnect', (player) => {
    extended.SetupExportsForPlayer(player);
});

const debug = false;

/*
                PED_VARIATION_FACE = 0,                 -not used i think (face but we use head blend data?)
                PED_VARIATION_HEAD = 1,                 --Mask
                PED_VARIATION_HAIR = 2,                 -hair
                PED_VARIATION_TORSO = 3,                -not used, think we set torso based on torso2 item. ignore this.
                PED_VARIATION_LEGS = 4,                 --Legs
                PED_VARIATION_HANDS = 5,                --Bag
                PED_VARIATION_FEET = 6,                 --Shoes
                PED_VARIATION_EYES = 7,                 --Neck - accesories, necklace, etc.
                PED_VARIATION_ACCESSORIES = 8,          -undershirt, ignore, we set this based on item torso2.
                PED_VARIATION_TASKS = 9,                -body armor, we dont use.
                PED_VARIATION_TEXTURES = 10,            -ignore
                PED_VARIATION_TORSO2 = 11               --Top

                Hats (PropID 0)                         -- we use, 12
                Glasses (PropID 1)                      -- we use, 13
                Ears (PropID 2)                         -- we use, 14
                Watches (PropID 6)                      -- we use, 15
                Bracelets (PropID 7)                    -- we use, 16
*/

const default_male = {
    0:"game.setPedComponentVariation(alt.Player.local.scriptID, 0, 0, 0, 2);",
    1:"game.setPedComponentVariation(alt.Player.local.scriptID, 1, 0, 0, 2);",
    2:"game.setPedComponentVariation(alt.Player.local.scriptID, 2, 12, 0, 2);", //hair - defaults to 12 - if durability = 0 remove users equipped hair and apply this. simulate growing and or loss of shape/style.
    3:"game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 2);",
    4:"game.setPedComponentVariation(alt.Player.local.scriptID, 4, 21, 0, 2);",
    5:"game.setPedComponentVariation(alt.Player.local.scriptID, 5, 0, 0, 2);",
    6:"game.setPedComponentVariation(alt.Player.local.scriptID, 6, 34, 0, 2);",
    7:"game.setPedComponentVariation(alt.Player.local.scriptID, 7, 0, 0, 2);",
    8:"game.setPedComponentVariation(alt.Player.local.scriptID, 8, 57, 0, 2);",
    9:"game.setPedComponentVariation(alt.Player.local.scriptID, 9, 0, 0, 2);",
    10:"game.setPedComponentVariation(alt.Player.local.scriptID, 10, 0, 0, 2);",
    11:"game.setPedComponentVariation(alt.Player.local.scriptID, 11, 15, 0, 2); game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 2);",
    12:"game.clearPedProp(alt.Player.local.scriptID, 0);",
    13:"game.clearPedProp(alt.Player.local.scriptID, 1);",
    14:"game.clearPedProp(alt.Player.local.scriptID, 2);",
    15:"game.clearPedProp(alt.Player.local.scriptID, 6);",
    16:"game.clearPedProp(alt.Player.local.scriptID, 7);",
    //props cannot be unset like this, delete all props then reset the ones equipped.
};
/*
game.setPedPropIndex(alt.Player.local.scriptID, 0, 8, 0, true); //hats
game.setPedPropIndex(alt.Player.local.scriptID, 1, 0, 0, true); //glasses
game.setPedPropIndex(alt.Player.local.scriptID, 2, 33, 0, true); //ears
game.setPedPropIndex(alt.Player.local.scriptID, 6, 2, 0, true); //watches - left wrist
game.setPedPropIndex(alt.Player.local.scriptID, 7, 7, 3, true); //bracelets - right wrist <------- only one not hidde...
*/


const default_female = {
    0:"game.setPedComponentVariation(alt.Player.local.scriptID, 0, 0, 0, 2);",
    1:"game.setPedComponentVariation(alt.Player.local.scriptID, 1, 0, 0, 2);",
    2:"game.setPedComponentVariation(alt.Player.local.scriptID, 2, 16, 0, 2);", //default hair
    3:"game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 2);",
    4:"game.setPedComponentVariation(alt.Player.local.scriptID, 4, 21, 0, 2);", //game.setPedComponentVariation(alt.Player.local.scriptID, 4, 21, 0, 2); //now actually nude is- 4, 21 with mod. default 4, 15, 0, 2
    5:"game.setPedComponentVariation(alt.Player.local.scriptID, 5, 0, 0, 2);",
    6:"game.setPedComponentVariation(alt.Player.local.scriptID, 6, 35, 0, 2);",
    7:"game.setPedComponentVariation(alt.Player.local.scriptID, 7, 0, 0, 2);",
    8:"game.setPedComponentVariation(alt.Player.local.scriptID, 8, 2, 0, 2);",
    9:"game.setPedComponentVariation(alt.Player.local.scriptID, 9, 0, 0, 2);",
    10:"game.setPedComponentVariation(alt.Player.local.scriptID, 10, 0, 0, 2);",
    11:"game.setPedComponentVariation(alt.Player.local.scriptID, 11, 15, -1, 2); game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 2);",
    12:"game.clearPedProp(alt.Player.local.scriptID, 0);",
    13:"game.clearPedProp(alt.Player.local.scriptID, 1);",
    14:"game.clearPedProp(alt.Player.local.scriptID, 2);",
    15:"game.clearPedProp(alt.Player.local.scriptID, 6);",
    16:"game.clearPedProp(alt.Player.local.scriptID, 7);",
    //props cannot be unset like this, delete all props then reset the ones equipped.
};

/*
game.setPedComponentVariation(alt.Player.local.scriptID, 0, 0, 0, 0);
game.setPedComponentVariation(alt.Player.local.scriptID, 1, 0, 0, 0);
game.setPedComponentVariation(alt.Player.local.scriptID, 2, 16, 0, 0);
game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 0); //Torso
game.setPedComponentVariation(alt.Player.local.scriptID, 4, 21, 0, 0); //Legs
game.setPedComponentVariation(alt.Player.local.scriptID, 5, 0, 0, 0);
game.setPedComponentVariation(alt.Player.local.scriptID, 6, 35, 0, 0);
game.setPedComponentVariation(alt.Player.local.scriptID, 7, 0, 0, 0);
game.setPedComponentVariation(alt.Player.local.scriptID, 8, 34, 0, 0);
game.setPedComponentVariation(alt.Player.local.scriptID, 9, 34, 0, 0);
game.setPedComponentVariation(alt.Player.local.scriptID, 10, 0, 0, 0);
game.setPedComponentVariation(alt.Player.local.scriptID, 11, 82, 0, 0); 
//game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 2);
*/

function loadEquippedInventory(player) {
    //loop thrue player's equipped stuff.. remember do json.parse first. stored as string in mariadb.
    const equipped = JSON.parse(dbstore.CharacterValue(player.id, "Equipped"));
    const gender = dbstore.CharacterValue(player.id, "Gender");
    
    for (var key in equipped) {
        if (equipped.hasOwnProperty(key)) {
            //console.log(key + " -> " + equipped[key]);
            if(equipped[key] != null) { //slot NOT empty.
                var eq2 = equipped[key];
                for (var key2 in eq2) {
                    if (eq2.hasOwnProperty(key2)) {
                        //console.log(key2 + " -2> " + JSON.stringify(eq2[key2]));
                        //console.log(JSON.stringify(eq2[0]) + "-" + key2);
                        
                        var key3 = eq2[key2];
                        if(key3 != null) {
                        var itemdata = itemstore.getItem(key2); //key2 is ITEMID
                            if(itemdata.equipClientEval !== undefined){
                                if(debug) { console.log(itemdata.type, itemdata.name, itemdata.desc, itemdata.equipClientEval);
                                console.log("executing client eval for player."); }
                                alt.emitClient(player, "lisa_loadcharacter", "runEval", itemdata.equipClientEval);

                                //key is SLOT - key2 ITEMID
                                var itemdesclong = itemdata.name + '<br>' + itemdata.desc + '<br>' + itemdata.desc2 + '<br>';
                                
                                var getsumshit = Object.values(eq2)[0];
                                var dura = Object.values(getsumshit)[0];
                                var duratype = Object.keys(getsumshit)[0];

                                var durability = "100";

                                if(duratype == "timedurability") {
                                    let weartimeleft = convertMinsToHrsMins(dura); //calc

                                    let percent = ((dura - 0) * 100) / (itemdata.timedurability - 0);
                                    durability = `${percent}`; //set percentage.

                                    itemdesclong += 'Wear & Tear: ' + weartimeleft + ' of weartime left.<br>Remember to clean your clothes!';
                                }
                                
                                var unequip = false;
                                if(key != 2) { unequip = true; }

                                let icon;
                                if(itemdata.icon != undefined) { icon = itemdata.icon; }

                                alt.emitClient(player, "constructCharacterEquippedItem", key, key2, itemdata.equipslot, itemdata.name, itemdata.desc, itemdesclong, durability, unequip, icon);
                            }
                        }
                    }
                }
            } else {
                //skip hair default... load from DB instead.
                if(key == 2) {
                    continue;
                }

                //if no item equipped, use defaults "NAKED"
                if(debug) { console.log(`no item in slot: ${key}, setting default...`); }
                if(gender == "Male") {
                    alt.emitClient(player, "lisa_loadcharacter", "runEval", default_male[key] );
                    if(debug) { console.log(`default male slot: ${key}: ${default_male[key]}`); }
                }
                else if(gender == "Female") {
                    alt.emitClient(player, "lisa_loadcharacter", "runEval", default_female[key] );
                    if(debug) { console.log(`default female slot: ${key}: ${default_female[key]}`); }
                }
            }
        }
    }
}

function setFreemodeModelGender(player) {
    let chargender = dbstore.CharacterValue(player.id, "Gender");
    if(chargender == "Female") {
        player.model = "mp_f_freemode_01";
    } else if(chargender == "Male") {
        player.model = "mp_m_freemode_01";
    }
}

function setPedHeadBlendData(player) {
    let a = dbstore.CharacterValue(player.id, "setPedHeadBlendData").split(", ");
    alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.setPedHeadBlendData(alt.Player.local.scriptID, ${a[0]}, ${a[1]}, ${a[2]}, ${a[3]}, ${a[4]}, ${a[5]}, ${a[6]}, ${a[7]}, ${a[8]}, ${a[9]});`);
}

function putPlayerInInteriorOrWorld(player) {
    //if user logged out in interior put inside!
    let chardata = dbstore.Character(player.id);
    //TODO if user is NOT owner of residence or has the key, put player outside door.
    if(chardata.isinsideinterior == 1 && chardata.ResidenceColType == "Residence") {
        lisa_residence.EnterPlayerToResidence(player, true);

        let dbpos = chardata.Position.split(", ");
        let pos = { x: dbpos[0], y: dbpos[1], z: dbpos[2] };
        alt.emitClient(player, "spawnWhenSwitchHasEnded", pos);
        if(debug) { console.log("putting player in residence..."); }
    } else {
        //if we are not in any type of interior we just set the actual world pos.
        let dbpos = chardata.Position.split(", ");
        //load scene. causes issues?
        alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.loadScene(${dbpos[0]}, ${dbpos[1]}, ${dbpos[2]});`);
        //----------
        let pos = { x: dbpos[0], y: dbpos[1], z: dbpos[2] };
        player.pos = pos; //TEST AREA 1376.16259765625, -596.3340454101562, 74.3363037109375
        player.dimension = chardata.Dimension;
        if(debug) { console.log("putting player in world... not in interior..."); }

        //maybe fix? set pos first but correct AFTER load.
        alt.emitClient(player, "spawnWhenSwitchHasEnded", pos);
    }
    //alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.setEntityAlpha(alt.Player.local.scriptID, 255, false);`);
}

function convertMinsToHrsMins(mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    //return `${h}:${m}`;
    return `${h} hours ${m} minutes`;
}

export function givePlayerNewItem(player, itemid) {
    if(itemstore.getItem(itemid) == undefined) {
        console.log("item with id: "+itemid+", does not exist...");
        return;
    }
    
    const rawitemdata = itemstore.getItem(itemid);
    const fromdb = dbstore.CharacterValue(player.id, "Inventory");
    const playergender = dbstore.CharacterValue(player.id, "Gender");
    const inven = JSON.parse(fromdb);

    var invenlist = Object.keys(inven);

    //find first free SLOT.
    var i = 0;
    for (i = 0; i < invenlist.length + 1; i++) { //check inventory + 1 for free slot.
        if(inven[i] != undefined) {
            continue;
        }
        else {
            //FOUND FREE SLOT, insert item here.

            console.log('found free slot, testing TODO incomplete.');

            let doesItemHaveUseDurability = false;
            let doesItemHaveTimeDurability = false;

            if(rawitemdata.timedurability != undefined) { //item has timedurability
                doesItemHaveTimeDurability = true;
            }
            if(rawitemdata.usedurability != undefined) { //item has usedurability
                doesItemHaveUseDurability = true;
            }

            console.log('|-- inventory before change --|');
            console.log(JSON.stringify(inven));
            console.log('|-----------------------------|');

            let item = {};
            item[itemid] = {};

            if(doesItemHaveUseDurability) {
                //inven[i] = {itemid:{"usedurability":rawitemdata.usedurability}};
                //let item = {};
                item[itemid] = {"usedurability":rawitemdata.usedurability};
                //inven[i] = item;
            }
            else if(doesItemHaveTimeDurability) {
                //inven[i] = {itemid:{"timedurability":rawitemdata.timedurability}};
                //let item = {};
                item[itemid] = {"timedurability":rawitemdata.timedurability};
                //inven[i] = item;
            }

            inven[i] = item;

            dbstore.CharacterValue(player.id, "Inventory", JSON.stringify(inven)); //update inventory server side.

            console.log('|-- inventory after change --|');
            console.log(JSON.stringify(inven));
            console.log('|-----------------------------|');

            
            var itemdesclong = rawitemdata.name + '<br>' + rawitemdata.desc + '<br>' + rawitemdata.desc2 + '<br>';
            if(doesItemHaveUseDurability) {
                itemdesclong += 'Uses left: ' + rawitemdata.usedurability + '/' + rawitemdata.usedurability;
            }
            else if(doesItemHaveTimeDurability) {
                itemdesclong += 'Wear & Tear: ' + convertMinsToHrsMins(rawitemdata.timedurability) + ' of weartime left.<br>Remember to clean your clothes!';
            }
            
            let use = false; //is item useable?
            if(rawitemdata.useable) { use = true; }
            
            let equip = false; //can we equip this item?
            if(playergender == rawitemdata.gender || rawitemdata.gender == "Any") { equip = true; }
            
            let icon; if(rawitemdata.icon != undefined) { icon = rawitemdata.icon; } //IF item has icon value set, use this, otherwise pass undefined and we will use itemid or fallback to missing icon.
            
            alt.emitClient(player, "constructCharacterInventoryItem", i, itemid, rawitemdata.name, rawitemdata.desc, itemdesclong, "100", use, equip, false, true, icon); //update client.
            //                                                                   invenid, itemid, itemname, itemdesc, itemdesclong, durability, use, equip, unequip, drop, icon

            let name2display = rawitemdata.name.replace(/<[^>]+>/g, '');
            //player.showSubtitle(`You Received Item: ${name2display}`, 5000); //this is ugly AF...
            //let itemimg = `<img src="../../../lisa_loadcharacter/client/inventory_gui/icons/${itemid}.png" height="40px">`;
            let itemimg = `<img src="http://assets/lisa-assets/assets/icons/${itemid}.png" height="40px">`;
            alt.emitClient(player, 'notify:msg', `You received an item. <br>${itemimg} [${name2display}]`, 5000, '#FFF', 'rgba(0,0,0,0.60)', '#ffb34b');

            break;
        }
    }
}

chat.registerCmd("getitem", (player, args) => {
    if (args.length != 1) {
        chat.send(player, "{FF0000} /getitem [itemid]");
        return;
    }
    
    givePlayerNewItem(player, args[0]);
});

function constructCharacterInventory(player) { //TODO INCOMPLETE TOO TIRED
    
    //just for debugging
    //const fromdb = '{"0":{"0":{"usedurability":5}},"1":{"0":{"usedurability":3}},"2":{"0":{"usedurability":1}}}';
    const fromdb = dbstore.CharacterValue(player.id, "Inventory");
    const inven = JSON.parse(fromdb);

    var items2 = Object.keys(inven);

    //just for debugging
    //console.clear();

    for (const invid of items2) {
    const item = inven[`${invid}`];
    const itemid = Object.keys(item)[0];
    
    const itemvaluekeys = Object.keys(item[`${itemid}`]);
    const itemvalues = Object.values(item[`${itemid}`]);
    
    var durability = "100"; //100 to disable durabilitybar
    var doesItemHaveUseDurability = false;
    var useduracurr = '';
    var useduramax = '';

    var doesItemHaveTimeDurability = false;
    var timedurcurr = '';
    var timedurmax = '';

    const rawitemdata = itemstore.getItem(itemid);
    
    const itemname = rawitemdata.name;
    const itemdesc = rawitemdata.desc;
    const itemdesc2 = rawitemdata.desc2;

    var use = false;
    var equip = false;
    var unequip = false;
    var drop = true;

    const playergender = dbstore.CharacterValue(player.id, "Gender");

    if(rawitemdata.useable != undefined) { use = true; } //set item useable if rawitem is useable.
    if(rawitemdata.equipable != undefined && playergender == rawitemdata.gender || rawitemdata.gender == "Any") { equip = true; } //can we equip?
    
    for(let i = 0; i < itemvaluekeys.length; i++){
        if(itemvaluekeys[i] == "usedurability" ) { //if item in inven has usedurability, set durability.
            doesItemHaveUseDurability = true;
            //get max usedurability count of item from itemstore. calc durability percentage.
            const rawusedurability = rawitemdata.usedurability;     //this is the MAX durability of the item.
            const currentedurability = itemvalues[i];               //this is the current durability of the item in inventory.

            useduramax = rawusedurability;
            useduracurr = currentedurability;
            
            //calculate and shit here.
            //((input - min) * 100) / (max - min)
            var percent = ((currentedurability - 0) * 100) / (rawusedurability - 0);
            
            durability = `${percent}`; //set percentage.
        }
        else if(itemvaluekeys[i] == "durability" ) {
            //TODO calculate durability
        }
        if(itemvaluekeys[i] == "timedurability" ) { //IF only, this ALWAYS goes into the longdesc data.
            //TODO calculate timedurability
            //timedurability = lose durability based on time played. 1point per minute. 2880 points would be ~48 hours of playtime.
            doesItemHaveTimeDurability = true;

            const rawtimedurability = rawitemdata.timedurability;     //this is the MAX durability of the item.
            const currentedurability = itemvalues[i];                 //this is the current durability of the item in inventory.

            var weartimeleft = convertMinsToHrsMins(currentedurability); //calc

            let percent = ((currentedurability - 0) * 100) / (rawtimedurability - 0);
            durability = `${percent}`; //set percentage.
        }
    }
    //just for debugging
    //console.log("invid:", invid, "itemid:", itemid, "durability:", durability);


    //TOOLTIP - working
    var itemdesclong = itemname + '<br>' + itemdesc + '<br>' + itemdesc2 + '<br>';
    if(doesItemHaveUseDurability) { //item has use durability. (mostly consumeables)
        itemdesclong += 'Uses left: ' + useduracurr + '/' + useduramax;
    }
    if(doesItemHaveTimeDurability) {
        itemdesclong += 'Wear & Tear: ' + weartimeleft + ' of weartime left.<br>Remember to clean your clothes!';
    }

    //itemdesclong = 'debug testing only'; //working
    //console.log(itemdesclong);
    let icon;
    if(rawitemdata.icon != undefined) { icon = rawitemdata.icon; }

    //actually sync to players client now.
    alt.emitClient(player, "constructCharacterInventoryItem", invid, itemid, itemname, itemdesc, itemdesclong, durability, use, equip, unequip, drop, icon);
    //alt.log("constructCharacterInventoryItem", invid, itemid, itemname, itemdesc, itemdesclong, durability, use, equip, unequip, drop);
    }

    //alt.emitClient(player, "constructCharacterInventoryItem", invenid, itemid, itemname, itemdesc, itemdesclong, durability, use, equip, unequip, drop);
}

function onRequestEquip(player, invid) {
    //chat.send(player, `you requested equip for invid: ${invid}`);
    const inventory = JSON.parse(dbstore.CharacterValue(player.id, "Inventory"));
    const item = inventory[invid];

    const itemid = Object.keys(item)[0];
    const options = Object.values(item)[0];
    
    const duratype = Object.keys(options)[0]; //ex: "timedurability"
    const dura = Object.values(options)[0]; //TODO check if dura is above 0 ex: 1000

    //get itemdata
    const rawitemdata = itemstore.getItem(itemid);
    const playergender = dbstore.CharacterValue(player.id, "Gender");
    if(rawitemdata.gender != "Any") {
        if(rawitemdata.gender != playergender) {
            chat.send(player, "you cannot wear this item.");
            return;
        }
    }
    let equippedinven = JSON.parse(dbstore.CharacterValue(player.id, "Equipped"));

    //first check if there is an item here already, then unequip.
        //-----------------------------------------------------------------------------------------------------------------------------TODO
    if(equippedinven[rawitemdata.equipslot] != null) {
        chat.send(player, "you already have something equipped in this slot.");
        return;
    }
    


    //clientcode - remove from clientside.
    alt.emitClient(player, "removeItemFromCharacterInventory", invid);
    
    //servercode - remove from serverside.
    delete inventory[invid]; //remove from object.
    dbstore.CharacterValue(player.id, "Inventory", JSON.stringify(inventory)); //update inventory.


    //servercode - add to equipped serverside.
        

        //then set the item to its correct position serverside.
        
        var newinvenitem = {};
            newinvenitem[itemid] = {};
        if(duratype == "timedurability") {
            newinvenitem[itemid].timedurability = dura;
        }
        equippedinven[rawitemdata.equipslot] = newinvenitem;
        dbstore.CharacterValue(player.id, "Equipped", JSON.stringify(equippedinven));
        console.log(JSON.stringify(equippedinven));

    //clientcode - add to equipped clientside.
        //TOOLTIP - working
        var itemdesclong = rawitemdata.name + '<br>' + rawitemdata.desc + '<br>' + rawitemdata.desc2 + '<br>';
        if(duratype == "timedurability") {
            const rawtimedurability = rawitemdata.timedurability;     //this is the MAX durability of the item.
            const currentedurability = dura;                          //this is the current durability of the item in inventory.

            var weartimeleft = convertMinsToHrsMins(currentedurability); //calc

            itemdesclong += 'Wear & Tear: ' + weartimeleft + ' of weartime left.<br>Remember to clean your clothes!';

            let percent = ((currentedurability - 0) * 100) / (rawtimedurability - 0);
            var durability = `${percent}`; //set percentage.
        }
        
        let icon;
        if(rawitemdata.icon != undefined) { icon = rawitemdata.icon; }

        let unequip = false;
        if(rawitemdata.equipslot != 2) { unequip = true; } //hair cannot be unequipped.
        alt.emitClient(player, "constructCharacterEquippedItem", invid, itemid, rawitemdata.equipslot, rawitemdata.name, rawitemdata.desc, itemdesclong, durability, unequip, icon);





    //chat.send(player, "inventory is not yet synced, equipping in debug mode...");
    alt.emitClient(player, "lisa_loadcharacter", "runEval", rawitemdata.equipClientEval);
    
    console.log(`itemid: ${itemid}, dura: ${dura}`);

    //alt.emitClient(player, "lisa_loadcharacter", "runEval", 'game.taskPlayAnim(alt.Player.local.scriptID, "pickup_object", "pickup_low", 8.0, 2.0, -1, 0, 0, 0, 0, 0);');
    alt.emitClient(player, 'playHowl2d', './audio/item_pickup.wav', 0.2);
}

alt.onClient('onRequestEquip', (player, invid) => {
    onRequestEquip(player, invid);
});

function onRequestUnEquip(player, eqslot) {
    //chat.send(player, `you requested unequip for equipslot: ${eqslot}`);

    //remove from client equipped
    alt.emitClient(player, "removeItemFromCharacterEquippedInventory", eqslot);

    //remove from server equipped.
    let equippedinven = JSON.parse(dbstore.CharacterValue(player.id, "Equipped"));
    let iteminfo = equippedinven[eqslot];

    equippedinven[eqslot] = null;
    dbstore.CharacterValue(player.id, "Equipped", JSON.stringify(equippedinven));

    //give to server inventory.
    let inventory = JSON.parse(dbstore.CharacterValue(player.id, "Inventory"));
    //find first free SLOT.
    let invenlist = Object.keys(inventory);
    
    var i = 0;
    for (i = 0; i < invenlist.length + 1; i++) { //check inventory + 1 for free slot.
        if(inventory[i] != undefined) {
            //console.log("not free slot " + i);
            continue;
        }
        else {
            //found free slot! -- TODO add check for maxslots!
            inventory[i] = iteminfo; //put equipped item in first free slot <- here.
            dbstore.CharacterValue(player.id, "Inventory", JSON.stringify(inventory)); //update inventory server side.
            //sync to clientside
            //maybe use giveItemUsed function?
            //do not use giveItemNew...
            var durability = "100";
            const playergender = dbstore.CharacterValue(player.id, "Gender");

            const itemid = Object.keys(iteminfo)[0]; //iteminfo -> { '7': { timedurability: 1000 } }
            const options = Object.values(iteminfo)[0];
            
            const duratype = Object.keys(options)[0]; //ex: "timedurability"
            const dura = Object.values(options)[0]; //TODO check if dura is above 0 ex: 1000

            let rawitemdata = itemstore.getItem(itemid);

            var equip = false;
            if(rawitemdata.equipable != undefined && playergender == rawitemdata.gender || rawitemdata.gender == "Any") { equip = true; } //can we equip?

            var itemdesclong = rawitemdata.name + '<br>' + rawitemdata.desc + '<br>' + rawitemdata.desc2 + '<br>';
            if(duratype == "timedurability") {
                const rawtimedurability = rawitemdata.timedurability;     //this is the MAX durability of the item.
                const currentedurability = dura;                          //this is the current durability of the item in inventory.

                var weartimeleft = convertMinsToHrsMins(currentedurability); //calc

                itemdesclong += 'Wear & Tear: ' + weartimeleft + ' of weartime left.<br>Remember to clean your clothes!';

                let percent = ((currentedurability - 0) * 100) / (rawtimedurability - 0);
                durability = `${percent}`; //set percentage.
            }
            //also apply defaults! forgot XD
            if(playergender == "Male") {
                alt.emitClient(player, "lisa_loadcharacter", "runEval", default_male[eqslot] );
                if(debug) { console.log(`default male slot: ${eqslot}: ${default_male[eqslot]}`); }
            }
            else if(playergender == "Female") {
                alt.emitClient(player, "lisa_loadcharacter", "runEval", default_female[eqslot] );
                if(debug) { console.log(`default female slot: ${eqslot}: ${default_female[eqslot]}`); }
            }
            //new icon system stuff.
            let icon;
            if(rawitemdata.icon != undefined) { icon = rawitemdata.icon; }
            //                                                                    invenid, itemid, itemname, itemdesc, itemdesclong, durability, use, equip, unequip, drop, icon
            alt.emitClient(player, "constructCharacterInventoryItem", i, itemid, rawitemdata.name, rawitemdata.desc, itemdesclong, durability, false, equip, false, true, icon);

            alt.emitClient(player, 'playHowl2d', './audio/item_drop.wav', 0.2);

            break;
        }
    }
}

alt.onClient('onRequestUnEquip', (player, invid) => {
    onRequestUnEquip(player, invid);
});

alt.on('subItemUseDura', (player, itemid) => {
    subItemUseDura(player, itemid);
});

function subItemUseDura(player, subitemid) {
    let inventory = JSON.parse(dbstore.CharacterValue(player.id, "Inventory"));
    const itemsKeys = Object.keys(inventory);

    const rawitemdata = itemstore.getItem(subitemid);

    for (let index = 0; index < itemsKeys.length; index++) {
        const invid = itemsKeys[index];
        const itemdata = inventory[invid];
        
        const itemid = Object.keys(itemdata)[0];
        
        if(itemid == subitemid) {
            //found item we need to substract durability for.
            const duraintcur = inventory[invid][itemid].usedurability;
            inventory[invid][itemid].usedurability -= 1;

            let newpercent = ((inventory[invid][itemid].usedurability - 0) * 100) / (rawitemdata.usedurability - 0);

            let name2display = rawitemdata.name.replace(/<[^>]+>/g, '');
            //player.showSubtitle(`You Received Item: ${name2display}`, 5000); //this is ugly AF...
            //let itemimg = `<img src="../../../lisa_loadcharacter/client/inventory_gui/icons/${itemid}.png" height="40px">`;
            let itemimg = `<img src="http://assets/lisa-assets/assets/icons/${itemid}.png" height="40px">`;

            if(inventory[invid][itemid].usedurability == 0) {
                //// Item durability is now 0, we can remove item.
                alt.emitClient(player, "removeItemFromCharacterInventory", invid);          //remove clientside
                delete inventory[invid];                                                    //remove from serverside object

                alt.emitClient(player, 'notify:msg', `Item depleted. <br>${itemimg} [${name2display}]`, 5000, '#FFF', 'rgba(0,0,0,0.60)', '#ffb34b');
            } else {
                //// Item durability is lowered already, emit updated durability to client
                alt.emitClient(player, "updateInvDurability", invid, newpercent, duraintcur, rawitemdata.usedurability, inventory[invid][itemid].usedurability); 
                
                alt.emitClient(player, 'notify:msg', `-1 Durability. <br>${itemimg} [${name2display}]`, 5000, '#FFF', 'rgba(0,0,0,0.60)', '#ffb34b');
                //(invenid, newdura, duraintcur, rawitemdata.usedurability, inventory[invid][itemid].usedurability)
            }
            //SAVE to serverside and also triggers MySQL saving!
            dbstore.CharacterValue(player.id, "Inventory", JSON.stringify(inventory));

            break;
        }
    }
}

function onRequestUse(player, invid) {
    //client eval sends to client while we execute server eval straight in here.
    let inventory = JSON.parse(dbstore.CharacterValue(player.id, "Inventory"));
    const item = inventory[invid];

    const itemid = Object.keys(item)[0];
    const options = Object.values(item)[0];
    
    const duratype = Object.keys(options)[0]; //ex: "timedurability"
    const dura = Object.values(options)[0]; //TODO check if dura is above 0 ex: 1000

    const rawitemdata = itemstore.getItem(itemid);
    if(duratype == "usedurability" && dura > 0) {
        if(rawitemdata.onUseClientEval != undefined || rawitemdata.onUseClientEval != '') {
            alt.emitClient(player, "lisa_loadcharacter", "runEval", rawitemdata.onUseClientEval );
        }
        if(rawitemdata.onUseServerEval != undefined || rawitemdata.onUseServerEval != '') {
            let serveval = rawitemdata.onUseServerEval;
            eval(serveval);
        }
        if(rawitemdata.manualusesub != undefined || rawitemdata.manualusesub != '') {
            if(rawitemdata.manualusesub) {
                return;
            }
        }
        //take one dura off after use.
        const duraintcur = inventory[invid][itemid].usedurability;
        inventory[invid][itemid].usedurability -= 1;

        //sync to client. trying progressbar first!
        let newpercent = ((inventory[invid][itemid].usedurability - 0) * 100) / (rawitemdata.usedurability - 0);

        //TODO remove item if new use durability is 0.
        //console.log('new use dura: '+inventory[invid][itemid].usedurability);

        if(inventory[invid][itemid].usedurability == 0) {
            //// Item durability is now 0, we can remove item.
            alt.emitClient(player, "removeItemFromCharacterInventory", invid);          //remove clientside
            delete inventory[invid];                                                    //remove from serverside object
        } else {
            //// Item durability is lowered already, emit updated durability to client
            alt.emitClient(player, "updateInvDurability", invid, newpercent, duraintcur, rawitemdata.usedurability, inventory[invid][itemid].usedurability); 
            //(invenid, newdura, duraintcur, rawitemdata.usedurability, inventory[invid][itemid].usedurability)
        }
        //SAVE to serverside and also triggers MySQL saving!
        dbstore.CharacterValue(player.id, "Inventory", JSON.stringify(inventory));
    }
    else {
        chat.send(player, "Durability is 0, cannot use item.");
    }
}

alt.onClient('onRequestUse', (player, invid) => {
    onRequestUse(player, invid);
});







function givePlayerPickupItem(player, itemobj) {
    var itemid = Object.keys(itemobj)[0];

    if(itemstore.getItem(itemid) == undefined) {
        console.log("item with id: "+itemid+", does not exist...");
        return;
    }
    
    const rawitemdata = itemstore.getItem(itemid);
    const fromdb = dbstore.CharacterValue(player.id, "Inventory");
    const playergender = dbstore.CharacterValue(player.id, "Gender");
    const inven = JSON.parse(fromdb);

    var invenlist = Object.keys(inven);

    //find first free SLOT.
    var i = 0;
    for (i = 0; i < invenlist.length + 1; i++) { //check inventory + 1 for free slot.
        if(inven[i] != undefined) {
            continue;
        }
        else {
            //FOUND FREE SLOT, insert item here.

            console.log('found free slot, testing TODO incomplete.');

            let doesItemHaveUseDurability = false;
            let doesItemHaveTimeDurability = false;

            if(rawitemdata.timedurability != undefined) { //item has timedurability
                doesItemHaveTimeDurability = true;
            }
            if(rawitemdata.usedurability != undefined) { //item has usedurability
                doesItemHaveUseDurability = true;
            }

            console.log('|-- inventory before change --|');
            console.log(JSON.stringify(inven));
            console.log('|-----------------------------|');

            let test = Object.values(itemobj);
            let test2 = Object.values(test)[0];
            let test3 = Object.values(test2)[0];
            //console.log(test3); //prints items durability.
            var itemdura = test3;

            let item = {};
            item[itemid] = {};

            if(doesItemHaveUseDurability) {
                //inven[i] = {itemid:{"usedurability":rawitemdata.usedurability}};
                //let item = {};
                item[itemid] = {"usedurability":itemdura};
                //inven[i] = item;
            }
            else if(doesItemHaveTimeDurability) {
                //inven[i] = {itemid:{"timedurability":rawitemdata.timedurability}};
                //let item = {};
                item[itemid] = {"timedurability":itemdura};
                //inven[i] = item;
            }

            inven[i] = item;

            dbstore.CharacterValue(player.id, "Inventory", JSON.stringify(inven)); //update inventory server side.

            console.log('|-- inventory after change --|');
            console.log(JSON.stringify(inven));
            console.log('|-----------------------------|');

            var durability = "100";
            var itemdesclong = rawitemdata.name + '<br>' + rawitemdata.desc + '<br>' + rawitemdata.desc2 + '<br>';
            if(doesItemHaveUseDurability) {
                let percent = ((itemdura - 0) * 100) / (rawitemdata.usedurability - 0);
                durability = `${percent}`; //set percentage.

                itemdesclong += 'Uses left: ' + itemdura + '/' + rawitemdata.usedurability;
            }
            else if(doesItemHaveTimeDurability) {
                let percent = ((itemdura - 0) * 100) / (rawitemdata.timedurability - 0);
                durability = `${percent}`; //set percentage.

                itemdesclong += 'Wear & Tear: ' + convertMinsToHrsMins(itemdura) + ' of weartime left.<br>Remember to clean your clothes!';
            }
            
            let use = false; //is item useable?
            if(rawitemdata.useable) { use = true; }
            
            let equip = false; //can we equip this item?
            if(playergender == rawitemdata.gender || rawitemdata.gender == "Any") { equip = true; }
            
            let icon; if(rawitemdata.icon != undefined) { icon = rawitemdata.icon; } //IF item has icon value set, use this, otherwise pass undefined and we will use itemid or fallback to missing icon.
            
            alt.emitClient(player, "constructCharacterInventoryItem", i, itemid, rawitemdata.name, rawitemdata.desc, itemdesclong, durability, use, equip, false, true, icon); //update client.
            //                                                                   invenid, itemid, itemname, itemdesc, itemdesclong, durability, use, equip, unequip, drop, icon

            alt.emitClient(player, "lisa_loadcharacter", "runEval", 'game.taskPlayAnim(alt.Player.local.scriptID, "pickup_object", "pickup_low", 8.0, 2.0, -1, 0, 0, 0, 0, 0);');
            alt.emitClient(player, 'playHowl2d', './audio/item_pickup.wav', 0.2);

            break;
        }
    }
}


function onRequestPickup(player, invid) {
    //chat.send(player, 'request pickup for dropID: '+invid);

    if(getEntityData(invid) == null)
        return;

    let dropitemdata = getEntityData(invid);

    //TODO check if we can actually pickup item, weight, itemslots etc...

    //remove dropItem, we stored it here ^
    destroyEntity(invid);

    //console.log(JSON.stringify(dropitemdata));

    let itemobj = dropitemdata.itemdata;
    //let itemid = Object.keys(itemobj)[0];
    
    givePlayerPickupItem(player, itemobj);
}

alt.onClient('onRequestPickup', (player, invid) => {
    onRequestPickup(player, invid);
});

function generateRandomFloating(min, max) {
    return min + Math.random()*(max - min);
}

function onRequestDrop(player, invid) {
    let inventory = JSON.parse(dbstore.CharacterValue(player.id, "Inventory"));

    alt.emitClient(player, "removeItemFromCharacterInventory", invid);          //remove clientside

    //create dropped item.
    let pos = player.pos;

    //offset slightly on drop. (around player on ground)
    pos.x += generateRandomFloating(-0.5, 0.5);
    pos.y += generateRandomFloating(-0.5, 0.5);

    const itemid = Object.keys(inventory[invid])[0];
    const rawitemdata = itemstore.getItem(itemid);

    let propname = rawitemdata.prop;
    if(propname == undefined || propname == null || propname == '') {
        propname = "hei_prop_hei_paper_bag"; //paper bag
    }

    let dropitem = createEntity(
        {
            x: pos.x,
            y: pos.y,
            z: pos.z-1.0
        },
        {
            type: "DROPPED_ITEM",
            prop: propname,

            itemid: itemid,
            itemname: rawitemdata.name,
            itemdesc: rawitemdata.desc,
            itemdesc2: rawitemdata.desc2,
            itemicon: rawitemdata.icon,
            itemdata: inventory[invid]
        }
    );
    //console.log('dropitem id: '+dropitem);
    //console.log(inventory[invid]);
    //console.log(JSON.stringify(inventory[invid]));

    delete inventory[invid];                                                    //remove from serverside object
        
    //SAVE to serverside and also triggers MySQL saving!
    dbstore.CharacterValue(player.id, "Inventory", JSON.stringify(inventory));

    alt.emitClient(player, "lisa_loadcharacter", "runEval", 'game.taskPlayAnim(alt.Player.local.scriptID, "pickup_object", "pickup_low", 8.0, 2.0, -1, 0, 0, 0, 0, 0);');
    alt.emitClient(player, 'playHowl2d', './audio/item_drop.wav', 0.2);
}

alt.onClient('onRequestDrop', (player, invid) => {
    onRequestDrop(player, invid);
});









function setCharacterHairColor(player){
    let haircolors = dbstore.CharacterValue(player.id, "setPedHairColor");
    let haircolor = haircolors.split(", ");
    let haircoloreval = `game.setPedHairColor(alt.Player.local.scriptID, ${haircolor[0]}, ${haircolor[1]});`;
    alt.emitClient(player, "lisa_loadcharacter", "runEval", haircoloreval);
}

function setMaxStatsForPlayer(player) {
    player.model = "player_two";
    alt.emitClient(player, "maxAllStats"); //Trigger clientevent to set all player stats to 100
}

function syncClientCharacterEnHuTh(player) {
    //energy, hunger, thirst
    let energy = dbstore.CharacterValue(player.id, "Energy");
    let hunger = dbstore.CharacterValue(player.id, "Hunger");
    let thirst = dbstore.CharacterValue(player.id, "Thirst");

    //1000 is MAX, calculate percentage!
    energy = ((energy - 0) * 100) / (1000 - 0);
    hunger = ((hunger - 0) * 100) / (1000 - 0);
    thirst = ((thirst - 0) * 100) / (1000 - 0);

    alt.emitClient(player, "energy", energy);
    alt.emitClient(player, "hunger", hunger);
    alt.emitClient(player, "thirst", thirst);
}

function setCharacterHairStyle(player) {
    let hairstyledb = dbstore.CharacterValue(player.id, "setPedHairStyle");
    let hairstyle = hairstyledb.split(", ");
    alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.setPedComponentVariation(alt.Player.local.scriptID, 2, ${hairstyle[0]}, ${hairstyle[1]}, ${hairstyle[2]});`);
}

function loadCharacterEyesColor(player) {
    let eyecolor = dbstore.CharacterValue(player.id, "setPedEyeColor");
    alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.setPedEyeColor(alt.Player.local.scriptID, ${eyecolor});`);
}

function setPedHeadOverlay(player) { //0-12
    let overlaydb = dbstore.CharacterValue(player.id, "setPedHeadOverlay");
    let overlayarr = overlaydb.split(", ");

    let i;
    for (i = 0; i < overlayarr.length; i++) {
        let overlayarr2 = overlayarr[i].split("&");
        //0&255, 0&255, 0&255, 0&255, 0&255, 0&255, 0&255, 0&255, 0&255, 0&255, 0&255, 0&255, 0&255
        alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.setPedHeadOverlay(alt.Player.local.scriptID, ${i}, ${overlayarr2[0]}, ${overlayarr2[1]});`);
        //console.log('setPedHeadOverlay overlayID: '+i+', index: '+overlayarr2[0]+', opacity: '+overlayarr2[1]);
    }
}

function setPedHeadOverlayColor(player) { //0-12
    let overlaydb = dbstore.CharacterValue(player.id, "setPedHeadOverlayColor");
    let overlayarr = overlaydb.split(", ");

    let i;
    for (i = 0; i < overlayarr.length; i++) {
        let overlayarr2 = overlayarr[i].split("&");
        //0&0, 0&0, 0&0, 0&0, 0&0, 0&0, 0&0, 0&0, 0&0, 0&0, 0&0, 0&0, 0&0
        let colortype = 0;
        if(i == 1 || i == 10 || i == 2) { colortype = 1; }
        else if(i == 5 || i == 8) { colortype = 2; }
        else { colortype = 0; }

        alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.setPedHeadOverlayColor(alt.Player.local.scriptID, ${i}, ${colortype}, ${overlayarr2[0]}, ${overlayarr2[1]});`);
        //console.log('setPedHeadOverlayColor overlayID: '+i+', colortype: '+colortype+', color1: '+overlayarr2[0]+', color2: '+overlayarr2[1]);
    }
}

function setPedFaceFeature(player) { //0-19
    let facefdb = dbstore.CharacterValue(player.id, "setPedFaceFeature");
    let facefarr = facefdb.split(", ");

    let i;
    for (i = 0; i < facefarr.length; i++) {
        alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.setPedFaceFeature(alt.Player.local.scriptID, ${i}, ${facefarr[i]});`);
        //console.log('setPedFaceFeature index: '+i+', value: '+facefarr[i]);
    }
}

function loadCharacter(player) {
    //do this eval on start loading.

    //when loading, set dimension to player.id (should be unique)
    player.dimension = player.id;

    //fix stats. max stats
    setMaxStatsForPlayer(player);

    //sync to client, energy, hunger, thirst
    syncClientCharacterEnHuTh(player);

    //set player model based on character gender
    setFreemodeModelGender(player);

    //do this right after setting model
    setPedHeadBlendData(player);

    //load equipped inventory (clothes, hair, etc.)
    loadEquippedInventory(player); //also includes client sync

    //set player hairstyle
    setCharacterHairStyle(player);

    //load pedhaircolor, after we load loadEquippedInventory -> pedcomponentvariation
    setCharacterHairColor(player);

    //load eye colors
    loadCharacterEyesColor(player);

    //load setPedHeadOverlay
    setPedHeadOverlay(player);
    
    //load setPedHeadOverlayColor
    setPedHeadOverlayColor(player);

    //load setPedFaceFeature
    setPedFaceFeature(player);
    
    //construct character inventory
    constructCharacterInventory(player); //client sync

    //spawn player to proper location - TODO now only spawns in either a Residence or world.
    putPlayerInInteriorOrWorld(player);

    //load anim dictionaries.
    alt.emitClient(player, "loadAnimDicts");

    //start thirsthungercontrol for player.
    thirsthungercontrolscript.initHungerThirstControlForPlayer(player);

    //render startup blips
    alt.emitClient(player, "renderStartupBlips");

    let playercash = dbstore.CharacterValue(player.id, 'Money_Pocket');
    alt.emitClient(player, 'setCashBalance', playercash);


    player.setSyncedMeta('Account_ID', dbstore.CharacterValue(player.id, "User_Account_ID"));
    player.setSyncedMeta('Character_ID', dbstore.CharacterValue(player.id, "ID"));
    player.setSyncedMeta('Character_Name', dbstore.CharacterValue(player.id, "Character_Name"));

    player.setMeta('Account_ID', dbstore.CharacterValue(player.id, "User_Account_ID"));
    player.setMeta('Character_ID', dbstore.CharacterValue(player.id, "ID"));
    player.setMeta('Character_Name', dbstore.CharacterValue(player.id, "Character_Name"));

    var x = setInterval(function() {
        //maybe do this after world load?
        //alt.emitClient(player, "enableDrawMarkers", true);
        //alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.setEntityAlpha(alt.Player.local.scriptID, 255, false);`);
        //alt.emitClient(player, 'toggleAlwaysGui', true);

        alt.emitClient(player, "lisa_loadcharacter", "runEval", 'game.switchInPlayer(alt.Player.local.scriptID);');
        
        clearInterval(x);
    }, 5000);
}

alt.onClient("mySwitchingIsEnded", (player) => {
    alt.emitClient(player, "enableDrawMarkers", true);
    alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.setEntityAlpha(alt.Player.local.scriptID, 255, false);`);
    alt.emitClient(player, 'toggleAlwaysGui', true);

    alt.emitClient(player, "lisa_loadcharacter", "runEval", `alt.toggleGameControls(true);`); //disable controls.
    alt.emitClient(player, "blockInventory", false); //block inventory
    
    console.log("switch complete, enabling markers, alwaysgui and alpha on player :)");

    player.setMeta('characterControls:enabled', true);

    player.setSyncedMeta('isCharacterLoggedInn', true);

    alt.emitClient(player, 'enableChat');
});

alt.on("load_character", (player) => { loadCharacter(player) });


alt.onClient('inventory:reCalcWearWeight', (player) => { //calc items weight inventory + equipped.
    let totalweight = 0.0;

    let inventory = JSON.parse(dbstore.CharacterValue(player.id, 'Inventory'));
    let equipped = JSON.parse(dbstore.CharacterValue(player.id, 'Equipped'));

    //Inventory
    let invenArrK = Object.keys(inventory);
    for (let index = 0; index < invenArrK.length; index++) {
        if(inventory[index] == null)
          continue;
        
        let item = Object.keys(inventory[index])
        let itemid = item[0];
        let itemdata = itemstore.getItem(itemid);
        if(itemdata.weight == undefined || itemdata.weight == null)
            continue;
        
        let itemweight = itemdata.weight;
        totalweight += itemweight;
    }

    //Equipped Inventory
    let equippArrK = Object.keys(equipped);
    for (let index = 0; index < equippArrK.length; index++) {
        if(inventory[index] == null)
          continue;
      
        let item = Object.keys(inventory[index])
        let itemid = item[0];
        let itemdata = itemstore.getItem(itemid);
        if(itemdata.weight == undefined || itemdata.weight == null)
            continue;
        
        let itemweight = itemdata.weight;
        totalweight += itemweight;
    }

    console.log('total weight on character: '+totalweight);
});