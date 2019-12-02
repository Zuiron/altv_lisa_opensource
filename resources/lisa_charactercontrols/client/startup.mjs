import * as alt from "alt";
import * as game from "natives";

// credits to rootcause. https://rage.mp/files/file/79-crouch/
// translated to alt:v by zuiron.
const crouchKey = 36;
const proneKey = 26;

const movementClipSet = "move_ped_crouched";
const strafeClipSet = "move_ped_crouched_strafing";
const clipSetSwitchTime = 0.25;

const animProne = "move_crawl";
const animProne_onfrontfwd = "onfront_fwd";
const animProne_onfrontbwd = "onfront_bwd";
//move_crawlprone2crawlback
//move_crawlprone2crawlfront

const moveJump = "move_jump";
const moveJump_diveStart = "dive_start_run";

const speed = 1.0;
const speedMultiplier = 1.0;

const loadClipSet = (clipSetName) => {
    game.requestClipSet(clipSetName);
    //while (!game.hasClipSetLoaded(clipSetName)) game.requestClipSet(clipSetName); //instacrash
};

const loadAnimSet = (animSetName) => {
    game.requestAnimSet(animSetName);
};

loadClipSet(movementClipSet);
loadClipSet(strafeClipSet);

loadAnimSet(animProne);
loadAnimSet(moveJump);

function setEntityCrouch(entity) {
    game.setPedMovementClipset(entity.scriptID, movementClipSet, clipSetSwitchTime);
    game.setPedStrafeClipset(entity.scriptID, strafeClipSet);
}

function resetEntityCrouch(entity) {
    game.resetPedMovementClipset(entity.scriptID, clipSetSwitchTime);
    game.resetPedStrafeClipset(entity.scriptID);
}

function setProned(entity) {
    //game.clearPedTasksImmediately(entity.scriptID);
    let coords = game.getEntityCoords(entity.scriptID);
    game.taskPlayAnimAdvanced(entity.scriptID, animProne, animProne_onfrontfwd, coords.x, coords.y, coords.z, 0.0, 0.0, game.getEntityHeading(entity.scriptID), speed, speedMultiplier, -1, 46, 1.0, 0, 0); //3500 - 1.0
    //game.taskPlayAnim(alt.Player.local.scriptID, 'mp_player_intdrink', 'intro_bottle', 8.0, 1.0, -1, 48, 0, 0, 0, 0);
    //movefwd = true;
}

function setEntityProne(entity) {
    //if(game.isPedSprinting(entity.scriptID) || game.isPedRunning(entity.scriptID) || game.getEntitySpeed(entity.scriptID) > 5) {
    if(game.getEntitySpeed(entity.scriptID) > 5) {
        game.taskPlayAnim(entity.scriptID, "move_jump", "dive_start_run", 8.0, 1.0, -1, 0, 0.0, 0, 0, 0);
        alt.setTimeout(() => { setProned(entity) }, 1000);
    } else { setProned(entity) }
    //setProned(entity); //jumping anim is abit, meh.
}

function resetEntityProne(entity) {
    //game.resetPedMovementClipset(entity.scriptID, 0.0);
    game.clearPedTasksImmediately(entity.scriptID);
    game.setEntityCoords(entity.scriptID, entity.pos.x, entity.pos.y, entity.pos.z, 1, 0, 0, 1); //works
    game.setPedToRagdoll(entity.scriptID, 100, 100, 0, false, false, false); //yes, actually better.
}
alt.on('gameEntityCreate', (entity) => {
    if(entity.constructor.name === "Player" && entity.getSyncedMeta('characterControls:isCrouched') && !entity.getSyncedMeta('characterControls:isProned')) {
        setEntityCrouch(entity);
    }
    else if(entity.constructor.name === "Player" && !entity.getSyncedMeta('characterControls:isCrouched') && entity.getSyncedMeta('characterControls:isProned')) {
        setEntityProne(entity);
    }
    else if(entity.constructor.name === "Player" && entity.getSyncedMeta('characterControls:isCrouched') && entity.getSyncedMeta('characterControls:isProned')) {
        setEntityProne(entity);
    }
});

alt.on('syncedMetaChange', (entity, key, value) => {
    if(key === "characterControls:isCrouched") {
        if(value) {
            setEntityCrouch(entity);
        } else {
            resetEntityCrouch(entity);
        }
    }
    else if(key === "characterControls:isProned") {
        if(value) {
            setEntityProne(entity);
        } else {
            resetEntityProne(entity);
        }
    }
});

alt.on('keyup', (key) => {
    let ped = alt.Player.local.scriptID;
    if(game.isPedInAnyVehicle(ped, true) || game.isPedFalling(ped) || game.isPedDiving(ped) || game.isPedInCover(ped, false) || game.isPedInParachuteFreeFall(ped) && (game.getPedParachuteState(ped) != 0 || game.getPedParachuteState(ped) != -1))
        return;

    if (key == 0x11) {
        alt.emitServer('characterControls:crouchToggle');
    } else if(key == 0x43) {
        alt.emitServer('characterControls:proneToggle');
    }
});

//PREVENT ENTERING VEHICLES PRESSING G and F if crouch or prone!!! OR, cancel effect and then continue?

alt.setInterval(() => {
    game.disableControlAction(0, crouchKey, true); //Left CTRL - crouch
    game.disableControlAction(0, proneKey, true); //C - prone
}, 0);

var movefwd = false;
var movebwd = false;

/*
alt.on("update", () => { //SIMPLE prone movement, other one is glitchy.
    if(alt.Player.local.getSyncedMeta("characterControls:isProned")) {
        let ped = alt.Player.local.scriptID;
        if (game.isControlPressed(0, 34)) {
            game.setEntityHeading(ped, game.getEntityHeading(ped)+1.0 )
        }
        else if( game.isControlPressed(0, 35)) {
            game.setEntityHeading(ped, game.getEntityHeading(ped)-1.0 )
        }
    }
});
*/
//prone movement. disable cause glitchy.

alt.setInterval(() => { //working but glitchy...
    let ped = alt.Player.local.scriptID;
    if(alt.Player.local.getSyncedMeta("characterControls:isProned")) {
        let coords = game.getEntityCoords(ped);
        if( game.isControlPressed(0, 32) || game.isControlPressed(0, 33) ) {
            //game.disablePlayerFiring(ped, true)
        }
		else if( game.isControlJustReleased(0, 32) || game.isControlJustReleased(0, 33) ) {
            //game.disablePlayerFiring(ped, false)
        }
		if( game.isControlJustPressed(0, 32) && !movefwd ) {
            movefwd = true;
            game.taskPlayAnimAdvanced(ped, animProne, animProne_onfrontfwd, coords.x, coords.y, coords.z, 0.0, 0.0, game.getEntityHeading(ped), speed, speedMultiplier, -1, 47, 1.0, 0, 0); //flag 47
            //game.taskPlayAnim(ped, animProne, animProne_onfrontfwd, speed, speedMultiplier, -1, 47, 1.0, 1, 1, 1); //flag 47
        }
		else if( game.isControlJustReleased(0, 32) && movefwd) {
            game.taskPlayAnimAdvanced(ped, animProne, animProne_onfrontfwd, coords.x, coords.y, coords.z, 0.0, 0.0, game.getEntityHeading(ped), speed, speedMultiplier, -1, 46, 1.0, 0, 0); //flag 46
            //game.taskPlayAnim(ped, animProne, animProne_onfrontfwd, speed, speedMultiplier, -1, 46, 1.0, 1, 1, 1); //flag 46
			movefwd = false;
        }	
		if (game.isControlJustPressed(0, 33) && !movebwd ) {
			movebwd = true;
            game.taskPlayAnimAdvanced(ped, animProne, animProne_onfrontbwd, coords.x, coords.y, coords.z, 0.0, 0.0, game.getEntityHeading(ped), speed, speedMultiplier, -1, 47, 1.0, 0, 0); //flag 47
            //game.taskPlayAnim(ped, animProne, animProne_onfrontbwd, speed, speedMultiplier, -1, 47, 1.0, 1, 1, 1); //flag 47
        }
		else if( game.isControlJustReleased(0, 33) && movebwd ) {
            game.taskPlayAnimAdvanced(ped, animProne, animProne_onfrontbwd, coords.x, coords.y, coords.z, 0.0, 0.0, game.getEntityHeading(ped), speed, speedMultiplier, -1, 46, 1.0, 0, 0); //flag 46
            //game.taskPlayAnim(ped, animProne, animProne_onfrontbwd, speed, speedMultiplier, -1, 46, 1.0, 1, 1, 1); //flag 46
		    movebwd = false;
        }
		if (game.isControlPressed(0, 34)) {
            game.setEntityHeading(ped, game.getEntityHeading(ped)+1.5 )
        }
		else if( game.isControlPressed(0, 35)) {
            game.setEntityHeading(ped, game.getEntityHeading(ped)-1.5 )
        }
    }
}, 0);