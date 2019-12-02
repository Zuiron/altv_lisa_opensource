import * as alt from "alt";
import * as game from "natives";

var mapview_active = false;
var mapview = new alt.WebView("http://resource/client/map/map_fullscreen.html");


function setToggleMap(toggle) {
    if(toggle) {
        mapview.emit('toggleMap', true);
        mapview.focus();
        alt.showCursor(true);
    } else {
        mapview.emit('toggleMap', false);
        mapview.unfocus();
        alt.showCursor(false);
    }
    mapview_active = toggle;
}

alt.on('keyup', (key) => {
    if (key == 0x21) { // PAGE UP KEY
        if(!mapview_active) {
            //show map
            setToggleMap(true);
        } else {
            //hide map
            setToggleMap(false);
        }
    }
});

alt.setInterval(() => {
    if(mapview_active) {
        //this only disables melee hit left click and mouse camera movement.
        game.disableControlAction(0, 1, true); //-- LookLeftRight
        game.disableControlAction(0, 2, true); //-- LookUpDown
        game.disableControlAction(0, 14, true); //scroll wep
        game.disableControlAction(0, 15, true); //scroll wep
        game.disableControlAction(0, 16, true); //scroll wep
        game.disableControlAction(0, 17, true); //scroll wep
        game.disableControlAction(0, 85, true); //radio wheel in vehicle
        game.disableControlAction(0, 99, true); //scroll wep
        game.disableControlAction(0, 142, true); //-- MeleeAttackAlternate
        game.disableControlAction(0, 106, true); //-- VehicleMouseControlOverride
    }
}, 0);

var isMapReady = false;
mapview.on('mapIsNowReady', () => {
    isMapReady = true;
    alt.emitServer("clientMapIsNowReady"); //load dynamic blips.
    alt.emit("clientMapIsNowReady"); //load static blips.
});

mapview.on('setGameMapWaypoint', (x, y, z) => {
    game.setNewWaypoint(x, y);
    game.playSoundFrontend(-1, "WAYPOINT_SET", "HUD_FRONTEND_DEFAULT_SOUNDSET", 1);
    alt.log('suppose to set waypoint now..');
});

alt.on("addLandmarkUsingInGameCoords", (x, y, z, icon, text, zoom, scale, iconsize) => {
    mapview.emit('addLandmarkUsingInGameCoords', x, y, z, icon, text, zoom, scale, iconsize);
});

alt.onServer("addLandmarkUsingInGameCoords", (x, y, z, icon, text, zoom, scale, iconsize) => {
    mapview.emit('addLandmarkUsingInGameCoords', x, y, z, icon, text, zoom, scale, iconsize);
});

//draw players on map :D
alt.setInterval(function(){
    if(!isMapReady) //is map ready ?
        return;
    
    if(!mapview_active) //is map visible/on ?
        return;
    
    alt.Player.all.forEach((player) => {
        let meta_chid = player.getMeta('Character_ID');
        let meta_chname = player.getMeta('Character_Name');

        if(meta_chid == undefined && meta_chname == undefined) {
            meta_chid = player.getSyncedMeta('Character_ID');
            meta_chname = player.getSyncedMeta('Character_Name');
        }
        
        if(meta_chid == undefined && meta_chname == undefined)
            return;
        
        mapview.emit('updatePlayerMarker', player.id, player.pos, meta_chid, meta_chname);
        //alt.log('updating map marker for: '+player.id);
    });
}, 100); //how fast can we go...?