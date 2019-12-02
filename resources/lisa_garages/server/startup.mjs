import * as alt from "alt";
import chat from "chat";
import mysql from "mysql";
import * as dbstore from "lisa_dbstore";
import * as tppos from "./tptointerior.mjs"; //tp to interior ID's loaded from DB.
import * as lisafunctions from "lisa_functions";

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
/* OLD SQL
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
*/
var markerPositions = [];
pool.getConnection(function(err, connection) {
//connection.query('SELECT * FROM `property_garages`', function (error, results, fields) {
  if (err) throw error;
var query = connection.query('SELECT * FROM `property_garages`', function (error, results, fields) {
  connection.release();
  
  if (error) throw error;

  var loaded = 0;
  for (var i in results) {
      //---------FRONT DOOR START
      //cords for frontdoor
      var cords = results[i].Position.split(", ");
      //colshape for frontdoor
      var newShape = new alt.ColshapeCylinder(cords[0], cords[1], cords[2]-1.0, 3.0, 5);
      //store frontdoor data and colshape ident.
      dbstore.Garage(newShape.pos, results[i]);
      dbstore.ColIdent(newShape.pos, {ColType:"Garage"});

      markerPositions.push({
        x: cords[0],
        y: cords[1],
        z: cords[2]-0.72,
        type: 27,
        sx: 5.0,
        sy: 5.0,
        sz: 1,
        r: 255,
        g: 255,
        b: 255,
        a: 50,
        dimension: 0
      });
      //---------FRONT DOOR END

      loaded += 1;
  }
  console.log("loaded", loaded, " garages from DB using mysql.");

  //console.log("end of query...");
});
});

//console.log("loadgarages startup.mjs has loaded!");



export function EnterGarage(player, force) {
  if(force == undefined){ //use force if user is logged in and isinsideinterior = 1 (in db)
    if (dbstore.CharacterValue(player.id, "IsPlayerInGarageCol") == 0) {
        chat.send(player, "{FF0000} nothing to enter");
        return;
    }
  }

  var garagedetails;

  if(dbstore.CharacterValue(player.id, "GarageColType") == "Garage") {

    var contin = false;
    var vehin = false;

    if(player.vehicle == undefined) {
      contin = true;
      console.log("trying entering without vehicle");
    } else {
      var playersvehicle = player.vehicle;
      
      var realcharacterid = dbstore.CharacterValue(player.id, "ID");
      var realvehicleownerID = dbstore.VehicleValue(player.vehicle.id, "OwnerID");

      if(realvehicleownerID == realcharacterid) { //is character owner of vehicle?
        contin = true;
        vehin = true;
        chat.send(player, "you own this vehicle, entering.");
      } 
      else if(dbstore.VehicleValue(player.vehicle.id, "CharacterIDsAccess") != null) { //does character have vehicle key?
        var CharacterIDsAccess = dbstore.VehicleValue(player.vehicle.id, "CharacterIDsAccess");
        var CharacterIDsAccess2 = CharacterIDsAccess.split(",");
        if(CharacterIDsAccess2.includes(JSON.stringify(realcharacterid))) {
          contin = true;
          vehin = true;
          chat.send(player, "you have the keys for this vehicle, entering.");
        } else {
          chat.send(player, "you do not own or have the keys for this vehicle.");
        }
      }
      else {
        chat.send(player, "you do not own or have the keys for this vehicle.2");
      }

      console.log("trying entering WITH vehicle...");
    }

    if(contin) { //player stuff
      garagedetails = dbstore.Garage(dbstore.CharacterValue(player.id, "GarageIdent"));
      var resinteriorid = garagedetails.Garage_Interior_ID; //this is the interiorID
      var resID = garagedetails.ID; //use this as DIMENSION
      var getinteriordata = tppos.teleportpositions[resinteriorid-1]; //-1 to offset. js array starts at 1 and not 0 like mysql
      var interiordatafrontdoor = getinteriordata.On_Foot_Entrance;
      var cords = interiordatafrontdoor.split(", ");
      if(!vehin) {
        alt.emitClient(player, 'fadeOutScreen', true, 1000);
        setTimeout(() => {
          player.dimension = resID;
          player.pos = { x: cords[0], y: cords[1], z: cords[2] };
          dbstore.CharacterValue(player.id, "isinsideinterior", 1);
          chat.send(player, "you entered the garage as player...");
          setTimeout(() => {
            alt.emitClient(player, 'fadeOutScreen', false, 1000);
          }, 500);
        }, 1000);
      }
    }
    if(vehin) { //do we also have vehicle to put inside?
      var vehiclespots = getinteriordata.Vehicle_Spots;
      var freespots = false;
      for (var i in vehiclespots) {

        //check free spots.
        var xyz = { x: vehiclespots[i].x, y: vehiclespots[i].y, z: vehiclespots[i].z };
        var rxyz = { x: vehiclespots[i].rx, y: vehiclespots[i].ry, z: vehiclespots[i].rz };
        // pos, range, dimension
        var checkrange = lisafunctions.IsAnyVehicleInRange(xyz, 1, resID);
        if(!checkrange) {
          freespots = true;
          break; //found free spot, break.
        }
      }
      if(!freespots) {
        chat.send(player, "cant fit more vehicles in this garage...");
      } else {
        alt.emitClient(player, 'fadeOutScreen', true, 1000);
        setTimeout(() => {
          playersvehicle.pos = xyz;
          playersvehicle.rot = rxyz; //NOTICE - vehicle.rot is bugged. waiting for fix 19/07/2019.
          playersvehicle.dimension = resID;
          dbstore.VehicleValue(playersvehicle.id, "Dimension", resID);

          player.dimension = resID;
          player.pos = { x: cords[0], y: cords[1], z: cords[2] };
          dbstore.CharacterValue(player.id, "isinsideinterior", 1);
          setTimeout(() => {
            alt.emitClient(player, "LF_PutPlayerInVehicle", playersvehicle);
            chat.send(player, "you entered the garage with a vehicle...");
            alt.emitClient(player, 'fadeOutScreen', false, 1000);
          }, 500);
        }, 1000);
      }
    }

  }
}

  /* 
  // this is GARAGE interiorID 14 - Vehicle_Spots
  //pos1
  posv = -810.975830078125, 186.34286499023438, 71.775146484375
  rotv = 0, 0, 1.921875
  //pos2
  posv = -812.017578125, 189.03297424316406, 71.775146484375
  rotv = 0, 0, 1.921875
  
  {"1":{"x":-810.975830078125,"y":186.34286499023438,"z":71.775146484375,"rx":0,"ry":0,"rz":1.921875},"2":{"x":-812.017578125,"y":189.03297424316406,"z":71.775146484375,"rx":0,"ry":0,"rz":1.921875}}
  */





function ExitGarage(player) {
  if (dbstore.CharacterValue(player.id, "isinsideinterior") == 0) {
    chat.send(player, "{FF0000} nothing to exit");
    return;
  }
  if(player.vehicle == undefined) {
    //fetch the cords for garageident...
    var garagedetails = dbstore.Garage(dbstore.CharacterValue(player.id, "GarageIdent"));
    var garageplayerexitpos = garagedetails.PlayerExitPos.split(", ");
    
    alt.emitClient(player, 'fadeOutScreen', true, 1000);
    setTimeout(() => {
      player.pos = { x: garageplayerexitpos[0], y: garageplayerexitpos[1], z: garageplayerexitpos[2] };
      player.dimension = 0; //always 0 when exiting from interiors.
      dbstore.CharacterValue(player.id, "isinsideinterior", 0);
      chat.send(player, "you exited the garage as player...");
      setTimeout(() => {
        alt.emitClient(player, 'fadeOutScreen', false, 1000);
      }, 500);
    }, 1000);
  } else {
    //first check if exit pos is free from vehicles.
    var garagedetails = dbstore.Garage(dbstore.CharacterValue(player.id, "GarageIdent"));
    var garagexit = garagedetails.Position.split(", ");
    var garagexitrot = garagedetails.Rotation.split(", ");

    var checkrange = lisafunctions.IsAnyVehicleInRange({ x: garagexit[0], y: garagexit[1], z: garagexit[2] }, 5, 0);
    if(!checkrange) {
      alt.emitClient(player, 'fadeOutScreen', true, 1000);
      setTimeout(() => {
          //DO STUFF
          var playerveh = player.vehicle;
          player.vehicle.pos = { x: garagexit[0], y: garagexit[1], z: garagexit[2] };
          player.vehicle.rot = { x: garagexitrot[0], y: garagexitrot[1], z: garagexitrot[2] };
          player.vehicle.dimension = 0;
          dbstore.VehicleValue(player.vehicle.id, "Dimension", 0);
          player.dimension = 0;
          dbstore.CharacterValue(player.id, "isinsideinterior", 0);
          //put player inside vehicle.
          //alt.emitClient(player, "LF_PutPlayerInLastVehicle", player.vehicle);
          chat.send(player, "you exited the garage with a vehicle.");

          setTimeout(() => {
            //player.pos = { x: garageplayerexitpos[0], y: garageplayerexitpos[1], z: garageplayerexitpos[2] };
            alt.emitClient(player, "LF_PutPlayerInVehicle", playerveh);
            alt.emitClient(player, 'fadeOutScreen', false, 1000);
          }, 500);
      }, 1000);


    } else {
      chat.send(player, "cannot exit garage with vehicle, a vehicle is blocking.");
    }
  }
}


//replace these with emits from client.
chat.registerCmd("entergarage", (player, args) => {
  EnterGarage(player);
});

chat.registerCmd("exitgarage", (player, args) => {
  ExitGarage(player);
});







//entering colshape as player.
alt.on("entityEnterColshape", (colshape, entity) => {
if(entity instanceof alt.Player && entity.vehicle == undefined) { //only ok if we are only player.
    var ident = dbstore.ColIdent(colshape.pos); //only run if its a garage.
    if(ident.ColType != "Garage")
        return;

    //get garage data and print.
    var loadregaragedata = dbstore.Garage(colshape.pos);
    chat.send(entity, "you entered a garage colshape as player");
    chat.send(entity, JSON.stringify(loadregaragedata));
    console.log(JSON.stringify(loadregaragedata));
    
    dbstore.CharacterValue(entity.id, "IsPlayerInGarageCol", 1);
    dbstore.CharacterValue(entity.id, "GarageIdent", colshape.pos);
    dbstore.CharacterValue(entity.id, "GarageColType", "Garage");

}
});
//Leaving colshape as player.
alt.on("entityLeaveColshape", (colshape, entity) => {
  if(entity instanceof alt.Player && entity.vehicle == undefined) { //only ok if we are only player.
    var ident = dbstore.ColIdent(colshape.pos); //only run if its a garage.
    if(ident.ColType != "Garage")
        return;

    chat.send(entity, "{FF0000}you left a Garage colshape as player");

    dbstore.CharacterValue(entity.id, "IsPlayerInGarageCol", 0);
    //dbstore.CharacterValue(entity.id, "GarageIdent", "0"); //leave them !
    //dbstore.CharacterValue(entity.id, "GarageColType", "0"); //leave them !
  }
});








//entering colshape as vehicle.
alt.on("entityEnterColshape", (colshape, entity) => {
  if (entity instanceof alt.Vehicle && entity.driver != undefined) {//if we are in vehicle.
    var ident = dbstore.ColIdent(colshape.pos); //only run if its a garage.
    if(ident.ColType != "Garage")
      return;
  
    //get garage data and print.
    var loadregaragedata = dbstore.Garage(colshape.pos);
    chat.send(entity.driver, "you entered a garage colshape as vehicle");
    chat.send(entity.driver, JSON.stringify(loadregaragedata));
    console.log(JSON.stringify(loadregaragedata));
    
    dbstore.CharacterValue(entity.driver.id, "IsPlayerInGarageCol", 1);
    dbstore.CharacterValue(entity.driver.id, "GarageIdent", colshape.pos);
    dbstore.CharacterValue(entity.driver.id, "GarageColType", "Garage");

    console.log("debug: vehicleid",entity.id,"playerid:",entity.driver.id);
}
});
//Leaving colshape as vehicle.
alt.on("entityLeaveColshape", (colshape, entity) => {
  if(entity instanceof alt.Vehicle && entity.driver != undefined) { //if we are in vehicle.
    var ident = dbstore.ColIdent(colshape.pos); //only run if its a garage.
    if(ident.ColType != "Garage")
        return;

    chat.send(entity.driver, "{FF0000}you left a Garage colshape as vehicle");

    dbstore.CharacterValue(entity.driver.id, "IsPlayerInGarageCol", 0);
    //dbstore.CharacterValue(entity.driver.id, "GarageIdent", "0"); //leave them !
    //dbstore.CharacterValue(entity.driver.id, "GarageColType", "0"); //leave them !

    console.log("debug: vehicleid",entity.id,"playerid:",entity.driver.id);
  }
});










alt.on("playerConnect", (player) => {
    for(var i = 0; i < markerPositions.length; i++) {
      alt.emitClient(player, "createMarker", markerPositions[i]);
    }
  });