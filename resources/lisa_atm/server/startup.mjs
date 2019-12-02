/* atm server */
import * as alt from "alt";
import chat from "chat";
import * as dbstore from "lisa_dbstore";

alt.onClient("requestMoneyBank", (player) => { //lets include cash.
    let moneybank = dbstore.CharacterValue(player.id, 'Money_Bank');
    alt.emitClient(player, 'setBankBalance', moneybank);

    let cash = dbstore.CharacterValue(player.id, "Money_Pocket");
    alt.emitClient(player, 'setCashBalance', cash);
});

function atm_deposit(player, value) {
    let cashmoney = dbstore.CharacterValue(player.id, 'Money_Pocket');
    if(Number(cashmoney) <= 0) {
        alt.emitClient(player, 'atmShowMsg', 'You are broke AF');
        return;
    }

    if(Number(value) < 0) {
        alt.emitClient(player, 'atmShowMsg', 'Please no hackerinos :)');
        chat.broadcast('HACKER ALERT: PID:'+player.id+', ALTVN: '+player.name+', Character: '+dbstore.CharacterValue(player.id, "Character_Name")+', CHID: '+dbstore.CharacterValue(player.id, "ID"));
        return;
    }

    if(Number(cashmoney) < Number(value)) {
        alt.emitClient(player, 'atmShowMsg', 'You do not have the required cash');
        return;
    }

    let bankmoney = dbstore.CharacterValue(player.id, 'Money_Bank');
    let newcash = Number(cashmoney) - Number(value);
    let newbank = Number(bankmoney) + Number(value);
    dbstore.CharacterValue(player.id, "Money_Pocket", `${newcash}`);
    dbstore.CharacterValue(player.id, "Money_Bank", `${newbank}`);

    alt.emitClient(player, 'setBankBalance', newbank);
    alt.emitClient(player, 'setCashBalance', newcash);

    alt.emitClient(player, 'atmShowMsg', 'You deposited $'+value);

    console.log('newbank: '+newbank);
    console.log('newcash: '+newcash);
}

function atm_withdraw(player, value) {
    let bankmoney = dbstore.CharacterValue(player.id, 'Money_Bank');
    if(Number(bankmoney) <= 0) {
        alt.emitClient(player, 'atmShowMsg', 'You are broke AF');
        return;
    }

    if(Number(value) < 0) {
        alt.emitClient(player, 'atmShowMsg', 'Please no hackerinos :)');
        chat.broadcast('HACKER ALERT: PID:'+player.id+', ALTVN: '+player.name+', Character: '+dbstore.CharacterValue(player.id, "Character_Name")+', CHID: '+dbstore.CharacterValue(player.id, "ID"));
        return;
    }

    if(Number(bankmoney) < Number(value)) {
        alt.emitClient(player, 'atmShowMsg', 'You do not have the required balance');
        return;
    }

    let playercash = dbstore.CharacterValue(player.id, 'Money_Pocket');
    let newcash = Number(playercash) + Number(value);
    let newbank = Number(bankmoney) - Number(value);
    dbstore.CharacterValue(player.id, "Money_Pocket", `${newcash}`);
    dbstore.CharacterValue(player.id, "Money_Bank", `${newbank}`);

    alt.emitClient(player, 'setBankBalance', newbank);
    alt.emitClient(player, 'setCashBalance', newcash);

    alt.emitClient(player, 'atmShowMsg', 'You withdrew $'+value);

    console.log('newbank: '+newbank);
    console.log('newcash: '+newcash);
}

alt.onClient("atm:doAction", (player, action, value) => { //VALUE IS STRING!
    //actions - Deposit - Withdraw
    console.log(player.id+' '+action+' '+value);

    if(action == 'Deposit') {
        atm_deposit(player, value);
    } 
    else if(action == 'Withdraw') {
        atm_withdraw(player, value);
    }

    //alt.emitClient(player, 'atmShowMsg', player.id+' '+action+' '+value);
});