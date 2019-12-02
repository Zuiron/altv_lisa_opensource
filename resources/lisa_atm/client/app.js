var currentAction = "Withdraw";
function enter() {
    let elemvalue = document.getElementById('actionInput').value;
    console.log(elemvalue);

    if(elemvalue == "") {
        alt.emit('atmPlayErrorSound');
        return;
    }
    
    if(Number(elemvalue) <= 0) {
        alt.emit('atmPlayErrorSound');
        return;
    }
    
    alt.emit('atmAction', currentAction, elemvalue);
    clearInput(false);
    console.log('enter()');
}

function clearInput(bool) {
    document.getElementById('actionInput').value = '';
    if(bool != undefined) { alt.emit('atmPlayPushButtonSound'); }
    console.log('clearInput()');
}

function cancel() {
    clearInput(false);
    alt.emit('atmPlayErrorSound');
    alt.emit('cancel');
    console.log('cancel()');
}

function add(val) {
    let elem = document.getElementById('actionInput');
    let calc = Number(elem.value) + Number(val);
    elem.value = calc;
    alt.emit('atmPlayPushButtonSound');
    console.log(`add(${val})`);
}

function numpad(val) {
    let elem = document.getElementById('actionInput');
    elem.value += val;
    alt.emit('atmPlayPushButtonSound');
    console.log(`numpad(${val})`);
}

function action(type) {
    if(type == 'deposit') {
        document.getElementById('actionType').innerHTML = "Deposit";
        document.getElementById('atypectrl').innerHTML = '<i class="fas fa-dollar-sign"></i>&nbsp;<i class="fas fa-angle-right"></i>&nbsp;<i class="fas fa-university"></i>';

        document.getElementById('btn_depo').classList.remove('btn-light');
        document.getElementById('btn_depo').classList.add('btn-dark');

        document.getElementById('btn_draw').classList.remove('btn-dark');
        document.getElementById('btn_draw').classList.add('btn-light');

        currentAction = "Deposit";
        alt.emit('atmPlayPushButtonSound');
        console.log('setting currentAction to Deposit');
    }
    else if(type == 'withdraw') {
        document.getElementById('actionType').innerHTML = "Withdraw";
        document.getElementById('atypectrl').innerHTML = '<i class="fas fa-dollar-sign"></i>&nbsp;<i class="fas fa-angle-left"></i>&nbsp;<i class="fas fa-university"></i>';

        document.getElementById('btn_depo').classList.remove('btn-dark');
        document.getElementById('btn_depo').classList.add('btn-light');

        document.getElementById('btn_draw').classList.remove('btn-light');
        document.getElementById('btn_draw').classList.add('btn-dark');

        currentAction = "Withdraw";
        alt.emit('atmPlayPushButtonSound');
        console.log('setting currentAction to Withdraw');
    }
    clearInput();
}

function setBankBalance(number) {
    document.getElementById('bankBalance').value = Number(number).toFixed(0);
    console.log('setting bankBalance to '+Number(number).toFixed(0));
}

function setCashBalance(number) {
    document.getElementById('currentCash').value = Number(number).toFixed(0);
    console.log('setting CashBalance to '+Number(number).toFixed(0));
}

function toggleAtmGui(bool) {
    if(bool) {
        document.getElementById('body').style.visibility = 'visible';
        document.getElementById('body').style.opacity = 1.0;
    } else {
        document.getElementById('body').style.visibility = 'hidden';
        document.getElementById('body').style.opacity = 0.0;
    }
    console.log('toggleAtmGui '+bool);
}

function atmShowMsg(msg) {
    document.getElementById('actionInput').dataset.content = msg;
    setTimeout(() => {
        $('#actionInput').popover('hide');
    }, 4000);

    setTimeout(() => {
    $('#actionInput').popover('show');
    }, 500);

    if(msg == "You are broke AF" || msg == "Please no hackerinos :)" || msg == "You do not have the required balance" || msg == "You do not have the required cash") {
        setTimeout(() => {
            alt.emit('atmPlayErrorSound');
        }, 500);
    } else {
        setTimeout(() => {
            alt.emit('atmPlaySuccessSound');
        }, 500);
    }
}

if('alt' in window) {
    alt.on('setBankBalance', setBankBalance);
    alt.on('setCashBalance', setCashBalance);
    alt.on('toggleAtmGui', toggleAtmGui);
    alt.on('atmShowMsg', atmShowMsg);
}