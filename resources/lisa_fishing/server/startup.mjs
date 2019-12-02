/* server startup */
import * as alt from "alt";
import chat from "chat";
import * as dbstore from "lisa_dbstore";
import * as itemstore from "lisa_itemstore";
import { givePlayerNewItem } from "lisa_loadcharacter";
import * as fishtables from "./fishloot.mjs";

function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min));
}

//var fishCurrentCalcLoot = null; //ITEMID
//var getFishLoot = false;
//var claimedLoot = false;

alt.on('playerConnect', (player) => {
    player.fishCurrentCalcLoot = null;
    player.getFishLoot = false;
    player.claimedLoot = false;
});


alt.onClient('fishing:caughtFish', (player) => {
    if(!player.getFishLoot)
        return;
    
    player.claimedLoot = true;
    
    givePlayerNewItem(player, player.fishCurrentCalcLoot);
    alt.emitClient(player, 'playHowl2d', './audio/item_pickup.wav', 0.2);

    alt.emitClient(player, 'progress:clear');
});

alt.onClient('fishing:reqLootDiff', (player, zone) => {
    //calculate loot and diff.
    let lootTable = fishtables.LootTables[zone];
    let selectFish;

    if(lootTable != undefined) {
        selectFish = lootTable[generateRandomInteger(0,99)];
    }

    //IF ZONE NOT FOUND.
    if(lootTable == undefined) {
        lootTable = fishtables.LootTables["DEFAULT"];
        selectFish = lootTable[generateRandomInteger(0,99)];
    }

    const rawitemdata = itemstore.getItem(selectFish);
    
    player.fishCurrentCalcLoot = selectFish;

    let loot = rawitemdata.name;
    let rarity = rawitemdata.rarity;

    let diff = 4; //based on selected fish and its rarity. max 11 //0-10

    if(rarity == "trash") { diff = 4; }
    else if(rarity == "rare") { diff = 11; }
    else if(rarity == "big") { diff = 9; }
    else if(rarity == "common") { diff = 7; }
    
    alt.emitClient(player, 'fishing:minigame', loot, diff);

    player.claimedLoot = false;
    player.getFishLoot = true;
    alt.emitClient(player, 'progress:new', 'Solve puzzle', 'puzzle', 5000, 'anim-cdsmooth');

    setTimeout(() => {
        player.getFishLoot = false;
        if(!player.claimedLoot) {
            alt.emitClient(player, 'fishing:ranoutoftime');
        }
    }, 5000);

    console.log('generated loot and diff, loot: '+loot+', diff: '+diff);
});

chat.registerCmd("fish", (player) => {
    alt.emitClient(player, 'fishing:tryFish');
});

chat.registerCmd("givemeallfish", (player) => {
    givePlayerNewItem(player, "100");
    givePlayerNewItem(player, "101");
    givePlayerNewItem(player, "102");
    givePlayerNewItem(player, "103");
    givePlayerNewItem(player, "104");
    givePlayerNewItem(player, "105");
    givePlayerNewItem(player, "106");
    givePlayerNewItem(player, "107");
    givePlayerNewItem(player, "108");
    givePlayerNewItem(player, "109");

    givePlayerNewItem(player, "120");
    givePlayerNewItem(player, "121");
    givePlayerNewItem(player, "122");
    givePlayerNewItem(player, "123");
    givePlayerNewItem(player, "124");
    givePlayerNewItem(player, "125");
    givePlayerNewItem(player, "126");
    givePlayerNewItem(player, "127");

    givePlayerNewItem(player, "140");
    givePlayerNewItem(player, "141");
    givePlayerNewItem(player, "142");
    givePlayerNewItem(player, "143");
    givePlayerNewItem(player, "144");
    givePlayerNewItem(player, "145");
    givePlayerNewItem(player, "146");
    givePlayerNewItem(player, "147");
    givePlayerNewItem(player, "148");
    givePlayerNewItem(player, "149");
    givePlayerNewItem(player, "150");
    givePlayerNewItem(player, "151");
    givePlayerNewItem(player, "152");
    givePlayerNewItem(player, "153");
    givePlayerNewItem(player, "154");
    givePlayerNewItem(player, "155");
    givePlayerNewItem(player, "156");
    givePlayerNewItem(player, "157");
    givePlayerNewItem(player, "158");
    givePlayerNewItem(player, "159");
    givePlayerNewItem(player, "160");
    givePlayerNewItem(player, "161");
    givePlayerNewItem(player, "162");
    givePlayerNewItem(player, "163");
    givePlayerNewItem(player, "164");
    givePlayerNewItem(player, "165");
    givePlayerNewItem(player, "166");
});