import * as alt from "alt";
import * as game from "natives";
//------------------------------------------------------------------------------------
//----------------------------------------------------------------ONLY FOR DEVELOPMENT
//------------------------------------------------------------------------------------
var quicklogin = false;
//------------------------------------------------------------------------------------
//----------------------------------------------------------------ONLY FOR DEVELOPMENT
//------------------------------------------------------------------------------------

// Request these models if they're not already loaded.
game.requestModel(game.getHashKey('mp_m_freemode_01'));
game.requestModel(game.getHashKey('mp_f_freemode_01'));

var loginform = new alt.WebView("http://resource/client/index.html");
var loginCamera;

loginform.on('checkLogin', (username, password, rememberme) => {
  alt.emitServer('checkLogin', username, password);
  //alt.log('remember: '+rememberme);

  if(rememberme) {
    alt.LocalStorage.get().set('lisaacc', username);
    alt.LocalStorage.get().set('lisapw', password);
    alt.LocalStorage.get().save();

    //let getpw = alt.LocalStorage.get().get('lisapw');
    //alt.log(getpw);   lisaacc
  }
});

loginform.on('loginCharacter', (charid) => {
  alt.emitServer('loginCharacter', charid);
});

alt.onServer("hideLoginWindow", () => {
  loginform.emit('hideLoginWindow');
});

alt.onServer("showCharSelect", () => {
  game.setCamCoord(loginCamera, -582.3671875, 4439.11865234375, 17.05); //game.setCamCoord(loginCamera, -581.3671875, 4438.11865234375, 17.80901336669922);
  game.setCamRot(loginCamera, 6.593686008453369, -3, -96.18995666503906);
  game.setCamFov(loginCamera, 28);
  game.renderScriptCams(true, false, 0, true, false);
  loginform.emit('showCharSelect');
});

var eqdatarr = [];
var eqdatarr_equippednatives = [];

function setCharacterLooksAndShit(charid) {

  let a = eqdatarr[charid].setPedHeadBlendData.split(", ");
  eval(`game.setPedHeadBlendData(alt.Player.local.scriptID, ${a[0]}, ${a[1]}, ${a[2]}, ${a[3]}, ${a[4]}, ${a[5]}, ${a[6]}, ${a[7]}, ${a[8]}, ${a[9]});`);

  let hairstyle = eqdatarr[charid].setPedHairStyle.split(", ");
  eval(`game.setPedComponentVariation(alt.Player.local.scriptID, 2, ${hairstyle[0]}, ${hairstyle[1]}, ${hairstyle[2]});`);

  let haircolor = eqdatarr[charid].setPedHairColor.split(", ");
  eval(`game.setPedHairColor(alt.Player.local.scriptID, ${haircolor[0]}, ${haircolor[1]});`);

  let eyecolor = eqdatarr[charid].setPedEyeColor;
  eval(`game.setPedEyeColor(alt.Player.local.scriptID, ${eyecolor});`);

  //setPedHeadOverlay
  let overlayarr = eqdatarr[charid].setPedHeadOverlay.split(", ");
  let i;
  for (i = 0; i < overlayarr.length; i++) {
    let overlayarr2 = overlayarr[i].split("&");
    eval(`game.setPedHeadOverlay(alt.Player.local.scriptID, ${i}, ${overlayarr2[0]}, ${overlayarr2[1]});`);
  }

  //setPedHeadOverlayColor
  let overlayarrX = eqdatarr[charid].setPedHeadOverlayColor.split(", ");
  for (i = 0; i < overlayarrX.length; i++) {
    let overlayarrY = overlayarrX[i].split("&");
    let colortype = 0;
    if(i == 1 || i == 10 || i == 2) { colortype = 1; }
    else if(i == 5 || i == 8) { colortype = 2; }
    else { colortype = 0; }
    eval(`game.setPedHeadOverlayColor(alt.Player.local.scriptID, ${i}, ${colortype}, ${overlayarrY[0]}, ${overlayarrY[1]});`);
  }

  //setPedFaceFeature
  let facefarr = eqdatarr[charid].setPedFaceFeature.split(", ");
  for (i = 0; i < facefarr.length; i++) {
    eval(`game.setPedFaceFeature(alt.Player.local.scriptID, ${i}, ${facefarr[i]});`);
  }

  //set meta character name + id.
  alt.Player.local.setMeta('Account_ID', eqdatarr[charid].User_Account_ID);
  alt.Player.local.setMeta('Character_ID', eqdatarr[charid].ID);
  alt.Player.local.setMeta('Character_Name', eqdatarr[charid].Character_Name);
}

loginform.on('previewCharacter', (charid) => {
  //alt.log(JSON.stringify(eqdatarr[charid]));
  //alt.log(JSON.stringify(eqdatarr_equippednatives[charid]));
  //alt.log('^ this is data we got from server ^');
  let modelToSet;
  let gender = eqdatarr[charid].Gender;
  game.setEntityCoords(alt.Player.local.scriptID, -590.2417602539062, 4399.6748046875, 16.5750732421875, 1, 0, 0, 1);
  if(gender == "Male") { alt.emitServer('setModelFreemode', 0); modelToSet = game.getHashKey('mp_m_freemode_01'); }
  else if(gender == "Female") { alt.emitServer('setModelFreemode', 1); modelToSet = game.getHashKey('mp_f_freemode_01'); }

  /*
  let inter = alt.setInterval(() => {
    eval(eqdatarr_equippednatives[charid]);
    game.setEntityAlpha(alt.Player.local.scriptID, 255, false);
    game.setEntityCoords(alt.Player.local.scriptID, -577.107666015625, 4438.12744140625, 17.6871337890625, 1, 0, 0, 1);
    game.setEntityHeading(alt.Player.local.scriptID, 100);
    setCharacterLooksAndShit(charid);
    alt.clearInterval(inter);
  }, 2000);
  */
  let inter = alt.setInterval(() => {
    if(game.isPedModel(alt.Player.local.scriptID, modelToSet)) {
      eval(eqdatarr_equippednatives[charid]);
      game.setEntityAlpha(alt.Player.local.scriptID, 255, false);
      game.setEntityCoords(alt.Player.local.scriptID, -577.107666015625, 4438.12744140625, 16.7, 1, 0, 0, 1); //{"x":-577.1163940429688,"y":4438.12744140625,"z":17.686443328857422}
      game.setEntityHeading(alt.Player.local.scriptID, 100);
      setCharacterLooksAndShit(charid);
      alt.clearInterval(inter);
    }
  }, 100);

});


let loadedfirstchar = false;
alt.onServer("constructCharacters", (name, charid, eqdata, equippednatives) => {
  eqdatarr[charid] = JSON.parse(eqdata);
  eqdatarr_equippednatives[charid] = equippednatives;
  loginform.emit('constructCharacters', name, charid);

  let modelToSet;

  if(!loadedfirstchar) {
    let gender = eqdatarr[charid].Gender;
    game.setEntityCoords(alt.Player.local.scriptID, -590.2417602539062, 4399.6748046875, 16.5750732421875, 1, 0, 0, 1);
    if(gender == "Male") { alt.emitServer('setModelFreemode', 0); modelToSet = game.getHashKey('mp_m_freemode_01'); }
    else if(gender == "Female") { alt.emitServer('setModelFreemode', 1); modelToSet = game.getHashKey('mp_f_freemode_01'); }

    game.setClockTime(12, 0, 0);
    game.pauseClock(true);
  }

  if(!loadedfirstchar) { //since we did get some characters, load first one.
    let inter = alt.setInterval(() => {
      if(game.isPedModel(alt.Player.local.scriptID, modelToSet)) {
        eval(eqdatarr_equippednatives[charid]);
        game.setEntityAlpha(alt.Player.local.scriptID, 255, false);
        game.setEntityCoords(alt.Player.local.scriptID, -577.107666015625, 4438.12744140625, 16.7, 1, 0, 0, 1);
        game.setEntityHeading(alt.Player.local.scriptID, 100);
        setCharacterLooksAndShit(charid);
        alt.clearInterval(inter);
      }
    }, 100);
    loadedfirstchar = true;
  }
});


alt.onServer("onFirstConnect", () => {
  if(quicklogin) {
    loginform.emit('hideLoginWindow');
    alt.emitServer("superSimpleLogin");
    return;
  }
  //normal login
  game.setEntityAlpha(alt.Player.local.scriptID, 0, false); //set invis on connect.
  //game.switchOutPlayer(alt.Player.local.scriptID, 1, 2);
  game.setFrontendRadioActive(true);
  game.setMobileRadioEnabledDuringGameplay(true);
  game.setMobilePhoneRadioState(true);
  game.setRadioToStationName("RADIO_06_COUNTRY");
  //{"x":-549.4529418945312,"y":4438.41064453125,"z":34.019222259521484} this is login.-rot-{"x":2.157543659210205,"y":0.054333966225385666,"z":89.7072982788086}
  //{"x":-581.3671875,"y":4438.11865234375,"z":17.80901336669922} this is charselect -rot-{"x":6.693686008453369,"y":0,"z":-95.18995666503906}
  const camX = -549.4529418945312;
  const camY = 4438.41064453125;
  const camZ = 34.019222259521484;
  //{"x":6.693686008453369,"y":0,"z":-95.18995666503906}

  //this.loginCamera = game.createCam('DEFAULT_SCRIPTED_CAMERA', 1);
  loginCamera = game.createCam("DEFAULT_SCRIPTED_CAMERA", 1);
  alt.log('cam: '+loginCamera);
  game.setCamCoord(loginCamera, camX, camY, camZ);
  game.setCamRot(loginCamera, 2.157543659210205, 0.054333966225385666, 89.7072982788086);
  game.setCamFov(loginCamera, 65);
  game.setCamActive(loginCamera, true);

  game.setFocusArea(camX, camY, camZ, 5, 0.0, 0.0, 0.0);    
  game.setHdArea(camX, camY, camZ, 5, 30);
  game.renderScriptCams(true, false, 0, true, false);

  game.displayHud(false);
  game.displayRadar(false);

  alt.showCursor(true);
  loginform.focus();
  //loginform.emit('playloginmusic', true); //wait until successful login. play in char select?

  /*
  //quick login.
  var x = alt.setInterval(function() {
    alt.emitServer("superSimpleLogin");
    alt.clearInterval(x);
  }, 500);
  */

  //if user has a remember pw, set pw.
  let doWeHaveRememberMePw = alt.LocalStorage.get().get('lisapw');
  let doWeHaveRememberMeAcc = alt.LocalStorage.get().get('lisaacc');
  if(doWeHaveRememberMePw != null && doWeHaveRememberMeAcc != null) {
    loginform.emit('setRememberMePw', doWeHaveRememberMeAcc, doWeHaveRememberMePw);
  }
});

alt.onServer('login_error', (msg) => {
  loginform.emit('login_error', msg);
});

alt.onServer("disableLoginStuff", () => {
  loginform.emit('hideCharSelect');
  loginform.emit('hideCharCreate');
  loginform.unfocus();

  game.clearFocus();
  game.clearHdArea();
  
  game.renderScriptCams(false, false, 0, true, false);
  game.setCamActive(loginCamera, false);
  game.destroyCam(loginCamera, false);

  game.displayHud(true);
  //game.displayRadar(true);

  game.setFrontendRadioActive(false);
  game.setMobileRadioEnabledDuringGameplay(false);
  game.setMobilePhoneRadioState(false);

  alt.showCursor(false); //causing issues? wtf.
  //NOTE TO SELF, if cam is broken or is not destroyed /reset to player, its because of reconnect!!!!!!
});


loginform.on('checkRegisterData', (username, email, password1) => {
  alt.emitServer('checkRegisterData', username, email, password1);
});

alt.onServer("register_error", (msg) => {
  loginform.emit('register_error', msg);
});



var areWeCreatingChar = false;
loginform.on('createCharacter', () => {
  alt.emitServer('createCharacter');
  areWeCreatingChar = true;
});

let fov = 28; // The FOV we change with scroll wheel.

function updateCamera() {
  game.setCamFov(loginCamera, fov);
  game.renderScriptCams(true, false, 0, true, false);
}

alt.setInterval(() => {
  if(alt.Player.local.getSyncedMeta("isCharacterLoggedInn"))
    return;

  game.disableAllControlActions(0);
  game.disableAllControlActions(1);
}, 0);

alt.setInterval(() => {
  if(!areWeCreatingChar)
    return;

  let [_dontCare, screenWidth, screenHeight] = game.getActiveScreenResolution(0, 0); // Get the current screen resolution the user is using.
  //CREDITS to Stuyk!

  let cursorRelativePos = alt.getCursorPos().x;
  // Scroll to zoom in.
  if (game.isDisabledControlPressed(0, 14)) {
      if (cursorRelativePos < screenWidth / 4) return;

      fov += 2;
      if (fov >= 29) fov = 28;
      updateCamera();
  }

  // Scroll to zoom out
  if (game.isDisabledControlPressed(0, 15)) {
      if (cursorRelativePos < screenWidth / 4) return;

      fov -= 2;
      if (fov <= 4) fov = 5;
      updateCamera();
  }

  // Right-Click Drag Rotation
  if (game.isDisabledControlPressed(0, 25)) {
    let heading = game.getEntityHeading(alt.Player.local.scriptID);

    if (cursorRelativePos < screenWidth / 2) {
        cursorRelativePos = -1;
    }

    if (cursorRelativePos > screenWidth - screenWidth / 2) {
        cursorRelativePos = 1;
    }

    game.setEntityHeading(alt.Player.local.scriptID, heading + cursorRelativePos);
  }
}, 0);

loginform.on('charHeading', (val) => {
  game.setEntityHeading(alt.Player.local.scriptID, val);
});

loginform.on('setCamStyle', (val) => {
  if(val == "HEAD") {
    game.setCamCoord(loginCamera, -580.1, 4438.5, 18.0);
    game.pointCamAtPedBone(loginCamera, alt.Player.local.scriptID, 31086, 0, 0, -0.02, 1);
  }
  else if(val == "CHEST") {
    game.setCamCoord(loginCamera, -580.1, 4438.5, 17.6);
    game.stopCamPointing(loginCamera);
  }
  else if(val == "LEGS") {
    game.setCamCoord(loginCamera, -580.1, 4438.5, 16.9);
    game.stopCamPointing(loginCamera);
  }
  else if(val == "FEET") {
    game.setCamCoord(loginCamera, -580.1, 4438.5, 16.5);
    game.stopCamPointing(loginCamera);
  }
  else if(val == "DEFAULT") {
    game.setCamCoord(loginCamera, -582.3671875, 4439.11865234375, 17.05);
    game.stopCamPointing(loginCamera);
  }
});

//store all values here, and when we done creating char, send to DB. also, these are DEFAULT values.
var newChar_CharacterName = "";
var currentCreatorGender = 0; //0 male
var newChar_HeadBlendData = [0, 0, 0, 0, 0, 0, 0, 0, 0, false];
var newChar_hairstyle = [37, 0, 2];
var newChar_haircolor = [0, 0];
var newChar_eyecolor = 0;
var newChar_FaceFeatures = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var newChar_headOverlay = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var newChar_headOverlayOpacity = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var newChar_headOverlayColor = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var newChar_headOverlayColor2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function resetCharCreatorModel() { //this is auto triggered when creating new character!
  
  //ON RESET MODEL, change to defaults!
  newChar_HeadBlendData = [0, 0, 0, 0, 0, 0, 0, 0, 0, false];
  game.setPedHeadBlendData(alt.Player.local.scriptID, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);

  if(currentCreatorGender == 0) {
    game.setPedComponentVariation(alt.Player.local.scriptID, 0, 0, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 1, 0, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 2, 37, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 4, 21, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 5, 0, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 6, 34, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 7, 0, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 8, 57, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 9, 0, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 10, 0, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 11, 15, 0, 2); game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 2);
    game.clearPedProp(alt.Player.local.scriptID, 0);
    game.clearPedProp(alt.Player.local.scriptID, 1);
    game.clearPedProp(alt.Player.local.scriptID, 2);
    game.clearPedProp(alt.Player.local.scriptID, 6);
    game.clearPedProp(alt.Player.local.scriptID, 7);
  }
  else if(currentCreatorGender == 1) {
    game.setPedComponentVariation(alt.Player.local.scriptID, 0, 0, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 1, 0, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 2, 37, 0, 2); //hair
    game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 4, 21, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 5, 0, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 6, 35, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 7, 0, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 8, 2, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 9, 0, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 10, 0, 0, 2);
    game.setPedComponentVariation(alt.Player.local.scriptID, 11, 15, -1, 2); game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 2);
    game.clearPedProp(alt.Player.local.scriptID, 0);
    game.clearPedProp(alt.Player.local.scriptID, 1);
    game.clearPedProp(alt.Player.local.scriptID, 2);
    game.clearPedProp(alt.Player.local.scriptID, 6);
    game.clearPedProp(alt.Player.local.scriptID, 7);
  }
  //now do reset, headblend needs to be first!
  newChar_hairstyle = [37, 0, 2]; //we sat this above ^

  newChar_haircolor = [0, 0];
  game.setPedHairColor(alt.Player.local.scriptID, 0, 0);
  
  newChar_eyecolor = 0;
  game.setPedEyeColor(alt.Player.local.scriptID, 0);

  newChar_FaceFeatures = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let index = 0; index < newChar_FaceFeatures.length; index++) {
    game.setPedFaceFeature(alt.Player.local.scriptID, index, newChar_FaceFeatures[index]);
  }

  newChar_headOverlay = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  newChar_headOverlayOpacity = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let index = 0; index < newChar_headOverlay.length; index++) {
    game.setPedHeadOverlay(alt.Player.local.scriptID, index, 0, 0);
  }

  newChar_headOverlayColor = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  newChar_headOverlayColor2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < newChar_headOverlayColor.length; i++) {
    let colortype = 0;
    if(i == 1 || i == 10 || i == 2) { colortype = 1; }
    else if(i == 5 || i == 8) { colortype = 2; }
    else { colortype = 0; }
  game.setPedHeadOverlayColor(alt.Player.local.scriptID, i, colortype, 0, 0);
  }

  loginform.emit('resetSliderstoDefaults');
}

loginform.on('setGender', (val) => { //0 male
  let modelToSet;
  //alt.emitServer('setModelFreemode', val);
  if(val == 0) { alt.emitServer('setModelFreemode', 0); modelToSet = game.getHashKey('mp_m_freemode_01'); }
  else if(val == 1) { alt.emitServer('setModelFreemode', 1); modelToSet = game.getHashKey('mp_f_freemode_01'); }
  currentCreatorGender = val;

  let inter = alt.setInterval(() => {
    if(game.isPedModel(alt.Player.local.scriptID, modelToSet)) {
      //do shit after model has loaded!
      resetCharCreatorModel();

      alt.clearInterval(inter);
    }
  }, 100);
});

loginform.on('updatePedHeadBlendData', (father_face, father_skin, mother_face, mother_skin, face_mix, skin_mix) => {
  newChar_HeadBlendData = [father_face, mother_face, 0, father_skin, mother_skin, 0, face_mix, skin_mix, 0, false];
  game.setPedHeadBlendData(alt.Player.local.scriptID, father_face, mother_face, 0, father_skin, mother_skin, 0, face_mix, skin_mix, 0, false);
});

loginform.on('updateCharacterName', (name) => {
  newChar_CharacterName = name;
});

loginform.on('updateCharacterHair', (hair_type, hair_color, hair_highl) => {
  newChar_hairstyle = [hair_type, 0, 2];
  newChar_haircolor = [hair_color, hair_highl];
  game.setPedComponentVariation(alt.Player.local.scriptID, 2, hair_type, 0, 2);
  game.setPedHairColor(alt.Player.local.scriptID, hair_color, hair_highl);
});

loginform.on('updatePedEyeColor', (eye_color) => {
  newChar_eyecolor = eye_color;
  game.setPedEyeColor(alt.Player.local.scriptID, eye_color);
});

loginform.on('setPedFaceFeature', (ff_0, ff_1, ff_2, ff_3, ff_4, ff_5, ff_6, ff_7, ff_8, ff_9, ff_10, ff_11, ff_12, ff_13, ff_14, ff_15, ff_16, ff_17, ff_18, ff_19) => {
  newChar_FaceFeatures = [ff_0, ff_1, ff_2, ff_3, ff_4, ff_5, ff_6, ff_7, ff_8, ff_9, ff_10, ff_11, ff_12, ff_13, ff_14, ff_15, ff_16, ff_17, ff_18, ff_19];
  for (let index = 0; index < newChar_FaceFeatures.length; index++) {
    game.setPedFaceFeature(alt.Player.local.scriptID, index, newChar_FaceFeatures[index]);
  }
});

loginform.on('updatePedHeadOverlay', (overlayid, overlay_opacity) => {
  newChar_headOverlay = JSON.parse(overlayid);
  newChar_headOverlayOpacity = JSON.parse(overlay_opacity);
  for (let index = 0; index < newChar_headOverlay.length; index++) {
    game.setPedHeadOverlay(alt.Player.local.scriptID, index, newChar_headOverlay[index], newChar_headOverlayOpacity[index]);
  }
});

loginform.on('updatePedHeadOverlayColor', (color1, color2) => {
  newChar_headOverlayColor = JSON.parse(color1);
  newChar_headOverlayColor2 = JSON.parse(color2);
  for (let i = 0; i < newChar_headOverlayColor.length; i++) {
        let colortype = 0;
        if(i == 1 || i == 10 || i == 2) { colortype = 1; }
        else if(i == 5 || i == 8) { colortype = 2; }
        else { colortype = 0; }
    game.setPedHeadOverlayColor(alt.Player.local.scriptID, i, colortype, newChar_headOverlayColor[i], newChar_headOverlayColor2[i]);
  }
});

loginform.on('isCharacterNameAvailable', (name) => {
  alt.emitServer('isCharacterNameAvailable', name);
});

var canWeCreateChar = false;
alt.onServer('CharNameAnswer', (avail, msg) => {
  loginform.emit('CharNameAnswer', avail, msg);
  if(avail) {
    canWeCreateChar = true;
  }
});

loginform.on('createSaveCharacter', () => {
  if(!canWeCreateChar)
    return;
  
  alt.emitServer('createSaveCharacter', newChar_CharacterName, currentCreatorGender, newChar_HeadBlendData, newChar_hairstyle, newChar_haircolor, newChar_eyecolor, newChar_FaceFeatures, 
  newChar_headOverlay, newChar_headOverlayOpacity, newChar_headOverlayColor, newChar_headOverlayColor2);
});