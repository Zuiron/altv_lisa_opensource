import * as alt from "alt";
import chat from "chat";
import * as dbstore from "lisa_dbstore";
import * as itemstore from "lisa_itemstore";
import * as loadchar from "lisa_loadcharacter";

import * as extended from 'altv-extended';

alt.on('playerConnect', (player) => {
    extended.SetupExportsForPlayer(player);
});

function isCorrectCol(colshape, entity) {
    if(entity.constructor.name != "Player")
        return false;

    if(colshape.getMeta("type") != "business_shop")
        return false;

    if(entity.getSyncedMeta("dimension") != colshape.getMeta("dimension"))
        return false;
    
    return true;
}

alt.on('entityEnterColshape', (colshape, entity) => {
    if(!isCorrectCol(colshape, entity))
        return;
    
    let bizdata = colshape.getMeta("data"); chat.send(entity, "{ff9933} Business ID: "+bizdata.ID);
    chat.send(entity, "{ff9933} Business Shop. --WIP working on it! :D");

    
    //sync items.
    alt.emitClient(entity, 'business_shop:clearitems');

    let items = bizdata.itemsForSale.split(',');
    let itemcost = bizdata.itemsCost.split(',');
    let itemstock = bizdata.itemsStock.split(',');

    for (let index = 0; index < items.length; index++) {
        let rawitem = itemstore.getItem(items[index]);
        alt.emitClient(entity, 'business_shop:additem', items[index], itemcost[index], itemstock[index], bizdata.ID, rawitem.name, rawitem.desc, rawitem.desc2, index);
    }

    //set active. so we can use E to open menu.
    entity.setSyncedMeta('business_shop_active', true);
    entity.setSyncedMeta('business_shop_ID', bizdata.ID);

    entity.showHelpText('Press ~INPUT_CONTEXT~ to open/close shop menu.', 5000);
});

alt.on('entityLeaveColshape', (colshape, entity) => {
    if(!isCorrectCol(colshape, entity))
        return;
    
    let bizdata = colshape.getMeta("data"); chat.send(entity, "{ff9933} Business ID: "+bizdata.ID);
    chat.send(entity, "{ff9933} Business Shop. --LEFTCOLSHAPE");

    entity.setSyncedMeta('business_shop_active', false);
});

alt.onClient('business_shop:buyitem', (player, itemid, businessid, index) => {
    console.log('got request buy from: '+player.name+' itemid: '+itemid+', businessid: '+businessid);

    let playercash = dbstore.CharacterValue(player.id, "Money_Pocket");
    let itemcost = dbstore.BusinessValue(businessid, "itemsCost").split(',')[index];

    let newcash = Number(playercash) - Number(itemcost);
    if(newcash < 0) {
        chat.send(player, "You cannot afford this.")
        return;
    }

    dbstore.CharacterValue(player.id, "Money_Pocket", `${newcash}`);
    alt.emitClient(player, 'setCashBalance', newcash);

    loadchar.givePlayerNewItem(player, itemid);
});