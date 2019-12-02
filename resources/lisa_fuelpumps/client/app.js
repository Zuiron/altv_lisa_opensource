/* fuelshit */

document.getElementById("startfill").addEventListener("click", function(event){
    event.preventDefault();
});

function toggleFuelStationGUI(toggle) {
    if(toggle) {
        document.getElementById("body").style.visibility = 'visible';
        document.getElementById("body").style.opacity = 1.0;
    } else {
        document.getElementById("body").style.visibility = 'hidden';
        document.getElementById("body").style.opacity = 0.0;
    }
}

function updateLastVehStatusMsgFuelStation(data) {
    document.getElementById("last_used_veh").innerHTML = data;
}

function updateLastVehStatusMsgFuelStation2(data) { //0 vehname, 1 license plate, 2 totcost, 3 totlitre
    document.getElementById("last_used_veh").innerHTML = `
    <div class="input-group form-group">
        <div class="input-group-append">
            <span class="input-group-text"><i class="fas fa-car-alt"></i></span>
        </div>
        <input id="username" type="text" class="form-control" placeholder="${data[0]}" disabled>
        <div class="input-group-append">
            <span class="input-group-text">${data[1]}</span>
        </div>
        <div class="input-group-append">
            <span class="input-group-text"><i class="fas fa-dollar-sign"></i>&nbsp;<div id="tot_cost">${data[2]}</div></span>
        </div>
        <div class="input-group-append">
            <span class="input-group-text"><i class="fas fa-gas-pump"></i>&nbsp;<div id="tot_litre">${data[3]}</div></span>
        </div>
    </div>
    `;
}

function requestStartFill() {
    alt.emit('requestStartFill');
}

function updateFuelCost(cost, type) {
    if(type == 0) { document.getElementById("cost_0").innerHTML = cost; }
    else if(type == 1) { document.getElementById("cost_1").innerHTML = cost; }
    else if(type == 2) { document.getElementById("cost_2").innerHTML = cost; }
}

if('alt' in window) {
    alt.on("toggleFuelStationGUI", toggleFuelStationGUI);
    alt.on("updateLastVehStatusMsgFuelStation", updateLastVehStatusMsgFuelStation);
    alt.on("updateLastVehStatusMsgFuelStation2", updateLastVehStatusMsgFuelStation2);
    alt.on("fuelStationGuiFuelCostUpdate", updateFuelCost);
}