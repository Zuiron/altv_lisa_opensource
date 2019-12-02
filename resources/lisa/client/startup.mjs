import * as alt from "alt";
import * as game from "natives";

function createBLIP(x, y, z, sprite, color, scale, shortrange, name) {
    let blip = game.addBlipForCoord(x, y, z);
    game.setBlipSprite(blip, sprite);
    game.setBlipColour(blip, color);
    game.setBlipScale(blip, scale);
    game.setBlipAsShortRange(blip, shortrange);
    game.beginTextCommandSetBlipName('STRING');
    game.addTextComponentSubstringPlayerName(name);
    game.endTextCommandSetBlipName(blip);
}

/*
//createBLIP(x, y, z, sprite, color, 1, true, "name");
//Police stations & prison 188 handcuffs, 526 police badge, 
createBLIP(649.6879272460938, -10.61538314819336, 82.778076171875, 526, 4, 1, true, "Vinewood Police Station");
createBLIP(-560.6505737304688, -134.08351135253906, 38.09228515625, 526, 4, 1, true, "Rockford Hills Police Station");
createBLIP(-1094.5714111328125, -805.4637451171875, 19.3048095703125, 526, 4, 1, true, "Vespucci Police Station");
createBLIP(423.5208740234375, -979.1736450195312, 30.6951904296875, 526, 4, 1, true, "Mission Row Police Station");
createBLIP(818.6901245117188, -1290, 26.2974853515625, 526, 4, 1, true, "La Mesa Police Station");
createBLIP(365.8945007324219, -1574.3472900390625, 29.229248046875, 526, 4, 1, true, "Davis Sheriff's Station");
createBLIP(1857.5736083984375, 3679.68798828125, 33.761962890625, 526, 4, 1, true, "Sandy Shores Sheriff's Station");
createBLIP(-438.5406494140625, 6021.138671875, 31.4871826171875, 526, 4, 1, true, "Paleto Bay Sheriff's Station");
createBLIP(1855.015380859375, 2585.74951171875, 45.6578369140625, 526, 4, 1, true, "Bolingbroke Penitentiary");


//Fire stations 436 fire icon, 
createBLIP(-664.1538696289062, -69.5208740234375, 38.6483154296875, 436, 4, 1, true, "Rockford Hills Fire Station");
createBLIP(217.23956298828125, -1638.052734375, 29.4820556640625, 436, 4, 1, true, "Davis Fire Station");
createBLIP(1196.1494140625, -1455.82421875, 34.958251953125, 436, 4, 1, true, "El Burro Heights Fire Station");
createBLIP(-389.3274841308594, 6127.37158203125, 31.4703369140625, 436, 4, 1, true, "Paleto Bay Fire Station");
createBLIP(-1032.06591796875, -2387.024169921875, 13.9296875, 436, 4, 1, true, "LSIA Fire Station");
createBLIP(-2113.305419921875, 2838.685791015625, 32.801513671875, 436, 4, 1, true, "Fort Zancudo Fire Station");
createBLIP(1699.859375, 3582.17138671875, 35.4805908203125, 436, 4, 1, true, "Sandy Shores Fire Station");

//Hospitals 51 pill, 61 medical star, 621 hearth, 
createBLIP(315.8769226074219, -1375.4110107421875, 31.908447265625, 61, 4, 1, true, "Central Los Santos Medical Center");
createBLIP(-475.5560302734375, -338.75604248046875, 34.3685302734375, 61, 4, 1, true, "Mount Zonah Medical Center");
createBLIP(279.29669189453125, -586.087890625, 43.2989501953125, 61, 4, 1, true, "Pillbox Hill Medical Center"); //upstairs
createBLIP(374.00439453125, -595.081298828125, 28.824951171875, 61, 4, 1, true, "Pillbox Hill Medical Center"); //downstairs
createBLIP(-233.23516845703125, 6314.6240234375, 31.4703369140625, 61, 4, 1, true, "Paleto Bay Care Center");
createBLIP(1824.3428955078125, 3698.953857421875, 33.795654296875, 61, 4, 1, true, "Sandy Shores Medical Center");
//createBLIP(x, y, z, 61, 4, 1, true, "Eclipse Medical Tower");
//createBLIP(x, y, z, 61, 4, 1, true, "St. Fiacre Hospital");
//createBLIP(x, y, z, 61, 4, 1, true, "Portola Trinity Medical Center");
createBLIP(-1209.4813232421875, -1798.15380859375, 3.904052734375, 61, 4, 1, true, "Lifeguard Headquarters");


//POI
createBLIP(432.4087829589844, -645.6527709960938, 28.7237548828125, 513, 29, 1, true, "Dashound Bus Center");
*/



//fix world with IPL's
game.requestIpl('chop_props');
game.requestIpl('FIBlobby');
game.removeIpl('FIBlobbyfake');
game.requestIpl('FBI_colPLUG');
game.requestIpl('FBI_repair');
game.requestIpl('v_tunnel_hole');
game.requestIpl('TrevorsMP');
game.requestIpl('TrevorsTrailer');
game.requestIpl('TrevorsTrailerTidy');
game.removeIpl('farm_burnt');
game.removeIpl('farm_burnt_lod');
game.removeIpl('farm_burnt_props');
game.removeIpl('farmint_cap');
game.removeIpl('farmint_cap_lod');
game.requestIpl('farm');
game.requestIpl('farmint');
game.requestIpl('farm_lod');
game.requestIpl('farm_props');
game.requestIpl('facelobby');
game.removeIpl('CS1_02_cf_offmission');
game.requestIpl('CS1_02_cf_onmission1');
game.requestIpl('CS1_02_cf_onmission2');
game.requestIpl('CS1_02_cf_onmission3');
game.requestIpl('CS1_02_cf_onmission4');
game.requestIpl('v_rockclub');
game.requestIpl('v_janitor');
game.removeIpl('hei_bi_hw1_13_door');
game.requestIpl('bkr_bi_hw1_13_int');
game.requestIpl('ufo');
game.requestIpl('ufo_lod');
game.requestIpl('ufo_eye');
game.removeIpl('v_carshowroom');
game.removeIpl('shutter_open');
game.removeIpl('shutter_closed');
game.removeIpl('shr_int');
game.requestIpl('csr_afterMission');
game.requestIpl('v_carshowroom');
game.requestIpl('shr_int');
game.requestIpl('shutter_closed');
game.requestIpl('smboat');
game.requestIpl('smboat_distantlights');
game.requestIpl('smboat_lod');
game.requestIpl('smboat_lodlights');
game.requestIpl('cargoship');
game.requestIpl('railing_start');
game.removeIpl('sp1_10_fake_interior');
game.removeIpl('sp1_10_fake_interior_lod');
game.requestIpl('sp1_10_real_interior');
game.requestIpl('sp1_10_real_interior_lod');
game.removeIpl('id2_14_during_door');
game.removeIpl('id2_14_during1');
game.removeIpl('id2_14_during2');
game.removeIpl('id2_14_on_fire');
game.removeIpl('id2_14_post_no_int');
game.removeIpl('id2_14_pre_no_int');
game.removeIpl('id2_14_during_door');
game.requestIpl('id2_14_during1');
game.removeIpl('Coroner_Int_off');
game.requestIpl('coronertrash');
game.requestIpl('Coroner_Int_on');
game.removeIpl('bh1_16_refurb');
game.removeIpl('jewel2fake');
game.removeIpl('bh1_16_doors_shut');
game.requestIpl('refit_unload');
game.requestIpl('post_hiest_unload');
game.requestIpl('Carwash_with_spinners');
game.requestIpl('KT_CarWash');
game.requestIpl('ferris_finale_Anim');
game.removeIpl('ch1_02_closed');
game.requestIpl('ch1_02_open');
game.requestIpl('AP1_04_TriAf01');
game.requestIpl('CS2_06_TriAf02');
game.requestIpl('CS4_04_TriAf03');
game.removeIpl('scafstartimap');
game.requestIpl('scafendimap');
game.removeIpl('DT1_05_HC_REMOVE');
game.requestIpl('DT1_05_HC_REQ');
game.requestIpl('DT1_05_REQUEST');
game.requestIpl('FINBANK');
game.removeIpl('DT1_03_Shutter');
game.removeIpl('DT1_03_Gr_Closed');
game.requestIpl('golfflags');
game.requestIpl('airfield');
game.requestIpl('v_garages');
game.requestIpl('v_foundry');
game.requestIpl('hei_yacht_heist');
game.requestIpl('hei_yacht_heist_Bar');
game.requestIpl('hei_yacht_heist_Bedrm');
game.requestIpl('hei_yacht_heist_Bridge');
game.requestIpl('hei_yacht_heist_DistantLights');
game.requestIpl('hei_yacht_heist_enginrm');
game.requestIpl('hei_yacht_heist_LODLights');
game.requestIpl('hei_yacht_heist_Lounge');
game.requestIpl('hei_carrier');
game.requestIpl('hei_Carrier_int1');
game.requestIpl('hei_Carrier_int2');
game.requestIpl('hei_Carrier_int3');
game.requestIpl('hei_Carrier_int4');
game.requestIpl('hei_Carrier_int5');
game.requestIpl('hei_Carrier_int6');
game.requestIpl('hei_carrier_LODLights');
game.requestIpl('bkr_bi_id1_23_door');
game.requestIpl('lr_cs6_08_grave_closed');
game.requestIpl('hei_sm_16_interior_v_bahama_milo_');
game.requestIpl('CS3_07_MPGates');
game.requestIpl('cs5_4_trains');
game.requestIpl('v_lesters');
game.requestIpl('v_trevors');
game.requestIpl('v_michael');
game.requestIpl('v_comedy');
game.requestIpl('v_cinema');
game.requestIpl('V_Sweat');
game.requestIpl('V_35_Fireman');
game.requestIpl('redCarpet');
game.requestIpl('triathlon2_VBprops');
game.requestIpl('jetstegameurnel');
game.requestIpl('Jetsteal_ipl_grp1');
game.requestIpl('v_hospital');
game.removeIpl('RC12B_Default');
game.removeIpl('RC12B_Fixed');
game.requestIpl('RC12B_Destroyed');
game.requestIpl('RC12B_HospitalInterior');
game.requestIpl('canyonriver01');
game.requestIpl('CanyonRvrShallow');
game.requestIpl('CS3_05_water_grp1');

alt.setInterval(() => {
    game.invalidateIdleCam();
}, 29000);

//fix blinking CEF
alt.setInterval(() => { 
    game.drawRect(0, 0, 0, 0, 0, 0, 0, 0);
}, 0);

//disable player seat shuffle in vehicles.
game.setPedConfigFlag(alt.Player.local.scriptID, 184, true);