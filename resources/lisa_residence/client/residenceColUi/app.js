document.addEventListener('DOMContentLoaded', (e) => {
    //hide(); //do this with CSS easier.
});

var active_elements = [];

function show() {
    document.getElementById("body").style.display = "block";
}

function hide() {
    active_elements = []; //clear on hide.
    document.getElementById("body").style.display = "none";
    document.getElementById("menu").innerHTML = `
    <a class="menu-button icon-plus" href="#menu" title="Show navigation"><div class="alt"><i class="material-icons">home</i><div><i class="material-icons">more_horiz</i></div><div class="keybind">[ALT]</div></div></a>
    <a class="menu-button icon-minus" href="#0" title="Hide navigation"><div class="alt2"><i class="material-icons">home</i><div><i class="material-icons" style="color:#00afff;">more_horiz</i></div></div></a>
    `;
}

var doorlocksound = new Audio('http://resource/client/residenceColUi/doorlock.wav');
doorlocksound.volume = 0.2;
function ToggleResidenceLock() {
    if(active_elements.includes("unlocked") || active_elements.includes("locked")) {
        let currentclass = document.getElementById("doorlock").innerHTML;
        if(currentclass == "lock") { 
            document.getElementById("doorlock").innerHTML = "lock_open"; 
            alt.emit('unlockResidence'); 
            doorlocksound.play();
        }
        else { 
            document.getElementById("doorlock").innerHTML = "lock"; 
            alt.emit('lockResidence');
            doorlocksound.play();
        }
    }
}

function enterResidence() {
    if(active_elements.includes("enter")) {
        window.location.href = "http://resource/client/residenceColUi/index.html#0"; //hide menu.
        alt.emit('enterResidence');
    }
}

function enterResidenceBackdoor() {
    if(active_elements.includes("enter_backdoor")) {
        window.location.href = "http://resource/client/residenceColUi/index.html#0"; //hide menu.
        alt.emit('enterResidenceBackdoor');
    }
}

var doorbellsound = new Audio('http://resource/client/residenceColUi/doorbell.mp3');
//var doorbellsound = new Audio('http://78.31.65.20:8080/dance.mp3?icy=http');
function RingResidenceDoorBell() {
    if(active_elements.includes("doorbell")) {
        //do something here.
        doorbellsound.volume = 0.04;
        doorbellsound.play();
        alt.emit('ringResidenceDoorBell');
    }
}
//for players inside interior, listeing to someone ringing doorbell..
function playdoorbellsound() {
    doorbellsound.volume = 0.3;
    doorbellsound.play();
}

function construct(arg) {
    active_elements.push(arg);
    if(arg == "enter") {
        document.getElementById("menu").innerHTML += `
        <li class="menu-item" onclick="enterResidence()">
            <a href="#menu">
                <i class="material-icons">meeting_room</i>
                <div class="keybind">[E]</div>
            </a>
        </li>`;
    }
    else if(arg == "enter_backdoor") {
        document.getElementById("menu").innerHTML += `
        <li class="menu-item" onclick="enterResidenceBackdoor()">
            <a href="#menu">
                <i class="material-icons" style="color:orange;">meeting_room</i>
                <div class="keybind">[E]</div>
            </a>
        </li>`;
    }
    else if(arg == "doorbell") {
        document.getElementById("menu").innerHTML += `
        <li class="menu-item" onclick="RingResidenceDoorBell()">
            <a href="#menu">
                <i class="material-icons">notifications_active</i>
                <div class="keybind">[Q]</div>
            </a>
        </li>`;
    }
    else if(arg == "unlocked") {
        document.getElementById("menu").innerHTML += `
        <li class="menu-item" onclick="ToggleResidenceLock()">
            <a href="#menu">
                <i id="doorlock" class="material-icons">lock</i>
                <div class="keybind">[R]</div>
            </a>
        </li>`;
    }
    else if(arg == "locked") {
        document.getElementById("menu").innerHTML += `
        <li class="menu-item" onclick="ToggleResidenceLock()">
            <a href="#menu">
                <i id="doorlock" class="material-icons">lock_open</i>
                <div class="keybind">[R]</div>
            </a>
        </li>`;
    }
}


if('alt' in window) {
    alt.on('construct', construct);
    alt.on('show', show);
    alt.on('hide', hide);
    alt.on('playdoorbellsound', playdoorbellsound);

    alt.on('keybind_RingResidenceDoorBell', RingResidenceDoorBell);
    alt.on('keybind_ToggleResidenceLock', ToggleResidenceLock);
    alt.on('keybind_enterResidence', enterResidence);
    alt.on('keybind_enterResidenceBackdoor', enterResidenceBackdoor);
}