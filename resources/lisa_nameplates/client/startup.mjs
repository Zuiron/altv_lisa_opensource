import * as alt from "alt";
import * as game from "natives";

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

function Distance(vector1, vector2) {
	if (vector1 === undefined || vector2 === undefined) {
		throw new Error('AddVector => vector1 or vector2 is undefined');
	}

	return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2));
}

alt.setInterval(() => {
    alt.Player.all.forEach((player) => {
        
        if (player.vehicle != undefined)
            return;

        let distanceFromLocal = Distance(player.pos, alt.Player.local.pos);
        if (distanceFromLocal >= 10)
            return;

        
        let result = game.getScreenCoordFromWorldCoord(player.pos.x, player.pos.y, player.pos.z + 1.0, undefined, undefined);
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

        //let playernametodraw = player.name;
        let playernametodraw = '['+player.id+'-';
        
        /*
        let meta_chid = player.getMeta('Character_ID');
        let meta_chname = player.getMeta('Character_Name');

        if(meta_chid == undefined && meta_chname == undefined) {
            meta_chid = player.getSyncedMeta('Character_ID');
            meta_chname = player.getSyncedMeta('Character_Name');
        }
        */
        let meta_chid = player.getSyncedMeta('Character_ID');
        let meta_chname = player.getSyncedMeta('Character_Name');

        if(meta_chid == undefined && meta_chname == undefined)
        return;

        //playernametodraw += player.getMeta('Account_ID')+'-'; //dont use, can be exploited meta/power gaming.
        playernametodraw += meta_chid+']';
        //TODO only print character name IF localplayer has this -> player character id as friend.. TODO.
        playernametodraw += ' '+meta_chname;
        drawText(`${playernametodraw}`, result[1], y, 0.4, 6, 255, 255, 255, 255, true, false);
        
        //drawText(`${player.name}`, result[1], y, 0.4, 6, 255, 255, 255, 255, true, false);
        
    });
}, 0);