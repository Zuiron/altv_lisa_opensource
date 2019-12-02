# altmp-js-network-streamer

## Description

This is a workaround for https://github.com/altmp/altv/issues/46:

* Streaming range is 400 (same as alt:v regular stream range).
* Streaming tick is calculated on every second.

NOTE: currently optimized only for static entities. 

* (You can change entity's position, but this hasn't been optimized yet.)
* (Will be optimized when i'll be adding zombies on my server. ~1 week to wait prooly).

## Instalation

1. Clone the repository.
2. Install as regular alt:v resource.

## Static Entity Example

Create entity from server-side:

```
import { createEntity } from "altmp-js-network-streamer";
    
createEntity(
    {
        x: 0,
        y: 0,
        z: 80
    },
    {
        type: "DROPPED_ITEM",
        prop: "some_gta_object",
        name: "some_item_name"
        //... some other custom data
    }
);
```

Spawn and despawn entity from client-side, when player is close to the entity:

```
import {
    ENTITY_STREAM_IN_EVENT, 
    ENTITY_STREAM_OUT_EVENT
} from "altmp-js-network-streamer";

alt.onServer(
    ENTITY_STREAM_IN_EVENT,
    (entity) => {
        if(entity.data.type === 'DROPPED_ITEM') {
            alt.log("Item should be spawned. (TODO)")
        }
    }
)

alt.onServer(
    ENTITY_STREAM_OUT_EVENT,
    (entity) => {
        if(entity.data.type === 'DROPPED_ITEM') {
            alt.log("Item should be despawned. (TODO)")
        }
    }
)
```

