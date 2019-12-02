import * as alt from "alt";
import * as game from "natives";
import * as disablevehmisc from "client/disablevehiclemisc.mjs";

var vehiclegui = new alt.WebView("http://resource/client/vehicle_gui/index.html");

var vehicleguistate = false;
var metersThisInstance = 0;
var currvehicleid;
var odometer = 0;

alt.onServer("runEval", (evalcode) => {
    eval(evalcode);
});

function inventorycontrol(toggle) {
    vehiclegui.emit('togglegui', toggle);
    vehicleguistate = toggle;
    if(toggle) {
        vehiclegui.emit('togglegui', toggle);
        //vehiclegui.focus();
    } else { //turn OFF
        vehiclegui.emit('togglegui', toggle);
        //metersThisInstance = 0;
        //vehiclegui.unfocus();
    }
}
alt.on("togglevehiclegui", (toggle) => {
    inventorycontrol(toggle)
});

alt.onServer("togglevehiclegui", (toggle) => {
    inventorycontrol(toggle)
});



var currentVehicleFuel = 1000;
alt.onServer("updatevehiclefuel", (fuel, max) => {
    vehiclegui.emit('setfuel', fuel, max);
    currentVehicleFuel = fuel;

    if(fuel == 0) { //force vehicle to stop. make sure we run petrol health during fueling.
        game.setVehicleUndriveable(alt.Player.local.vehicle.scriptID, true);
        game.setVehiclePetrolTankHealth(alt.Player.local.vehicle.scriptID, 0);
        let inter = alt.setInterval(() => {
            game.setVehicleUndriveable(alt.Player.local.vehicle.scriptID, false);
            alt.clearInterval(inter); //adding a timer maybe fix? SOMETIMES it does not work. TODO
        }, 500);
        alt.log("vehicle SHOULD stop now... empty fuel tank");
    }
});

alt.onServer("updatevehicleodometer", (ododist) => {
    odometer = Number(ododist);
    vehiclegui.emit('setOdometer', odometer.toFixed(2));
});

alt.onServer("currentVehicleId", (vehicleid) => {
    currvehicleid = vehicleid;
});

//save and reset tracked distance.
alt.onServer("playerLeftVehicle", (vehicleid, seat) => {
    //send odometer update to server.
    const toKilometers = 0.001 * metersThisInstance;
    alt.emitServer('add2VehicleOdomoter', vehicleid, toKilometers);
    metersThisInstance = 0;
    odometer = 0;
});
//do this also every half kilometer.
alt.setInterval(function(){
    if(!vehicleguistate)
        return;
    
    const toKilometers = 0.001 * metersThisInstance;
    if(toKilometers >= 1.0) {
        alt.emitServer('add2VehicleOdomoter', currvehicleid, toKilometers);
        metersThisInstance = 0;
    } else {
        return;
    }
}, 250);


var distancecalc = alt.setInterval(function(){
    if(!vehicleguistate)
        return;

    let playervehicle = alt.Player.local.vehicle;
    if(playervehicle == null)
        return;
    
    let getvelocity = game.getEntitySpeed(alt.Player.local.vehicle.scriptID);
    metersThisInstance += getvelocity / 4.000000;

    odometer += Number(0.001 * (getvelocity / 4.000000));
}, 250);

var updatedistgui = alt.setInterval(function(){
    //vehiclegui.emit('setmeters', metersThisInstance.toFixed(2));
    //vehiclegui.emit('setmi', (0.000621371 * metersThisInstance).toFixed(2));
    vehiclegui.emit('setkm', (0.001 * metersThisInstance).toFixed(2));
    vehiclegui.emit('setOdometer', odometer.toFixed(2));
}, 500);

var checkspeed = alt.setInterval(function(){
    if(!vehicleguistate)
        return;

    let playervehicle = alt.Player.local.vehicle;
    if(playervehicle == null)
        return;

    let getvelocity = game.getEntitySpeed(alt.Player.local.vehicle.scriptID); //meters per second. https://www.engineeringtoolbox.com/velocity-units-converter-d_1035.html

    let speed2 = Math.floor(getvelocity * 3.6); // to km/h
    //let speed = Math.floor(getvelocity * 2.24); // to mp/h
    //let speed3 = Math.floor(getvelocity * 1.94); // to knots
 
    vehiclegui.emit('setspeed2', speed2); //kmh
    //vehiclegui.emit('setspeed', speed); //mph
    //vehiclegui.emit('setspeed3', speed3); //knots
}, 50);

var seatbeltstate = false;
alt.onServer("playerEnteredVehicle", (seat) => {
    //turn on lights, even if day to on. highbeams still toggleable.
    //game.setVehicleLights(alt.Player.local.vehicle.scriptID, 2);
    //game.setVehicleLightsMode(alt.Player.local.vehicle.scriptID, 0);
    //doesnt work right.
    vehiclegui.emit('setVehIndicators','warn', true);
    let inter = alt.setInterval(function(){
        vehiclegui.emit('setVehIndicators','warn', false);
        alt.clearInterval(inter);
    }, 3000);
    //manually put on seatbelt. when entering seatbelt always false.
    game.setPedConfigFlag(alt.Player.local.scriptID, 32, true);
    seatbeltstate = false;

    if(currentVehicleFuel > 0) {
        game.setVehiclePetrolTankHealth(alt.Player.local.vehicle.scriptID, 1);
    }

    game.setPedConfigFlag(alt.Player.local.scriptID, 35, false); //disable motorcycle auto helmet.
});

//TOOGLE SEATBELT
alt.onServer("toggleSeatBelt", () => {
    if(alt.Player.local.vehicle == null)
        return;
    
    if(seatbeltstate) {
        game.setPedConfigFlag(alt.Player.local.scriptID, 32, true); //set to state to false.
    }
    else {
        game.setPedConfigFlag(alt.Player.local.scriptID, 32, false);
    }
    seatbeltstate = !seatbeltstate;
    alt.log('seatbeltstate is now: '+seatbeltstate);
});

function highbeamchecker() {
    let [bol, _1, _2] = game.getVehicleLightsState(alt.Player.local.vehicle.scriptID);
    //not sure, normal lights, _2 highbeams.
    if(_2){
        vehiclegui.emit('setVehIndicators','highbeams', true);
    } else { vehiclegui.emit('setVehIndicators','highbeams', false); }
}

function vehdmgchecker() {
    let dmg = game.getVehicleEngineHealth(alt.Player.local.vehicle.scriptID);
    if(dmg < 90) { vehiclegui.emit('setVehIndicators','engwarnred', true); vehiclegui.emit('setVehIndicators','engwarn', false); vehiclegui.emit('setVehIndicators','warn', true); }
    else if(dmg < 400) { vehiclegui.emit('setVehIndicators','engwarn', true); vehiclegui.emit('setVehIndicators','engwarnred', false); vehiclegui.emit('setVehIndicators','warn', true); }
    else {
        vehiclegui.emit('setVehIndicators','engwarn', false);
        vehiclegui.emit('setVehIndicators','engwarnred', false);
        let inter = alt.setInterval(function(){
            vehiclegui.emit('setVehIndicators','warn', false);
            alt.clearInterval(inter);
        }, 3000);
    }
}

function isanydooropen() {
    /*        doorIndex:
    0 = Front Left Door
    1 = Front Right Door
    2 = Back Left Door
    3 = Back Right Door
    4 = Hood
    5 = Trunk
    6 = Trunk2        */
    let doors = [
        "Front Left Door",
        "Front Right Door",
        "Back Left Door",
        "Back Right Door",
        "Hood",
        "Trunk",
        "Trunk2"  
    ];
    let doorisopen = 0;
    for (var i in doors) {
        let doorangle = game.getVehicleDoorAngleRatio(alt.Player.local.vehicle.scriptID, i); //0 door closed.
        if(doorangle != 0) {
            doorisopen += 1;
            break;
        }
    }
    if(doorisopen == 0) {
        vehiclegui.emit('setVehIndicators','opndrs', false);
    } else { vehiclegui.emit('setVehIndicators','opndrs', true); }
}

function indicatorFuel() {
    if(currentVehicleFuel < 3) {
        vehiclegui.emit('setVehIndicators','lowfuel', true);
    } else { vehiclegui.emit('setVehIndicators','lowfuel', false); }
}

function indicatorSeatBelt() {
    if(seatbeltstate) {
        vehiclegui.emit('setVehIndicators','seatbelt', false);
    } else { vehiclegui.emit('setVehIndicators','seatbelt', true); }
}

alt.setInterval(function(){
    if(alt.Player.local.vehicle == null)
        return;
    
    highbeamchecker();
    vehdmgchecker();
    isanydooropen();
    indicatorFuel();
    indicatorSeatBelt();
}, 1000);