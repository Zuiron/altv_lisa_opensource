/* some js magic up i'n here */

var loginmusic = new Audio('http://resource/client/residenceColUi/doorbell.mp3');
function playLoginMusic(toggle) {
    if(toggle) {
        loginmusic.volume = 0.08;
        loginmusic.loop = true;
        loginmusic.play();
    } else {
        loginmusic.stop();
    }
}

function hideLoginWindow() {
    document.getElementById("loginWindow").style.display = 'none';
}

function showRegisterWindow() {
    document.getElementById("createAccount").style.display = 'block';
    document.getElementById("createAccount").style.visibility = 'visible';
    document.getElementById("createAccount").style.opacity = 1.0;
}

function showCharSelect() {
    document.getElementById("charSelect").style.display = 'block';
    document.getElementById("charSelect").style.visibility = 'visible';
    document.getElementById("charSelect").style.opacity = 1.0;
}

function backtologin() {
    document.getElementById("createAccount").style.display = 'none';
    document.getElementById("loginWindow").style.display = 'block';
}

function hideCharSelect() {
    document.getElementById("charSelect").style.display = 'none';
    document.getElementById("charSelect").style.visibility = 'hidden';
    document.getElementById("charSelect").style.opacity = 0.0;
}

function hideCharCreate() {
    document.getElementById("character_creator_module").style.display = 'none';
    document.getElementById("character_creator_module").style.visibility = 'hidden';
    document.getElementById("character_creator_module").style.opacity = 0.0;
}

function showCharCreate() {
    document.getElementById("character_creator_module").style.display = 'block';
    document.getElementById("character_creator_module").style.visibility = 'visible';
    document.getElementById("character_creator_module").style.opacity = 1.0;
}

function createCharacter() {
    hideLoginWindow();
    hideCharSelect();
    showCharCreate();
    setGender(0); //default to male.

    alt.emit('createCharacter');
}

function loginCharacter(charid) {
    console.log(charid + ' enter');
    alt.emit('loginCharacter', charid);
    //alt.emit('previewCharacter', charid);
}
function previewCharacter(charid) {
    console.log(charid + ' preview');
    alt.emit('previewCharacter', charid);
}

function constructCharacters(name, charid) {
    document.getElementById("characters_list").innerHTML += `
    <div class="input-group form-group">
        <div class="input-group-append">
            <span class="input-group-text"><i class="fas fa-portrait"></i></span>
        </div>
        <input type="text" class="form-control" placeholder="${name}" disabled>
        <div class="input-group-append hoveroncharid">
            <span class="input-group-text" onclick="previewCharacter(${charid})"><i class="far fa-eye"></i></span>
        </div>
        <div class="input-group-append hoveroncharid">
            <span class="input-group-text" onclick="loginCharacter(${charid})"><i class="fas fa-sign-in-alt"></i></span>
        </div>
    </div>
    `;
}

if('alt' in window) {
    alt.on("constructCharacters", constructCharacters);
    alt.on("showCharSelect", showCharSelect);
    alt.on("hideCharSelect", hideCharSelect);
    alt.on('hideLoginWindow', hideLoginWindow);
    alt.on('playloginmusic', playLoginMusic);
    alt.on('login_error', login_error);
    alt.on('register_error', register_error);
    alt.on('hideCharCreate', hideCharCreate);
    alt.on('resetSliderstoDefaults', resetSliderstoDefaults);
    alt.on('CharNameAnswer', CharNameAnswer);
    alt.on('setRememberMePw', setRememberMePw);
}

document.getElementById("loginbtn").addEventListener("click", function(event){
    event.preventDefault();
});
document.getElementById("signup").addEventListener("click", function(event){
    event.preventDefault();
});
document.getElementById("forgotpw").addEventListener("click", function(event){
    event.preventDefault();
});

function login_error(msg) {
    document.getElementById("login_messages").innerHTML = msg;
}

function setRememberMePw(acc, pw) {
    document.getElementById("username").value = acc;
    document.getElementById("password").value = pw;
    document.getElementById("rememberme").checked = true;
}

var lockloginbtn = false;
function login() {
    if(lockloginbtn) {
        return;
    }
    lockloginbtn = true;
    document.getElementById("loginbtn").style.opacity = 0.3;
    document.getElementById("login_messages").innerHTML = "";

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let rememberme = document.getElementById("rememberme").checked;
    alt.emit('checkLogin', username, password, rememberme);

    setTimeout(function(){
         lockloginbtn = false; 
         document.getElementById("loginbtn").style.opacity = 1.0;
         //document.getElementById("login_messages").innerHTML = "No accounts with this username and password.";
    }, 5000);
}

function createAccount() {
    hideLoginWindow();
    showRegisterWindow();
}

function register_error(msg) {
    document.getElementById("register_error_msgs").innerHTML = msg;
}

function register() {
    let username = document.getElementById("createac_username").value;
    let email = document.getElementById("createac_email").value;
    let password1 = document.getElementById("createac_pw1").value;
    let password2 = document.getElementById("createac_pw2").value;

    if(username.length < 3) {
        document.getElementById("register_error_msgs").innerHTML = 'Username must be longer then 2 characters.';
        return;
    }

    if(email == '') { email = null; }

    if(password1.length < 6 || password2.length < 6) {
        document.getElementById("register_error_msgs").innerHTML = 'Password must be at least 6 characters long.';
        return;
    }

    if(password1 !== password2) {
        document.getElementById("register_error_msgs").innerHTML = 'Password does not match.';
        return;
    }

    //check rest serverside.
    alt.emit('checkRegisterData', username, email, password1);
}



//character creator.

function setCharHeading() {
    let val = document.getElementById('charHeading').value;
    alt.emit('charHeading', val);
}

function setCamStyle(val) {
    console.log(val);
    alt.emit('setCamStyle', val);
}

function setGender(val) {
    alt.emit('setGender', val);
}

function dropToggle(id) {
    //let elem = document.getElementById(id);
    var elem = $(`#${id}`);
    if(!elem.hasClass('active')){
        elem.addClass('active');
    } else {
        elem.removeClass('active');
    }
    console.log(id);
}

function resetSliderstoDefaults() {
    document.getElementById('father_face').value = 0;
    document.getElementById('father_skin').value = 0;
    document.getElementById('mother_face').value = 0;
    document.getElementById('mother_skin').value = 0;
    document.getElementById('face_mix').value = 0;
    document.getElementById('skin_mix').value = 0;

    document.getElementById('eye_color').value = 0;
    document.getElementById('nose_width').value = 0;
    document.getElementById('nose_heigth').value = 0;
    document.getElementById('nose_length').value = 0;
    document.getElementById('nose_bridge').value = 0;
    document.getElementById('nose_tip').value = 0;
    document.getElementById('nose_bridgeshaft').value = 0;
    document.getElementById('brow_heigth').value = 0;
    document.getElementById('brow_width').value = 0;
    document.getElementById('cheekb_heigth').value = 0;
    document.getElementById('cheekb_width').value = 0;
    document.getElementById('cheek_width').value = 0;
    document.getElementById('eyelids').value = 0;
    document.getElementById('lips').value = 0;
    document.getElementById('jaw_width').value = 0;
    document.getElementById('jaw_heigth').value = 0;
    document.getElementById('chin_length').value = 0;
    document.getElementById('chin_pos').value = 0;
    document.getElementById('chin_width').value = 0;
    document.getElementById('chin_shape').value = 0;
    document.getElementById('neck_width').value = 0;

    document.getElementById('blemish').value = 0;
    document.getElementById('facial_hair').value = 0;
    document.getElementById('eyebrows').value = 0;
    document.getElementById('age').value = 0;
    document.getElementById('makeup').value = 0;
    document.getElementById('blush').value = 0;
    document.getElementById('complexion').value = 0;
    document.getElementById('sundamage').value = 0;
    document.getElementById('lipstick').value = 0;
    document.getElementById('freckles').value = 0;
    document.getElementById('chesthair').value = 0;
    document.getElementById('bodyblemish').value = 0;
    document.getElementById('addbodyblemish').value = 0;

    document.getElementById('blemish_opacity').value = 0;
    document.getElementById('facial_hair_opacity').value = 0;
    document.getElementById('eyebrow_opacity').value = 0;
    document.getElementById('age_opacity').value = 0;
    document.getElementById('makeup_opacity').value = 0;
    document.getElementById('blush_opacity').value = 0;
    document.getElementById('complexion_opacity').value = 0;
    document.getElementById('sundamage_opacity').value = 0;
    document.getElementById('lipstick_opacity').value = 0;
    document.getElementById('freckles_opacity').value = 0;
    document.getElementById('chesthair_opacity').value = 0;
    document.getElementById('bodyblemish_opacity').value = 0;
    document.getElementById('addbodyblemish_opacity').value = 0;

    document.getElementById('facial_hair_color').value = 0;
    document.getElementById('eyebrow_color').value = 0;
    document.getElementById('makeup_color').value = 0;
    document.getElementById('blush_color').value = 0;
    document.getElementById('lipstick_color').value = 0;
    
    document.getElementById('facial_hair_color2').value = 0;
    document.getElementById('eyebrow_color2').value = 0;
    document.getElementById('makeup_color2').value = 0;
    document.getElementById('lipstick_color2').value = 0;

    document.getElementById('hair_type').value = 37;
    document.getElementById('hair_color').value = 0;
    document.getElementById('hair_highl').value = 0;
}

//called every time we change any value.
function updatePedHeadBlendData() {
    let elem_0 = document.getElementById('father_face');
    let elem_1 = document.getElementById('father_skin');
    let elem_2 = document.getElementById('mother_face');
    let elem_3 = document.getElementById('mother_skin');
    let elem_4 = document.getElementById('face_mix');
    let elem_5 = document.getElementById('skin_mix');
    alt.emit('updatePedHeadBlendData', elem_0.value, elem_1.value, elem_2.value, elem_3.value, elem_4.value, elem_5.value);
}

function updatePedHair() {
    let elem_0 = document.getElementById('hair_type');
    let elem_1 = document.getElementById('hair_color');
    let elem_2 = document.getElementById('hair_highl');
    alt.emit('updateCharacterHair', elem_0.value, elem_1.value, elem_2.value);
}

function updatePedEyeColor() {
    let elem_0 = document.getElementById('eye_color');
    alt.emit('updatePedEyeColor', elem_0.value);
}

function setPedFaceFeature() {
    let elem_0 = document.getElementById('nose_width');         //Nose_Width
    let elem_1 = document.getElementById('nose_heigth');        //Nose_Peak_Hight
    let elem_2 = document.getElementById('nose_length');        //Nose_Peak_Lenght
    let elem_3 = document.getElementById('nose_bridge');        //Nose_Bone_High
    let elem_4 = document.getElementById('nose_tip');           //Nose_Peak_Lowering
    let elem_5 = document.getElementById('nose_bridgeshaft');   //Nose_Bone_Twist
    let elem_6 = document.getElementById('brow_heigth');        //EyeBrown_High
    let elem_7 = document.getElementById('brow_width');         //EyeBrown_Forward
    let elem_8 = document.getElementById('cheekb_heigth');      //Cheeks_Bone_High
    let elem_9 = document.getElementById('cheekb_width');       //Cheeks_Bone_Width
    let elem_10 = document.getElementById('cheek_width');       //Cheeks_Width
    let elem_11 = document.getElementById('eyelids');           //Eyes_Openning
    let elem_12 = document.getElementById('lips');              //Lips_Thickness
    let elem_13 = document.getElementById('jaw_width');         //Jaw_Bone_Width 'Bone size to sides
    let elem_14 = document.getElementById('jaw_heigth');        //Jaw_Bone_Back_Lenght 'Bone size to back
    let elem_15 = document.getElementById('chin_length');       //Chimp_Bone_Lowering 'Go Down
    let elem_16 = document.getElementById('chin_pos');          //Chimp_Bone_Lenght 'Go forward
    let elem_17 = document.getElementById('chin_width');        //Chimp_Bone_Width
    let elem_18 = document.getElementById('chin_shape');        //Chimp_Hole
    let elem_19 = document.getElementById('neck_width');        //Neck_Thikness
    alt.emit('setPedFaceFeature', 
    elem_0.value, elem_1.value, elem_2.value, elem_3.value, elem_4.value, elem_5.value, elem_6.value, elem_7.value, elem_8.value, elem_9.value, elem_10.value, elem_11.value,
    elem_12.value, elem_13.value, elem_14.value, elem_15.value, elem_16.value, elem_17.value, elem_18.value, elem_19.value);
}


function updatePedHeadOverlay() {
    let elem_0 = document.getElementById('blemish').value;            //Blemishes 0 - 23, 255
    let elem_1 = document.getElementById('facial_hair').value;        //Facial Hair 0 - 28, 255
    let elem_2 = document.getElementById('eyebrows').value;           //Eyebrows 0 - 33, 255
    let elem_3 = document.getElementById('age').value;                //Ageing 0 - 14, 255
    let elem_4 = document.getElementById('makeup').value;             //Makeup 0 - 74, 255
    let elem_5 = document.getElementById('blush').value;              //Blush 0 - 6, 255
    let elem_6 = document.getElementById('complexion').value;         //Complexion 0 - 11, 255
    let elem_7 = document.getElementById('sundamage').value;          //Sun Damage 0 - 10, 255
    let elem_8 = document.getElementById('lipstick').value;           //Lipstick 0 - 9, 255
    let elem_9 = document.getElementById('freckles').value;           //Moles/Freckles 0 - 17, 255
    let elem_10 = document.getElementById('chesthair').value;         //Chest Hair 0 - 16, 255
    let elem_11 = document.getElementById('bodyblemish').value;       //Body Blemishes 0 - 11, 255
    let elem_12 = document.getElementById('addbodyblemish').value;    //Add Body Blemishes 0 - 1, 255
    let overlayid = [elem_0, elem_1, elem_2, elem_3, elem_4, elem_5, elem_6, elem_7, elem_8, elem_9, elem_10, elem_11, elem_12];

    let elem_0_0 = document.getElementById('blemish_opacity').value;              //Blemishes 0 - 23, 255
    let elem_1_1 = document.getElementById('facial_hair_opacity').value;          //Facial Hair 0 - 28, 255
    let elem_2_2 = document.getElementById('eyebrow_opacity').value;              //Eyebrows 0 - 33, 255
    let elem_3_3 = document.getElementById('age_opacity').value;                  //Ageing 0 - 14, 255
    let elem_4_4 = document.getElementById('makeup_opacity').value;               //Makeup 0 - 74, 255
    let elem_5_5 = document.getElementById('blush_opacity').value;                //Blush 0 - 6, 255
    let elem_6_6 = document.getElementById('complexion_opacity').value;           //Complexion 0 - 11, 255
    let elem_7_7 = document.getElementById('sundamage_opacity').value;            //Sun Damage 0 - 10, 255
    let elem_8_8 = document.getElementById('lipstick_opacity').value;             //Lipstick 0 - 9, 255
    let elem_9_9 = document.getElementById('freckles_opacity').value;             //Moles/Freckles 0 - 17, 255
    let elem_10_10 = document.getElementById('chesthair_opacity').value;          //Chest Hair 0 - 16, 255
    let elem_11_11 = document.getElementById('bodyblemish_opacity').value;        //Body Blemishes 0 - 11, 255
    let elem_12_12 = document.getElementById('addbodyblemish_opacity').value;     //Add Body Blemishes 0 - 1, 255
    let overlay_opacity = [elem_0_0, elem_1_1, elem_2_2, elem_3_3, elem_4_4, elem_5_5, elem_6_6, elem_7_7, elem_8_8, elem_9_9, elem_10_10, elem_11_11, elem_12_12];

    alt.emit('updatePedHeadOverlay', JSON.stringify(overlayid), JSON.stringify(overlay_opacity));
}

function updatePedHeadOverlayColor() {
    //COLOR 1
    //-------
    let elem_0 = 0;                                                         //Blemishes 0 - 23, 255
    let elem_1 = document.getElementById('facial_hair_color').value;        //Facial Hair 0 - 28, 255
    let elem_2 = document.getElementById('eyebrow_color').value;            //Eyebrows 0 - 33, 255
    let elem_3 = 0;                                                         //Ageing 0 - 14, 255
    let elem_4 = document.getElementById('makeup_color').value;             //Makeup 0 - 74, 255
    let elem_5 = document.getElementById('blush_color').value;              //Blush 0 - 6, 255
    let elem_6 = 0;                                                         //Complexion 0 - 11, 255
    let elem_7 = 0;                                                         //Sun Damage 0 - 10, 255
    let elem_8 = document.getElementById('lipstick_color').value;           //Lipstick 0 - 9, 255
    let elem_9 = 0;                                                         //Moles/Freckles 0 - 17, 255
    let elem_10 = 0;                                                        //Chest Hair 0 - 16, 255
    let elem_11 = 0;                                                        //Body Blemishes 0 - 11, 255
    let elem_12 = 0;                                                        //Add Body Blemishes 0 - 1, 255
    let color1 = [elem_0, elem_1, elem_2, elem_3, elem_4, elem_5, elem_6, elem_7, elem_8, elem_9, elem_10, elem_11, elem_12];
    //COLOR 2
    //-------
    let elem_0_0 = 0                                                        //Blemishes 0 - 23, 255
    let elem_1_1 = document.getElementById('facial_hair_color2').value;     //Facial Hair 0 - 28, 255
    let elem_2_2 = document.getElementById('eyebrow_color2').value;         //Eyebrows 0 - 33, 255
    let elem_3_3 = 0;                                                       //Ageing 0 - 14, 255
    let elem_4_4 = document.getElementById('makeup_color2').value;          //Makeup 0 - 74, 255
    let elem_5_5 = 0;                                                       //Blush 0 - 6, 255
    let elem_6_6 = 0;                                                       //Complexion 0 - 11, 255
    let elem_7_7 = 0;                                                       //Sun Damage 0 - 10, 255
    let elem_8_8 = document.getElementById('lipstick_color2').value;        //Lipstick 0 - 9, 255
    let elem_9_9 = 0;                                                       //Moles/Freckles 0 - 17, 255
    let elem_10_10 = 0;                                                     //Chest Hair 0 - 16, 255
    let elem_11_11 = 0;                                                     //Body Blemishes 0 - 11, 255
    let elem_12_12 = 0;                                                     //Add Body Blemishes 0 - 1, 255
    let color2 = [elem_0_0, elem_1_1, elem_2_2, elem_3_3, elem_4_4, elem_5_5, elem_6_6, elem_7_7, elem_8_8, elem_9_9, elem_10_10, elem_11_11, elem_12_12];

    alt.emit('updatePedHeadOverlayColor', JSON.stringify(color1), JSON.stringify(color2));
}


function updateCharacterName() {
    let name = document.getElementById('chosencharactername').value;

    checkCharacterName();

    alt.emit('updateCharacterName', name);
}

var canWeCreateChar = false;
function checkCharacterName() {
    canWeCreateChar = false;
    let name = document.getElementById('chosencharactername').value;

    if(name == "") {
        document.getElementById('charname_success_msgs').style.display = "none";
        document.getElementById('charname_error_msgs').style.display = "block";
        document.getElementById('charname_error_msgs').innerHTML = 'Name cannot be empty.';
        return [false, "Name cannot be empty."];
    }

    let check = name.split(" ");
    if(check.length != 2) {
        document.getElementById('charname_success_msgs').style.display = "none";
        document.getElementById('charname_error_msgs').style.display = "block";
        document.getElementById('charname_error_msgs').innerHTML = 'You need a firstname and a lastname.';
        return [false, "You need a firstname and a lastname."]
    }

    let check_firstname = /^[a-zA-Z ]+$/.test(check[0]);
    let check_lastname = /^[a-zA-Z ]+$/.test(check[1]);

    if(!check_firstname) {
        document.getElementById('charname_success_msgs').style.display = "none";
        document.getElementById('charname_error_msgs').style.display = "block";
        document.getElementById('charname_error_msgs').innerHTML = 'firstname can only contain letters a-Z';
        return [false, "firstname can only contain characters a-Z"];
    }
    if(!check_lastname) {
        document.getElementById('charname_success_msgs').style.display = "none";
        document.getElementById('charname_error_msgs').style.display = "block";
        document.getElementById('charname_error_msgs').innerHTML = 'lastname can only contain letters a-Z';
        return [false, "lastname can only contain characters a-Z"];
    }

    document.getElementById('charname_error_msgs').style.display = "none";
    document.getElementById('charname_success_msgs').style.display = "block";
    document.getElementById('charname_success_msgs').innerHTML = 'Name looks valid! Checked availability?';
    return [true, "Name looks valid! Checked availability?"];
}

function checkAvailCharName() {
    const [valid, msg] = checkCharacterName();

    if(!valid)
        return;

    let name = document.getElementById('chosencharactername').value;
    alt.emit('isCharacterNameAvailable', name);
}

function CharNameAnswer(avail, msg) {
    if(avail) {
        canWeCreateChar = true;
        document.getElementById('charname_error_msgs').style.display = "none";
        document.getElementById('charname_success_msgs').style.display = "block";
        document.getElementById('charname_success_msgs').innerHTML = msg;
    } else {
        document.getElementById('charname_success_msgs').style.display = "none";
        document.getElementById('charname_error_msgs').style.display = "block";
        document.getElementById('charname_error_msgs').innerHTML = msg;
    }
}

function createSaveCharacter() {
    if(!canWeCreateChar)
        return;

    alt.emit('createSaveCharacter');
}