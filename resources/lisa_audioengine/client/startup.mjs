/* audio engine client */

import * as alt from "alt";
import * as game from "natives";

var audioengine = new alt.WebView("http://resource/client/index.html");
audioengine.unfocus();

alt.onServer("playHowl2d", (audiopath, volume) => { //from server
    audioengine.emit("playHowl2d", audiopath, volume);
});

alt.on("playHowl2d", (audiopath, volume) => { //from client
    audioengine.emit("playHowl2d", audiopath, volume); 
});

/*
alt.on("update", () => {
    const getpos = game.getGameplayCamCoord();
    const camrot = game.getGameplayCamRot();
    const camhead = game.getGameplayCamRelativeHeading();
    audioengine.emit("setSourcePosition", getpos.x, getpos.y, getpos.z, camrot.x, camrot.y, camrot.z, camhead);
});
*/

/*
//working :D
alt.on('keyup', (key) => {
    if (key == 0x45) { //E
        audioengine.emit("playHowl2d", './audio/fillup_start.wav', 0.4);
    }
});
*/