import * as alt from 'alt';
import Weather from './weather';

let weatherSync = new Weather("57bdba283b1bc3f9d3c32658d7575ff7", "Los Angeles", "US");

alt.on('consoleCommand', (msg) => {
    switch(msg){
        case "startWeather": weatherSync.startSync();
            break;
        case "stopWeather": weatherSync.stopSync();
            break;
        case "currentTemp": weatherSync.getTemp();
            break;
        case "currentData": weatherSync.getCurrentData();
            break;
        default: break;
    }
});