import * as alt from "alt";
import chat from "chat";

alt.on('entityEnterColshape', (colshape, entity) => {
    if(entity.constructor.name != "Player")
        return;

    if(colshape.getMeta("type") != "business_manager")
        return;

    if(entity.getSyncedMeta("dimension") != colshape.getMeta("dimension"))
        return;
    
    let bizdata = colshape.getMeta("data"); chat.send(entity, "{ff9933} Business ID: "+bizdata.ID);
    chat.send(entity, "{ff0000} Business Manager system is still WIP.");
});