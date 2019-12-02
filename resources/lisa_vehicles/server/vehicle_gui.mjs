import * as alt from "alt";
import chat from "chat";
import mysql from "mysql";
import * as dbstore from "lisa_dbstore";
import * as lisafunctions from "lisa_functions";

function toggleVehicleGui(player, toggle, vehicle) {  
    if(toggle) {
      const vehdbinfo = dbstore.Vehicle(vehicle.id);
      const vehsettings = dbstore.VehicleSettings(vehdbinfo.VehName);
      alt.emitClient(player, "updatevehiclefuel", dbstore.VehicleValue(vehicle.id, "Fuel"), vehsettings.Fuel_Tank_Capacity);
      alt.emitClient(player, "updatevehicleodometer", dbstore.VehicleValue(vehicle.id, "Odometer"));
    }
    alt.emitClient(player, "togglevehiclegui", toggle);
  }
  
  alt.on('playerEnteredVehicle', (player, vehicle, seat) => {
    if(seat != 1)
      return;
  
    alt.emitClient(player, "currentVehicleId", vehicle.id);
    alt.emitClient(player, "playerEnteredVehicle", seat);
    toggleVehicleGui(player, true, vehicle);
  });
  
  alt.on('playerLeftVehicle', (player, vehicle, seat) => {
    if(seat != 1)
      return;
    
    toggleVehicleGui(player, false, vehicle);
    alt.emitClient(player, "playerLeftVehicle", vehicle.id, seat);
  });
  
  alt.on('playerChangedVehicleSeat', (player, vehicle, oldseat, newseat) => {
    if(newseat != 1)
      return;
  
    toggleVehicleGui(player, true, vehicle);
    alt.emitClient(player, "currentVehicleId", vehicle.id);
    alt.emitClient(player, "playerEnteredVehicle", newseat); //FIX ???
  });
  
  alt.onClient('add2VehicleOdomoter', (player, vehicleid, kmThisInstance) => {
    if(kmThisInstance <= 0.01)
      return;
    //console.log(vehicleid + ", " + metersThisInstance);
    const currodom = dbstore.VehicleValue(vehicleid, "Odometer");
    const newodom = Number(currodom) + Number(kmThisInstance);
    console.log('ODOMETER: curr: '+currodom+', add: '+kmThisInstance+', is: '+newodom);
    dbstore.VehicleValue(vehicleid, "Odometer", JSON.stringify(newodom));

    //also calc vehicle fuel consumption.
    const vehname = dbstore.VehicleValue(vehicleid, "VehName");
    const vehcurrentfuel = dbstore.VehicleValue(vehicleid, "Fuel");
    const FuelEco = dbstore.VehicleSettingsValue(vehname, "Fuel_Economy"); // - L/100km
    const MaxFuelTank = dbstore.VehicleSettingsValue(vehname, "Fuel_Tank_Capacity");

    if(FuelEco == null || FuelEco == undefined) {
      console.log("missing fuel economy from vehicle settings");
      return;
    } 

    const fuelused = (Number(FuelEco) / 100) * Number(kmThisInstance);
    let newfuelvalue = Number(vehcurrentfuel) - Number(fuelused);
    if(newfuelvalue < 0) {
      newfuelvalue = 0;
      //disable engine?
    }


    console.log('FUEL: curr: '+vehcurrentfuel+', substract: '+fuelused+', is: '+newfuelvalue);
    dbstore.VehicleValue(vehicleid, "Fuel", `${newfuelvalue}`);

    //if player is still inside vehicle.
    if(player.vehicle != null || player.vehicle != undefined) {
      alt.emitClient(player, "updatevehiclefuel", `${newfuelvalue}`, `${MaxFuelTank}`);
    }
  });