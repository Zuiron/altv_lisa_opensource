import alt from "alt";
import { 
    ENTITY_STREAM_IN_EVENT, 
    ENTITY_STREAM_OUT_EVENT,
    ENTITY_DATA_UPDATE_EVENT,
    ENTITY_MOVE_EVENT
} from "./shared.mjs";

const TICK_UPDATE_DELAY = 1000;
const STREAMING_RANGE = 400; //default 400.

let entities = [];

let tick = () => {
    alt.Player.all.forEach(
        (player) => {
            entities.forEach(
                (entity, entityID) => {
                    if(entity !== undefined) {
                        let shouldBeStreamed = shouldEntityBeStreamedToPlayer(
                            player,
                            entityID
                        );
                        let index = isEntityStreamedToPlayer(
                            player,
                            entityID
                        );

                        //Basically if something needs to be done.
                        if(shouldBeStreamed !== (index !== -1)) {
                            //To make it a bit faster pass index here too.
                            if(shouldBeStreamed) addEntityToPlayer(player, entityID, index);
                            else removeEntityFromPlayer(player, entityID, index);
                        }
                    }
                }
            );
        }
    )
}

setInterval(
    tick,
    1000
);

alt.on(
    'playerDisconnect', 
    (player, reason) => {
        entities.forEach(
            (entity, entityID) => {
                if(entity !== undefined) {                   
                    let index = isEntityStreamedToPlayer(
                        player,
                        entityID
                    );

                    if(index !== -1) removeEntityFromPlayer(player, entityID, index, false);
                }
            }
        );
    }
);

let dist = (pos1, pos2) => {
    let pos = {
        x: pos1.x - pos2.x,
        y: pos1.y - pos2.y,
        z: pos1.z - pos2.z
    };

    return Math.sqrt(
        pos.x*pos.x + pos.y*pos.y + pos.z*pos.z 
    );
};

let addEntityToPlayer = (player, entityID, index = null) => {
    if(index === null) index = isEntityStreamedToPlayer(player, entityID)
    
    if(index === -1) {
        let entity = entities[entityID];

        entity.syncedTo.push(player.id);

        alt.emitClient(
            player,
            ENTITY_STREAM_IN_EVENT,
            entity
        );
    }
};

let removeEntityFromPlayer = (player, entityID, index = null, notify = true) => {
    if(index === null) index = isEntityStreamedToPlayer(player, entityID);

    if(index !== -1) {
        let entity = entities[entityID];

        entity.syncedTo.splice(index, 1);

        if(notify)
            alt.emitClient(
                player,
                ENTITY_STREAM_OUT_EVENT,
                entity
            );
    }
};

//returns -1 if no; returns index if yes.
let isEntityStreamedToPlayer = (player, entityID) => {
    let entity = entities[entityID];

    let result = -1;

    entity.syncedTo.forEach(
        (playerID, index) => {
            if(playerID === player.id) result = index;
        }
    )

    return result;
}

let shouldEntityBeStreamedToPlayer = (player, entityID) => {
    let entity = entities[entityID];
    
    return dist(
        player.pos,
        entity.pos
    ) < STREAMING_RANGE;
}

let findUnusedEntityID = () => {
    for(let i = 0; i < entities.length; i++)
        if(entities[i] === undefined) return i;

    return entities.length;
};

export function createEntity(pos, data) {
    let id = findUnusedEntityID();

    entities[id] = {
        id: id,
        pos: {...pos},
        data: {...data},
        syncedTo: []
    };;

    return id;
}

export function updateEntityData(id, data) {
    if(!doesEntityExist(id)) return false;

    entities[id].data = {
        ...data
    };

    entities[id].syncedTo.forEach(
        (playerID) => {
            let player = alt.Player.all[playerID];

            alt.emitClient(
                player,
                ENTITY_DATA_UPDATE_EVENT, 
                entity
            );
        }
    );
    
    return true;
}

export function moveEntity(id, pos) {
    if(!doesEntityExist(id)) return false;

    entities[id].pos = {
        ...pos
    };

    let toRemove = [];
    entities[id].syncedTo.forEach(
        (playerID) => {
            let player = alt.Player.all[playerID];

            if(shouldEntityBeStreamedToPlayer(player, id))
                alt.emitClient(
                    player,
                    ENTITY_MOVE_EVENT,
                    entity
                );

            else toRemove.push(playerID);
        }
    );

    if(toRemove.length !== 0) toRemove.forEach(
        (playerID) => {
            removeEntityFromPlayer(
                alt.Player.all[playerID],
                id
            );
        }
    )

    //New players which/if are in streaming range will be added next tick.
    //Needed to remove player, in order to update position on their clients.

    return true;
}

export function destroyEntity(id) {
    let entity = entities[id];

    if(entity !== undefined) {
        entity.syncedTo.forEach(
            (playerID) => {
                alt.emitClient(
                    null,
                    ENTITY_STREAM_OUT_EVENT,
                    entity
                );
            }
        )
    }

    entities[id] = undefined;
}

/* OLD CODE
export function destroyEntity(id) {
    let entity = entities[id];

    if(entity !== undefined) {
        entity.syncedTo.forEach(
            (playerID) => {
                alt.emitClient(
                    alt.Player.all[playerID],
                    ENTITY_STREAM_OUT_EVENT,
                    entity
                );
            }
        )
    }

    entities[id] = undefined;
}
*/

export function doesEntityExist(id) {
    return entities[id] !== undefined;
}

export function getEntityData(id) {
    if(!doesEntityExist(id)) return null;

    return {
        ...entities[id].data
    }
}