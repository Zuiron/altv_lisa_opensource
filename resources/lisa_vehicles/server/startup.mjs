import * as alt from "alt";
import chat from "chat";
import mysql from "mysql";
import * as dbstore from "lisa_dbstore";
import * as lisafunctions from "lisa_functions";
import * as vehicle_gui from "./vehicle_gui.mjs";
import * as VehSettings from "./loadVehSettings.mjs";

//console.log("events.mjs from vehicles has loaded!");

var storeglobals = dbstore.Globals();
/* OLD SQL
var connection = mysql.createConnection({
  host     : storeglobals.host,
  user     : storeglobals.user,
  password : storeglobals.password,
  database : storeglobals.database
});
*/
var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : storeglobals.host,
  user            : storeglobals.user,
  password        : storeglobals.password,
  database        : storeglobals.database
}); 
/*
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
*/
pool.getConnection(function(err, connection) {
  if (err) throw error;
//connection.query(`SELECT * FROM vehicles`, function (error, results, fields) {
  var query = connection.query(`SELECT * FROM vehicles`, function (error, results, fields) {
    connection.release();
  
  if (error) throw error;

  var loaded = 0;
  for (var i in results) {

      var vpos = results[i].Position.split(", ");
      var vrot = results[i].Rotation.split(", ");

      var veh = new alt.Vehicle(results[i].VehName, Number(vpos[0]), Number(vpos[1]), Number(vpos[2]), Number(vrot[0]), Number(vrot[1]), Number(vrot[2]));

      //set vehicle dimension ASAP.
      veh.dimension = results[i].Dimension;

      veh.rot = {
        x: Number(vrot[0]),
        y: Number(vrot[1]),
        z: Number(vrot[2])
      };

      //set vehicle license plate text
      veh.numberPlateText = results[i].numberPlateText;

      //set vehicle primaryColor and secondary color.
      veh.primaryColor = results[i].primaryColor;
      veh.secondaryColor = results[i].secondaryColor;

      //set vehicle engine health. #BUG: altv does not sync engine health correctly to client.
      //console.log('vehicle engine health before setting: '+veh.engineHealth);
      veh.engineHealth = results[i].EngineHealth;
      //console.log('vehicles engine health: '+veh.engineHealth);
      //console.log('vehicles engine health db: '+results[i].EngineHealth);

      //console.log(results[i].VehName, vpos[0], vpos[1], vpos[2], vrot[0], vrot[1], vrot[2]);
      //veh.setMeta("test", "motherfucker");
      //console.log(veh.getMeta("test"));

      //store vehicle data in dbstore.
      dbstore.Vehicle(veh.id, results[i]);
      //var testing = dbstore.Vehicle(veh.id);
      //console.log(JSON.stringify(testing));

      loaded += 1;
  }
  console.log("loaded", loaded, " vehicles data...");

  //console.log("end of query...");
});
});

/*
chat.registerCmd("savevehicle", (player, args) => {
  var vehid = player.vehicle.id;
  if(vehid == null || vehid == undefined)
    return;
  
  chat.send(player, "attempting to save vehicle data to DB...");
  //first update its position.
  dbstore.VehicleValue(vehid, "Position", `${player.vehicle.pos.x}, ${player.vehicle.pos.y}, ${player.vehicle.pos.z}`);
  var vehicledata = dbstore.Vehicle(vehid);

  //lets try pass entire vehicledata
  var query = connection.query('INSERT INTO vehicles SET ? ON DUPLICATE KEY UPDATE ?', [vehicledata, vehicledata], function (error, results, fields) {
    if (error) throw error;
    
    chat.send(player, "vehicle data for current vehicle is now saved to DB!");
  });
  console.log(query.sql);

});
*/

alt.on('playerEnteredVehicle', (player, vehicle, seat) => {
  var vehicledata = dbstore.Vehicle(vehicle.id);
  if(vehicledata != null) {
    console.log(JSON.stringify(vehicledata));
    //chat.send(player, JSON.stringify(vehicledata));

    var chardata = dbstore.Character(player.id);
    if(vehicledata.OwnerType == "Character") {
      if(vehicledata.OwnerID == chardata.ID) {
        chat.send(player, "you own this vehicle!");
      }
    }
  } else {
    chat.send(player, "this vehicle is most likely admin spawned");
  }
  
});

//save vehicle pos and rot on leave vehicle. database db
alt.on('playerLeftVehicle', (player, vehicle, seat) => {
  let vehpos = `${vehicle.pos.x}, ${vehicle.pos.y}, ${vehicle.pos.z}`;
  dbstore.VehicleValue(vehicle.id, "Position", vehpos);
  let vehrot = `${vehicle.rot.x}, ${vehicle.rot.y}, ${vehicle.rot.z}`;
  dbstore.VehicleValue(vehicle.id, "Rotation", vehrot);
});

chat.registerCmd("seatbelt", (player, args) => {
  alt.emitClient(player, "toggleSeatBelt");
});


function makeRandLP1(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//vehicle spawn, should be admin only, for now anyone for testing purposes.
chat.registerCmd("veh", (player, args) => {
  if (args.length != 1) {
    chat.send(player, "{FF0000} /veh [vehiclename]");
    return;
  }
  
  let spawnveh = new alt.Vehicle(args[0], player.pos.x, player.pos.y, player.pos.z + 1, 0, 0, 0);
  spawnveh.dimension = player.dimension;

  //make temp vehicle in db, but set as NOT save to DB.
  let LP2 = getRandomInt(10000, 99999);
  const pvehdata = {
    "TempVehicle":true,
    "VehName":args[0],
    "Fuel":25.2,
    "Odometer":"0",
    "SpawnedBy":player.name,
    "OwnerID":-1,
    "OwnerType":"-1",
    "Dimension":player.dimension,
    "numberPlateText":`${makeRandLP1(2)} ${LP2}`,
    "CharacterIDsAccess":`${player.getMeta("Character_ID")}`
  }
  dbstore.Vehicle(spawnveh.id, pvehdata);

  spawnveh.numberPlateText = pvehdata.numberPlateText;

  //random colors.
  spawnveh.primaryColor = getRandomInt(0, 160);
  spawnveh.secondaryColor = getRandomInt(0, 160);

  setTimeout(() => {
    //alt.emitClient(player, "LF_PutPlayerInVehicle", spawnveh); //disable, causing some issues.
  }, 1000);

});