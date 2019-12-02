/* fuelpumps server */

import * as alt from "alt";
import chat from "chat";
import mysql from "mysql";
import * as dbstore from "lisa_dbstore";
import * as lisafunc from "lisa_functions";
import * as fuelpos from "./pumplocations.mjs";

const storeglobals = dbstore.Globals(); //import globals

const pool  = mysql.createPool({ //create mariadb pool
    connectionLimit : 100,
    host            : storeglobals.host,
    user            : storeglobals.user,
    password        : storeglobals.password,
    database        : storeglobals.database
}); 

var blipPositions = [];

pool.getConnection(function(err, connection) {
    if (err) throw error;
    var query = connection.query('SELECT * FROM `fuel_pumps`', function (error, results, fields) {
        connection.release();
        if (error) throw error;

        var loaded = 0;
        for (var i in results) {
            var cords = results[i].colShapePos1.split(", ");
            var cords2 = results[i].colShapePos2.split(", ");
            var blipcoords = results[i].blipCoord.split(", ");
            
            if(results[i].colShapeType == null) {
                var newColShape = new alt.ColshapeCuboid(cords[0], cords[1], cords[2], cords2[0], cords2[1], cords2[2]); //draw from south to north.
                newColShape.setMeta("type", "fuelpump");
                newColShape.setMeta("data", results[i]);

                blipPositions.push({
                    x: blipcoords[0],
                    y: blipcoords[1],
                    z: blipcoords[2],
                    sprite: 361, //415
                    color: 4,
                    scale: 0.6,
                    shortrange: 1,
                    name: "Gas Station"
                });

                //do this to not interfere with other colshapes.
                dbstore.ColIdent(newColShape.pos, {ColType:"FuelPump"});
            } else if(results[i].colShapeType == "Cylinder") {

                //var newColShape = new alt.ColshapeCuboid(cords[0], cords[1], cords[2], cords2[0], cords2[1], cords2[2]); //draw from south to north.
                var newColShape = new alt.ColshapeCylinder(cords[0], cords[1], cords[2]-2.0, results[i].CylinderSize, 6); //x,y,z,radius,height
                newColShape.setMeta("type", "fuelpump");
                newColShape.setMeta("data", results[i]);

                blipPositions.push({
                    x: blipcoords[0],
                    y: blipcoords[1],
                    z: blipcoords[2],
                    sprite: 361, //415
                    color: 4,
                    scale: 0.6,
                    shortrange: 1,
                    name: "Gas Station"
                });

                //do this to not interfere with other colshapes.
                dbstore.ColIdent(newColShape.pos, {ColType:"FuelPump"});

            } else { console.log("WTF dont know what todo here now..."); }

        loaded += 1;
        }
    console.log("loaded", loaded, " fuel pumps.");
    });
});

alt.on("playerConnect", (player) => {
    for(var i = 0; i < blipPositions.length; i++) {
        alt.emitClient(player, "createStartupBlip", blipPositions[i]);
    }
});

/*
if (entity.constructor.name != "Vehicle")
        return;
*/

alt.on('entityLeaveColshape', (colshape, entity) => {
    if(colshape.getMeta("type") != "fuelpump")
        return;
    
    let playerx;
    if(entity.constructor.name == "Player") {
        playerx = entity;
    } else if(entity.constructor.name == "Vehicle") {
        playerx = entity.driver;
    }
    alt.emitClient(playerx, 'toggleFuelStationGUI', false);
});

alt.on('entityEnterColshape', (colshape, entity) => {
    if(colshape.getMeta("type") != "fuelpump")
        return;
    
    if(entity.constructor.name == "Vehicle") {
        if(entity.driver == null) //fixes bug where if you enter without a driver, say towing or jump out of veh and it enters col.
            return;
    }

    //console.log(entity.driver + " entered fuelpump colshape with a vehicle.");
    //console.log(colshape.getMeta("type"));
    console.log(JSON.stringify(colshape.getMeta("data")));

    let lastUsedVeh;
    let playerx;
    if(entity.constructor.name == "Player") {
        lastUsedVeh = lisafunc.getLastUsedVehicle(entity);
        playerx = entity;
    } else if(entity.constructor.name == "Vehicle") {
        lastUsedVeh = lisafunc.getLastUsedVehicle(entity.driver);
        playerx = entity.driver;
    }

    if(lastUsedVeh != undefined) {
        const vehdbinfo = dbstore.Vehicle(lastUsedVeh.id);
        //alt.emitClient(playerx, 'updateLastVehStatusMsgFuelStation', vehdbinfo.VehName+' - '+vehdbinfo.numberPlateText);
        alt.emitClient(playerx, 'updateLastVehStatusMsgFuelStation2', [vehdbinfo.VehName, vehdbinfo.numberPlateText, "", ""]);
    }
    
    let businessid = colshape.getMeta("data").BusinessID;
    let businessinfo = dbstore.Business(businessid);
    let fuelcost = businessinfo.fuelCost.split(",");
    alt.emitClient(playerx, 'fuelStationGuiFuelCostUpdate', fuelcost[0], 0);
    alt.emitClient(playerx, 'fuelStationGuiFuelCostUpdate', fuelcost[1], 1);
    alt.emitClient(playerx, 'fuelStationGuiFuelCostUpdate', fuelcost[2], 2);

    dbstore.CharacterTempValue(playerx.id, "fuelstation_business_id", businessid);
    dbstore.CharacterTempValue(playerx.id, "fuelstation_business_name", businessinfo.BName);
    dbstore.CharacterTempValue(playerx.id, "fuelstation_business_addr", businessinfo.BAddress);
    dbstore.CharacterTempValue(playerx.id, "fuelstation_fuelcost_0", fuelcost[0]);
    dbstore.CharacterTempValue(playerx.id, "fuelstation_fuelcost_1", fuelcost[1]);
    dbstore.CharacterTempValue(playerx.id, "fuelstation_fuelcost_2", fuelcost[2]);

    alt.emitClient(playerx, 'toggleFuelStationGUI', true);
});


function Distance(vector1, vector2) {
	if (vector1 === undefined || vector2 === undefined) {
		throw new Error('AddVector => vector1 or vector2 is undefined');
	}

	return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2));
}

function fillupVehicle(player, vehicle, fueltype) {
    const startplrpos = player.pos;
    const startvehpos = vehicle.pos;
    const fuelpertick = 1.0;
    const delay = 1000;

    let fuelcost = 0;
    let fueltypename = "ERROR";
    if(fueltype == 0) { fuelcost = dbstore.CharacterTempValue(player.id, "fuelstation_fuelcost_0"); fueltypename = "Gasoline"; }
    else if(fueltype == 1) { fuelcost = dbstore.CharacterTempValue(player.id, "fuelstation_fuelcost_1"); fueltypename = "Diesel"; }
    else if(fueltype == 2) { fuelcost = dbstore.CharacterTempValue(player.id, "fuelstation_fuelcost_2"); fueltypename = "Electricity"; }

    const businessname = dbstore.CharacterTempValue(player.id, "fuelstation_business_name");
    const businessaddr = dbstore.CharacterTempValue(player.id, "fuelstation_business_addr");

    const costpertick = Number(fuelcost);

    const vehdbinfo = dbstore.Vehicle(vehicle.id);
    const vehsettings = dbstore.VehicleSettings(vehdbinfo.VehName);
    const maxtank = vehsettings.Fuel_Tank_Capacity; //float

    let totalfilledlitre = 0;
    let totalcost = 0;
    var i = setInterval(function(){
        const dist1 = Distance(player.pos, startplrpos);
        const dist2 = Distance(vehicle.pos, startvehpos);
        //if(dist1 > 0.1) { clearInterval(i); console.log("stopping player moved."); return; }
        //if(dist2 > 0.1) { clearInterval(i); console.log("stopping vehicle moved."); return; }
        if(dist1 > 0.1 || dist2 > 0.1) {
            if(fueltypename == "Electricity") {
                chat.send(player, "{00b8ff} You filled "+totalfilledlitre+' kWh of '+fueltypename+', for a total cost of '+totalcost.toFixed(2)+' $.');
            } else {
                chat.send(player, "{00b8ff} You filled "+totalfilledlitre+' litres of '+fueltypename+', for a total cost of '+totalcost.toFixed(2)+' $.');
            }
            chat.send(player, "{00b8ff} Thank you for purchasing "+fueltypename+" at "+businessname+', '+businessaddr+', SA.');

            clearInterval(i);
            alt.emitClient(player, 'playHowl2d', './audio/fillup_stop.wav', 0.6);
            return;
        }
        
        //can we afford next tick?
        const currentcash = dbstore.CharacterValue(player.id, "Money_Pocket");
        const newcash = Number(currentcash) - costpertick;
        if(newcash < 0) {
            chat.send(player, "{00b8ff} Not enough money...");
            if(fueltypename == "Electricity") {
                if(totalfilledlitre > 0) { chat.send(player, "{00b8ff} You filled "+totalfilledlitre+' kWh of '+fueltypename+', for a total cost of '+totalcost.toFixed(2)+' $.'); }
            } else {
                if(totalfilledlitre > 0) { chat.send(player, "{00b8ff} You filled "+totalfilledlitre+' litres of '+fueltypename+', for a total cost of '+totalcost.toFixed(2)+' $.'); }
            }
            if(totalfilledlitre > 0) { 
                chat.send(player, "{00b8ff} Thank you for purchasing "+fueltypename+" at "+businessname+', '+businessaddr+', SA.'); 
                alt.emitClient(player, 'playHowl2d', './audio/fillup_stop.wav', 0.6);
            }

            clearInterval(i);
            return;
        }
        dbstore.CharacterValue(player.id, "Money_Pocket", `${newcash}`);
        alt.emitClient(player, 'setCashBalance', newcash);

        const vehcurrtank = dbstore.VehicleValue(vehicle.id, "Fuel"); //current fuel tank, float in string.
        const newfuelval = Number(vehcurrtank) + fuelpertick;

        //player fill sound?
        alt.emitClient(player, 'playHowl2d', './audio/fillup_loop1s.wav', 0.8);
        alt.emitClient(player, "lisa_loadcharacter", "runEval", `game.taskPlayAnim(alt.Player.local.scriptID, 'weapons@misc@jerrycan@', 'fire', 8.0, 0.5, -1, 0, 0, 0, 0, 0);`);
        totalcost += costpertick;
        totalfilledlitre += fuelpertick;

        //game.setVehiclePetrolTankHealth(alt.Player.local.vehicle.scriptID, 1);
        alt.emitClient(player, 'fixVehicleDriveableAfterFillingFuel', vehicle);

        alt.emitClient(player, 'updateLastVehStatusMsgFuelStation2', [vehdbinfo.VehName, vehdbinfo.numberPlateText, totalcost.toFixed(2), totalfilledlitre.toFixed(2)]);

        if(newfuelval >= maxtank) {
            //tank is now full.
            dbstore.VehicleValue(vehicle.id, "Fuel", `${maxtank}`);
            console.log("stopping vehicle tank full.");
            clearInterval(i);
            if(fueltypename == "Electricity") {
                chat.send(player, "{00b8ff} You filled "+totalfilledlitre+' kWh of '+fueltypename+', for a total cost of '+totalcost.toFixed(2)+' $.');
            } else {
                chat.send(player, "{00b8ff} You filled "+totalfilledlitre+' litres of '+fueltypename+', for a total cost of '+totalcost.toFixed(2)+' $.');
            }
            chat.send(player, "{00b8ff} Thank you for purchasing "+fueltypename+" at "+businessname+', '+businessaddr+', SA.');
            alt.emitClient(player, 'playHowl2d', './audio/fillup_stop.wav', 0.6);
            return;
        }
        dbstore.VehicleValue(vehicle.id, "Fuel", `${newfuelval}`);
        
        //console.log('total filled litre: '+totalfilledlitre+', total cost: '+totalcost+', current tank: '+vehcurrtank+', newfuel: '+newfuelval+' maxtank: '+maxtank+', current cash: '+currentcash+', newcash: '+newcash);
    }, delay);
}

function requestStartFill(player) {
    let lastUsedVeh = lisafunc.getLastUsedVehicle(player);
    if(lastUsedVeh == undefined)
        return;
    
    let dist = lisafunc.Distance(lastUsedVeh.pos, player.pos);
    if(dist > 2) {
        //chat.send(player, "{FF0000} vehicle too far away.");
        alt.emitClient(player, 'updateLastVehStatusMsgFuelStation', 'Get closer to the vehicle.');
        return; //last used vehicle not close enough.
    }
    const vehdbinfo = dbstore.Vehicle(lastUsedVeh.id);
    const currtank = vehdbinfo.Fuel; //current fuel tank, float in string.
    //also update clientside.
    //alt.emitClient(player, 'updateLastVehStatusMsgFuelStation', vehdbinfo.VehName+' - ['+vehdbinfo.numberPlateText+']');
    alt.emitClient(player, 'updateLastVehStatusMsgFuelStation2', [vehdbinfo.VehName, vehdbinfo.numberPlateText, "", ""]);

    const vehsettings = dbstore.VehicleSettings(vehdbinfo.VehName);
    const fueltype = vehsettings.Fuel_Type; //0 gas, 1 diesel, 2 electric. float
    const maxtank = vehsettings.Fuel_Tank_Capacity; //float
    //console.log('tank: '+currtank+', max: '+maxtank+', fueltype: '+fueltype);

    const nearpump = fuelpos.isPlayerNearAnyFuelPump(player, 2);
    if(!nearpump) {
        //chat.send(player, "{FF0000} is player near fuelpump: "+nearpump);
        alt.emitClient(player, 'updateLastVehStatusMsgFuelStation', 'Get closer to the fuel pump.');
        return;
    }

    //calc tank in percentage. //((current - min) * 100) / (max - min)
    const tankinpercent = ((currtank - 0) * 100) / (maxtank - 0);
    if(tankinpercent >= 100) {
        alt.emitClient(player, 'updateLastVehStatusMsgFuelStation', 'vehicle does not need filling up.');
        return;
    }

    //continue
    //play start fill sound?
    alt.emitClient(player, 'playHowl2d', './audio/fillup_start.wav', 0.4);
    fillupVehicle(player, lastUsedVeh, fueltype);
}
alt.onClient("requestStartFill", (player) => {
    if(player.vehicle != undefined) {
        //chat.send(player, "{FF0000} cant fuel vehicle while you are inside a vehicle.");
        alt.emitClient(player, 'updateLastVehStatusMsgFuelStation', 'Exit vehicle before filling.');
        return;
    }
    requestStartFill(player);
});