import * as alt from "alt";
import chat from "chat";
import mysql from "mysql";
import * as dbstore from "lisa_dbstore";

export var teleportpositions = [];

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
  //connection.query('SELECT * FROM `interiors_garage`', function (error, results, fields) {
  var query = connection.query('SELECT * FROM `interiors_garage`', function (error, results, fields) {
    connection.release();
    
    if (error) throw error;

    for (var i in results) {
    
        teleportpositions[i] = results[i];
        teleportpositions[i].Vehicle_Spots = JSON.parse(teleportpositions[i].Vehicle_Spots); //MUST DO.

    }
    //console.log(JSON.stringify(teleportpositions));
});  
});  


chat.registerCmd("intg", (player, args) => {
    if (args.length != 1) {
        chat.send(player, "{FF0000} /intg [interiorID from DB interiors_garage]");
        return;
    }
    var correct = Number(args[0]);
    var get = teleportpositions[correct-1];
    var xyz = get.On_Foot_Entrance;
    var cords = xyz.split(", ");

    player.pos = { x: cords[0], y: cords[1], z: cords[2] };
    chat.send(player, `Tp2: ${args[0]} Comment: ${get.Comments}`);
});