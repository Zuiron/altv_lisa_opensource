/* atm client */

import * as alt from "alt";
import * as game from "natives";

var atmgui = new alt.WebView("http://resource/client/index.html");

var atm_locations = [
    { x: -386.733,  y: 6045.953,  z: 31.501},                               //OK
	//{ x: -110.753,  y: 6467.703,  z: 31.784},                             //not atm, bank
	{x: 155.84176635742188, y: 6642.80419921875, z: 31.5882568359375},      //OK
	{x: 174.13186645507812, y: 6637.92529296875, z: 31.5714111328125},      //OK
	{x: 1701.2703857421875, y: 6426.46142578125, z: 32.7509765625},         //OK
	{x: 1735.226318359375, y: 6410.5185546875, z: 35.025634765625},         //OK
	{x: 1703.010986328125, y: 4933.58251953125, z: 42.052001953125},        //OK
	{x: 1968.09228515625, y: 3743.53857421875, z: 32.3297119140625},        //OK
    //{ x: 1174.532,  y: 2705.278,  z: 38.027},                             //not atm, bank
    {x: 1171.5032958984375, y: 2702.545166015625, z: 38.15966796875},       //OK
    {x: 1172.4659423828125, y: 2702.47900390625, z: 38.15966796875},        //OK
	{x: 2564.505615234375, y: 2584.773681640625, z: 38.075439453125},       //OK
	{x: 2558.729736328125, y: 350.953857421875, z: 108.6087646484375},      //OK
	{x: 2558.45263671875, y: 389.4989013671875, z: 108.6087646484375},      //OK
	{x: 1077.7054443359375, y: -776.5186767578125, z: 58.227783203125},     //OK
	{x: 1138.2197265625, y: -468.936279296875, z: 66.7200927734375},        //OK
	{x: 1166.953857421875, y: -456.1714172363281, z: 66.78759765625},       //OK
	{x: 1153.6483154296875, y: -326.8219909667969, z: 69.197021484375},     //OK
    //{ x: 236.4638,  y: 217.4718,  z: 106.840},                            //cluster of atm's
    //---^
    {x: 236.57142639160156, y: 219.6791229248047, z: 106.2835693359375},
    {x: 237.019775390625, y: 218.75604248046875, z: 106.2835693359375},
    {x: 237.45494079589844, y: 217.8197784423828, z: 106.2835693359375},
    {x: 237.89010620117188, y: 216.89669799804688, z: 106.2835693359375},
    {x: 238.3120880126953, y: 216, z: 106.2835693359375},                   //OK ^
    //---

    //{ x: 265.0043,  y: 212.1717,  z: 106.780},                            //cluster of atm's
    //---^
    {x: 265.79339599609375, y: 213.86373901367188, z: 106.2667236328125},
    {x: 265.4769287109375, y: 212.92747497558594, z: 106.2667236328125},
    {x: 265.1604309082031, y: 211.9912109375, z: 106.2667236328125},
    {x: 264.80438232421875, y: 210.989013671875, z: 106.2667236328125},
    {x: 264.4219665527344, y: 210.0263671875, z: 106.2667236328125},        //OK ^
    //---
    {x: -165.13845825195312, y: 232.6813201904297, z: 94.909912109375},     //OK
    {x: -165.16482543945312, y: 234.73846435546875, z: 94.909912109375},    //OK
	{x: -1827.2967529296875, y: 784.8527221679688, z: 138.2982177734375},   //OK
    {x: -1409.7890625, y: -100.5098876953125, z: 52.3809814453125},         //OK
    {x: -1410.3297119140625, y: -98.78241729736328, z: 52.4146728515625},   //OK
	//{ x: -1215.64,  y: -332.231,  z: 37.881},                             //not atm, bank
	{x: -2072.45263671875, y: -317.27471923828125, z: 13.3062744140625},    //OK
	{x: -2975.010986328125, y: 380.1230773925781, z: 14.9912109375},        //OK
	//{ x: -2962.60,  y: 482.1914,  z: 15.762},                             //not atm, bank
	{x: -3144.38232421875, y: 1127.5516357421875, z: 20.85498046875},       //OK
	{x: -1305.4154052734375, y: -706.4044189453125, z: 25.3201904296875},   //OK
	{x: -717.7186889648438, y: -915.6659545898438, z: 19.20361328125},      //OK
	{x: -526.6549682617188, y: -1222.971435546875, z: 18.4454345703125},    //OK
    //{ x: 149.4551,  y: -1038.95,  z: 29.366},                             //not atm, bank
    {x: 147.62637329101562, y: -1035.81103515625, z: 29.3304443359375},     //OK
    {x: 145.93846130371094, y: -1035.191162109375, z: 29.3304443359375},    //OK
    {x: -846.2769165039062, y: -341.3538513183594, z: 38.6651611328125},    //OK
    {x: -846.8439331054688, y: -340.21978759765625, z: 38.6651611328125},   //OK
	//{ x: -1216.27,  y: -331.461,  z: 37.773},                             //not atm, bank
	{x: -56.9538459777832, y: -1752.06591796875, z: 29.4146728515625},      //OK
	{x: -273.0725402832031, y: -2024.5186767578125, z: 30.13916015625},     //OK
	//{ x: 314.187,   y: -278.621,  z: 54.170},                             //not atm, bank
	//{ x: -351.534,  y: -49.529,   z: 49.042},                             //not atm, bank
    {x: -1570.140625, y: -546.7120971679688, z: 34.94140625},               //OK
    {x: -1571.024169921875, y: -547.3714599609375, z: 34.94140625},         //OK
	{x: 33.17802429199219, y: -1348.2593994140625, z: 29.4820556640625},    //OK
    //{ x: 129.216,   y: -1292.347, z: 29.269},                             //cluster
    {x: 129.23077392578125, y: -1291.147216796875, z: 29.2630615234375},    //OK
    {x: 129.6791229248047, y: -1291.9384765625, z: 29.2630615234375},       //OK
    {x: 130.11428833007812, y: -1292.6900634765625, z: 29.2630615234375},   //OK
    //---^
	{x: 289.054931640625, y: -1256.822021484375, z: 29.4315185546875},      //OK
	{ x: 1686.753,  y: 4815.809,  z: 42.008},                               //OK
    {x: -303.27032470703125, y: -829.7406616210938, z: 32.4139404296875},   //OK
    {x: -301.72747802734375, y: -830.017578125, z: 32.4139404296875},       //OK
	{x: 5.19560432434082, y: -919.7933959960938, z: 29.5494384765625},      //OK
	{x: -283.068115234375, y: 6226.04833984375, z: 31.4871826171875},       //OK
	{x: -133.015380859375, y: 6366.48779296875, z: 31.4703369140625},       //OK
    {x: -97.25274658203125, y: 6455.3935546875, z: 31.4534912109375},       //OK
    {x: -95.52527618408203, y: 6457.21337890625, z: 31.4534912109375},      //OK
	{x: 1822.6549072265625, y: 3683.024169921875, z: 34.2674560546875},     //OK
	{x: 540.3164672851562, y: 2671.120849609375, z: 42.153076171875},       //OK
	{x: 380.75604248046875, y: 323.3670349121094, z: 103.5538330078125},    //OK
	{x: 285.4945068359375, y: 143.36703491210938, z: 104.160400390625},     //OK
	{x: 158.61099243164062, y: 234.22418212890625, z: 106.6204833984375},   //OK
    {x: -1204.945068359375, y: -326.25494384765625, z: 37.82275390625},     //OK
    {x: -1205.7890625, y: -324.80438232421875, z: 37.8564453125},           //OK
    {x: -2956.879150390625, y: 487.6219787597656, z: 15.4630126953125},     //OK
    {x: -2959.002197265625, y: 487.71429443359375, z: 15.4630126953125},    //OK
	{x: -3044.00439453125, y: 594.5406494140625, z: 7.7288818359375},       //OK
	{x: -3241.226318359375, y: 997.5560302734375, z: 12.5479736328125},     //OK
	{x: -3240.619873046875, y: 1008.5802001953125, z: 12.817626953125},     //OK
	{x: -537.8505249023438, y: -854.5186767578125, z: 29.2799072265625},    //OK
    {x: -712.945068359375, y: -818.953857421875, z: 23.7193603515625},      //OK
    {x: -710.0439453125, y: -818.993408203125, z: 23.7193603515625},        //OK
    {x: -258.8175964355469, y: -723.5208740234375, z: 33.4586181640625},    //OK
    {x: -256.20660400390625, y: -716.05712890625, z: 33.5091552734375},     //OK
	{x: -203.8417510986328, y: -861.4022216796875, z: 30.2572021484375},    //OK
    {x: 111.23076629638672, y: -775.2395629882812, z: 31.4366455078125},    //OK
    {x: 114.3956069946289, y: -776.4791259765625, z: 31.4029541015625},     //OK
	{x: 112.64176177978516, y: -819.3362426757812, z: 31.3355712890625},    //OK
	{x: 119.0901107788086, y: -883.7274780273438, z: 31.116455078125},      //OK
	{x: -261.99560546875, y: -2012.4263916015625, z: 30.13916015625},       //OK
	{x: -254.38681030273438, y: -692.5054931640625, z: 33.5933837890625},   //OK
	{x: -1415.96044921875, y: -212.03076171875, z: 46.5003662109375},       //OK
	{x: -1430.2021484375, y: -211.06813049316406, z: 46.5003662109375},     //OK
	{x: 288.79119873046875, y: -1282.3516845703125, z: 29.6336669921875},   //OK
    {x: 296.4659423828125, y: -894.1846313476562, z: 29.229248046875},      //OK
    {x: 295.6747131347656, y: -896.123046875, z: 29.21240234375},           //OK
    {x: -1315.7406005859375, y: -834.7252807617188, z: 16.94580078125},     //OK
    {x: -1314.830810546875, y: -835.9912109375, z: 16.94580078125},         //OK
    {x: 89.67033386230469, y: 2.479120969772339, z: 68.3040771484375},       //OK
    {x: -1109.7230224609375, y: -1690.773681640625, z: 4.3590087890625}
];
function distance(distOne, distTwo) {
    let distSqr = Math.pow(distOne.x - distTwo.x, 2) + Math.pow(distOne.y - distTwo.y, 2) + Math.pow(distOne.z - distTwo.z, 2);
    return distSqr;
}

var atmguistate = false;
alt.on('keyup', (key) => {
    if(alt.Player.local.vehicle != null) //dont do shit if we are in a vehicle.
        return;
    
    if (key == 0x45) { // E key
        if(!atmguistate) {
            for (var i=0; i<atm_locations.length; i++) {
                let range = distance(alt.Player.local.pos, {x: atm_locations[i].x, y: atm_locations[i].y, z: atm_locations[i].z});
                if(range > 0.3)
                    continue;
                //we are near a atm.
                alt.emitServer('requestMoneyBank');
                atmgui.emit('toggleAtmGui', true);
                alt.toggleGameControls(false);
                atmgui.focus();
                alt.showCursor(true);
                atmguistate = true;
                return;
            }
        } else {
            atmgui.emit('toggleAtmGui', false);
            alt.toggleGameControls(true);
            alt.showCursor(false);
            atmgui.unfocus();
            atmguistate = false;
        }
    }
});

atmgui.on('cancel', () => {
    if(!atmguistate)
        return;
    
    atmgui.emit('toggleAtmGui', false);
    alt.toggleGameControls(true);
    alt.showCursor(false);
    atmgui.unfocus();
    atmguistate = false;
});

function drawText(msg, x, y, scale, fontType, r, g, b, a, useOutline = true, useDropShadow = true) {
    game.beginTextCommandDisplayText('STRING');
    game.addTextComponentSubstringPlayerName(msg);
    game.setTextFont(fontType);
    game.setTextScale(1, scale);
    game.setTextWrap(0.0, 1.0);
    game.setTextCentre(true);
    game.setTextColour(r, g, b, a);

    if (useOutline)
        game.setTextOutline();

    if (useDropShadow)
        game.setTextDropShadow();

    game.endTextCommandDisplayText(x, y);
}

alt.setInterval(() => {
    if(alt.Player.local.vehicle != null) //dont do shit if we are in a vehicle.
        return;
    
    atm_locations.forEach((atm) => {
        
        //if (alt.Player.local.dimension != 0) //dimensions are not synced clientside. alt:v bug.
        //    return;

        let distanceFromLocal = distance(alt.Player.local.pos, {x: atm.x, y: atm.y, z: atm.z});
        if (distanceFromLocal >= 20)
            return;
        
        let result = game.getScreenCoordFromWorldCoord(atm.x, atm.y, atm.z + 0.2, undefined, undefined);
        if (!result[0])
            return;

        let scale = distanceFromLocal / 25;
        if (scale < 0.5) {
            scale = 0.5;
        }

        if (scale > 0.6)
            scale = 0.6;

        let yModifier = (distanceFromLocal / 25) / 8;
        if (yModifier > 0.05)
            yModifier = 0.05;

        let y = result[2] - yModifier;

        if (y <= 0)
            y = 0;

        drawText('ATM [E]', result[1], y, 0.4, 6, 255, 255, 255, 255, true, false);
    });
}, 0);

alt.on("clientMapIsNowReady", () => {
    for(var i = 0; i < atm_locations.length; i++) {
        alt.emit("addLandmarkUsingInGameCoords", atm_locations[i].x, atm_locations[i].y, atm_locations[i].z, 'atm', 'ATM', 0, true, '15px'); //0 at all zooms.
        
        let blip = {
            x: atm_locations[i].x,
            y: atm_locations[i].y,
            z: atm_locations[i].z,
            sprite: 434,
            color: 4,
            scale: 0.6,
            shortrange: 1,
            name: "ATM"
        };
        alt.emit("createStartupBlip", blip);
    }
    alt.log('making ATM blips');
});

/*for(var i = 0; i < markerPositions.length; i++) {
    alt.emit("createMarker", markerPositions[i]);
}*/

alt.onServer("setBankBalance", (data) => {
    atmgui.emit('setBankBalance', data);
});

alt.onServer("setCashBalance", (data) => {
    atmgui.emit('setCashBalance', data);
});

alt.onServer("atmShowMsg", (data) => {
    atmgui.emit('atmShowMsg', data);
});

atmgui.on('atmAction', (currentAction, elemvalue) => {
    alt.emitServer('atm:doAction', currentAction, elemvalue);
});

atmgui.on('atmPlayPushButtonSound', () => {
    game.playSoundFrontend(-1, "PIN_BUTTON", "ATM_SOUNDS", 1);
});

atmgui.on('atmPlayErrorSound', () => {
    game.playSoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", 1);
});

atmgui.on('atmPlaySuccessSound', () => {
    game.playSoundFrontend(-1, "Hack_Success", "DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS", 1);
})