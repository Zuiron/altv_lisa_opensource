function togglegui(toggle) {
    if(toggle) {
        document.getElementById("body").style.opacity = 1.0;
    } else {
        document.getElementById("body").style.opacity = 0.0;
    }
}

function setspeedo2(speed) {
    let display = speed.toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping:false});
    document.getElementById("speed").innerHTML = display + " km/h";
}
/*
function setspeedo(speed) {
    document.getElementById("speedometer").innerHTML = speed + " mp/h";
}

function setspeedo3(speed) {
    document.getElementById("speedometer3").innerHTML = speed + " knots";
}

function midist(mi) {
    document.getElementById("midist").innerHTML = mi;
}

function setmeters(meters) {
    document.getElementById("meters").innerHTML = meters;
}
*/
function setfuel(fuel, max) {
    document.getElementById("fuel").innerHTML = Number(fuel).toFixed(1) + " / " + max + " ltr";
}

function kmdist(km) {
    //document.getElementById("kmdist").innerHTML = km;
}

function setOdometer(km) {
    document.getElementById("kmdisttotal").innerHTML = km + " km.";
}

function setVehIndicators(str, state) {
    if(state) {
        document.getElementById(str).style.display = 'inline-block';
    } else {
        document.getElementById(str).style.display = 'none';
    }
}

if('alt' in window) {
    alt.on('togglegui', togglegui); //update stats.
    //alt.on('setspeed', setspeedo);
    alt.on('setspeed2', setspeedo2);
    //alt.on('setspeed3', setspeedo3);
    alt.on('setfuel', setfuel);

    //alt.on('setmeters', setmeters);
    alt.on('setkm', kmdist);
    //alt.on('setmi', midist);
    alt.on('setOdometer', setOdometer);
    alt.on('setVehIndicators', setVehIndicators);
}