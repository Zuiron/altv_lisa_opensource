import * as alt from "alt";
import chat from "chat";
import mysql from "mysql";
import * as dbstore from "lisa_dbstore";

var storeglobals = dbstore.Globals();

var pool  = mysql.createPool({
    connectionLimit : 100,
    host            : storeglobals.host,
    user            : storeglobals.user,
    password        : storeglobals.password,
    database        : storeglobals.database
});

pool.getConnection(function(err, connection) {
    if (err) throw error;
  //connection.query(`SELECT * FROM vehicles`, function (error, results, fields) {
    var query = connection.query(`SELECT * FROM vehicles_settings`, function (error, results, fields) {
      connection.release();
    
    if (error) throw error;
  
    var loaded = 0;
    for (var i in results) {
        dbstore.VehicleSettings(results[i].Game_Name, results[i]);

        loaded += 1;
    }
    console.log("loaded", loaded, " vehicle's settings data...");
    });
});