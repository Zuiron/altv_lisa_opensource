import * as alt from "alt";

alt.on('playerEnteredVehicle', ( player, vehicle, seat) => {
  console.log(`${player.name} enteredd ${vehicle.id} seat ${seat}`);
  alt.emitClient(player, 'playerEnterVehicle', seat);
});

alt.on('playerLeftVehicle', ( player, vehicle, seat) => {
  alt.emitClient(player, 'playerLeftVehicle', seat);
});

alt.on('playerChangedVehicleSeat', ( player, vehicle, oldSeat, newSeat) => {
  alt.emitClient(player, 'playerChangedVehicleSeat', newSeat);
});