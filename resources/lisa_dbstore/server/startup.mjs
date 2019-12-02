import * as alt from "alt";
import chat from "chat";
import mysql from "mysql";

const debug = false;
const save2DB = true;

//lets create some fucking global vars...
var globalvars = {
    host: "localhost",
    user: "root",
    password: "DB_PASSWORD_HERE",
    database: "lisa_srv"
}
export function Globals() {
    return globalvars;
}

var pool  = mysql.createPool({
    connectionLimit : 100,
    host            : globalvars.host,
    user            : globalvars.user,
    password        : globalvars.password,
    database        : globalvars.database
});

//Character --pid is player.id
var character = [];

export function Character(pid, data) {
    if(data == undefined) {
        if(debug) { console.log("Character: data missing, returning data"); }
        return character[pid];
    }
    else {
        if(debug) { console.log("Character: data FOUND, setting data"); }
        character[pid] = data;
    }
}

export function CharacterValue(pid, value, data) {
    if(data == undefined && value != undefined) {
        if(debug) { console.log("CharacterValue: got value but data missing, returning data from value"); }
        return character[pid][value];
    }
    else {
        if(debug) { console.log("CharacterValue: got data and value, setting data for value"); }
        
        if(character[pid] == undefined || character[pid][value] == undefined) {
            return;
        }
        
        character[pid][value] = data;

        if(!save2DB)
            return;

        const DbId = character[pid].ID;
        pool.getConnection(function(err, connection) {
            if (err) throw error;
            var query = connection.query(`UPDATE characters SET ${value} = ? WHERE ID = ?`, [data, DbId], function (error, results, fields) {
                connection.release();
                if (error) throw error;

                //console.log("----------Saved this to DB----------");
                console.log('SQL => '+query.sql);
                //console.log("------------------------------------");
            });
        });
    }
}
//END of Character

var charactertemp = []; //THESE are never stored on DB

export function CharacterTemp(pid, data) {
    if(data == undefined) {
        if(debug) { console.log("CharacterTemp: data missing, returning data"); }
        return charactertemp[pid];
    }
    else {
        if(debug) { console.log("CharacterTemp: data FOUND, setting data"); }
        charactertemp[pid] = data;
    }
}

export function CharacterTempValue(pid, value, data) {
    if(data == undefined && value != undefined) {
        if(charactertemp[pid] != undefined && charactertemp[pid][value] != undefined) {
            if(debug) { console.log("CharacterTempValue: got value but data missing, returning data from value"); }
            return charactertemp[pid][value];
        }
    }
    else {
        if(debug) { console.log("CharacterTempValue: got data and value, setting data for value"); }
        charactertemp[pid][value] = data;
    }
}




var business = [];

export function Business(bid, data) {
    if(data == undefined) {
        if(debug) { console.log("Business: data missing, returning data"); }
        return business[bid];
    } else {
        if(debug) { console.log("Business: data FOUND, setting data"); }
        business[bid] = data;
    }
}

export function BusinessValue(bid, value, data) {
    if(data == undefined && value != undefined) {
        if(business[bid] != undefined && business[bid][value] != undefined) {
            if(debug) { console.log("Business: got value but data missing, returning data from value"); }
            return business[bid][value];
        }
    }
    else {
        if(debug) { console.log("Business: got data and value, setting data for value"); }
        business[bid][value] = data;
    }
}



//Vehicles --vid is vehicle.id
var vehicle = [];

export function Vehicle(vid, data) {
    if(data == undefined) {
        if(debug) { console.log("Vehicle: data missing, returning data"); }
        return vehicle[vid];
    } else {
        if(debug) { console.log("Vehicle: data FOUND, setting data"); }
        vehicle[vid] = data;
    }
}

export function VehicleValue(vid, value, data) {
    if(data == undefined && value != undefined) {
        if(debug) { console.log("VehicleValue: got value but data missing, returning data from value"); }
        return vehicle[vid][value];
    } else {
        if(debug) { console.log("VehicleValue: got data and value, setting data for value"); }
        vehicle[vid][value] = data;

        //continue only if real db vehicle. - if its -1 its a spawned vehicle.
        if(vehicle[vid]["OwnerID"] === -1)
            return;

        if(!save2DB)
            return;

        const DbId = vehicle[vid].ID;
        pool.getConnection(function(err, connection) {
            if (err) throw error;
            var query = connection.query(`UPDATE vehicles SET ${value} = ? WHERE ID = ?`, [data, DbId], function (error, results, fields) {
                connection.release();
                if (error) throw error;

                //console.log("----------Saved this to DB----------");
                console.log('SQL => '+query.sql);
                //console.log("------------------------------------");
            });
        });
    }
}
//END of Vehicles


var vehicle_settings = [];

export function VehicleSettings(vehname, data) {
    if(data == undefined) {
        if(debug) { console.log("VehicleSettings: data missing, returning data"); }
        if(vehicle_settings[vehname] == undefined) {
            console.log('VehicleSettings MISSING, giving default values.');
            return vehicle_settings["DEFAULT"];
        } else { return vehicle_settings[vehname]; }
    } else {
        if(debug) { console.log("VehicleSettings: data FOUND, setting data"); }
        vehicle_settings[vehname] = data;
    }
}

export function VehicleSettingsValue(vehname, value, data) {
    if(data == undefined && value != undefined) {
        if(debug) { console.log("VehicleSettings: got value but data missing, returning data from value"); }
        if(vehicle_settings[vehname] == undefined) {
            console.log('VehicleSettingsValue MISSING, giving default value.');
            return vehicle_settings["DEFAULT"][value];
        } else {
            return vehicle_settings[vehname][value];
        }
    }
    else {
        if(debug) { console.log("VehicleSettings: got data and value, setting data for value"); }
        vehicle_settings[vehname][value] = data;
    }
}


//ColIdent --only way to identify is by using the pos. but jsonstring it first always.
var ColIdentList = [];

export function ColIdent(id, data) {
id = JSON.stringify(id); //identify colshape by its position in string jsoned.

    if(data == undefined) {
        if(debug) { console.log("ColIdent: data missing, returning data"); }
        return ColIdentList[id];
    } else {
        if(debug) { console.log("ColIdent: data FOUND, setting data"); }
        ColIdentList[id] = data;
    }
}

//useful for storing info - for example backdoors of houses.
export function ColIdentValue(id, value, data) {
    id = JSON.stringify(id);
    
        if(data == undefined && value != undefined) {
            if(debug) { console.log("ColIdentValue: got value but data missing, returning data from value"); }
            return ColIdentList[id][value];
        } else {
            if(debug) { console.log("ColIdentValue: got data and value, setting data for value"); }
            ColIdentList[id][value] = data;
        }
    }
//END of ColIdent



//Residence --only way to identify is by using the pos. but jsonstring it first always.
var residence = [];

export function Residence(id, data) {
id = JSON.stringify(id); //identify colshape by its position in string jsoned.

    if(data == undefined) {
        if(debug) { console.log("Residence: data missing, returning data"); }
        return residence[id];
    } else {
        if(debug) { console.log("Residence: data FOUND, setting data"); }
        residence[id] = data;
    }
}

export function ResidenceValue(id, value, data) {
id = JSON.stringify(id);

    if(data == undefined && value != undefined) {
        if(debug) { console.log("ResidenceValue: got value but data missing, returning data from value"); }
        return residence[id][value];
    } else {
        if(debug) { console.log("ResidenceValue: got data and value, setting data for value"); }
        residence[id][value] = data;
    }
}
//END of Residence



//Garage --only way to identify is by using the pos. but jsonstring it first always.
var garage = [];

export function Garage(id, data) {
id = JSON.stringify(id); //identify colshape by its position in string jsoned.

    if(data == undefined) {
        if(debug) { console.log("Garage: data missing, returning data"); }
        return garage[id];
    } else {
        if(debug) { console.log("Garage: data FOUND, setting data"); }
        garage[id] = data;
    }
}

export function GarageValue(id, value, data) {
id = JSON.stringify(id);

    if(data == undefined && value != undefined) {
        if(debug) { console.log("GarageValue: got value but data missing, returning data from value"); }
        return garage[id][value];
    } else {
        if(debug) { console.log("GarageValue: got data and value, setting data for value"); }
        garage[id][value] = data;
    }
}
//END of Garage

/*
//fuelpumps --only way to identify is by using the pos. but jsonstring it first always.
var fuelpumps = [];

export function FuelPumps(id, data) {
id = JSON.stringify(id); //identify colshape by its position in string jsoned.

    if(data == undefined) {
        if(debug) { console.log("FuelPumps: data missing, returning data"); }
        return fuelpumps[id];
    } else {
        if(debug) { console.log("FuelPumps: data FOUND, setting data"); }
        fuelpumps[id] = data;
    }
}

export function FuelPumpsValue(id, value, data) {
id = JSON.stringify(id);

    if(data == undefined && value != undefined) {
        if(debug) { console.log("FuelPumpsValue: got value but data missing, returning data from value"); }
        return fuelpumps[id][value];
    } else {
        if(debug) { console.log("FuelPumpsValue: got data and value, setting data for value"); }
        fuelpumps[id][value] = data;
    }
}
//END of fuelpumps
*/

/*
function savechar(player, data) {
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        chat.send(player, "attempting to save your character data to DB...");
    
        //first update char position.
        CharacterValue(player.id, "Position", `${player.pos.x}, ${player.pos.y}, ${player.pos.z}`);
        //let characterdata = Character(player.id);

        //remember to JSON objects such as ResidenceIdent
        data.ResidenceIdent = JSON.stringify(data.ResidenceIdent);


        // Use the connection
        var query = connection.query('INSERT INTO characters SET ? ON DUPLICATE KEY UPDATE ?', [data, data], function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();

          //why the fuck i have to do this? so confused!!!
          data.ResidenceIdent = JSON.parse(data.ResidenceIdent);
          chat.send(player, "DONE!");


          // Handle error after the release.
          if (error) throw error;
            
          // Don't use the connection here, it has been returned to the pool.
          chat.send(player, "your character data is now saved to DB!");
        });
        console.log(query.sql);
    });
}
*/
/*
chat.registerCmd("savechar", (player, args) => {
    savechar(player, Character(player.id));
});
*/


chat.registerCmd("chardata", (player, args) => { //character pos
    //chat.send(player, JSON.stringify(Character(player.id)));
    console.log(JSON.stringify(Character(player.id), null, 4));
});


chat.registerCmd("chardatatemp", (player, args) => { //character pos
    //chat.send(player, JSON.stringify(CharacterTemp(player.id)));
    console.log(JSON.stringify(CharacterTemp(player.id), null, 4));
});