import * as alt from "alt";
import * as game from "natives";

/*
vehicle is now very resistant to explosion and or fire. and much more realistic vehicle damage.
to make a vehicle explode it almost has to be intentional. also popping tires work fine.
*/

function disableSeatShuffle() {
    if (!game.isPedInAnyVehicle(alt.Player.local.scriptID, undefined)) return;
    let vehicle = game.getVehiclePedIsIn(
        alt.Player.local.scriptID,
        undefined
    );

    let passenger = game.getPedInVehicleSeat(vehicle, 0);

    if (!game.getIsTaskActive(passenger, 165)) return;

    if (game.isVehicleSeatFree(vehicle, -1)) {
        if (passenger === alt.Player.local.scriptID) {
            game.setPedIntoVehicle(alt.Player.local.scriptID, vehicle, 0);
        }
    }
}


alt.setInterval(() => {
    disableSeatShuffle();

    if(alt.Player.local.vehicle == null)
        return;
    
    const vehscript = alt.Player.local.vehicle.scriptID;
    if(game.getVehicleEngineHealth(vehscript) < 0) {
        game.setVehicleEngineHealth(vehscript, 1000);
        game.setVehicleEngineHealth(vehscript, 1000);
        game.setVehicleEngineHealth(vehscript, 1000);
        game.setVehicleEngineHealth(vehscript, 0);
        //alt.log('dont u dare fucking burn or explode!');
    }
}, 0);

alt.setInterval(function(){
    if(alt.Player.local.vehicle == null)
        return;
    //is engine running, if engine ON
    if(!game.getIsVehicleEngineRunning(alt.Player.local.vehicle.scriptID))
        return;
    
    //engine health below 300, if health lower than 300 - MAX for lisa is 1000
    if(game.getVehicleEngineHealth(alt.Player.local.vehicle.scriptID) > 90)
        return;
    
    //kill the engine.
    game.setVehicleEngineOn(alt.Player.local.vehicle.scriptID, false, true, false); //last one auto turn back on. false is autoturnenabled false is you have to manually start it.
    //alt.log('killed the engine.'); //kill engine
    
}, 5000);



function vehiclesbreakseasilynow(entity){
    if(entity != undefined) {
        let handling = alt.HandlingData.getForModel(entity.model);
        const vehscript = entity.scriptID;
        
        //let handling = alt.HandlingData.getForModel(entity.model);
        handling.deformationDamageMult = 0.0;
        handling.weaponDamageMult = 0.0;
        
        handling.engineDamageMult = 3.0;
        handling.collisionDamageMult = 3.0;

        game.setVehicleExplodesOnHighExplosionDamage(vehscript, false);
        game.setDisableVehiclePetrolTankFires(vehscript, true);
        game.setDisableVehiclePetrolTankDamage(vehscript, true);

        //alt.log('setting handling, damage and deformation mult for vehicle.scriptID: '+vehscript);
        alt.log("vehiclesbreakseasilynow - gameEntityCreate - done");
    } else {
        let handling = alt.HandlingData.getForModel(alt.Player.local.vehicle.model);
        const vehscript = alt.Player.local.vehicle.scriptID;
        
        //let handling = alt.HandlingData.getForModel(entity.model);
        handling.deformationDamageMult = 0.0;
        handling.weaponDamageMult = 0.0;
        
        handling.engineDamageMult = 1.5;
        handling.collisionDamageMult = 3.0;

        game.setVehicleExplodesOnHighExplosionDamage(vehscript, false);
        game.setDisableVehiclePetrolTankFires(vehscript, true);
        game.setDisableVehiclePetrolTankDamage(vehscript, true);

        game.setVehicleDeformationFixed(alt.Player.local.vehicle.scriptID);

        alt.log("vehiclesbreakseasilynow - playerEnteredVehicle - done");
    }
}

alt.onServer("playerEnteredVehicle", (seat) => {
    //alt.log("vehiclesbreakseasilynow - playerEnteredVehicle");
    //vehiclesbreakseasilynow();
});

alt.on('gameEntityCreate', (entity) => {
    //alt.log("vehiclesbreakseasilynow - gameEntityCreate");
    //vehiclesbreakseasilynow(entity);
    //doesnt seem to work right when doing it from here.
    if(entity.constructor.name === "Vehicle") {
        vehiclesbreakseasilynow(entity); //does not work here. only on enter. works.
        game.setVehicleDeformationFixed(entity.scriptID);
//edit void SET_ENTITY_PROOFS(Entity entity, BOOL bulletProof, BOOL fireProof, BOOL explosionProof, BOOL collisionProof, BOOL meleeProof, BOOL steamProof, BOOL smokeProof, BOOL drownProof) // FAEE099C6F890BB8 7E9EAB66
        let bulletProof = true; //needs to be true to not explode??? yes. TODO figure fix so we can still shoot tires...
        let fireProof = true;
        let explosionProof = true;
        let collisionProof = false;
        let meleeProof = true;
        let steamProof = false;
        let smokeProof = false;
        let drownProof = true;
        game.setEntityProofs(entity.scriptID, bulletProof, fireProof, explosionProof, collisionProof, meleeProof, steamProof, smokeProof, drownProof);
    }
});