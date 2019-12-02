import * as alt from "alt";
import chat from "chat";
import mysql from "mysql";
import * as dbstore from "lisa_dbstore";
import * as business_tp from "./business_teleporter.mjs";       //teleporter for instanced/dimension interiors.
import * as business_manager from "./business_manager.mjs";     //business owners can interact with the business
import * as business_shop from "./business_shop.mjs";           //item store
import * as business_barber from "./business_barber.mjs";       //barber
import * as business_clothing from "./business_clothing.mjs";   //clothing

var storeglobals = dbstore.Globals();
var pool  = mysql.createPool({
    connectionLimit : 100,
    host            : storeglobals.host,
    user            : storeglobals.user,
    password        : storeglobals.password,
    database        : storeglobals.database
}); 

var markerPositions = [];
var blipPositions = [];

pool.getConnection(function(err, connection) {
    if (err) throw error;
    var query = connection.query('SELECT * FROM `property_business`', function (error, results, fields) {
    connection.release();
    if (error) throw error;

    var loaded = 0;
    var loaded_shop = 0;
    var loaded_barber = 0;
    var loaded_clothing = 0;
    for (var i in results) {

        var business_dimension = 0;
        if(results[i].isInstancedInterior != null) {
            business_dimension = results[i].ID;
        }

        //---------------------------------------------------------------------------------------------------------------------------
        //BInteractXYZ - Business Interaction Colshape & marker. where you buy the business and where you manage it if owner.
        //---------------------------------------------------------------------------------------------------------------------------
        if(results[i].BInteractXYZ != null) {

        var cords = results[i].BInteractXYZ.split(", ");
        var BInteractXYZ = new alt.ColshapeCylinder(cords[0], cords[1], cords[2]-0.75, 0.7, 3);
        
        BInteractXYZ.dimension = business_dimension;
        BInteractXYZ.setMeta("type", "business_manager"); //use meta for easy reads across resources if needed. never edit this from script.
        BInteractXYZ.setMeta("data", results[i]);
        BInteractXYZ.setMeta("dimension", business_dimension);

        dbstore.Business(results[i].ID, results[i]); //used mostly for saving to database.
        dbstore.ColIdent(BInteractXYZ.pos, {ColType:"business_manager"}); //prevents interference with residences and garages
        
        markerPositions.push({
            x: cords[0],
            y: cords[1],
            z: cords[2]-0.5,
            type: 30,
            sx: 0.5,
            sy: 0.5,
            sz: 0.7,
            r: 3,
            g: 203,
            b: 253,
            a: 200,
            dimension: business_dimension
        });

        markerPositions.push({
            x: cords[0],
            y: cords[1],
            z: cords[2]-1.0,
            type: 27,
            sx: 1.2,
            sy: 1.2,
            sz: 0.8,
            r: 3,
            g: 203,
            b: 253,
            a: 200,
            dimension: business_dimension
        });
        
        }
        //---------------------------------------------------------------------------------------------------------------------------


        //---------------------------------------------------------------------------------------------------------------------------
        //isShop - Business shop Colshape & marker. where you buy items from the business.
        //---------------------------------------------------------------------------------------------------------------------------
        if(results[i].isShop != null) {
            var Shopcords = results[i].shopColShape.split(", ");
            var shopColShape = new alt.ColshapeCylinder(Shopcords[0], Shopcords[1], Shopcords[2]-0.75, 0.7, 3);

            shopColShape.dimension = business_dimension;
            shopColShape.setMeta("type", "business_shop"); //use meta for easy reads across resources if needed. never edit this from script.
            shopColShape.setMeta("data", results[i]);
            shopColShape.setMeta("dimension", business_dimension);

            dbstore.Business(results[i].ID, results[i]); //used mostly for saving to database.
            dbstore.ColIdent(shopColShape.pos, {ColType:"business_shop"}); //prevents interference with residences and garages
            
            var blip_entrancepos = results[i].FrontXYZ.split(", ");
            blipPositions.push({
                x: blip_entrancepos[0],
                y: blip_entrancepos[1],
                z: blip_entrancepos[2],
                sprite: results[i].BBlipSprite,
                color: 4,
                scale: 0.6,
                shortrange: 1,
                name: results[i].BName,
                LM_icon: results[i].LM_icon
            });

            markerPositions.push({
                x: Shopcords[0],
                y: Shopcords[1],
                z: Shopcords[2]-0.50,
                type: 29,
                sx: 0.8,
                sy: 0.8,
                sz: 1,
                r: 139,
                g: 241,
                b: 37,
                a: 80,
                dimension: business_dimension
            });

            markerPositions.push({
                x: Shopcords[0],
                y: Shopcords[1],
                z: Shopcords[2]-1.0,
                type: 27,
                sx: 1.2,
                sy: 1.2,
                sz: 0.8,
                r: 139,
                g: 241,
                b: 37,
                a: 80,
                dimension: business_dimension
            });

            loaded_shop += 1;
        }
        //---------------------------------------------------------------------------------------------------------------------------

        //---------------------------------------------------------------------------------------------------------------------------
        //isBarber - Business barber shop Colshape & marker. where you buy haircuts and barber shit.
        //---------------------------------------------------------------------------------------------------------------------------
        if(results[i].isBarber != null) {
            var Barbercords = results[i].barberColShape.split(", ");
            var barberColShape = new alt.ColshapeCylinder(Barbercords[0], Barbercords[1], Barbercords[2]-0.75, 0.7, 3);
            
            barberColShape.dimension = business_dimension;
            barberColShape.setMeta("type", "business_barber"); //use meta for easy reads across resources if needed. never edit this from script.
            barberColShape.setMeta("data", results[i]);
            barberColShape.setMeta("dimension", business_dimension);

            dbstore.Business(results[i].ID, results[i]); //used mostly for saving to database.
            dbstore.ColIdent(barberColShape.pos, {ColType:"business_barber"}); //prevents interference with residences and garages

            markerPositions.push({
                x: Barbercords[0],
                y: Barbercords[1],
                z: Barbercords[2]-0.50,
                type: 42,
                sx: 0.8,
                sy: 0.8,
                sz: 1,
                r: 241,
                g: 211,
                b: 91,
                a: 80,
                dimension: business_dimension
            });

            markerPositions.push({
                x: Barbercords[0],
                y: Barbercords[1],
                z: Barbercords[2]-1.0,
                type: 27,
                sx: 1.2,
                sy: 1.2,
                sz: 0.8,
                r: 241,
                g: 211,
                b: 91,
                a: 80,
                dimension: business_dimension
            });

            loaded_barber += 1;
        }
        //---------------------------------------------------------------------------------------------------------------------------

         //---------------------------------------------------------------------------------------------------------------------------
        //isClothing - Business clothing shop Colshape & marker. where you buy clothes.
        //---------------------------------------------------------------------------------------------------------------------------
        if(results[i].isClothing != null) {
            var Clothingcords = results[i].clothingColShape.split(", ");
            var clothingColShape = new alt.ColshapeCylinder(Clothingcords[0], Clothingcords[1], Clothingcords[2]-0.75, 0.7, 3);
            
            clothingColShape.dimension = business_dimension;
            clothingColShape.setMeta("type", "business_clothing"); //use meta for easy reads across resources if needed. never edit this from script.
            clothingColShape.setMeta("data", results[i]);
            clothingColShape.setMeta("dimension", business_dimension);

            dbstore.Business(results[i].ID, results[i]); //used mostly for saving to database.
            dbstore.ColIdent(clothingColShape.pos, {ColType:"business_clothing"}); //prevents interference with residences and garages

            markerPositions.push({
                x: Clothingcords[0],
                y: Clothingcords[1],
                z: Clothingcords[2]-0.50,
                type: 29,
                sx: 0.8,
                sy: 0.8,
                sz: 1,
                r: 105,
                g: 51,
                b: 255,
                a: 80,
                dimension: business_dimension
            });

            markerPositions.push({
                x: Clothingcords[0],
                y: Clothingcords[1],
                z: Clothingcords[2]-1.0,
                type: 27,
                sx: 1.2,
                sy: 1.2,
                sz: 0.8,
                r: 105,
                g: 51,
                b: 255,
                a: 80,
                dimension: business_dimension
            });

            loaded_clothing += 1;
        }
        //---------------------------------------------------------------------------------------------------------------------------

        //create teleporters if business is instanced interior.
        if(results[i].isInstancedInterior != null) {
            var coords_entercol = results[i].FrontXYZ.split(", ");
            var coords_exitscol = results[i].exitColShape.split(", ");

            var enter_col = new alt.ColshapeCylinder(coords_entercol[0], coords_entercol[1], coords_entercol[2]-0.75, 0.7, 3);
            var exits_col = new alt.ColshapeCylinder(coords_exitscol[0], coords_exitscol[1], coords_exitscol[2]-0.75, 0.7, 3);

            dbstore.ColIdent(enter_col.pos, {ColType:"business_teleporter"}); //prevents interference with residences and garages
            dbstore.ColIdent(exits_col.pos, {ColType:"business_teleporter"}); //prevents interference with residences and garages

            enter_col.dimension = 0;
            enter_col.setMeta("dimension", 0);
            enter_col.setMeta("newdimension", business_dimension);
            let enter_tp2 = results[i].enterSpawn.split(", ");
            enter_col.setMeta("tp2", {x: enter_tp2[0], y: enter_tp2[1], z: enter_tp2[2]});
            enter_col.setMeta("type", "business_teleporter");

            exits_col.dimension = business_dimension;
            exits_col.setMeta("dimension", business_dimension);
            exits_col.setMeta("newdimension", 0);
            let exits_tp2 = results[i].exitSpawn.split(", ");
            exits_col.setMeta("tp2", {x: exits_tp2[0], y: exits_tp2[1], z: exits_tp2[2]});
            exits_col.setMeta("type", "business_teleporter");

            markerPositions.push({
                x: coords_entercol[0],
                y: coords_entercol[1],
                z: coords_entercol[2]-1.0,
                type: 27,
                sx: 1.2,
                sy: 1.2,
                sz: 0.8,
                r: 3,
                g: 203,
                b: 253,
                a: 100,
                dimension: 0
            });

            markerPositions.push({
                x: coords_exitscol[0],
                y: coords_exitscol[1],
                z: coords_exitscol[2]-1.0,
                type: 27,
                sx: 1.2,
                sy: 1.2,
                sz: 0.8,
                r: 3,
                g: 203,
                b: 253,
                a: 100,
                dimension: business_dimension
            });
        }


        loaded += 1;
    }
    console.log("loaded", loaded, " business from DB using mysql.");
    console.log("loaded", loaded_shop, " business_shops.");
    console.log("loaded", loaded_barber, " business_barber.");
    console.log("loaded", loaded_clothing, " business_clothing.");
    });
});

alt.on("playerConnect", (player) => {
    for(var i = 0; i < markerPositions.length; i++) {
        alt.emitClient(player, "createMarker", markerPositions[i]);
    }
});

alt.on("playerConnect", (player) => {
    for(var i = 0; i < blipPositions.length; i++) {
        alt.emitClient(player, "createStartupBlip", blipPositions[i]);
    }
});

//new map blips.
alt.onClient("clientMapIsNowReady", (player) => {
    console.log("sending blips to new better map for "+player.name);
    for(var i = 0; i < blipPositions.length; i++) {
        alt.emitClient(player, "addLandmarkUsingInGameCoords", blipPositions[i].x, blipPositions[i].y, blipPositions[i].z, blipPositions[i].LM_icon, blipPositions[i].name, 0, true); //0 at all zooms.
    }
});