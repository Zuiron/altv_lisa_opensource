import * as alt from "alt";
import chat from "chat";

alt.on('entityEnterColshape', (colshape, entity) => {
    if(entity.constructor.name != "Player")
        return;

    if(colshape.getMeta("type") != "business_teleporter")
        return;

    if(entity.dimension != colshape.getMeta("dimension"))
        return;

    entity.pos = colshape.getMeta("tp2");
    entity.dimension = colshape.getMeta("newdimension");

    alt.emitClient(entity, 'toggleFuelStationGUI', false);
});