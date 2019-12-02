import * as alt from "alt";
import * as itemlist from "./itemlist.mjs"; //itemlist
import jsonData from './parse/masks.json';
import * as fs from "fs";


export function getItem(itemid) {
    if(itemlist.list[itemid] !== undefined) {
        return itemlist.list[itemid];
    } else { return undefined; }
}






//horse mask
//game.setPedComponentVariation(alt.Player.local.scriptID, 1, 97, 0, 0);
// 1 is MASK, 97 is MASK ITEM, 0 is texture. last 0 is unused-keep 0.

/*
200: {
        type: "clothing",
        name: "Horse mask",
        desc: "Hiiiiihhh!",
        gender: "Any",
        equipable: "character_PedComponentVariation",
        equipslot: 1,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 1, 97, 0, 0);`,
        desc2: "Unisex.",
        icon: 'default_mask'
    },
*/
var parseList = [];
let startItemId = 199;
function parselist() {
    let array = Object.entries(jsonData);
    for (let index = 0; index < array.length; index++) {
        const maskID = array[index][0];
        const maskTXTobj = array[index][1]; //OBJ

        const maskTXT = Object.entries(maskTXTobj);

        maskTXT.forEach(element => {
            //console.log('id: '+element[0]);
            let texturename = element[1].Localized;
            if(texturename == 'NULL') {
                texturename = 'TODO-MISSING-NAME';
            }

            let string = `
            ${startItemId}: {
                type: "clothing",
                type2: "mask",
                name: "${texturename}",
                desc: "Hides your identity.",
                gender: "Any",
                equipable: "character_PedComponentVariation",
                equipslot: 1,
                timedurability: 2880,
                equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, ${maskID}, ${element[0]}, 0);',
                desc2: "Unisex.",
                icon: 'default_mask'
            }
            `;
            /*
            fs.appendFile("./parse.txt", string, "utf8", function(err) {
                if (err) {
                    console.log("Error occurred while writing to file, maybe you didn't create the file?");
                    return console.log(err);
                }
            }); */

            //console.log(string);
            parseList.push(string);
            startItemId += 1;
        });
    }
    alt.log(parseList);
}


//parse shit test
alt.on('consoleCommand', (msg) => {
    if(msg == 'parse') {
        parselist();
    }
});









console.log("lisa_itemstore loaded!");


/*
chat.registerCmd("savepos", (player, args) => {
    chat.send(player,`Saved Position at X: ${player.pos.x}, Y: ${player.pos.y}, Z: ${player.pos.z}, Rot X: ${player.rot.x}, Rot Y: ${player.rot.y}, Rot Z: ${player.rot.z} in savepositions.txt`);
  
    let comment = args.join(' ')
  
    let string
    if(comment !== '')
    {
      string = `${comment}: ${player.pos.x}, ${player.pos.y}, ${player.pos.z}, ${player.rot.x}, ${player.rot.y}, ${player.rot.z}\n`;
    } else {
      string = `uncommented: ${player.pos.x}, ${player.pos.y}, ${player.pos.z}, ${player.rot.x}, ${player.rot.y}, ${player.rot.z}\n`;
    }
    
    fs.appendFile("savepositions.txt", string, "utf8", function(err) {
      if (err) {
        console.log("Error occurred while writing to file, maybe you didn't create the file?");
        return console.log(err);
      }
    });
  });
  */