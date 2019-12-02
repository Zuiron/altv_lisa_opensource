/* fuelpumps clientside */
import * as alt from "alt";
import * as game from "natives";
/*
alt.on("update", () => {
    game.drawBox(1171.068115234375, -343.4769287109375, 67.0, 1189.95166015625, -316.6022033691406, 73.0, 255, 255, 255, 100);

    game.drawBox(166.25933837890625, 6591.49462890625, 30.0, 193.88571166992188, 6614.79541015625, 36.0, 255, 255, 255, 100);
});
*/
game.requestAnimDict('weapons@misc@jerrycan@');

var fuelgui = new alt.WebView("http://resource/client/index.html");
/*
fuelgui.on('requestStartFill', () => {
    alt.emitServer('requestStartFill');
});
*/
var fueltoggle = false;
//var mouseon = false;
alt.onServer("toggleFuelStationGUI", (toggle) => {
    fuelgui.emit('toggleFuelStationGUI', toggle);
    /*
    if(!toggle) {
        fuelgui.unfocus();
        alt.showCursor(false);
        mouseon = false;
    }*/
    fueltoggle = toggle;
});


alt.onServer("updateLastVehStatusMsgFuelStation", (data) => {
    fuelgui.emit('updateLastVehStatusMsgFuelStation', data);
});

alt.onServer("updateLastVehStatusMsgFuelStation2", (data) => {
    fuelgui.emit('updateLastVehStatusMsgFuelStation2', data);
});

alt.onServer("fuelStationGuiFuelCostUpdate", (cost, type) => {
    fuelgui.emit('fuelStationGuiFuelCostUpdate', cost, type);
});

alt.onServer("fixVehicleDriveableAfterFillingFuel", (vehicle) => {
    game.setVehiclePetrolTankHealth(vehicle.scriptID, 999); //was 1, 999 maybe?
    //alt.log("hope this works."); //jepp this fixes the issue.
});

alt.on('keyup', (key) => {
    if (key == 0x45 && fueltoggle) {
        alt.emitServer('requestStartFill');
    }
});
/*
alt.on('keydown', (key) => {
    if (key == 0x12 && fueltoggle) {
        fuelgui.focus();
        alt.showCursor(true);
        mouseon = true;
    }
});
alt.on('keyup', (key) => {
    if (key == 0x12 && fueltoggle) {
        fuelgui.unfocus();
        alt.showCursor(false);
        mouseon = false;
    }
});

alt.on("update", () => {
    if(mouseon) {
      //game.showCursorThisFrame(); //dont need this anymore...
      game.disableAllControlActions(2); //2 disables both 0 and 1 - 0 mouse and keyboard. 1 gamepad
  
      //this only disables melee hit left click and mouse camera movement.
      //game.disableControlAction(0, 1, true); //-- LookLeftRight
      //game.disableControlAction(0, 2, true); //-- LookUpDown
      //game.disableControlAction(0, 142, true); //-- MeleeAttackAlternate
      //game.disableControlAction(0, 106, true); //-- VehicleMouseControlOverride
    }
  });
  */