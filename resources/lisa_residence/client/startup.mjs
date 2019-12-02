import * as alt from "alt";
import * as game from "natives";

game.doorControl(520341586, -14.86892, -1441.182, 31.19323, 1, 0.0, 50.0, 0); //lock franklin door.

//webview testing
var residenceColUi = new alt.WebView("http://resource/client/residenceColUi/index.html");
//var residenceColUi;
var mouse = false;
var allowmouse = false;

var whatdoor = "none";

alt.on('keydown', (key) => {
  //if (key == "ALT".charCodeAt(0)) {
  if (key == 0x12) {
    if(allowmouse) {
      residenceColUi.url = "http://resource/client/residenceColUi/index.html#menu";
      residenceColUi.focus();
      mouse = true;
      alt.showCursor(true);
    }
  }
});

alt.on('keyup', (key) => {
  if (key == 0x12) {
    if(allowmouse) {
      residenceColUi.url = "http://resource/client/residenceColUi/index.html#0";
      residenceColUi.unfocus();
      mouse = false;
      alt.showCursor(false);
    }
  }

  if(mouse && allowmouse) {
    if (key == 0x45) { //E
      if(whatdoor == "enter") {
        residenceColUi.emit('keybind_enterResidence');
      } 
      else if(whatdoor == "enter_backdoor") {
        residenceColUi.emit('keybind_enterResidenceBackdoor');
      }
    }
    else if (key == 0x52) { //R
      residenceColUi.emit('keybind_ToggleResidenceLock');
    }
    else if (key == 0x51) { //Q
      residenceColUi.emit('keybind_RingResidenceDoorBell');
    }
  }
});


alt.onServer("residenceColUi", (arg, arg2) => {
  if(arg == "show") {
    residenceColUi.emit('show');
    allowmouse = true;
  }
  else if(arg == "hide") {
    residenceColUi.emit('hide');
    allowmouse = false;
  }
  else if(arg == "construct") {
    residenceColUi.emit('construct', arg2);
    if(arg2 == "enter" || arg2 == "enter_backdoor") {
      whatdoor = arg2;
    }
  }
  else if(arg == "playdoorbellsound") {
    residenceColUi.emit('playdoorbellsound');
  }
});

residenceColUi.on('enterResidence', () => {
  alt.emitServer('residenceColUi','enterResidence');
});
residenceColUi.on('enterResidenceBackdoor', () => {
  alt.emitServer('residenceColUi','enterResidenceBackdoor');
});

residenceColUi.on('lockResidence', () => {
  alt.emitServer('residenceColUi','lockResidence');
});
residenceColUi.on('unlockResidence', () => {
  alt.emitServer('residenceColUi','unlockResidence');
});

residenceColUi.on('ringResidenceDoorBell', () => {
  alt.emitServer('residenceColUi','ringResidenceDoorBell');
});

alt.setInterval(() => {
  if(mouse && allowmouse) {
    //game.showCursorThisFrame(); //dont need this anymore...
    game.disableAllControlActions(2); //2 disables both 0 and 1 - 0 mouse and keyboard. 1 gamepad

    //this only disables melee hit left click and mouse camera movement.
    //game.disableControlAction(0, 1, true); //-- LookLeftRight
    //game.disableControlAction(0, 2, true); //-- LookUpDown
    //game.disableControlAction(0, 142, true); //-- MeleeAttackAlternate
    //game.disableControlAction(0, 106, true); //-- VehicleMouseControlOverride
  }
}, 0);
//webview end.





var rot = 0; //marker Z rotation var
var markerPositions = [];
var markerPositions2 = [];


//alt.emitClient(player, "createMarker", markerPositions[i]);
alt.onServer("createMarker", (me) => {
  me.z = parseFloat(me.z) + 0.05; //to offset marker.
  markerPositions.push(me);
});

var enableDrawingOfMarkers = false;
alt.onServer("enableDrawMarkers", (toggle) => {
  enableDrawingOfMarkers = toggle;
});

//measure distance between two sets of coords xyz
function distance(distOne, distTwo) {
    let distSqr = Math.pow(distOne.x - distTwo.x, 2) + Math.pow(distOne.y - distTwo.y, 2) + Math.pow(distOne.z - distTwo.z, 2);
    return distSqr;
}

//check range on every coord every 2 second and push those into new array - performance improvement.
var mainLoopId = alt.setInterval(function(){
  if(enableDrawingOfMarkers) {
    if(markerPositions.length >= 1) {//only start if its populated.
      markerPositions2.length = 0; //reset array to render.
      for(var i = 0; i < markerPositions.length; i++) {
        var position = alt.Player.local.pos;
        var dist = distance(position, {x: markerPositions[i].x, y: markerPositions[i].y, z: markerPositions[i].z});
        if(dist < 350) {
          markerPositions2.push(markerPositions[i]);
        }
      }
    }
  }
}, 2000);
// To stop the loop
//clearInterval(mainLoopId);

//Optimized version.
alt.setInterval(function() {
  if(alt.Player.local.vehicle != null) //dont do shit if we are in a vehicle.
    return;

  if(enableDrawingOfMarkers) {
    if(markerPositions2.length >= 1) {
      rot -= 0.3; //rotate the marker

      let localDim = alt.Player.local.getSyncedMeta("dimension");
      for(var i = 0; i < markerPositions2.length; i++) {

        
        if(markerPositions2[i].dimension != localDim) {
          continue;
        }
        

        game.drawMarker(markerPositions2[i].type,
          markerPositions2[i].x, //position
          markerPositions2[i].y,
          markerPositions2[i].z,
          0, //direction
          0,
          0,
          0, //rotation
          0,
          rot,
          markerPositions2[i].sx, //scale 0.8
          markerPositions2[i].sy, //scale 0.8
          markerPositions2[i].sz, //scale 1
          markerPositions2[i].r, //rgba
          markerPositions2[i].g,
          markerPositions2[i].b,
          markerPositions2[i].a, //alpha - transparency
          false,
          false,
          2,
          false,
          undefined,
          undefined,
          false);
      }
    }
  }
}, 1);