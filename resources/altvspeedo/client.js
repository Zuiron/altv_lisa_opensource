import * as alt from "alt";

let view = new alt.WebView("http://resource/html/index.html");

let localPlayer = alt.Player.local;
let speedoShown = false;




alt.setInterval(() => {
    if(!localPlayer){
        localPlayer = alt.Player.local;
    }
    let veh = localPlayer.vehicle;
    if (veh !== null && speedoShown){
        view.emit('drawSpeedo', Math.ceil(veh.speed*2.236936), veh.gear, veh.rpm)
    }

}, 0);


view.on('speedoLoaded', () => {
    speedoShown = true;
});

view.on('speedoUnloaded', () => {
    speedoShown = false;
})


alt.onServer("playerEnterVehicle", (seat) => {
    if (seat == 1){ //driver
        if (!speedoShown){
          view.emit('showSpeedo', true);
        }
    }
})

alt.onServer("playerLeftVehicle", (seat) => {
    if (seat == 1){ //driver
        if (speedoShown){
          view.emit('showSpeedo', false);
        }
    }
})

alt.onServer("playerChangedVehicleSeat", (seat) => {
    if (seat == 1){ //driver
        if (!speedoShown){
          view.emit('showSpeedo', true);
        }
    }
})