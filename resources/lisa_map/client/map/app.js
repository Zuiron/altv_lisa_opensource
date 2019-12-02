
jQuery(function($){
    $('#yourImageID').smoothZoom({			
        width: '100%',
        height: '100%',
        zoom_BUTTONS_SHOW: "NO",
        pan_BUTTONS_SHOW: "NO",
        pan_LIMIT_BOUNDARY: "NO", /*
        button_SIZE: 18,
        button_ALIGN: "top right",	*/
        zoom_MAX: 600,
        container: 'zoom_container',

        use_3D_Transform: true,
        animation_SMOOTHNESS: 0.0,
        animation_SPEED_ZOOM: 0.0,
        animation_SPEED_PAN: 0.0,

        mouse_DOUBLE_CLICK: false,
        
        /******************************************
        Enable Responsive settings below if needed.
        Max width and height values are optional.
        ******************************************/
        responsive: true,
        responsive_maintain_ratio: false,
        max_WIDTH: '',
        max_HEIGHT: ''
    });	
});		

function igCoord2MapCoord(x, y, z) {
    //pixels per coordinate points.
    var ppp = 0.6827015851137147;
    x = ppp * x;
    y = ppp * y;

    //apply offset.
    x = x + 4362;
    y = y - 5735; y = -y;

    return [x, y, z];
}

function setGameMapWaypoint(x, y, z) {
    alt.emit('setGameMapWaypoint', x, y, z);
}

function addLandmarkUsingInGameCoords(x, y, z, icon, text, zoom, scale, iconsize) { // zoom 0 = always
    var coords = igCoord2MapCoord(x, y, z);

    if(iconsize == undefined) { iconsize = '30px'; }
    
    $('#yourImageID').smoothZoom('addLandmark', [
        `<div class="item mark bringmetofrontbro" data-show-at-zoom="${zoom}" data-allow-scale="${scale}" data-position="${coords[0]},${coords[1]}">
            <div class="markerblip" ondblclick="setGameMapWaypoint(${x},${y},${z})">
                <div class="text marker_info">
                    <strong>${text}</strong>
                </div>
            <img src="images/blips/${icon}.png" width="${iconsize}" alt="mark 1" />
            </div>
        </div>`]
    );
}

function focusToIgCoords(x, y, z, zoom) {
    let coords = igCoord2MapCoord(x, y, z);
    $('#yourImageID').smoothZoom('focusTo', {x: coords[0], y: coords[1], zoom: zoom})
}

$( document ).ready(function() {
    console.log( "ready!" );
    addLandmarkUsingInGameCoords(0, 0, 0, "blip_52", "test test testtest testtesttest", 0, false);
    /*
    addLandmarkUsingInGameCoords(52.97142791748047, 	7255.0419921875, 	1.224853515625);
    addLandmarkUsingInGameCoords(-3427.028564453125, 	967.8065795898438, 	8.3355712890625);
    addLandmarkUsingInGameCoords(488.28131103515625, 	-3378.5009765625, 	6.060791015625);

    addLandmarkUsingInGameCoords(-1761.6658935546875, -2914.4306640625, 13.9296875);
    addLandmarkUsingInGameCoords(2857.384521484375, -1343.116455078125, 15.9853515625);
    addLandmarkUsingInGameCoords(3945.415283203125, 3740.611083984375, 19.5406494140625);
    addLandmarkUsingInGameCoords(-2113.358154296875, 4847.9736328125, 8.3524169921875);
    
    addLandmarkUsingInGameCoords(0, 0, 0);
    */

});

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "interactive") {      //same as:  document.addEventListener("DOMContentLoaded"...   // same as  jQuery.ready
        console.log("All HTML DOM elements are accessible");
    }
    if (event.target.readyState === "complete") {
        console.log("Now external resources are loaded too, like css,src etc... ");
        //focusToIgCoords(-2113.358154296875, 4847.9736328125, 8.3524169921875, 600);
        //tell node map is ready.
        alt.emit('mapIsNowReady');
        console.log('telling .mjs we are ready.');
    }
});


function updatePlayerMarker(playerid, playerpos, charid, charname) {
    //create marker if not exists.
    //console.log(JSON.stringify(playerid));
    //console.log(JSON.stringify(playerpos));
    //console.log(charid+', '+charname);
    if(document.getElementById('playermarker-'+playerid) == null) { //create one
        var playerMarker = document.getElementById('playermarker-'+playerid);
        var coords = igCoord2MapCoord(playerpos.x, playerpos.y, playerpos.z);
        var playermarkername = 'playermarker-'+playerid;
        $('#yourImageID').smoothZoom('addLandmark', [
            `<div id="${playermarkername}" class="item mark playermarker" data-show-at-zoom="0" data-position="${coords[0]},${coords[1]}">
                <div>
                    <div class="text">
                    <strong>[${playerid}-${charid}] ${charname}</strong>
                    <i style="font-size: 8px">${playerpos.x}, ${playerpos.y}, ${playerpos.z}</i>
                </div>
                <img src="images/blips/blip_162.png" width="30px" height="30px" alt="mark 1" />
                </div>
            </div>`]
        );
        console.log('didnt find marker, creating one. for playerid: '+playerid);
    } else { //UPDATE MARKER
        /*
        var coords = igCoord2MapCoord(playerpos.x, playerpos.y, playerpos.z);
        let elem = document.getElementById('playermarker-'+playerid);
        elem.dataset.position = `${coords[0]},${coords[1]}`;

        console.log('updating marker for playerid: '+playerid);
        console.log('dataset now: '+elem.dataset.position);*/

        //lets try re-creating marker.
        $('#yourImageID').smoothZoom('removeLandmark', [$('#playermarker-'+playerid)]);

        var playerMarker = document.getElementById('playermarker-'+playerid);
        var coords = igCoord2MapCoord(playerpos.x, playerpos.y, playerpos.z);
        var playermarkername = 'playermarker-'+playerid;
        $('#yourImageID').smoothZoom('addLandmark', [
            `<div id="${playermarkername}" class="item mark playermarker" data-show-at-zoom="0" data-position="${coords[0]},${coords[1]}">
                <div>
                    <div class="text">
                    <strong>[${playerid}-${charid}]<br> ${charname}</strong>
                    <!--<i style="font-size: 8px">${playerpos.x}, ${playerpos.y}, ${playerpos.z}</i>-->
                </div>
                <img src="images/blips/blip_162.png" width="30px" height="30px" alt="mark 1" />
                </div>
            </div>`]
        );
    }
    //$('#yourImageID').smoothZoom('attachLandmark', [$('#playermarker-'+playerid)]); //updates marker?
    //$('#yourImageID').smoothZoom('refreshAllLandmarks'); //refresh incase script missed something???
}


function changeMapStyle(style){
    document.getElementById('yourImageID').src = `images/map/${style}_squared.png`;
}


function toggleMap(toggle) {
    if(!toggle) {
        document.getElementById('body').style.visibility = 'hidden';
        document.getElementById('body').style.opacity = '0.0';
        console.log('hiding map');
    } else {
        document.getElementById('body').style.visibility = 'visible';
        document.getElementById('body').style.opacity = '1.0';
        console.log('showing map');
    }
}

if('alt' in window) {
    alt.on('toggleMap', toggleMap);
    alt.on('updatePlayerMarker', updatePlayerMarker);
    alt.on('addLandmarkUsingInGameCoords', addLandmarkUsingInGameCoords)
}