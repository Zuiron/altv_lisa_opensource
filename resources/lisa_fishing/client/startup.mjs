/* client startup */
import * as alt from "alt";
import * as game from "natives";

function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min));
}

function generateRandomFloating(min, max) {
    return min + Math.random()*(max + 1 - min);
}

game.requestAnimDict('mini@tennis');
game.requestAnimDict('amb@lo_res_idles@');
game.requestAnimDict('missminuteman_1ig_2');
game.requestAnimDict('pickup_object');

let animsdict_cast = [ "mini@tennis", "mini@tennis", "mini@tennis", "mini@tennis", "mini@tennis" ];
let anims_cast = [ "antic_fh", "backhand_ts_hi", "forehand_ts_hi", "backhand_ts_lo", "forehand_ts_lo" ];

let animsdict_hookf = [ "mini@tennis", "mini@tennis", "mini@tennis"];
let anims_hookf = [ "antic_bh", "runstart_ccw_90", "run_bwd_135_loop" ]; //antic_bh -OK, runstart_ccw_90 -MEH?, run_bwd_135_loop -OK

let animsdict_failh = [ "missminuteman_1ig_2", "mini@tennis" ];
let anims_failh = [ "tasered_1", "react_lose_03" ];

function runRandomAnim(action) {
    if(action == 'cast') {
        const rando = generateRandomInteger(0, 4);
        game.taskPlayAnim(alt.Player.local.scriptID, animsdict_cast[rando], anims_cast[rando], 8.0, 4.0, -1, 48, 0, 0, 0, 0);
    }
    else if(action == 'fishOnHook') { //when fish is on hook biting.
        game.taskPlayAnim(alt.Player.local.scriptID, 'mini@tennis', 'runstart_cw_0', 8.0, 6.0, -1, 48, 0, 0, 0, 0);
    }
    else if(action == 'hookFish') { //when fish is hooked.
        const rando = generateRandomInteger(0, 2);
        game.taskPlayAnim(alt.Player.local.scriptID, animsdict_hookf[rando], anims_hookf[rando], 8.0, 1.0, -1, 48, 0, 0, 0, 0);
        alt.log('using anim: '+anims_hookf[rando]);
    }
    else if(action == 'failedHook') { //failed WASD minigame.
        const rando = generateRandomInteger(0, 1);
        game.taskPlayAnim(alt.Player.local.scriptID, animsdict_failh[rando], anims_failh[rando], 8.0, 1.0, -1, 48, 0, 0, 0, 0);
    }
    else if(action == 'caughtFish') { //on fish caught.
        game.taskPlayAnim(alt.Player.local.scriptID, 'pickup_object', 'pickup_low', 8.0, 1.0, -1, 48, 0, 0, 0, 0);
    }
}

var fishingui = new alt.WebView("http://resource/client/index.html");

var fishing = false;
var hasCasted = false;
var isFishHooked = false;
var isFishBiting = false;
var fishBobObj = null;
var biteTime = 0;

var minigame = false;
var minigame_keys = null;
var minigame_index = null;


function attemptCast() {
    let fvec = game.getEntityForwardVector(alt.Player.local.scriptID);
    let distance = generateRandomInteger(9, 12); //cast range between 9-12

    let ppos = alt.Player.local.pos;

    ppos.x += generateRandomFloating(-2, 2);
    ppos.y += generateRandomFloating(-2, 2);

    var pos = {
        x: ppos.x + fvec.x * distance,
        y: ppos.y + fvec.y * distance,
        z: ppos.z + fvec.z * distance
    }
    const [_isWater, _wZ] = game.testVerticalProbeAgainstAllWater(pos.x, pos.y, pos.z, undefined);

    if(!_isWater) {
        alt.log('cannot fish here... 1');
        return [false, false, false];
    }

    const [_isZaboveG, _gZ] = game.getGroundZFor3dCoord(pos.x, pos.y, _wZ);

    if(!_isZaboveG) {
        alt.log('cannot fish here... 2'); //prevents detected water even if position is ground. (water below ground...)
        return [false, false, false];
    }

    alt.log('fishing... water: '+_isWater+', _wZ: '+_wZ+', _isZaboveG: '+_isZaboveG+', _gZ: '+_gZ);

    return [true, pos, _wZ];
}

function cancelCasted() {
    if(fishBobObj != null) {
        game.deleteObject(fishBobObj);
        fishBobObj = null;
    }
    hasCasted = false;
    isFishHooked = false;
    isFishBiting = false;
    fishBobObj = null;
    biteTime = 0;
    
    minigame = false;
    minigame_keys = null;
    minigame_index = null;

    alt.log('canceled cast, want to recast? press E. or X to stop fishing.');
    fishingui.emit('showMSG', 'fishMessage1');
}

alt.onServer('fishing:ranoutoftime', () => {
    cancelCasted();
    runRandomAnim('failedHook');
    alt.emit('progress:clear');
});

function fishingCast() {
    const [_canFish, _pos, _wZ] = attemptCast();

    if(!_canFish) {
        alt.log("didnt hit water, try again. recast with E or X to stop fishing.");
        return;
    }

    runRandomAnim('cast');
    alt.emit('playHowl2d', './audio/fishing_cast.wav', 0.6);

    let inter = alt.setInterval(() => {
        fishBobObj = game.createObject(game.getHashKey("prop_dock_float_1b"), _pos.x, _pos.y, _wZ-0.4, false, false, false);
        alt.emit('playHowl2d', './audio/fishing_castDone2.wav', 0.6);
        
        isFishHooked = false;
        isFishBiting = false;
        biteTime = 0;
        hasCasted = true;
        alt.log('we have now casted. wait for fish to bite... cancel cast with E or X to stop fishing.');

        fishingui.emit('showMSG', 'fishMessage2');
        
        alt.clearInterval(inter);
    }, 1500);
}

let fishBitingInter = alt.setInterval(() => {
    if(hasCasted && !isFishHooked) {
        if(biteTime >= 11) {
            isFishBiting = false;
            biteTime = 0;
            alt.log('fish ran away...');
        }
        else if(biteTime >= 10) {
            isFishBiting = true;
            runRandomAnim('fishOnHook');
            alt.emit('playHowl2d', './audio/fishing_bitingFish.wav', 0.6);
            alt.emit('playHowl2d', './audio/fishing_reelBiting.wav', 0.5);
            alt.log("fish is biting!");
        }
        else { alt.log("waiting for fish to bite..."); }
        biteTime += 1;
    }
}, 1000);

function requestFishLootFromServer() {
    let inter = alt.setInterval(() => {
        alt.log('requesting loot from server, this will determine minigame difficulty...');

        //include zone...
        let pos = alt.Player.local.pos;
        let zoneName = game.getNameOfZone(pos.x, pos.y, pos.z);
        alt.emitServer('fishing:reqLootDiff', zoneName);
        
        alt.clearInterval(inter);
    }, 1000);
}

alt.onServer('fishing:minigame', (loot, diff) => {
    var keylist = ["W","A","S","D"];
    //generate array of keys based on diff (diff is number of keys)
    let keys = [];
    for (let index = 0; index < diff; index++) {
        keys.push(keylist[generateRandomInteger(0, 3)]);
    }

    minigame = true;
    minigame_keys = keys;
    minigame_index = 0;

    fishingui.emit('showMSG', 'fishMessage3', diff, keys);
    alt.log('got minigame loot: '+loot+', diff: '+diff+', keys: '+keys);
});

function hookFish() {
    if(isFishBiting) {
        isFishBiting = false;
        isFishHooked = true;

        let inter2 = alt.setInterval(() => {
            game.deleteObject(fishBobObj);
            fishBobObj = null;

            alt.log("hooking fish success!, do minigame. if complete, fish caught...");
            runRandomAnim('hookFish');
            alt.emit('playHowl2d', './audio/fishing_hooked.wav', 0.4);
            requestFishLootFromServer();

            alt.clearInterval(inter2);
        }, 1100);
    }
}

function cancelFishing() {
    let delshit = alt.setInterval(() => {
        if(fishBobObj != null) {
            game.deleteObject(fishBobObj);
            fishBobObj = null;
        }

        alt.clearInterval(delshit);
    }, 2000);
    
    game.clearPedTasks(alt.Player.local.scriptID);

    fishing = false;
    hasCasted = false;
    isFishHooked = false;

    minigame = false;
    minigame_keys = null;
    minigame_index = null;
    
    alt.log('you are no longer fishing.');
    fishingui.emit('toggleGUI', false);
}

var canKey = true;

function freezeKey() { //block key input for 3 seconds.
    canKey = false;

    let inter = alt.setInterval(() => {
        canKey = true;

        alt.clearInterval(inter);
    }, 3000);
}

function didWeCompleteMiniGame() {
    alt.log('index: '+minigame_index+', length: '+minigame_keys.length);
    if(minigame_index == minigame_keys.length) {
        alt.log('completed puzzle !?');

        cancelCasted();
        game.taskPlayAnim(alt.Player.local.scriptID, 'pickup_object', 'pickup_low', 8.0, 1.0, -1, 48, 0, 0, 0, 0);

        alt.emitServer('fishing:caughtFish');
    }
}

alt.on('keyup', (key) => {
    if (canKey && key == 0x45 && fishing && !hasCasted) { //key "E", if we are "fishing", and is not in a cast.
        //freezeKey();
        fishingCast();
    }
    else if (canKey && key == 0x45 && fishing && hasCasted) { //key "E", if we are "fishing", and is in a cast.
        //freezeKey();    
        cancelCasted();
    }
    if (canKey && key == 0x20 && fishing && hasCasted && isFishBiting && !isFishHooked) { //key "SPACE", if we are "fishing", and we have casted, and fish is hooked.
        //freezeKey();    
        hookFish();
    }
    if (canKey && key == 0x58 && fishing) { //key "X", if we are "fishing".
        //freezeKey();    
        cancelFishing();
    }

    if(key != 0x57 || key != 0x41 || key != 0x53 || key != 0x44) { //if NOT WASD
        if(fishing) {
            freezeKey(); //freeze no matter what, prevent spamming to hook fish. ???
        }
    }

    //if minigame.
    if(minigame) {
        if(key == 0x57 || key == 0x41 || key == 0x53 || key == 0x44) {
            let currentKey = minigame_keys[minigame_index];
            
            if(currentKey == "W" && key == 0x57) { 
                fishingui.emit('setSolved', minigame_index); minigame_index += 1; didWeCompleteMiniGame();
            }
            else if(currentKey == "A" && key == 0x41) { 
                fishingui.emit('setSolved', minigame_index); minigame_index += 1; didWeCompleteMiniGame();
            }
            else if(currentKey == "S" && key == 0x53) { 
                fishingui.emit('setSolved', minigame_index); minigame_index += 1; didWeCompleteMiniGame();
            }
            else if(currentKey == "D" && key == 0x44) { 
                fishingui.emit('setSolved', minigame_index); minigame_index += 1; didWeCompleteMiniGame();
            }
            else { 
                game.taskPlayAnim(alt.Player.local.scriptID, 'mini@tennis', 'react_lose_03', 8.0, 1.0, -1, 48, 0, 0, 0, 0); 
                cancelCasted();

                alt.emit('progress:clear');
            }
        }
    }
});

alt.onServer('fishing:tryFish', () => {
    const [_canFish, _pos, _wZ] = attemptCast();

    if(!_canFish) {
        alt.log("we cannot fish here... 3");
        return;
    }

    let ped = alt.Player.local.scriptID;
    let delay = 0;
    let playEnterAnim = true;
    game.taskStartScenarioInPlace(ped, "WORLD_HUMAN_STAND_FISHING", delay, playEnterAnim);

    fishingui.emit('toggleGUI', true);

    fishingui.emit('showMSG', 'fishMessage1');

    alt.log('you are now fishing, press E to cast. or X to stop fishing.');
    fishing = true;
    //now fishing is enabled, user can now cast using key!
    //TODO save current pos, if pos changes more then 1-2 distance, cancel fishing. (feinting player, or other player moving fishing player etc.)
});

/*
    let delshit = alt.setInterval(() => {
        game.deleteObject(fishBobObj);
        game.clearPedTasks(ped);

        alt.clearInterval(delshit);
    }, 2000);
*/

/*
game.taskStartScenarioInPlace(alt.Player.local.scriptID, "WORLD_HUMAN_STAND_FISHING", 0, true);
let delshit = alt.setInterval(() => {
        game.clearPedTasks(alt.Player.local.scriptID);

        alt.clearInterval(delshit);
    }, 2000);
*/