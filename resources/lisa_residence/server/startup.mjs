import * as alt from "alt";
import chat from "chat";
import mysql from "mysql";
import * as dbstore from "lisa_dbstore";
import * as tppos from "./tptointerior.mjs"; //tp to interior ID's loaded from DB.

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

//webview testing...

alt.onClient('residenceColUi', (player, arg) => {
  if(arg == "enterResidence") {
    EnterPlayerToResidence(player);
  } else if(arg == "enterResidenceBackdoor") {
    EnterPlayerToResidence(player, false, true); //player force backdoor
  } else if(arg == "lockResidence") {
    dbstore.ResidenceValue(JSON.parse(dbstore.CharacterValue(player.id, "ResidenceIdent")), "locked", 1);
    chat.send(player, "{FF0000}You locked the door.");
  } else if(arg == "unlockResidence") {
    dbstore.ResidenceValue(JSON.parse(dbstore.CharacterValue(player.id, "ResidenceIdent")), "locked", 0);
    chat.send(player, "{00afff}You unlocked the door.");
  } else if(arg == "ringResidenceDoorBell") {
    //which house is player ringing on?
    var pres_ident = JSON.parse(dbstore.CharacterValue(player.id, "ResidenceIdent"));
    let residence = dbstore.Residence(pres_ident);
    chat.send(player, `{00afff}you rang the doorbell for houseid: ${residence.ID}`);

    alt.Player.all.forEach((playah) => {
      let isininterior = dbstore.CharacterValue(playah.id, "isinsideinterior");
      if(isininterior) {
        let res_ident = JSON.parse(dbstore.CharacterValue(playah.id, "ResidenceIdent"));
        if(res_ident.x == pres_ident.x && res_ident.y == pres_ident.y && res_ident.z == pres_ident.z) {
          //ring doorbell for this player.
          alt.emitClient(playah, "residenceColUi", "playdoorbellsound");
          console.log(`PID: ${playah.id} is inside the house -> doorbell was rang on, ringing doorbell for this player`);
        } else { console.log(`PID: ${playah.id} is inside a interior but not the one we rang doorbell for.`); console.log(`player: ${pres_ident} playah: ${res_ident}`); }
      } else { console.log(`PID: ${playah.id} is not in an interior.`); }
    });

  }
});

//webview end.

var markerPositions = [];
var blipPositions = [];

pool.getConnection(function(err, connection) {
  if (err) throw error;
//connection.query('SELECT * FROM `property_residence`', function (error, results, fields) {
  var query = connection.query('SELECT * FROM `property_residence`', function (error, results, fields) {
  connection.release();
  
  if (error) throw error;

  var loaded = 0;
  for (var i in results) {
      //---------FRONT DOOR START
      //cords for frontdoor
      var cords = results[i].Frontdoor.split(", ");
      //colshape for frontdoor
      var newShape = new alt.ColshapeCylinder(cords[0], cords[1], cords[2], 0.7, 3);
      //store frontdoor data and colshape ident.
      dbstore.Residence(newShape.pos, results[i]);
      dbstore.ColIdent(newShape.pos, {ColType:"Residence"});

      blipPositions.push({
        x: cords[0],
        y: cords[1],
        z: cords[2],
        name: results[i].Address,
        LM_icon: 'blip_40'
      });


      //push house door marker.
      markerPositions.push({
        x: cords[0],
        y: cords[1],
        z: cords[2],
        type: 27,
        sx: 0.8,
        sy: 0.8,
        sz: 1,
        r: 3,
        g: 203,
        b: 253,
        a: 100,
        dimension: 0
      });
      //---------FRONT DOOR END



      //---------BACK DOOR START
      
      if(results[i].Backdoor != null) {
      //cords for frontdoor
      var backdoorcords = results[i].Backdoor.split(", ");
      //colshape for frontdoor
      var newShapeBackdoor = new alt.ColshapeCylinder(backdoorcords[0], backdoorcords[1], backdoorcords[2], 0.7, 3);
      dbstore.ColIdent(newShapeBackdoor.pos, {ColType:"Residence_Backdoor"});
      dbstore.ColIdentValue(newShapeBackdoor.pos, "HouseIdent", newShape.pos);

      //TODO NOT WORKING. after sleep: this works now.
      var testone = dbstore.ColIdentValue(newShapeBackdoor.pos, "HouseIdent");
      var test = dbstore.Residence(testone);
      //console.log(JSON.stringify(test));

      //push house backdoor marker.
      markerPositions.push({
        x: backdoorcords[0],
        y: backdoorcords[1],
        z: backdoorcords[2],
        type: 25,
        sx: 0.8,
        sy: 0.8,
        sz: 1,
        r: 252,
        g: 140,
        b: 42,
        a: 100,
        dimension: 0
      });
      } else {
        //console.log("this house does not have a backdoor, skipping...");
      }
      
      //---------BACK DOOR END


      loaded += 1;
  }
  console.log("loaded", loaded, " houses from DB using mysql.");

  //console.log("end of query...");
});
});
//console.log("loadhouses.mjs has loaded!");



export function EnterPlayerToResidence(player, force, backdoor) {
  if(force == undefined || force == false){ //use force if user is logged in and isinsideinterior = 1 (in db)
    if (dbstore.CharacterValue(player.id, "IsPlayerInResidenceCol") == 0) {
        chat.send(player, "{FF0000} nothing to enter");
        return;
    }
  }

  var residencedetails;

  if(dbstore.CharacterValue(player.id, "ResidenceColType") == "Residence") {
    residencedetails = dbstore.Residence(JSON.parse(dbstore.CharacterValue(player.id, "ResidenceIdent")));
    var resinteriorid = residencedetails.Interior_ID; //this is the interiorID
    var resID = residencedetails.ID; //use this as DIMENSION
    var getinteriordata = tppos.teleportpositions[resinteriorid-1]; //-1 to offset. js array starts at 1 and not 0 like mysql
    var interiordatafrontdoor = getinteriordata.Front_Door;
    var backdoorcords = getinteriordata.Back_Door;
    var cords = interiordatafrontdoor.split(", ");
    //backdoor
    if(backdoor && backdoorcords != null) {
      cords = backdoorcords.split(", ");
    }

    alt.emitClient(player, 'fadeOutScreen', true, 1000);
    setTimeout(() => {
      dbstore.CharacterValue(player.id, "isinsideinterior", 1);
      player.pos = { x: cords[0], y: cords[1], z: cords[2] }; //why not working...
      player.dimension = resID;
      setTimeout(() => {
        alt.emitClient(player, 'fadeOutScreen', false, 1000);
        chat.send(player, "you entered the house...");
      }, 500);
    }, 1000);
  }
  else if(dbstore.CharacterValue(player.id, "ResidenceColType") == "Residence_Backdoor") {
    //TODO
    chat.send(player, "{FF0000} TODO Residence_Backdoor");
  }
}




function ExitPlayerFromResidence(player) {
  if (dbstore.CharacterValue(player.id, "isinsideinterior") == 0) {
    chat.send(player, "{FF0000} nothing to exit");
    return;
  }
  alt.emitClient(player, 'fadeOutScreen', true, 1000);
  setTimeout(() => {
    player.pos = JSON.parse(dbstore.CharacterValue(player.id, "ResidenceIdent")); //exit from THIS residence to frontdoor.
    player.dimension = 0; //always 0 when exiting from interiors.
    dbstore.CharacterValue(player.id, "isinsideinterior", 0);
    setTimeout(() => {
      alt.emitClient(player, 'fadeOutScreen', false, 1000);
      chat.send(player, "you exited the house...");
    }, 500);
  }, 1000);
}


//replace these with emits from client.
chat.registerCmd("enter", (player, args) => {
  EnterPlayerToResidence(player);
});

chat.registerCmd("exit", (player, args) => {
  ExitPlayerFromResidence(player);
});







//FRONTDOOR aka MAIN with data.
alt.on("entityEnterColshape", (colshape, entity) => {
  if(entity instanceof alt.Player && entity.vehicle == undefined) { //only ok if we are only player.
  
  var ident = dbstore.ColIdent(colshape.pos); //only run if its a residence.
  if(ident.ColType != "Residence")
    return;

  alt.emitClient(entity, "residenceColUi", "show");
  //which buttons are available

  var residence = dbstore.Residence(colshape.pos);
  var character = dbstore.Character(entity.id);
  var havehousekeys = false;

  if(residence.CharacterIDsAccess != null) { //not set any keys yet. or is empty.
    let keylist = JSON.parse(residence.CharacterIDsAccess);
    if(keylist.hasOwnProperty(JSON.stringify(character.ID))) {
      havehousekeys = true;
    }
  }

  if(residence.Owner_ID == character.ID || residence.Owner_ID == null || havehousekeys || residence.locked == 0) {
    alt.emitClient(entity, "residenceColUi", "construct", 'enter');
  }

  alt.emitClient(entity, "residenceColUi", "construct", 'doorbell');

  if(residence.Owner_ID == character.ID || havehousekeys ) { //owner or has keys
    if(residence.locked == 0) {
      alt.emitClient(entity, "residenceColUi", "construct", 'unlocked');
    } else {
      alt.emitClient(entity, "residenceColUi", "construct", 'locked');
    }
  }

  

  //get residence data and print.
  var loadresidencedata = dbstore.Residence(colshape.pos);
  chat.send(entity, "you entered a Residence colshape");
  chat.send(entity, JSON.stringify(loadresidencedata));
  console.log(JSON.stringify(loadresidencedata));
  
  dbstore.CharacterValue(entity.id, "IsPlayerInResidenceCol", 1);
  dbstore.CharacterValue(entity.id, "ResidenceIdent", JSON.stringify(colshape.pos));
  dbstore.CharacterValue(entity.id, "ResidenceColType", "Residence");

  }
});
//FRONTDOOR aka MAIN with data.
alt.on("entityLeaveColshape", (colshape, entity) => {
  if(entity instanceof alt.Player && entity.vehicle == undefined) { //only ok if we are only player.

  var ident = dbstore.ColIdent(colshape.pos); //only run if its a residence.
  if(ident.ColType != "Residence")
    return;

  alt.emitClient(entity, "residenceColUi", "hide");
  chat.send(entity, "{FF0000}you left a Residence colshape");

  dbstore.CharacterValue(entity.id, "IsPlayerInResidenceCol", 0);
  //dbstore.CharacterValue(entity.id, "ResidenceIdent", "0"); //leave them !
  //dbstore.CharacterValue(entity.id, "ResidenceColType", "0"); //leave them !
  }
});










//backDOOR aka MAIN with data.
alt.on("entityEnterColshape", (colshape, entity) => {
  if(entity instanceof alt.Player && entity.vehicle == undefined) { //only ok if we are only player.
    

  var ident = dbstore.ColIdentValue(colshape.pos, "ColType"); //only run if its a residence backdoor.
  if(ident != "Residence_Backdoor")
    return;
  
  var colshapepos = dbstore.ColIdentValue(colshape.pos, "HouseIdent"); //actual house colshape?
  
  alt.emitClient(entity, "residenceColUi", "show");
  //which buttons are available

  var residence = dbstore.Residence(colshapepos);
  console.log(JSON.stringify(residence));
  var character = dbstore.Character(entity.id);
  var havehousekeys = false;

  if(residence.CharacterIDsAccess != null) { //not set any keys yet. or is empty.
    let keylist = JSON.parse(residence.CharacterIDsAccess);
    if(keylist.hasOwnProperty(JSON.stringify(character.ID))) {
      havehousekeys = true;
    }
  }

  //check if we have ENTER access.
  if(residence.Owner_ID == character.ID || residence.Owner_ID == null || havehousekeys || residence.locked == 0) {
    alt.emitClient(entity, "residenceColUi", "construct", 'enter_backdoor');
  }

  if(residence.Owner_ID == character.ID || havehousekeys ) { //owner or has keys
    if(residence.locked == 0) {
      alt.emitClient(entity, "residenceColUi", "construct", 'unlocked');
    } else {
      alt.emitClient(entity, "residenceColUi", "construct", 'locked');
    }
  }

  //get residence data and print.
  var loadresidencedata = dbstore.Residence(colshapepos);
  chat.send(entity, "you entered a Residence colshape backdoor");
  chat.send(entity, JSON.stringify(loadresidencedata));
  console.log(JSON.stringify(loadresidencedata));
  
  dbstore.CharacterValue(entity.id, "IsPlayerInResidenceCol", 1);
  dbstore.CharacterValue(entity.id, "ResidenceIdent", JSON.stringify(colshapepos));
  dbstore.CharacterValue(entity.id, "ResidenceColType", "Residence");


  }
});

alt.on("entityLeaveColshape", (colshape, entity) => {
  if(entity instanceof alt.Player && entity.vehicle == undefined) { //only ok if we are only player.

  var ident = dbstore.ColIdentValue(colshape.pos, "ColType"); //only run if its a residence backdoor.
  if(ident != "Residence_Backdoor")
    return;

  alt.emitClient(entity, "residenceColUi", "hide");
  chat.send(entity, "{FF0000}you left a Residence_Backdoor");

  dbstore.CharacterValue(entity.id, "IsPlayerInResidenceCol", 0);
  //dbstore.CharacterValue(entity.id, "ResidenceIdent", "0"); //leave them !
  //dbstore.CharacterValue(entity.id, "ResidenceColType", "0"); //leave them !

  }
  });











alt.on("playerConnect", (player) => {
  for(var i = 0; i < markerPositions.length; i++) {
    alt.emitClient(player, "createMarker", markerPositions[i]);
  }
});

//new map blips.
alt.onClient("clientMapIsNowReady", (player) => {
  console.log("sending residence blips to new better map for "+player.name);
  for(var i = 0; i < blipPositions.length; i++) {
      alt.emitClient(player, "addLandmarkUsingInGameCoords", blipPositions[i].x, blipPositions[i].y, blipPositions[i].z, blipPositions[i].LM_icon, blipPositions[i].name, 0, true, '15px'); //0 at all zooms.
  }
});