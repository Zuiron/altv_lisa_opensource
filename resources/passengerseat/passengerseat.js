import * as alt from 'alt';
import * as native from "natives";

  const getDistance = (vector1, vector2) => {
    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2));
  }
  
  alt.on('keydown', (key) => {
    if (key == 'G'.charCodeAt(0)) {
      const playerPed = alt.Player.local.scriptID;
      if (!native.isPedSittingInAnyVehicle(playerPed)) {
        const coords = native.getEntityCoords(playerPed);
        const offset = native.getOffsetFromEntityInWorldCoords(playerPed, 0.0, 1.0, 0.0);
        const rayHandle = native.startShapeTestCapsule(coords.x, coords.y, coords.z - 0.5, offset.x, offset.y, offset.z, 0.8, 10, playerPed, 7);
        const result = native.getShapeTestResult(rayHandle)[4];
        if (!result) return;
        if (native.doesEntityExist(result)) {
          const seatBones = ['seat_pside_f', 'seat_dside_r', 'seat_pside_r'];
          let closestSeat = [null, 3.0];
          seatBones.forEach((item, i) => {
            if (native.getEntityBoneIndexByName(result, item) != -1 && !native.getPedInVehicleSeat(result, i)) {
              const boneIndex = native.getEntityBoneIndexByName(result, item);
              const boneCoords = native.getWorldPositionOfEntityBone(result, boneIndex);
              const distance = getDistance(coords, boneCoords);
              if (distance < closestSeat[1]) {
                closestSeat = [i, distance];
              }
            }
          });
          if (closestSeat[0] !== null) {
            native.setPedConfigFlag(playerPed, 184, true);
            native.taskEnterVehicle(playerPed, result, -1, closestSeat[0], 1.0, 1, 0);
          }
        }
      }
    }
  });