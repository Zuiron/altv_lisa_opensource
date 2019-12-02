import * as alt from "alt";
import * as game from "natives";

var nameplate = new alt.WebView("http://resource/client/index.html");

function drawnameplate(x, y, z){
    const [alwaysempty, screen_x, screen_y] = game.getActiveScreenResolution();
    let [bol, _x, _y] = game.getScreenCoordFromWorldCoord(x,y,z);

    const camCord = game.getGameplayCamCoords();
    const dist = game.getDistanceBetweenCoords(camCord.x,camCord.y,camCord.z, x, y, z, 1)
    if (dist > 20) { nameplate.emit('updatenameplate', 0, 0, false); return; }

    let scale = (4.00001/dist) * 0.3
    if (scale > 0.3)
        scale = 0.3;

    const fov = (1/game.getGameplayCamFov())*100;
    scale = scale*fov;
    

    const pppx = screen_x / 1.0; //points per pixel x
    const pppy = screen_y / 1.0; //points per pixel y

    const style_l = pppx * _x; //this should be in html, style.left:
    const style_t = pppy * _y; //this should be in html, style.top:

    nameplate.emit('updatenameplate', style_l, style_t, bol, scale);
    //}
}
/*
var mainLoopId = alt.setInterval(function(){
    drawnameplate(1367.7890625, -580.6945190429688, 74.3699951171875);
}, 3000);
*/

alt.setInterval(() => {
    drawnameplate(1367.7890625, -580.6945190429688, 74.3699951171875);
}, 0);
