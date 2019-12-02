import * as alt from "alt";
import chat from "chat";

chat.registerCmd("pos", (player, args) => { //character pos
  console.log(`pos = ${player.pos.x}, ${player.pos.y}, ${player.pos.z}`);
  console.log(`pos2 = {x: ${player.pos.x}, y: ${player.pos.y}, z: ${player.pos.z}}`);
});

chat.registerCmd("posv", (player, args) => { //vehicle pos+rot
  console.log(`posv = ${player.vehicle.pos.x}, ${player.vehicle.pos.y}, ${player.vehicle.pos.z}`);
  console.log(`rotv = ${player.vehicle.rot.x}, ${player.vehicle.rot.y}, ${player.vehicle.rot.z}`);
  console.log(JSON.stringify(player.vehicle.pos));
  console.log(JSON.stringify(player.vehicle.rot));
  console.log(JSON.stringify(player.vehicle.primaryColor), JSON.stringify(player.vehicle.secondaryColor));
});

chat.registerCmd("nurburg", (player) => {
  player.pos = { x: 3680.0, y: -6520.0, z: 2191.0 };
});

chat.registerCmd("home", (player) => {
  player.pos = { x: -875.2351684570312, y: 4434.51416015625, z: 15.867431640625 };
});