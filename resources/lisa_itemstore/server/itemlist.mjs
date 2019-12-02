/*
0: {                              //lets make icons based on itemID
        type: "consume",                //type of item. example: consume, clothing, vehiclemod, weapon
        name: "Sprunk Mini",            //name of the item
        desc: "The essence of life",    //description of the item
        power: 50,                      //durability, usually used for consume, keep it in TENS. 10-20-30 etc. every 10th is one sip of soda in this instance
        use: true,                      //on use, call itemscript with item id. in this case being 0
        weight: 0.394                   //weight in kilograms
    },
    1: {
        type: "consume",
        name: "Sprunk Xtreme",
        desc: "Explodes in your mouth",
        power: 90,
        use: true,
        weight: 0.700
    },
    2: {
        type: "weapon",
        name: "Flashlight",
        desc: "See in the dark",
        use: false,                     //do use later, example weaponmodmenu (flashlight, magextend etc...)
        id: "weapon_flashlight",
        hash: "0x8BB05FD7",
        weight: 0
    },
    3: {
        type: "weapon",                 //itemtype
        name: "Pistol",                 //itemname
        desc: "Standard pistol, 7mm",   //can only do 7mm bullets
        ammotype: "7mm",                //can accept type of ammo
        use: false,                     // use?
        id: "weapon_pistol",            //weaponID
        hash: "0x1B06D571",             //weaponHASH
        weight: 0                       //weight of item
    },
    4: {
        type: "ammo",                   //itemtype
        ammotype: "7mm",                //mm of ammo
        name: "Large Box Of Ammo",      //itemname
        desc: "7mm bullet ammo",        //item description
        bullets: 100,                   //numbers of bullets
        weight: 0                       //weight of item
    },
*/

/*
    0: {
        type: "clothing",
        name: "Jacket",
        desc: "a jacket?",
        equipable: "character_PedComponentVariation",
        equipslot: 11,
        durability: 1000,
        //first one is actual jacket and second is torso removed/invis or less it sticks out of jacket
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 11, 57, 0, 0); game.setPedComponentVariation(alt.Player.local.scriptID, 3, 4, 0, 2);`
    },
    1: {
        type: "clothing",
        name: "Pants",
        desc: "some random pants",
        equipable: "character_PedComponentVariation",
        equipslot: 4,
        durability: 1000,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 4, 43, 0, 0);`
    }
*/

/*
//testing zuiron equipped inventory with slot4 with itemid6 and slot11 with itemid 5
var equipped = {
  0:null,
  1:null,
  2:null,
  3:null,
  4:{6:{"durability":1000}},
  5:null,
  6:null,
  7:null,
  8:null,
  9:null,
  10:null,
  11:{5:{"durability":1000}}
}

//clothing, equip inventory.
//{"0":null,"1":null,"2":null,"3":null,"4":{"6":{"durability":1000}},"5":null,"6":null,"7":null,"8":null,"9":null,"10":null,"11":{"5":{"durability":1000}}}

//EMPTY Equipment inventory.
{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":null,"9":null,"10":null,"11":null}
*/




//player inventory
//{"0":{"0":{"usedurability":5}},"1":{"0":{"usedurability":2}}}


/*
equiptype: PedComponentVariation = Equipped in DB (setPedComponentVariation)
equiptype: need one for jewelry...

timedurability = lose durability based on time played. 1point per minute. 2880 points would be ~48 hours of playtime.
usedurability - lose dura 1 point every time on use.

item icons - based on itemID, list[0] icon -> 0.png

weight - in kilograms



                PED_VARIATION_FACE = 0,                 -not used i think (face but we use head blend data?)
                PED_VARIATION_HEAD = 1,                 --Mask
                PED_VARIATION_HAIR = 2,                 -hair
                PED_VARIATION_TORSO = 3,                -not used, think we set torso based on torso2 item. ignore this.
                PED_VARIATION_LEGS = 4,                 --Legs
                PED_VARIATION_HANDS = 5,                --Bag
                PED_VARIATION_FEET = 6,                 --Shoes
                PED_VARIATION_EYES = 7,                 --Neck - accesories, necklace, etc.
                PED_VARIATION_ACCESSORIES = 8,          -undershirt, ignore, we set this based on item torso2.
                PED_VARIATION_TASKS = 9,                -body armor, we dont use.
                PED_VARIATION_TEXTURES = 10,            -ignore
                PED_VARIATION_TORSO2 = 11               --Top

                Hats (PropID 0)                         -- we use, 12
                Glasses (PropID 1)                      -- we use, 13
                Ears (PropID 2)                         -- we use, 14
                Watches (PropID 6)                      -- we use, 15
                Bracelets (PropID 7)                    -- we use, 16



//test area
{"0":{"0":{"usedurability":5}},"1":{"0":{"usedurability":3}},"2":{"0":{"usedurability":1}},"3":{"1":{"timedurability":1000}},"4":{"2":{"timedurability":1000}},"4":{"3":{"timedurability":1000}},"4":{"4":{"timedurability":1000}},"4":{"5":{"timedurability":1000}},"4":{"6":{"timedurability":1000}}}
*/

export const list = {
    0: {
        type: "consumeable",
        name: "Sprunk Can",
        rarity: "big",
        desc: "The essence of life",
        prop: "ba_prop_club_tonic_can",
        useable: true,
        usedurability: 5,
        weight: 0.394,
        onUseClientEval: `alt.log('success!');`, //TODO drink sound maybe?
        onUseServerEval: `itemfuncs.regenThirst(player, 500, 1000, 3, true, 0); alt.emitClient(player, 'playHowl2d', './audio/slurp.wav', 0.2);`,  //TODO trigger function? animation? add health? or energy?
        desc2: "Use: <br> Restores 50% thirst over 3 sec."
    },
    1: {
        type: "clothing",
        name: "Hoodie",
        desc: "is it grey or green.",
        gender: "Male",
        equipable: "character_PedComponentVariation",
        equipslot: 11,
        timedurability: 2880,
        //first one is actual jacket and second is torso removed/invis or less it sticks out of jacket
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 11, 57, 0, 0); game.setPedComponentVariation(alt.Player.local.scriptID, 3, 4, 0, 2);`,
        desc2: "Only suitable for males.",
        icon: 'default_top_m'
    },
    2: {
        type: "clothing",
        name: "Baggy pants",
        desc: "sum realz swaggrr.",
        gender: "Male",
        equipable: "character_PedComponentVariation",
        equipslot: 4,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 4, 43, 0, 0);`,
        desc2: "Only suitable for males.",
        icon: 'default_legs_m'
    },
    3: {
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
    4: {
        type: "clothing",
        name: "Black Bag Large",
        desc: "holds many things like condoms.",
        gender: "Any",
        equipable: "character_PedComponentVariation",
        equipslot: 5,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 5, 45, 0, 0);`,
        desc2: "Equip: <br> increases weight limit by x and slot limit by x",
        icon: 'default_bag'
    },
    5: {
        type: "clothing",
        name: "Shoes",
        desc: "white trash.",
        gender: "Male",
        equipable: "character_PedComponentVariation",
        equipslot: 6,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 6, 31, 2, 0);`,
        desc2: "Only suitable for males.",
        icon: 'default_shoes_m'
    },
    6: {
        type: "clothing",
        name: "Scarf",
        desc: "brown.",
        gender: "Male",
        equipable: "character_PedComponentVariation",
        equipslot: 7,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 7, 112, 0, 0);`,
        desc2: "Only suitable for males.",
        icon: 'default_neck_m'
    },
    7: {
        type: "clothing",
        name: "Cut Pants",
        desc: "black.",
        gender: "Female",
        equipable: "character_PedComponentVariation",
        equipslot: 4,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 4, 43, 0, 0);`,
        desc2: "Only suitable for females.",
        icon: 'default_legs_f'
    },
    8: {
        type: "clothing",
        name: "Tall boots",
        desc: "black.",
        gender: "Female",
        equipable: "character_PedComponentVariation",
        equipslot: 6,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 6, 7, 0, 0);`,
        desc2: "Only suitable for females.",
        icon: 'default_shoes_f'
    },
    9: {
        type: "clothing",
        name: "Paramedic badge",
        desc: "HS PARAMEDIC.",
        gender: "Female",
        equipable: "character_PedComponentVariation",
        equipslot: 7,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 7, 97, 0, 0);`,
        desc2: "Only suitable for females.",
        icon: 'default_neck_f'
    },
    10: {
        type: "clothing",
        name: "Diamond Hoodie",
        desc: "black.",
        gender: "Female",
        equipable: "character_PedComponentVariation",
        equipslot: 11,
        timedurability: 2880,
        //first one hoodie, second one torso to fix stickthrue hoodie.
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 11, 316, 1, 0); game.setPedComponentVariation(alt.Player.local.scriptID, 3, 3, 0, 0);`,
        desc2: "Only suitable for females.",
        icon: 'default_top_f'
    },
    11: {
        type: "consumeable",
        name: "Bleeding Burger",
        desc: "Kill your hunger",
        prop: "xs_prop_trinket_bag_01a",
        useable: true,
        usedurability: 3,
        weight: 0.100,
        onUseClientEval: `alt.log('success!');`, //TODO drink sound maybe?
        onUseServerEval: `itemfuncs.regenHunger(player, 800, 1000, 5, true, 0);`,  //TODO trigger function? animation? add health? or energy?
        desc2: "Use: <br> Restores 80% hunger over 5 sec."
    },
    12: {
        type: "consumeable",
        name: "Junk Energy Drink",
        desc: "The quick fix",
        useable: true,
        usedurability: 3,
        weight: 0.394,
        onUseClientEval: `alt.log('success!');`, //TODO drink sound maybe?
        onUseServerEval: `itemfuncs.regenEnergy(player, 100, 1000, 1, true, 0);`,  //TODO trigger function? animation? add health? or energy?
        desc2: "Use: <br> Restores 10% energy."
    },
    13: {
        type: "fishing",
        name: "Fishing Rod",
        desc: "Standard Edition",
        prop: "prop_fishing_rod_01",
        useable: true,
        usedurability: 1000,
        weight: 0.586,
        onUseClientEval: `alt.log('lets try fishing :D');`,
        onUseServerEval: `alt.emitClient(player, 'fishing:tryFish');`,
        desc2: "Use: <br> Catch fish and feed your family!"
    },
    //DEFAULT SPAWN CLOTHES FEMALE
    14: {
        type: "clothing",
        name: "Top",
        desc: "red.",
        gender: "Female",
        equipable: "character_PedComponentVariation",
        equipslot: 11,
        timedurability: 2880,
        //first one hoodie, second one torso to fix stickthrue hoodie.
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 11, 16, 0, 2); game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 2);`,
        desc2: "Only suitable for females.",
        icon: 'default_top_f'
    },
    15: {
        type: "clothing",
        name: "Jeans",
        desc: "black & belt.",
        gender: "Female",
        equipable: "character_PedComponentVariation",
        equipslot: 4,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 4, 76, 0, 2);`,
        desc2: "Only suitable for females.",
        icon: 'default_legs_f'
    },
    16: {
        type: "clothing",
        name: "Flipflops",
        desc: "beige.",
        gender: "Female",
        equipable: "character_PedComponentVariation",
        equipslot: 6,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 6, 5, 0, 0);`,
        desc2: "Only suitable for females.",
        icon: 'default_shoes_f'
    },
    
    17: {
        type: "clothing",
        name: "Tshirt",
        desc: "beige.",
        gender: "Male",
        equipable: "character_PedComponentVariation",
        equipslot: 11,
        timedurability: 2880,
        //first one is actual jacket and second is torso removed/invis or less it sticks out of jacket
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 11, 97, 0, 0); game.setPedComponentVariation(alt.Player.local.scriptID, 3, 0, 0, 2);`,
        desc2: "Only suitable for males.",
        icon: 'default_top_m'
    },
    18: {
        type: "clothing",
        name: "Shorts",
        desc: "black.",
        gender: "Male",
        equipable: "character_PedComponentVariation",
        equipslot: 4,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 4, 6, 1, 0);`,
        desc2: "Only suitable for males.",
        icon: 'default_legs_m'
    },
    19: {
        type: "clothing",
        name: "Sandals",
        desc: "black with socks.",
        gender: "Male",
        equipable: "character_PedComponentVariation",
        equipslot: 6,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 6, 6, 0, 0);`,
        desc2: "Only suitable for males.",
        icon: 'default_shoes_m'
    },
    20: {
        type: "tools",
        name: "Quick Repair Kit MK1",
        desc: "Just a temp fix.",
        useable: true,
        manualusesub: true,
        usedurability: 10,
        weight: 2.000,
        onUseClientEval: `alt.log('success!');`,
        onUseServerEval: `itemfuncs.vehicleRepairKit(player, "MK1", 20);`,
        desc2: "Use: <br> Temporary fix a vehicles engine."
    },
    21: {
        type: "tools",
        name: "Quick Repair Kit MK2",
        desc: "Just a temp fix.",
        useable: true,
        manualusesub: true,
        usedurability: 10,
        weight: 3.000,
        onUseClientEval: `alt.log('success!');`,
        onUseServerEval: `itemfuncs.vehicleRepairKit(player, "MK2", 21);`,
        desc2: "Use: <br> Temporary fix a vehicles engine."
    },
    22: {
        type: "tools",
        name: "Quick Repair Kit MK3",
        desc: "Just a temp fix.",
        useable: true,
        manualusesub: true,
        usedurability: 10,
        weight: 4.000,
        onUseClientEval: `alt.log('success!');`,
        onUseServerEval: `itemfuncs.vehicleRepairKit(player, "MK3", 22);`,
        desc2: "Use: <br> Temporary fix a vehicles engine."
    },
    23: {
        type: "consumeable",
        name: "Cannabis Caps",
        desc: "20pcs.",
        useable: true,
        usedurability: 20,
        weight: 0.140,
        onUseClientEval: `alt.log('success!');`,
        onUseServerEval: `console.log('success!');`,
        desc2: "Use: <br> Makes you melt like butter."
    },
    24: {
        type: "consumeable",
        name: "Cannabis Caps XL",
        desc: "40pcs.",
        useable: true,
        usedurability: 40,
        weight: 0.280,
        onUseClientEval: `alt.log('success!');`,
        onUseServerEval: `console.log('success!');`,
        desc2: "Use: <br> Makes you melt like butter."
    },
    25: {
        type: "clothing",
        name: "Hat",
        desc: "hat test item",
        gender: "Male",
        equipable: "character_PedComponentVariation",
        equipslot: 12,
        equipClientEval: `game.setPedPropIndex(alt.Player.local.scriptID, 0, 13, 1, 0);`,
        desc2: "Only suitable for males.",
        icon: 'default_hats_m'
    },
    26: {
        type: "clothing",
        name: "Sunglasses",
        desc: "glasses test item",
        gender: "Male",
        equipable: "character_PedComponentVariation",
        equipslot: 13,
        equipClientEval: `game.setPedPropIndex(alt.Player.local.scriptID, 1, 23, 2, 0);`,
        desc2: "Only suitable for males.",
        icon: 'default_glasses_m'
    },
    27: {
        type: "clothing",
        name: "BT Earpiece",
        desc: "ears test item",
        gender: "Male",
        equipable: "character_PedComponentVariation",
        equipslot: 14,
        equipClientEval: `game.setPedPropIndex(alt.Player.local.scriptID, 2, 1, 0, 0);`,
        desc2: "Only suitable for males.",
        icon: 'default_ears_m'
    },
    28: {
        type: "clothing",
        name: "Watch",
        desc: "watch test item",
        gender: "Male",
        equipable: "character_PedComponentVariation",
        equipslot: 15,
        equipClientEval: `game.setPedPropIndex(alt.Player.local.scriptID, 6, 20, 0, 0);`,
        desc2: "Only suitable for males.",
        icon: 'default_watches_m'
    },
    29: {
        type: "clothing",
        name: "Bracelet",
        desc: "bracelet test item",
        gender: "Male",
        equipable: "character_PedComponentVariation",
        equipslot: 16,
        equipClientEval: `game.setPedPropIndex(alt.Player.local.scriptID, 7, 5, 0, 0);`,
        desc2: "Only suitable for males.",
        icon: 'default_bracelets_m'
    },
    //first 100 are reserved for test items.    

    //TRASH FISH LOOT
    50: {
        type: "trash",
        rarity: "trash",
        name: "Old Boot",
        desc: "Maybe someone finds a use for this?",
        weight: 0.600,
        desc2: "Description: <br> Just trash found in the world."
    },
    51: {
        type: "trash",
        rarity: "trash",
        name: "Used Condom",
        desc: "Maybe someone finds a use for this?",
        weight: 0.020,
        desc2: "Description: <br> Just trash found in the world."
    },
    52: {
        type: "trash",
        rarity: "trash",
        name: "Burnt Porn Magazine",
        desc: "Maybe someone finds a use for this?",
        weight: 0.100,
        desc2: "Description: <br> Just trash found in the world."
    },
    53: {
        type: "trash",
        rarity: "trash",
        name: "Seaweed",
        desc: "bleh! icky..",
        weight: 0.100,
        desc2: "Description: <br> Just trash found in the world."
    },

    //freshwater fish, rare, big, common.
    //------------------------------------------------
    //RARE fish
    100: {
        type: "fish",
        rarity: "rare",
        name: "<n style='color:gold'>Golden Siniperca</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    101: {
        type: "fish",
        rarity: "rare",
        name: "<n style='color:gold'>Granges D'or</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    102: {
        type: "fish",
        rarity: "rare",
        name: "<n style='color:gold'>Leather Carp</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    103: {
        type: "fish",
        rarity: "rare",
        name: "<n style='color:gold'>Mandarin Fish</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    104: {
        type: "fish",
        rarity: "rare",
        name: "<n style='color:gold'>Miho Spine Loach</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    105: {
        type: "fish",
        rarity: "rare",
        name: "<n style='color:gold'>Pacu</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    106: {
        type: "fish",
        rarity: "rare",
        name: "<n style='color:gold'>Piranha</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    107: {
        type: "fish",
        rarity: "rare",
        name: "<n style='color:gold'>Snakehead</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    108: {
        type: "fish",
        rarity: "rare",
        name: "<n style='color:gold'>Spotted Barbel</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    109: {
        type: "fish",
        rarity: "rare",
        name: "<n style='color:gold'>Swiri</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },

    //------------------------------------------------
    //BIG fish
    120: {
        type: "fish",
        rarity: "big",
        name: "<n style='color:dodgerblue'>Arowana</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    121: {
        type: "fish",
        rarity: "big",
        name: "<n style='color:dodgerblue'>Carp</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    122: {
        type: "fish",
        rarity: "big",
        name: "<n style='color:dodgerblue'>Cherry Salmon</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    123: {
        type: "fish",
        rarity: "big",
        name: "<n style='color:dodgerblue'>Diamond Minnow</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    124: {
        type: "fish",
        rarity: "big",
        name: "<n style='color:dodgerblue'>Freshwater Eel</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    125: {
        type: "fish",
        rarity: "big",
        name: "<n style='color:dodgerblue'>Lenok</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    126: {
        type: "fish",
        rarity: "big",
        name: "<n style='color:dodgerblue'>Striped Shiner</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    127: {
        type: "fish",
        rarity: "big",
        name: "<n style='color:dodgerblue'>Yellow-Head Catfish</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },

    //------------------------------------------------
    //COMMON fish
    140: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Amur Minnow</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    141: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Barbel Steed</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    142: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Bass</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    143: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Bitterling</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    144: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Bleeker</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    145: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Bluegill</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    146: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Bubble Eye</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    147: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Catfish</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    148: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Common Minnow</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    149: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Crawfish</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    150: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Crucian Carp</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    151: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Dace</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    152: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Goby Minnow</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    153: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Grayling</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    154: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Kuhlia Marginata</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    155: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Mudfish</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    156: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Notch Jaw</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    157: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Perch</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    158: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Rosy Bitterling</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    159: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Roundtail Paradisefish</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    160: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Salmon</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    161: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Smelt</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    162: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Soho Bitterling</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    163: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Stumpy Bullhead</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    164: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Sweetfish</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    165: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Terrapin</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    166: {
        type: "fish",
        rarity: "common",
        name: "<n style='color:greenyellow'>Yellowfin Sculpin</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },

    /*
    MASKS starts at 200.
    */
   
   200: {
    type: "clothing",
    type2: "mask",
    name: "Pink Pig",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 1, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
201: {
    type: "clothing",
    type2: "mask",
    name: "Brown Pig",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 1, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
202: {
    type: "clothing",
    type2: "mask",
    name: "Bloody Pig",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 1, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
203: {
    type: "clothing",
    type2: "mask",
    name: "Black Pig",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 1, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
204: {
    type: "clothing",
    type2: "mask",
    name: "Silver Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 2, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
205: {
    type: "clothing",
    type2: "mask",
    name: "Bone Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 2, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
206: {
    type: "clothing",
    type2: "mask",
    name: "Gray Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 2, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
207: {
    type: "clothing",
    type2: "mask",
    name: "Black Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 2, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
208: {
    type: "clothing",
    type2: "mask",
    name: "Pogo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 3, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
209: {
    type: "clothing",
    type2: "mask",
    name: "White Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 4, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
210: {
    type: "clothing",
    type2: "mask",
    name: "Red Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 4, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
211: {
    type: "clothing",
    type2: "mask",
    name: "Black Bloody Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 4, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
212: {
    type: "clothing",
    type2: "mask",
    name: "Dust Devils Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 4, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
213: {
    type: "clothing",
    type2: "mask",
    name: "Tan Ape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 5, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
214: {
    type: "clothing",
    type2: "mask",
    name: "Brown Ape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 5, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
215: {
    type: "clothing",
    type2: "mask",
    name: "Green Ape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 5, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
216: {
    type: "clothing",
    type2: "mask",
    name: "Pink Ape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 5, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
217: {
    type: "clothing",
    type2: "mask",
    name: "Green Carnival",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 6, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
218: {
    type: "clothing",
    type2: "mask",
    name: "White Carnival",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 6, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
219: {
    type: "clothing",
    type2: "mask",
    name: "Blue Carnival",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 6, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
220: {
    type: "clothing",
    type2: "mask",
    name: "Black Carnival",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 6, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
221: {
    type: "clothing",
    type2: "mask",
    name: "Green Monster",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 7, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
222: {
    type: "clothing",
    type2: "mask",
    name: "Red Monster",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 7, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
223: {
    type: "clothing",
    type2: "mask",
    name: "Black Monster",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 7, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
224: {
    type: "clothing",
    type2: "mask",
    name: "White Monster",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 7, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
225: {
    type: "clothing",
    type2: "mask",
    name: "White Santa",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 8, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
226: {
    type: "clothing",
    type2: "mask",
    name: "Black Santa",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 8, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
227: {
    type: "clothing",
    type2: "mask",
    name: "Latino Santa",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 8, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
228: {
    type: "clothing",
    type2: "mask",
    name: "Reindeer Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 9, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
229: {
    type: "clothing",
    type2: "mask",
    name: "Snowman Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 10, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
230: {
    type: "clothing",
    type2: "mask",
    name: "White Mysterious",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 11, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
231: {
    type: "clothing",
    type2: "mask",
    name: "Red Mysterious",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 11, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
232: {
    type: "clothing",
    type2: "mask",
    name: "Black Mysterious",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 11, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
233: {
    type: "clothing",
    type2: "mask",
    name: "Bronze Masquerade",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 12, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
234: {
    type: "clothing",
    type2: "mask",
    name: "Silver Masquerade",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 12, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
235: {
    type: "clothing",
    type2: "mask",
    name: "Black & Gold Masquerade",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 12, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
236: {
    type: "clothing",
    type2: "mask",
    name: "Cupid",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 13, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
237: {
    type: "clothing",
    type2: "mask",
    name: "Bullet Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
238: {
    type: "clothing",
    type2: "mask",
    name: "Vinewood Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
239: {
    type: "clothing",
    type2: "mask",
    name: "Tourist Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
240: {
    type: "clothing",
    type2: "mask",
    name: "Hound Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
241: {
    type: "clothing",
    type2: "mask",
    name: "Wolf Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
242: {
    type: "clothing",
    type2: "mask",
    name: "Beast Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
243: {
    type: "clothing",
    type2: "mask",
    name: "Bear Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
244: {
    type: "clothing",
    type2: "mask",
    name: "Dust Devils Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
245: {
    type: "clothing",
    type2: "mask",
    name: "Striped Rampage Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
246: {
    type: "clothing",
    type2: "mask",
    name: "Royal Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
247: {
    type: "clothing",
    type2: "mask",
    name: "Fashion Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
248: {
    type: "clothing",
    type2: "mask",
    name: "Vile Zombie Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
249: {
    type: "clothing",
    type2: "mask",
    name: "Rotten Zombie Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
250: {
    type: "clothing",
    type2: "mask",
    name: "Flame Skull Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
251: {
    type: "clothing",
    type2: "mask",
    name: "Nightmare Skull Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
252: {
    type: "clothing",
    type2: "mask",
    name: "Electric Skull Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 14, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
253: {
    type: "clothing",
    type2: "mask",
    name: "Skull Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 15, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
254: {
    type: "clothing",
    type2: "mask",
    name: "Stitched Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 15, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
255: {
    type: "clothing",
    type2: "mask",
    name: "Pale Stitched Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 15, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
256: {
    type: "clothing",
    type2: "mask",
    name: "Crossed Rampage Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 15, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
257: {
    type: "clothing",
    type2: "mask",
    name: "Metal Warrior",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 16, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
258: {
    type: "clothing",
    type2: "mask",
    name: "Circuit Warrior",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 16, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
259: {
    type: "clothing",
    type2: "mask",
    name: "Molten Warrior",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 16, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
260: {
    type: "clothing",
    type2: "mask",
    name: "Neon Warrior",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 16, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
261: {
    type: "clothing",
    type2: "mask",
    name: "Carbon Warrior",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 16, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
262: {
    type: "clothing",
    type2: "mask",
    name: "Deadeye Warrior",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 16, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
263: {
    type: "clothing",
    type2: "mask",
    name: "Stone Warrior",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 16, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
264: {
    type: "clothing",
    type2: "mask",
    name: "Lightning Warrior",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 16, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
265: {
    type: "clothing",
    type2: "mask",
    name: "Wooden Warrior",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 16, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
266: {
    type: "clothing",
    type2: "mask",
    name: "Gray Cat",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 17, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
267: {
    type: "clothing",
    type2: "mask",
    name: "Tabby Cat",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 17, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
268: {
    type: "clothing",
    type2: "mask",
    name: "Red Fox",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 18, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
269: {
    type: "clothing",
    type2: "mask",
    name: "Brown Fox",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 18, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
270: {
    type: "clothing",
    type2: "mask",
    name: "Brown Owl",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 19, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
271: {
    type: "clothing",
    type2: "mask",
    name: "White Owl",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 19, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
272: {
    type: "clothing",
    type2: "mask",
    name: "Gray Racoon",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 20, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
273: {
    type: "clothing",
    type2: "mask",
    name: "Black Racoon",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 20, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
274: {
    type: "clothing",
    type2: "mask",
    name: "Brown Bear",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 21, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
275: {
    type: "clothing",
    type2: "mask",
    name: "Grey Bear",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 21, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
276: {
    type: "clothing",
    type2: "mask",
    name: "Brown Bison",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 22, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
277: {
    type: "clothing",
    type2: "mask",
    name: "Golden Bison",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 22, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
278: {
    type: "clothing",
    type2: "mask",
    name: "Black Bull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 23, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
279: {
    type: "clothing",
    type2: "mask",
    name: "Brown Bull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 23, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
280: {
    type: "clothing",
    type2: "mask",
    name: "Brown Eagle",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 24, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
281: {
    type: "clothing",
    type2: "mask",
    name: "White Eagle",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 24, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
282: {
    type: "clothing",
    type2: "mask",
    name: "Pink Vulture",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 25, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
283: {
    type: "clothing",
    type2: "mask",
    name: "Black Vulture",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 25, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
284: {
    type: "clothing",
    type2: "mask",
    name: "Grey Wolf",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 26, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
285: {
    type: "clothing",
    type2: "mask",
    name: "Black Wolf",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 26, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
286: {
    type: "clothing",
    type2: "mask",
    name: "Flight Cap",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 27, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
287: {
    type: "clothing",
    type2: "mask",
    name: "Black Combat Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 28, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
288: {
    type: "clothing",
    type2: "mask",
    name: "Gray Combat Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 28, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
289: {
    type: "clothing",
    type2: "mask",
    name: "Charcoal Combat Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 28, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
290: {
    type: "clothing",
    type2: "mask",
    name: "Tan Combat Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 28, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
291: {
    type: "clothing",
    type2: "mask",
    name: "Forest Combat Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 28, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
292: {
    type: "clothing",
    type2: "mask",
    name: "Black Skeletal",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 29, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
293: {
    type: "clothing",
    type2: "mask",
    name: "Gray Skeletal",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 29, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
294: {
    type: "clothing",
    type2: "mask",
    name: "Charcoal Skeletal",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 29, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
295: {
    type: "clothing",
    type2: "mask",
    name: "Tan Skeletal",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 29, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
296: {
    type: "clothing",
    type2: "mask",
    name: "Green Skeletal",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 29, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
297: {
    type: "clothing",
    type2: "mask",
    name: "Please Stop Me Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 30, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
298: {
    type: "clothing",
    type2: "mask",
    name: "Penguin",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 31, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
299: {
    type: "clothing",
    type2: "mask",
    name: "Stocking",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 32, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
300: {
    type: "clothing",
    type2: "mask",
    name: "Gingerbread",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 33, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
301: {
    type: "clothing",
    type2: "mask",
    name: "White Elf",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 34, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
302: {
    type: "clothing",
    type2: "mask",
    name: "Black Elf",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 34, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
303: {
    type: "clothing",
    type2: "mask",
    name: "Latino Elf",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 34, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
304: {
    type: "clothing",
    type2: "mask",
    name: "Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 35, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
305: {
    type: "clothing",
    type2: "mask",
    name: "Rebreather",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 36, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
306: {
    type: "clothing",
    type2: "mask",
    name: "Scruffy Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 37, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
307: {
    type: "clothing",
    type2: "mask",
    name: "Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 38, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
308: {
    type: "clothing",
    type2: "mask",
    name: "Pink Infected",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 39, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
309: {
    type: "clothing",
    type2: "mask",
    name: "Brown Infected",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 39, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
310: {
    type: "clothing",
    type2: "mask",
    name: "White Mummy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 40, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
311: {
    type: "clothing",
    type2: "mask",
    name: "Green Mummy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 40, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
312: {
    type: "clothing",
    type2: "mask",
    name: "White Vampyr",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 41, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
313: {
    type: "clothing",
    type2: "mask",
    name: "Blue Vampyr",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 41, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
314: {
    type: "clothing",
    type2: "mask",
    name: "Pale Frank",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 42, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
315: {
    type: "clothing",
    type2: "mask",
    name: "Gray Frank",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 42, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
316: {
    type: "clothing",
    type2: "mask",
    name: "Impotent Rage",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 43, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
317: {
    type: "clothing",
    type2: "mask",
    name: "Princess Robot Bubblegum",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 44, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
318: {
    type: "clothing",
    type2: "mask",
    name: "Moorehead",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 45, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
319: {
    type: "clothing",
    type2: "mask",
    name: "Chemical Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 46, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
320: {
    type: "clothing",
    type2: "mask",
    name: "Crime Scene Tape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 47, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
321: {
    type: "clothing",
    type2: "mask",
    name: "Black Arrow Tape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 47, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
322: {
    type: "clothing",
    type2: "mask",
    name: "Hazard Tape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 47, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
323: {
    type: "clothing",
    type2: "mask",
    name: "Red Arrow Tape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 47, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
324: {
    type: "clothing",
    type2: "mask",
    name: "Light Gray Duct Tape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 48, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
325: {
    type: "clothing",
    type2: "mask",
    name: "Dark Gray Duct Tape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 48, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
326: {
    type: "clothing",
    type2: "mask",
    name: "White Duct Tape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 48, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
327: {
    type: "clothing",
    type2: "mask",
    name: "Electrical Duct Tape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 48, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
328: {
    type: "clothing",
    type2: "mask",
    name: "Up-n-Atom Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
329: {
    type: "clothing",
    type2: "mask",
    name: "Manic Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
330: {
    type: "clothing",
    type2: "mask",
    name: "Sad Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
331: {
    type: "clothing",
    type2: "mask",
    name: "Happy Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
332: {
    type: "clothing",
    type2: "mask",
    name: "Fat Cat Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
333: {
    type: "clothing",
    type2: "mask",
    name: "Mouth Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
334: {
    type: "clothing",
    type2: "mask",
    name: "Shy Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
335: {
    type: "clothing",
    type2: "mask",
    name: "Burger Shot Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
336: {
    type: "clothing",
    type2: "mask",
    name: "Kill Me Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
337: {
    type: "clothing",
    type2: "mask",
    name: "Diabolic Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
338: {
    type: "clothing",
    type2: "mask",
    name: "Cop Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
339: {
    type: "clothing",
    type2: "mask",
    name: "Monster Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
340: {
    type: "clothing",
    type2: "mask",
    name: "Fury Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
341: {
    type: "clothing",
    type2: "mask",
    name: "Zigzag Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
342: {
    type: "clothing",
    type2: "mask",
    name: "Skull Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
343: {
    type: "clothing",
    type2: "mask",
    name: "Dog Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
344: {
    type: "clothing",
    type2: "mask",
    name: "Pink Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
345: {
    type: "clothing",
    type2: "mask",
    name: "Alien Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
346: {
    type: "clothing",
    type2: "mask",
    name: "Help Me Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
347: {
    type: "clothing",
    type2: "mask",
    name: "Puzzle Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
348: {
    type: "clothing",
    type2: "mask",
    name: "The Bird Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
349: {
    type: "clothing",
    type2: "mask",
    name: "Dapper Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
350: {
    type: "clothing",
    type2: "mask",
    name: "Sticker Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
351: {
    type: "clothing",
    type2: "mask",
    name: "Modernist Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
352: {
    type: "clothing",
    type2: "mask",
    name: "Love Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 24, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
353: {
    type: "clothing",
    type2: "mask",
    name: "Blackout Paper Bag",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 49, 25, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
354: {
    type: "clothing",
    type2: "mask",
    name: "Green Plastic Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 50, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
355: {
    type: "clothing",
    type2: "mask",
    name: "The Don Plastic Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 50, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
356: {
    type: "clothing",
    type2: "mask",
    name: "Pink Plastic Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 50, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
357: {
    type: "clothing",
    type2: "mask",
    name: "Clown Plastic Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 50, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
358: {
    type: "clothing",
    type2: "mask",
    name: "Black Plastic Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 50, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
359: {
    type: "clothing",
    type2: "mask",
    name: "Brown Plastic Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 50, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
360: {
    type: "clothing",
    type2: "mask",
    name: "Mannequin Plastic Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 50, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
361: {
    type: "clothing",
    type2: "mask",
    name: "Doll Plastic Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 50, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
362: {
    type: "clothing",
    type2: "mask",
    name: "Puppet Plastic Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 50, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
363: {
    type: "clothing",
    type2: "mask",
    name: "Mime Plastic Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 50, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
364: {
    type: "clothing",
    type2: "mask",
    name: "Black Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 51, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
365: {
    type: "clothing",
    type2: "mask",
    name: "Skull Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 51, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
366: {
    type: "clothing",
    type2: "mask",
    name: "Urban Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 51, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
367: {
    type: "clothing",
    type2: "mask",
    name: "Desert Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 51, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
368: {
    type: "clothing",
    type2: "mask",
    name: "Forest Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 51, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
369: {
    type: "clothing",
    type2: "mask",
    name: "Green Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 51, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
370: {
    type: "clothing",
    type2: "mask",
    name: "Purple Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 51, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
371: {
    type: "clothing",
    type2: "mask",
    name: "Paisley Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 51, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
372: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 51, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
373: {
    type: "clothing",
    type2: "mask",
    name: "Electric Skull Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 51, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
374: {
    type: "clothing",
    type2: "mask",
    name: "Black Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 52, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
375: {
    type: "clothing",
    type2: "mask",
    name: "Gray Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 52, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
376: {
    type: "clothing",
    type2: "mask",
    name: "White Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 52, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
377: {
    type: "clothing",
    type2: "mask",
    name: "Green Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 52, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
378: {
    type: "clothing",
    type2: "mask",
    name: "Khaki Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 52, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
379: {
    type: "clothing",
    type2: "mask",
    name: "Charcoal Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 52, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
380: {
    type: "clothing",
    type2: "mask",
    name: "Forest Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 52, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
381: {
    type: "clothing",
    type2: "mask",
    name: "Urban Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 52, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
382: {
    type: "clothing",
    type2: "mask",
    name: "Blue Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 52, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
383: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 52, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
384: {
    type: "clothing",
    type2: "mask",
    name: "Skull Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 52, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
385: {
    type: "clothing",
    type2: "mask",
    name: "Black Hooded Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 53, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
386: {
    type: "clothing",
    type2: "mask",
    name: "Gray Hooded Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 53, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
387: {
    type: "clothing",
    type2: "mask",
    name: "White Hooded Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 53, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
388: {
    type: "clothing",
    type2: "mask",
    name: "Green Hooded Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 53, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
389: {
    type: "clothing",
    type2: "mask",
    name: "Khaki Hooded Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 53, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
390: {
    type: "clothing",
    type2: "mask",
    name: "Charcoal Hooded Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 53, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
391: {
    type: "clothing",
    type2: "mask",
    name: "Forest Hooded Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 53, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
392: {
    type: "clothing",
    type2: "mask",
    name: "Urban Hooded Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 53, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
393: {
    type: "clothing",
    type2: "mask",
    name: "Skull Hooded Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 53, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
394: {
    type: "clothing",
    type2: "mask",
    name: "Black T-Shirt Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 54, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
395: {
    type: "clothing",
    type2: "mask",
    name: "White T-Shirt Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 54, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
396: {
    type: "clothing",
    type2: "mask",
    name: "Tan T-Shirt Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 54, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
397: {
    type: "clothing",
    type2: "mask",
    name: "Benders T-Shirt Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 54, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
398: {
    type: "clothing",
    type2: "mask",
    name: "Justice T-Shirt Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 54, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
399: {
    type: "clothing",
    type2: "mask",
    name: "Woodland T-Shirt Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 54, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
400: {
    type: "clothing",
    type2: "mask",
    name: "Stripy T-Shirt Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 54, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
401: {
    type: "clothing",
    type2: "mask",
    name: "Love Fist T-Shirt Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 54, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
402: {
    type: "clothing",
    type2: "mask",
    name: "TPI T-Shirt Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 54, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
403: {
    type: "clothing",
    type2: "mask",
    name: "Pink Camo T-Shirt Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 54, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
404: {
    type: "clothing",
    type2: "mask",
    name: "LSPD T-Shirt Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 54, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
405: {
    type: "clothing",
    type2: "mask",
    name: "Charcoal Toggle Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 55, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
406: {
    type: "clothing",
    type2: "mask",
    name: "Khaki Toggle Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 55, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
407: {
    type: "clothing",
    type2: "mask",
    name: "Blue Loose Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 56, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
408: {
    type: "clothing",
    type2: "mask",
    name: "Black Loose Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 56, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
409: {
    type: "clothing",
    type2: "mask",
    name: "Skull Loose Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 56, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
410: {
    type: "clothing",
    type2: "mask",
    name: "Khaki Loose Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 56, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
411: {
    type: "clothing",
    type2: "mask",
    name: "Bloody Loose Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 56, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
412: {
    type: "clothing",
    type2: "mask",
    name: "Woodland Loose Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 56, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
413: {
    type: "clothing",
    type2: "mask",
    name: "Red Loose Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 56, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
414: {
    type: "clothing",
    type2: "mask",
    name: "Outback Loose Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 56, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
415: {
    type: "clothing",
    type2: "mask",
    name: "Split Loose Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 56, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
416: {
    type: "clothing",
    type2: "mask",
    name: "Black Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
417: {
    type: "clothing",
    type2: "mask",
    name: "Army Green Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
418: {
    type: "clothing",
    type2: "mask",
    name: "Copper Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
419: {
    type: "clothing",
    type2: "mask",
    name: "Gray Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
420: {
    type: "clothing",
    type2: "mask",
    name: "Brown Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
421: {
    type: "clothing",
    type2: "mask",
    name: "Rainbow Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
422: {
    type: "clothing",
    type2: "mask",
    name: "Woodland Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
423: {
    type: "clothing",
    type2: "mask",
    name: "Dirty Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
424: {
    type: "clothing",
    type2: "mask",
    name: "Pink Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
425: {
    type: "clothing",
    type2: "mask",
    name: "Flying Bravo FB Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
426: {
    type: "clothing",
    type2: "mask",
    name: "Flying Bravo Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
427: {
    type: "clothing",
    type2: "mask",
    name: "Princess Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
428: {
    type: "clothing",
    type2: "mask",
    name: "Didier Sachs Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
429: {
    type: "clothing",
    type2: "mask",
    name: "Perseus Band Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
430: {
    type: "clothing",
    type2: "mask",
    name: "Perseus Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
431: {
    type: "clothing",
    type2: "mask",
    name: "Sessanta Nove Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
432: {
    type: "clothing",
    type2: "mask",
    name: "White Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
433: {
    type: "clothing",
    type2: "mask",
    name: "Blue Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
434: {
    type: "clothing",
    type2: "mask",
    name: "Red Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
435: {
    type: "clothing",
    type2: "mask",
    name: "Green Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
436: {
    type: "clothing",
    type2: "mask",
    name: "Orange Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
437: {
    type: "clothing",
    type2: "mask",
    name: "Purple Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 57, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
438: {
    type: "clothing",
    type2: "mask",
    name: "Bandit Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 58, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
439: {
    type: "clothing",
    type2: "mask",
    name: "Nature Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 58, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
440: {
    type: "clothing",
    type2: "mask",
    name: "Neon Camo Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 58, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
441: {
    type: "clothing",
    type2: "mask",
    name: "Pink Camo Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 58, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
442: {
    type: "clothing",
    type2: "mask",
    name: "Orange Camo Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 58, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
443: {
    type: "clothing",
    type2: "mask",
    name: "Impotent Rage Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 58, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
444: {
    type: "clothing",
    type2: "mask",
    name: "Pogo Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 58, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
445: {
    type: "clothing",
    type2: "mask",
    name: "Blue Stripe Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 58, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
446: {
    type: "clothing",
    type2: "mask",
    name: "Black Stripe Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 58, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
447: {
    type: "clothing",
    type2: "mask",
    name: "Pink Stripe Knit Balaclava",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 58, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
448: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 59, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
449: {
    type: "clothing",
    type2: "mask",
    name: "Evil Pumpkin",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 60, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
450: {
    type: "clothing",
    type2: "mask",
    name: "Rotten Pumpkin",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 60, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
451: {
    type: "clothing",
    type2: "mask",
    name: "Nasty Watermelon",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 60, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
452: {
    type: "clothing",
    type2: "mask",
    name: "Creepy Butler",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 61, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
453: {
    type: "clothing",
    type2: "mask",
    name: "Dead Butler",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 61, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
454: {
    type: "clothing",
    type2: "mask",
    name: "Rotten Butler",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 61, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
455: {
    type: "clothing",
    type2: "mask",
    name: "White Scalded Psycho",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 62, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
456: {
    type: "clothing",
    type2: "mask",
    name: "Bloody Scalded Psycho",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 62, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
457: {
    type: "clothing",
    type2: "mask",
    name: "Black Scalded Psycho",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 62, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
458: {
    type: "clothing",
    type2: "mask",
    name: "Red Flayed Demon",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 63, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
459: {
    type: "clothing",
    type2: "mask",
    name: "Green Flayed Demon",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 63, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
460: {
    type: "clothing",
    type2: "mask",
    name: "Gray Flayed Demon",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 63, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
461: {
    type: "clothing",
    type2: "mask",
    name: "White Skull Burst",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 64, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
462: {
    type: "clothing",
    type2: "mask",
    name: "Red Skull Burst",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 64, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
463: {
    type: "clothing",
    type2: "mask",
    name: "Cream Skull Burst",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 64, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
464: {
    type: "clothing",
    type2: "mask",
    name: "Pale Lycanthrope",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 65, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
465: {
    type: "clothing",
    type2: "mask",
    name: "Dark Lycanthrope",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 65, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
466: {
    type: "clothing",
    type2: "mask",
    name: "Gray Lycanthrope",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 65, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
467: {
    type: "clothing",
    type2: "mask",
    name: "Green Toxic Insect",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 66, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
468: {
    type: "clothing",
    type2: "mask",
    name: "Red Toxic Insect",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 66, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
469: {
    type: "clothing",
    type2: "mask",
    name: "Purple Toxic Insect",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 66, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
470: {
    type: "clothing",
    type2: "mask",
    name: "Dirty Sewer Creature",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 67, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
471: {
    type: "clothing",
    type2: "mask",
    name: "Rotten Sewer Creature",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 67, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
472: {
    type: "clothing",
    type2: "mask",
    name: "Scabby Sewer Creature",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 67, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
473: {
    type: "clothing",
    type2: "mask",
    name: "Red Classic Lucifer",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 68, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
474: {
    type: "clothing",
    type2: "mask",
    name: "Orange Classic Lucifer",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 68, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
475: {
    type: "clothing",
    type2: "mask",
    name: "Black Classic Lucifer",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 68, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
476: {
    type: "clothing",
    type2: "mask",
    name: "Classic Sack Slasher",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 69, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
477: {
    type: "clothing",
    type2: "mask",
    name: "Bloody Sack Slasher",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 69, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
478: {
    type: "clothing",
    type2: "mask",
    name: "Black Sack Slasher",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 69, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
479: {
    type: "clothing",
    type2: "mask",
    name: "Blue Hypnotic Alien",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 70, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
480: {
    type: "clothing",
    type2: "mask",
    name: "Green Hypnotic Alien",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 70, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
481: {
    type: "clothing",
    type2: "mask",
    name: "Red Hypnotic Alien",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 70, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
482: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Haggard Witch",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 71, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
483: {
    type: "clothing",
    type2: "mask",
    name: "Gray Haggard Witch",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 71, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
484: {
    type: "clothing",
    type2: "mask",
    name: "White Haggard Witch",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 71, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
485: {
    type: "clothing",
    type2: "mask",
    name: "Red Bearded Lucifer",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 72, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
486: {
    type: "clothing",
    type2: "mask",
    name: "Orange Bearded Lucifer",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 72, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
487: {
    type: "clothing",
    type2: "mask",
    name: "Black Bearded Lucifer",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 72, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
488: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 73, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
489: {
    type: "clothing",
    type2: "mask",
    name: "Manic Gingerbread",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 74, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
490: {
    type: "clothing",
    type2: "mask",
    name: "Mad Gingerbread",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 74, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
491: {
    type: "clothing",
    type2: "mask",
    name: "Angry Gingerbread",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 74, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
492: {
    type: "clothing",
    type2: "mask",
    name: "Pink Crazy Gingerbread",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 75, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
493: {
    type: "clothing",
    type2: "mask",
    name: "Blue Crazy Gingerbread",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 75, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
494: {
    type: "clothing",
    type2: "mask",
    name: "Brown Crazy Gingerbread",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 75, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
495: {
    type: "clothing",
    type2: "mask",
    name: "Bruised Bad Santa",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 76, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
496: {
    type: "clothing",
    type2: "mask",
    name: "Grumpy Bad Santa",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 76, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
497: {
    type: "clothing",
    type2: "mask",
    name: "Filthy Bad Santa",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 76, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
498: {
    type: "clothing",
    type2: "mask",
    name: "Green Festive Luchador",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 77, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
499: {
    type: "clothing",
    type2: "mask",
    name: "Dark Green Festive Luchador",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 77, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
500: {
    type: "clothing",
    type2: "mask",
    name: "Black Festive Luchador",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 77, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
501: {
    type: "clothing",
    type2: "mask",
    name: "White Festive Luchador",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 77, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
502: {
    type: "clothing",
    type2: "mask",
    name: "Red Festive Luchador",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 77, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
503: {
    type: "clothing",
    type2: "mask",
    name: "Purple Festive Luchador",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 77, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
504: {
    type: "clothing",
    type2: "mask",
    name: "Dark Pudding",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 78, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
505: {
    type: "clothing",
    type2: "mask",
    name: "Light Pudding",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 78, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
506: {
    type: "clothing",
    type2: "mask",
    name: "Brown Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 79, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
507: {
    type: "clothing",
    type2: "mask",
    name: "Blond Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 79, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
508: {
    type: "clothing",
    type2: "mask",
    name: "Silver Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 79, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
509: {
    type: "clothing",
    type2: "mask",
    name: "Black LS Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 80, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
510: {
    type: "clothing",
    type2: "mask",
    name: "Red LS Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 80, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
511: {
    type: "clothing",
    type2: "mask",
    name: "White LS Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 80, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
512: {
    type: "clothing",
    type2: "mask",
    name: "Red Visor Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 81, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
513: {
    type: "clothing",
    type2: "mask",
    name: "LS Visor Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 81, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
514: {
    type: "clothing",
    type2: "mask",
    name: "Brown Visor Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 81, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
515: {
    type: "clothing",
    type2: "mask",
    name: "White Sweatband Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 82, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
516: {
    type: "clothing",
    type2: "mask",
    name: "Patriot Sweatband Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 82, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
517: {
    type: "clothing",
    type2: "mask",
    name: "Blue Sweatband Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 82, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
518: {
    type: "clothing",
    type2: "mask",
    name: "Classic Festive Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 83, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
519: {
    type: "clothing",
    type2: "mask",
    name: "Brown Festive Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 83, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
520: {
    type: "clothing",
    type2: "mask",
    name: "Blond Festive Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 83, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
521: {
    type: "clothing",
    type2: "mask",
    name: "Silver Festive Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 83, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
522: {
    type: "clothing",
    type2: "mask",
    name: "Abominable Snowman",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 84, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
523: {
    type: "clothing",
    type2: "mask",
    name: "Raw Turkey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 85, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
524: {
    type: "clothing",
    type2: "mask",
    name: "Cooked Turkey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 85, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
525: {
    type: "clothing",
    type2: "mask",
    name: "Burnt Turkey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 85, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
526: {
    type: "clothing",
    type2: "mask",
    name: "Wasted Mrs Claus",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 86, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
527: {
    type: "clothing",
    type2: "mask",
    name: "Smashed Mrs Claus",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 86, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
528: {
    type: "clothing",
    type2: "mask",
    name: "High Mrs Claus",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 86, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
529: {
    type: "clothing",
    type2: "mask",
    name: "Rebel Bad Elf",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 87, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
530: {
    type: "clothing",
    type2: "mask",
    name: "Gangsta Bad Elf",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 87, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
531: {
    type: "clothing",
    type2: "mask",
    name: "Badass Bad Elf",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 87, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
532: {
    type: "clothing",
    type2: "mask",
    name: "White Mrs Claus",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 88, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
533: {
    type: "clothing",
    type2: "mask",
    name: "Black Mrs Claus",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 88, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
534: {
    type: "clothing",
    type2: "mask",
    name: "Latino Mrs Claus",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 88, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
535: {
    type: "clothing",
    type2: "mask",
    name: "Black Combat Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 89, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
536: {
    type: "clothing",
    type2: "mask",
    name: "Gray Combat Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 89, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
537: {
    type: "clothing",
    type2: "mask",
    name: "Charcoal Combat Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 89, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
538: {
    type: "clothing",
    type2: "mask",
    name: "Tan Combat Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 89, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
539: {
    type: "clothing",
    type2: "mask",
    name: "Forest Combat Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 89, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
540: {
    type: "clothing",
    type2: "mask",
    name: "Ox Blood Dome Filter",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 90, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
541: {
    type: "clothing",
    type2: "mask",
    name: "Chocolate Dome Filter",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 90, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
542: {
    type: "clothing",
    type2: "mask",
    name: "Black Dome Filter",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 90, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
543: {
    type: "clothing",
    type2: "mask",
    name: "Tan Dome Filter",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 90, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
544: {
    type: "clothing",
    type2: "mask",
    name: "Ox Blood Dome Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 90, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
545: {
    type: "clothing",
    type2: "mask",
    name: "Chocolate Dome Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 90, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
546: {
    type: "clothing",
    type2: "mask",
    name: "Black Dome Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 90, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
547: {
    type: "clothing",
    type2: "mask",
    name: "Tan Dome Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 90, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
548: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 91, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
549: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 91, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
550: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 91, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
551: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 91, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
552: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 91, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
553: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 91, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
554: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 91, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
555: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 91, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
556: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 91, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
557: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 91, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
558: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 91, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
559: {
    type: "clothing",
    type2: "mask",
    name: "Amphibian Sea Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 92, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
560: {
    type: "clothing",
    type2: "mask",
    name: "Alien Sea Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 92, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
561: {
    type: "clothing",
    type2: "mask",
    name: "Reptilian Sea Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 92, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
562: {
    type: "clothing",
    type2: "mask",
    name: "Otherworldly Sea Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 92, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
563: {
    type: "clothing",
    type2: "mask",
    name: "Deity Sea Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 92, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
564: {
    type: "clothing",
    type2: "mask",
    name: "Infernal Sea Beast",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 92, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
565: {
    type: "clothing",
    type2: "mask",
    name: "Striped Dino",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 93, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
566: {
    type: "clothing",
    type2: "mask",
    name: "Gray Dino",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 93, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
567: {
    type: "clothing",
    type2: "mask",
    name: "Tropical Dino",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 93, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
568: {
    type: "clothing",
    type2: "mask",
    name: "Earth Dino",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 93, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
569: {
    type: "clothing",
    type2: "mask",
    name: "Rainforest Dino",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 93, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
570: {
    type: "clothing",
    type2: "mask",
    name: "Danger Dino",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 93, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
571: {
    type: "clothing",
    type2: "mask",
    name: "Red Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 94, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
572: {
    type: "clothing",
    type2: "mask",
    name: "Blue Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 94, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
573: {
    type: "clothing",
    type2: "mask",
    name: "White Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 94, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
574: {
    type: "clothing",
    type2: "mask",
    name: "Black Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 94, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
575: {
    type: "clothing",
    type2: "mask",
    name: "Gold Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 94, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
576: {
    type: "clothing",
    type2: "mask",
    name: "Green Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 94, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
577: {
    type: "clothing",
    type2: "mask",
    name: "Red Clown",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 95, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
578: {
    type: "clothing",
    type2: "mask",
    name: "Blue Clown",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 95, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
579: {
    type: "clothing",
    type2: "mask",
    name: "Green Clown",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 95, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
580: {
    type: "clothing",
    type2: "mask",
    name: "Orange Clown",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 95, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
581: {
    type: "clothing",
    type2: "mask",
    name: "Scavenger Clown",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 95, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
582: {
    type: "clothing",
    type2: "mask",
    name: "Neon Clown",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 95, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
583: {
    type: "clothing",
    type2: "mask",
    name: "Franken Clown",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 95, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
584: {
    type: "clothing",
    type2: "mask",
    name: "Sinister Clown",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 95, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
585: {
    type: "clothing",
    type2: "mask",
    name: "Silverback Crazed Ape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 96, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
586: {
    type: "clothing",
    type2: "mask",
    name: "Orangutan Crazed Ape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 96, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
587: {
    type: "clothing",
    type2: "mask",
    name: "Gray Crazed Ape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 96, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
588: {
    type: "clothing",
    type2: "mask",
    name: "Albino Crazed Ape",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 96, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
589: {
    type: "clothing",
    type2: "mask",
    name: "Chestnut Horse",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 97, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
590: {
    type: "clothing",
    type2: "mask",
    name: "Black Horse",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 97, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
591: {
    type: "clothing",
    type2: "mask",
    name: "Gray Horse",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 97, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
592: {
    type: "clothing",
    type2: "mask",
    name: "Brown Horse",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 97, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
593: {
    type: "clothing",
    type2: "mask",
    name: "Pinto Horse",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 97, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
594: {
    type: "clothing",
    type2: "mask",
    name: "Zebra",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 97, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
595: {
    type: "clothing",
    type2: "mask",
    name: "Unicorn",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 98, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
596: {
    type: "clothing",
    type2: "mask",
    name: "Red Ornate Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 99, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
597: {
    type: "clothing",
    type2: "mask",
    name: "Silver Ornate Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 99, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
598: {
    type: "clothing",
    type2: "mask",
    name: "Blue Ornate Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 99, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
599: {
    type: "clothing",
    type2: "mask",
    name: "Teal Ornate Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 99, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
600: {
    type: "clothing",
    type2: "mask",
    name: "White Ornate Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 99, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
601: {
    type: "clothing",
    type2: "mask",
    name: "Black Ornate Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 99, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
602: {
    type: "clothing",
    type2: "mask",
    name: "Moe Pug",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 100, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
603: {
    type: "clothing",
    type2: "mask",
    name: "Black Pug",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 100, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
604: {
    type: "clothing",
    type2: "mask",
    name: "Gray Pug",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 100, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
605: {
    type: "clothing",
    type2: "mask",
    name: "Brown Pug",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 100, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
606: {
    type: "clothing",
    type2: "mask",
    name: "Josephine Pug",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 100, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
607: {
    type: "clothing",
    type2: "mask",
    name: "Black and Tan Pug",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 100, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
608: {
    type: "clothing",
    type2: "mask",
    name: "Orange Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
609: {
    type: "clothing",
    type2: "mask",
    name: "Blue Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
610: {
    type: "clothing",
    type2: "mask",
    name: "Magenta Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
611: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
612: {
    type: "clothing",
    type2: "mask",
    name: "Fall Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
613: {
    type: "clothing",
    type2: "mask",
    name: "Gray Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
614: {
    type: "clothing",
    type2: "mask",
    name: "Camo Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
615: {
    type: "clothing",
    type2: "mask",
    name: "Gray Camo Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
616: {
    type: "clothing",
    type2: "mask",
    name: "Geo Camo Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
617: {
    type: "clothing",
    type2: "mask",
    name: "Black Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
618: {
    type: "clothing",
    type2: "mask",
    name: "Zebra Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
619: {
    type: "clothing",
    type2: "mask",
    name: "Bold Abstract Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
620: {
    type: "clothing",
    type2: "mask",
    name: "Pale Abstract Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
621: {
    type: "clothing",
    type2: "mask",
    name: "Gray Abstract Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
622: {
    type: "clothing",
    type2: "mask",
    name: "Gray Leopard Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
623: {
    type: "clothing",
    type2: "mask",
    name: "Blue Camo Bigness Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 101, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
624: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 102, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
625: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 102, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
626: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 102, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
627: {
    type: "clothing",
    type2: "mask",
    name: "Blue Digital Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
628: {
    type: "clothing",
    type2: "mask",
    name: "Brown Digital Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
629: {
    type: "clothing",
    type2: "mask",
    name: "Green Digital Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
630: {
    type: "clothing",
    type2: "mask",
    name: "Gray Digital Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
631: {
    type: "clothing",
    type2: "mask",
    name: "Peach Digital Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
632: {
    type: "clothing",
    type2: "mask",
    name: "Fall Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
633: {
    type: "clothing",
    type2: "mask",
    name: "Dark Woodland Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
634: {
    type: "clothing",
    type2: "mask",
    name: "Crosshatch Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
635: {
    type: "clothing",
    type2: "mask",
    name: "Moss Digital Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
636: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
637: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
638: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
639: {
    type: "clothing",
    type2: "mask",
    name: "Contrast Camo Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
640: {
    type: "clothing",
    type2: "mask",
    name: "Cobble Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
641: {
    type: "clothing",
    type2: "mask",
    name: "Peach Camo Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
642: {
    type: "clothing",
    type2: "mask",
    name: "Brushstroke Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
643: {
    type: "clothing",
    type2: "mask",
    name: "Flecktarn Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
644: {
    type: "clothing",
    type2: "mask",
    name: "Light Woodland Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
645: {
    type: "clothing",
    type2: "mask",
    name: "Moss Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
646: {
    type: "clothing",
    type2: "mask",
    name: "Sand Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
647: {
    type: "clothing",
    type2: "mask",
    name: "Black Putrefied Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
648: {
    type: "clothing",
    type2: "mask",
    name: "Slate Putrefied Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
649: {
    type: "clothing",
    type2: "mask",
    name: "Stone Putrefied Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
650: {
    type: "clothing",
    type2: "mask",
    name: "Green Putrefied Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
651: {
    type: "clothing",
    type2: "mask",
    name: "Woodland Putrefied Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 24, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
652: {
    type: "clothing",
    type2: "mask",
    name: "Moss Camo Putrefied Zombie",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 103, 25, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
653: {
    type: "clothing",
    type2: "mask",
    name: "Blue Digital Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
654: {
    type: "clothing",
    type2: "mask",
    name: "Brown Digital Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
655: {
    type: "clothing",
    type2: "mask",
    name: "Green Digital Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
656: {
    type: "clothing",
    type2: "mask",
    name: "Gray Digital Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
657: {
    type: "clothing",
    type2: "mask",
    name: "Peach Digital Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
658: {
    type: "clothing",
    type2: "mask",
    name: "Fall Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
659: {
    type: "clothing",
    type2: "mask",
    name: "Dark Woodland Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
660: {
    type: "clothing",
    type2: "mask",
    name: "Crosshatch Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
661: {
    type: "clothing",
    type2: "mask",
    name: "Moss Digital Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
662: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
663: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
664: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
665: {
    type: "clothing",
    type2: "mask",
    name: "Contrast Camo Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
666: {
    type: "clothing",
    type2: "mask",
    name: "Cobble Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
667: {
    type: "clothing",
    type2: "mask",
    name: "Peach Camo Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
668: {
    type: "clothing",
    type2: "mask",
    name: "Brushstroke Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
669: {
    type: "clothing",
    type2: "mask",
    name: "Flecktarn Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
670: {
    type: "clothing",
    type2: "mask",
    name: "Light Woodland Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
671: {
    type: "clothing",
    type2: "mask",
    name: "Moss Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
672: {
    type: "clothing",
    type2: "mask",
    name: "Sand Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
673: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
674: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
675: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
676: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
677: {
    type: "clothing",
    type2: "mask",
    name: "Olive Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 24, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
678: {
    type: "clothing",
    type2: "mask",
    name: "Skull Tactical Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 104, 25, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
679: {
    type: "clothing",
    type2: "mask",
    name: "Obsidian Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
680: {
    type: "clothing",
    type2: "mask",
    name: "Weathered Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
681: {
    type: "clothing",
    type2: "mask",
    name: "Sandstone Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
682: {
    type: "clothing",
    type2: "mask",
    name: "White Painted Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
683: {
    type: "clothing",
    type2: "mask",
    name: "Gold Painted Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
684: {
    type: "clothing",
    type2: "mask",
    name: "Red Painted Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
685: {
    type: "clothing",
    type2: "mask",
    name: "Black Painted Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
686: {
    type: "clothing",
    type2: "mask",
    name: "Black Possessed Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
687: {
    type: "clothing",
    type2: "mask",
    name: "Brown Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
688: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
689: {
    type: "clothing",
    type2: "mask",
    name: "Plum Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
690: {
    type: "clothing",
    type2: "mask",
    name: "Grayscale Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
691: {
    type: "clothing",
    type2: "mask",
    name: "Black and Yellow Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
692: {
    type: "clothing",
    type2: "mask",
    name: "Orange Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
693: {
    type: "clothing",
    type2: "mask",
    name: "Gold Stone Possessed Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
694: {
    type: "clothing",
    type2: "mask",
    name: "Stone Possessed Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
695: {
    type: "clothing",
    type2: "mask",
    name: "Gray Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
696: {
    type: "clothing",
    type2: "mask",
    name: "Black and Gold Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
697: {
    type: "clothing",
    type2: "mask",
    name: "Gray and Orange Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
698: {
    type: "clothing",
    type2: "mask",
    name: "White Possessed Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
699: {
    type: "clothing",
    type2: "mask",
    name: "Gray and Gold Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
700: {
    type: "clothing",
    type2: "mask",
    name: "Stone Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
701: {
    type: "clothing",
    type2: "mask",
    name: "Sea Green Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
702: {
    type: "clothing",
    type2: "mask",
    name: "Purple Oni",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 105, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
703: {
    type: "clothing",
    type2: "mask",
    name: "Blue Digital Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
704: {
    type: "clothing",
    type2: "mask",
    name: "Brown Digital Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
705: {
    type: "clothing",
    type2: "mask",
    name: "Green Digital Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
706: {
    type: "clothing",
    type2: "mask",
    name: "Gray Digital Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
707: {
    type: "clothing",
    type2: "mask",
    name: "Peach Digital Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
708: {
    type: "clothing",
    type2: "mask",
    name: "Fall Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
709: {
    type: "clothing",
    type2: "mask",
    name: "Dark Woodland Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
710: {
    type: "clothing",
    type2: "mask",
    name: "Crosshatch Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
711: {
    type: "clothing",
    type2: "mask",
    name: "Moss Digital Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
712: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
713: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
714: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
715: {
    type: "clothing",
    type2: "mask",
    name: "Contrast Camo Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
716: {
    type: "clothing",
    type2: "mask",
    name: "Cobble Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
717: {
    type: "clothing",
    type2: "mask",
    name: "Peach Camo Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
718: {
    type: "clothing",
    type2: "mask",
    name: "Brushstroke Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
719: {
    type: "clothing",
    type2: "mask",
    name: "Flecktarn Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
720: {
    type: "clothing",
    type2: "mask",
    name: "Light Woodland Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
721: {
    type: "clothing",
    type2: "mask",
    name: "Moss Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
722: {
    type: "clothing",
    type2: "mask",
    name: "Sand Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
723: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
724: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
725: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
726: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
727: {
    type: "clothing",
    type2: "mask",
    name: "Red Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 24, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
728: {
    type: "clothing",
    type2: "mask",
    name: "White Snake Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 106, 25, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
729: {
    type: "clothing",
    type2: "mask",
    name: "Blue Digital Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
730: {
    type: "clothing",
    type2: "mask",
    name: "Brown Digital Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
731: {
    type: "clothing",
    type2: "mask",
    name: "Green Digital Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
732: {
    type: "clothing",
    type2: "mask",
    name: "Gray Digital Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
733: {
    type: "clothing",
    type2: "mask",
    name: "Peach Digital Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
734: {
    type: "clothing",
    type2: "mask",
    name: "Fall Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
735: {
    type: "clothing",
    type2: "mask",
    name: "Dark Woodland Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
736: {
    type: "clothing",
    type2: "mask",
    name: "Crosshatch Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
737: {
    type: "clothing",
    type2: "mask",
    name: "Moss Digital Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
738: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
739: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
740: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
741: {
    type: "clothing",
    type2: "mask",
    name: "Contrast Camo Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
742: {
    type: "clothing",
    type2: "mask",
    name: "Cobble Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
743: {
    type: "clothing",
    type2: "mask",
    name: "Peach Camo Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
744: {
    type: "clothing",
    type2: "mask",
    name: "Brushstroke Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
745: {
    type: "clothing",
    type2: "mask",
    name: "Flecktarn Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
746: {
    type: "clothing",
    type2: "mask",
    name: "Light Woodland Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
747: {
    type: "clothing",
    type2: "mask",
    name: "Moss Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
748: {
    type: "clothing",
    type2: "mask",
    name: "Sand Vent",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
749: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
750: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
751: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
752: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 107, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
753: {
    type: "clothing",
    type2: "mask",
    name: "Clean Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
754: {
    type: "clothing",
    type2: "mask",
    name: "Weathered Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
755: {
    type: "clothing",
    type2: "mask",
    name: "Aged Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
756: {
    type: "clothing",
    type2: "mask",
    name: "Venom Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
757: {
    type: "clothing",
    type2: "mask",
    name: "Fresh Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
758: {
    type: "clothing",
    type2: "mask",
    name: "Fleshy Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
759: {
    type: "clothing",
    type2: "mask",
    name: "Moss Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
760: {
    type: "clothing",
    type2: "mask",
    name: "Sand Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
761: {
    type: "clothing",
    type2: "mask",
    name: "Inked Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
762: {
    type: "clothing",
    type2: "mask",
    name: "Stained Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
763: {
    type: "clothing",
    type2: "mask",
    name: "Tan Leather Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
764: {
    type: "clothing",
    type2: "mask",
    name: "Chocolate Leather Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
765: {
    type: "clothing",
    type2: "mask",
    name: "Orange Open-Eyed Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
766: {
    type: "clothing",
    type2: "mask",
    name: "Possessed Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
767: {
    type: "clothing",
    type2: "mask",
    name: "Wide-Eyed Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
768: {
    type: "clothing",
    type2: "mask",
    name: "Tattooed Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
769: {
    type: "clothing",
    type2: "mask",
    name: "Blue Painted Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
770: {
    type: "clothing",
    type2: "mask",
    name: "Pink Painted Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
771: {
    type: "clothing",
    type2: "mask",
    name: "Green Painted Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
772: {
    type: "clothing",
    type2: "mask",
    name: "Mustard Painted Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
773: {
    type: "clothing",
    type2: "mask",
    name: "Orange Swirl-Eyed Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
774: {
    type: "clothing",
    type2: "mask",
    name: "Leather Solar-Eyed Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
775: {
    type: "clothing",
    type2: "mask",
    name: "Terracotta Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
776: {
    type: "clothing",
    type2: "mask",
    name: "Striped Skull",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 108, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
777: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 109, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
778: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 109, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
779: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 109, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
780: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 109, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
781: {
    type: "clothing",
    type2: "mask",
    name: "Black Flight Cap",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 109, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
782: {
    type: "clothing",
    type2: "mask",
    name: "Tan Flight Cap",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 109, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
783: {
    type: "clothing",
    type2: "mask",
    name: "Green Flight Cap",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 109, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
784: {
    type: "clothing",
    type2: "mask",
    name: "Olive Flight Cap",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 109, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
785: {
    type: "clothing",
    type2: "mask",
    name: "Light Woodland Flight Cap",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 109, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
786: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo Flight Cap",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 109, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
787: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Flight Cap",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 109, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
788: {
    type: "clothing",
    type2: "mask",
    name: "Brown Digital Flight Cap",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 109, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
789: {
    type: "clothing",
    type2: "mask",
    name: "Black Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
790: {
    type: "clothing",
    type2: "mask",
    name: "Blue Digital Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
791: {
    type: "clothing",
    type2: "mask",
    name: "Brown Digital Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
792: {
    type: "clothing",
    type2: "mask",
    name: "Green Digital Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
793: {
    type: "clothing",
    type2: "mask",
    name: "Fall Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
794: {
    type: "clothing",
    type2: "mask",
    name: "Dark Woodland Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
795: {
    type: "clothing",
    type2: "mask",
    name: "Crosshatch Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
796: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
797: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
798: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
799: {
    type: "clothing",
    type2: "mask",
    name: "Contrast Camo Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
800: {
    type: "clothing",
    type2: "mask",
    name: "Cobble Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
801: {
    type: "clothing",
    type2: "mask",
    name: "Peach Camo Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
802: {
    type: "clothing",
    type2: "mask",
    name: "Brushstroke Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
803: {
    type: "clothing",
    type2: "mask",
    name: "Flecktarn Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
804: {
    type: "clothing",
    type2: "mask",
    name: "Light Woodland Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
805: {
    type: "clothing",
    type2: "mask",
    name: "Blue Striped Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
806: {
    type: "clothing",
    type2: "mask",
    name: "Moss Striped Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
807: {
    type: "clothing",
    type2: "mask",
    name: "Orange Striped Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
808: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
809: {
    type: "clothing",
    type2: "mask",
    name: "Zebra Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
810: {
    type: "clothing",
    type2: "mask",
    name: "White Robo",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
811: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
812: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
813: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 24, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
814: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 110, 25, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
815: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
816: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
817: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
818: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
819: {
    type: "clothing",
    type2: "mask",
    name: "Blue Blagueurs Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
820: {
    type: "clothing",
    type2: "mask",
    name: "Red Blagueurs Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
821: {
    type: "clothing",
    type2: "mask",
    name: "Bold Abstract Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
822: {
    type: "clothing",
    type2: "mask",
    name: "Geometric Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
823: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Bigness Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
824: {
    type: "clothing",
    type2: "mask",
    name: "Red Bigness Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
825: {
    type: "clothing",
    type2: "mask",
    name: "Green Leaves Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
826: {
    type: "clothing",
    type2: "mask",
    name: "Blue Leaves Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
827: {
    type: "clothing",
    type2: "mask",
    name: "Red Manor Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
828: {
    type: "clothing",
    type2: "mask",
    name: "Black Manor Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
829: {
    type: "clothing",
    type2: "mask",
    name: "Skulls Manor Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
830: {
    type: "clothing",
    type2: "mask",
    name: "White Broker Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
831: {
    type: "clothing",
    type2: "mask",
    name: "Orange Broker Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
832: {
    type: "clothing",
    type2: "mask",
    name: "Black Broker Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
833: {
    type: "clothing",
    type2: "mask",
    name: "Off-White Broker Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
834: {
    type: "clothing",
    type2: "mask",
    name: "Stars & Stripes Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
835: {
    type: "clothing",
    type2: "mask",
    name: "Painted Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
836: {
    type: "clothing",
    type2: "mask",
    name: "Fractal Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
837: {
    type: "clothing",
    type2: "mask",
    name: "Contrast Camo Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
838: {
    type: "clothing",
    type2: "mask",
    name: "Zebra Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
839: {
    type: "clothing",
    type2: "mask",
    name: "Dark Pattern Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 24, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
840: {
    type: "clothing",
    type2: "mask",
    name: "Bright Pattern Face Bandana",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 111, 25, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
841: {
    type: "clothing",
    type2: "mask",
    name: "Black Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
842: {
    type: "clothing",
    type2: "mask",
    name: "Blue Digital Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
843: {
    type: "clothing",
    type2: "mask",
    name: "Brown Digital Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
844: {
    type: "clothing",
    type2: "mask",
    name: "Green Digital Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
845: {
    type: "clothing",
    type2: "mask",
    name: "Fall Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
846: {
    type: "clothing",
    type2: "mask",
    name: "Dark Woodland Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
847: {
    type: "clothing",
    type2: "mask",
    name: "Crosshatch Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
848: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
849: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
850: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
851: {
    type: "clothing",
    type2: "mask",
    name: "Contrast Camo Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
852: {
    type: "clothing",
    type2: "mask",
    name: "Cobble Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
853: {
    type: "clothing",
    type2: "mask",
    name: "Peach Camo Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
854: {
    type: "clothing",
    type2: "mask",
    name: "Brushstroke Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
855: {
    type: "clothing",
    type2: "mask",
    name: "Flecktarn Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
856: {
    type: "clothing",
    type2: "mask",
    name: "Light Woodland Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
857: {
    type: "clothing",
    type2: "mask",
    name: "Blue Striped Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
858: {
    type: "clothing",
    type2: "mask",
    name: "Moss Striped Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
859: {
    type: "clothing",
    type2: "mask",
    name: "Orange Striped Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
860: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
861: {
    type: "clothing",
    type2: "mask",
    name: "Zebra Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
862: {
    type: "clothing",
    type2: "mask",
    name: "White Mandible",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
863: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
864: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
865: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 24, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
866: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 112, 25, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
867: {
    type: "clothing",
    type2: "mask",
    name: "Skate Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
868: {
    type: "clothing",
    type2: "mask",
    name: "Multicolor Leaves Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
869: {
    type: "clothing",
    type2: "mask",
    name: "Lime Xero Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
870: {
    type: "clothing",
    type2: "mask",
    name: "Tropical Xero Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
871: {
    type: "clothing",
    type2: "mask",
    name: "Red Stripe Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
872: {
    type: "clothing",
    type2: "mask",
    name: "Gray Bigness Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
873: {
    type: "clothing",
    type2: "mask",
    name: "Orange & Red Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
874: {
    type: "clothing",
    type2: "mask",
    name: "Vibrant Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
875: {
    type: "clothing",
    type2: "mask",
    name: "Blue Bigness Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
876: {
    type: "clothing",
    type2: "mask",
    name: "Mustard Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
877: {
    type: "clothing",
    type2: "mask",
    name: "Stars & Stripes Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
878: {
    type: "clothing",
    type2: "mask",
    name: "Black Skull Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
879: {
    type: "clothing",
    type2: "mask",
    name: "White Skull Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
880: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
881: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
882: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
883: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
884: {
    type: "clothing",
    type2: "mask",
    name: "SA Republic Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
885: {
    type: "clothing",
    type2: "mask",
    name: "Black Stars & Stripes Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
886: {
    type: "clothing",
    type2: "mask",
    name: "Black & Red Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
887: {
    type: "clothing",
    type2: "mask",
    name: "Bold Abstract Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
888: {
    type: "clothing",
    type2: "mask",
    name: "Camo Bigness Tight Ski",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 113, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
889: {
    type: "clothing",
    type2: "mask",
    name: "Brown Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
890: {
    type: "clothing",
    type2: "mask",
    name: "Teal Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
891: {
    type: "clothing",
    type2: "mask",
    name: "Green Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
892: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
893: {
    type: "clothing",
    type2: "mask",
    name: "Turquoise Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
894: {
    type: "clothing",
    type2: "mask",
    name: "Brown Digital Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
895: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Pattern Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
896: {
    type: "clothing",
    type2: "mask",
    name: "Dark Red Pattern Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
897: {
    type: "clothing",
    type2: "mask",
    name: "Peach Digital Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
898: {
    type: "clothing",
    type2: "mask",
    name: "Fall Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
899: {
    type: "clothing",
    type2: "mask",
    name: "Dark Woodland Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
900: {
    type: "clothing",
    type2: "mask",
    name: "Orange Pattern Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
901: {
    type: "clothing",
    type2: "mask",
    name: "Red Pattern Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
902: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
903: {
    type: "clothing",
    type2: "mask",
    name: "Blue Pattern Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
904: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
905: {
    type: "clothing",
    type2: "mask",
    name: "Purple Pattern Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
906: {
    type: "clothing",
    type2: "mask",
    name: "Jolly Roger Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
907: {
    type: "clothing",
    type2: "mask",
    name: "Peach Camo Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
908: {
    type: "clothing",
    type2: "mask",
    name: "Brushstroke Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
909: {
    type: "clothing",
    type2: "mask",
    name: "Flecktarn Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
910: {
    type: "clothing",
    type2: "mask",
    name: "Weapon Pattern Loose",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
911: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
912: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
913: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 24, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
914: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 114, 25, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
915: {
    type: "clothing",
    type2: "mask",
    name: "Brown Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
916: {
    type: "clothing",
    type2: "mask",
    name: "Teal Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
917: {
    type: "clothing",
    type2: "mask",
    name: "Green Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
918: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
919: {
    type: "clothing",
    type2: "mask",
    name: "Turquoise Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
920: {
    type: "clothing",
    type2: "mask",
    name: "Brown Digital Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
921: {
    type: "clothing",
    type2: "mask",
    name: "Red Pattern Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
922: {
    type: "clothing",
    type2: "mask",
    name: "Jolly Roger Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
923: {
    type: "clothing",
    type2: "mask",
    name: "Peach Digital Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
924: {
    type: "clothing",
    type2: "mask",
    name: "Fall Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
925: {
    type: "clothing",
    type2: "mask",
    name: "Dark Woodland Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
926: {
    type: "clothing",
    type2: "mask",
    name: "Weapon Pattern Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
927: {
    type: "clothing",
    type2: "mask",
    name: "Blue Pattern Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
928: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
929: {
    type: "clothing",
    type2: "mask",
    name: "Dark Pattern Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
930: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
931: {
    type: "clothing",
    type2: "mask",
    name: "Dark Red Pattern Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
932: {
    type: "clothing",
    type2: "mask",
    name: "Orange Pattern Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
933: {
    type: "clothing",
    type2: "mask",
    name: "Peach Camo Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
934: {
    type: "clothing",
    type2: "mask",
    name: "Brushstroke Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
935: {
    type: "clothing",
    type2: "mask",
    name: "Flecktarn Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
936: {
    type: "clothing",
    type2: "mask",
    name: "Purple Pattern Wrapped",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
937: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
938: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
939: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 24, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
940: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 115, 25, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
941: {
    type: "clothing",
    type2: "mask",
    name: "Brown Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
942: {
    type: "clothing",
    type2: "mask",
    name: "Teal Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
943: {
    type: "clothing",
    type2: "mask",
    name: "Green Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
944: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
945: {
    type: "clothing",
    type2: "mask",
    name: "Turquoise Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
946: {
    type: "clothing",
    type2: "mask",
    name: "Brown Digital Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
947: {
    type: "clothing",
    type2: "mask",
    name: "Dark Red Pattern Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
948: {
    type: "clothing",
    type2: "mask",
    name: "Orange Pattern Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
949: {
    type: "clothing",
    type2: "mask",
    name: "Peach Digital Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
950: {
    type: "clothing",
    type2: "mask",
    name: "Fall Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
951: {
    type: "clothing",
    type2: "mask",
    name: "Dark Woodland Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
952: {
    type: "clothing",
    type2: "mask",
    name: "Blue Pattern Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
953: {
    type: "clothing",
    type2: "mask",
    name: "Purple Pattern Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
954: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
955: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Pattern Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
956: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
957: {
    type: "clothing",
    type2: "mask",
    name: "Red Pattern Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
958: {
    type: "clothing",
    type2: "mask",
    name: "Weapon Pattern Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
959: {
    type: "clothing",
    type2: "mask",
    name: "Peach Camo Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
960: {
    type: "clothing",
    type2: "mask",
    name: "Brushstroke Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
961: {
    type: "clothing",
    type2: "mask",
    name: "Flecktarn Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
962: {
    type: "clothing",
    type2: "mask",
    name: "Jolly Roger Snood",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
963: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
964: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
965: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 24, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
966: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 116, 25, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
967: {
    type: "clothing",
    type2: "mask",
    name: "Bright Stripe Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
968: {
    type: "clothing",
    type2: "mask",
    name: "Dark Red Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
969: {
    type: "clothing",
    type2: "mask",
    name: "Green & Beige Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
970: {
    type: "clothing",
    type2: "mask",
    name: "Sunrise Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
971: {
    type: "clothing",
    type2: "mask",
    name: "Gray Digital Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
972: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
973: {
    type: "clothing",
    type2: "mask",
    name: "Brown Digital Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
974: {
    type: "clothing",
    type2: "mask",
    name: "Red Stripe Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
975: {
    type: "clothing",
    type2: "mask",
    name: "Skull Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
976: {
    type: "clothing",
    type2: "mask",
    name: "Wine Stripe Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
977: {
    type: "clothing",
    type2: "mask",
    name: "Bright Green Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
978: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
979: {
    type: "clothing",
    type2: "mask",
    name: "Primary Stripe Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
980: {
    type: "clothing",
    type2: "mask",
    name: "Black & Red Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
981: {
    type: "clothing",
    type2: "mask",
    name: "Green Stripe Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
982: {
    type: "clothing",
    type2: "mask",
    name: "Tiger Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
983: {
    type: "clothing",
    type2: "mask",
    name: "Leopard Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
984: {
    type: "clothing",
    type2: "mask",
    name: "Dark Pattern Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
985: {
    type: "clothing",
    type2: "mask",
    name: "Stars & Stripes Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
986: {
    type: "clothing",
    type2: "mask",
    name: "Blue Luchador Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
987: {
    type: "clothing",
    type2: "mask",
    name: "Green Luchador Knit",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 117, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
988: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
989: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
990: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
991: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
992: {
    type: "clothing",
    type2: "mask",
    name: "Magenta Leopard T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
993: {
    type: "clothing",
    type2: "mask",
    name: "Navy Painted T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
994: {
    type: "clothing",
    type2: "mask",
    name: "Multicolor Leaves T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
995: {
    type: "clothing",
    type2: "mask",
    name: "Gray Digital T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
996: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
997: {
    type: "clothing",
    type2: "mask",
    name: "Red Camo T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
998: {
    type: "clothing",
    type2: "mask",
    name: "Camo Bigness T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
999: {
    type: "clothing",
    type2: "mask",
    name: "Black Bigness T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1000: {
    type: "clothing",
    type2: "mask",
    name: "Red Bigness T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1001: {
    type: "clothing",
    type2: "mask",
    name: "Gray Bigness T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1002: {
    type: "clothing",
    type2: "mask",
    name: "Primary T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1003: {
    type: "clothing",
    type2: "mask",
    name: "OJ Squash T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1004: {
    type: "clothing",
    type2: "mask",
    name: "Green & Pink T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1005: {
    type: "clothing",
    type2: "mask",
    name: "Stars & Stripes T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1006: {
    type: "clothing",
    type2: "mask",
    name: "Black Stars & Stripes T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1007: {
    type: "clothing",
    type2: "mask",
    name: "SA Republic T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1008: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Tie Dye T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1009: {
    type: "clothing",
    type2: "mask",
    name: "Far Out Tie Dye T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1010: {
    type: "clothing",
    type2: "mask",
    name: "Pink Tie Dye T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1011: {
    type: "clothing",
    type2: "mask",
    name: "Orange Pattern T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1012: {
    type: "clothing",
    type2: "mask",
    name: "Green Pattern T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 24, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1013: {
    type: "clothing",
    type2: "mask",
    name: "Pink Pattern T-Shirt",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 118, 25, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1014: {
    type: "clothing",
    type2: "mask",
    name: "Skull Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1015: {
    type: "clothing",
    type2: "mask",
    name: "Ash Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1016: {
    type: "clothing",
    type2: "mask",
    name: "Charcoal Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1017: {
    type: "clothing",
    type2: "mask",
    name: "Chocolate Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1018: {
    type: "clothing",
    type2: "mask",
    name: "Blue Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1019: {
    type: "clothing",
    type2: "mask",
    name: "Hessian Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1020: {
    type: "clothing",
    type2: "mask",
    name: "Dark Red Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1021: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1022: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1023: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1024: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1025: {
    type: "clothing",
    type2: "mask",
    name: "Bright Green Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1026: {
    type: "clothing",
    type2: "mask",
    name: "Beige Stripe Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1027: {
    type: "clothing",
    type2: "mask",
    name: "Rasta Stripe Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1028: {
    type: "clothing",
    type2: "mask",
    name: "Triplet Stripe Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1029: {
    type: "clothing",
    type2: "mask",
    name: "Orange Stripe Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1030: {
    type: "clothing",
    type2: "mask",
    name: "Magenta Leopard Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1031: {
    type: "clothing",
    type2: "mask",
    name: "Vibrant Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1032: {
    type: "clothing",
    type2: "mask",
    name: "Skate Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1033: {
    type: "clothing",
    type2: "mask",
    name: "Pink Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1034: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1035: {
    type: "clothing",
    type2: "mask",
    name: "Gray Digital Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1036: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1037: {
    type: "clothing",
    type2: "mask",
    name: "Pretty Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1038: {
    type: "clothing",
    type2: "mask",
    name: "Dark Neon Scruffy",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 119, 24, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1039: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 120, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1040: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 121, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1041: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 122, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1042: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 122, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1043: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 122, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1044: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 123, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1045: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 123, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1046: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 123, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1047: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 123, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1048: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 123, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1049: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 123, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1050: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 123, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1051: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 123, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1052: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 123, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1053: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 123, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1054: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 123, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1055: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 123, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1056: {
    type: "clothing",
    type2: "mask",
    name: "Manic Luminous",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1057: {
    type: "clothing",
    type2: "mask",
    name: "Manic Electric",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1058: {
    type: "clothing",
    type2: "mask",
    name: "Manic Neon",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1059: {
    type: "clothing",
    type2: "mask",
    name: "Amused Electric",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1060: {
    type: "clothing",
    type2: "mask",
    name: "Amused Luminous",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1061: {
    type: "clothing",
    type2: "mask",
    name: "Amused Neon",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1062: {
    type: "clothing",
    type2: "mask",
    name: "Furious Luminous",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1063: {
    type: "clothing",
    type2: "mask",
    name: "Furious Electric",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1064: {
    type: "clothing",
    type2: "mask",
    name: "Furious Neon",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1065: {
    type: "clothing",
    type2: "mask",
    name: "Pleased Neon",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1066: {
    type: "clothing",
    type2: "mask",
    name: "Pleased Luminous",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1067: {
    type: "clothing",
    type2: "mask",
    name: "Pleased Electric",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1068: {
    type: "clothing",
    type2: "mask",
    name: "Peaceful Neon",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1069: {
    type: "clothing",
    type2: "mask",
    name: "Peaceful Electric",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1070: {
    type: "clothing",
    type2: "mask",
    name: "Peaceful Luminous",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1071: {
    type: "clothing",
    type2: "mask",
    name: "Transcendent Luminous",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1072: {
    type: "clothing",
    type2: "mask",
    name: "Transcendent Electric",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1073: {
    type: "clothing",
    type2: "mask",
    name: "Transcendent Neon",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1074: {
    type: "clothing",
    type2: "mask",
    name: "Tribal Electric",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1075: {
    type: "clothing",
    type2: "mask",
    name: "Tribal Luminous",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1076: {
    type: "clothing",
    type2: "mask",
    name: "Tribal Neon",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1077: {
    type: "clothing",
    type2: "mask",
    name: "Iwazaru Luminous",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1078: {
    type: "clothing",
    type2: "mask",
    name: "Iwazaru Electric",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1079: {
    type: "clothing",
    type2: "mask",
    name: "Iwazaru Neon",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 124, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1080: {
    type: "clothing",
    type2: "mask",
    name: "Black Mono Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1081: {
    type: "clothing",
    type2: "mask",
    name: "Gray Mono Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1082: {
    type: "clothing",
    type2: "mask",
    name: "White Mono Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1083: {
    type: "clothing",
    type2: "mask",
    name: "Sand Mono Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1084: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1085: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1086: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1087: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1088: {
    type: "clothing",
    type2: "mask",
    name: "Sand Goggled Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1089: {
    type: "clothing",
    type2: "mask",
    name: "Red Goggled Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1090: {
    type: "clothing",
    type2: "mask",
    name: "Black Carbon Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1091: {
    type: "clothing",
    type2: "mask",
    name: "Sand Carbon Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1092: {
    type: "clothing",
    type2: "mask",
    name: "Cranial Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1093: {
    type: "clothing",
    type2: "mask",
    name: "Flecktarn Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1094: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1095: {
    type: "clothing",
    type2: "mask",
    name: "Red & Black Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1096: {
    type: "clothing",
    type2: "mask",
    name: "Blue & Black Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1097: {
    type: "clothing",
    type2: "mask",
    name: "Yellow & Black Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1098: {
    type: "clothing",
    type2: "mask",
    name: "Orange & Black Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1099: {
    type: "clothing",
    type2: "mask",
    name: "White & Black Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1100: {
    type: "clothing",
    type2: "mask",
    name: "Red Stripe Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1101: {
    type: "clothing",
    type2: "mask",
    name: "Black Stripe Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1102: {
    type: "clothing",
    type2: "mask",
    name: "Off White & Red Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1103: {
    type: "clothing",
    type2: "mask",
    name: "Red Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1104: {
    type: "clothing",
    type2: "mask",
    name: "Brown Digital Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 24, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1105: {
    type: "clothing",
    type2: "mask",
    name: "Fall Ballistic",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 125, 25, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1106: {
    type: "clothing",
    type2: "mask",
    name: "Black Spec Ops",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1107: {
    type: "clothing",
    type2: "mask",
    name: "Carbon Spec Ops",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1108: {
    type: "clothing",
    type2: "mask",
    name: "Scale Spec Ops",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1109: {
    type: "clothing",
    type2: "mask",
    name: "Tan Digital Spec Ops",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1110: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo Spec Ops",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1111: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Spec Ops",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1112: {
    type: "clothing",
    type2: "mask",
    name: "Mono Splinter Spec Ops",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1113: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland Spec Ops",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1114: {
    type: "clothing",
    type2: "mask",
    name: "Dark Woodland Spec Ops",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1115: {
    type: "clothing",
    type2: "mask",
    name: "Electric Skull Spec Ops",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1116: {
    type: "clothing",
    type2: "mask",
    name: "LSPD Spec Ops",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1117: {
    type: "clothing",
    type2: "mask",
    name: "Ornate Skull Spec Ops",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1118: {
    type: "clothing",
    type2: "mask",
    name: "Striped Spec Ops",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1119: {
    type: "clothing",
    type2: "mask",
    name: "Opera Spec Ops",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1120: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1121: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1122: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1123: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 126, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1124: {
    type: "clothing",
    type2: "mask",
    name: "Festive Gingerbread Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 127, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1125: {
    type: "clothing",
    type2: "mask",
    name: "Merry Gingerbread Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 127, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1126: {
    type: "clothing",
    type2: "mask",
    name: "Jovial Gingerbread Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 127, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1127: {
    type: "clothing",
    type2: "mask",
    name: "Mirthful Gingerbread Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 127, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1128: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland False Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1129: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo False Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1130: {
    type: "clothing",
    type2: "mask",
    name: "Headline False Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1131: {
    type: "clothing",
    type2: "mask",
    name: "Splinter False Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1132: {
    type: "clothing",
    type2: "mask",
    name: "Brown Digital False Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1133: {
    type: "clothing",
    type2: "mask",
    name: "Striped Woodland False Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1134: {
    type: "clothing",
    type2: "mask",
    name: "Cobble Woodland False Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1135: {
    type: "clothing",
    type2: "mask",
    name: "Rising Sun False Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1136: {
    type: "clothing",
    type2: "mask",
    name: "Opera False Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1137: {
    type: "clothing",
    type2: "mask",
    name: "Stars & Stripes False Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1138: {
    type: "clothing",
    type2: "mask",
    name: "Green Pattern False Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1139: {
    type: "clothing",
    type2: "mask",
    name: "Gothic False Face",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1140: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1141: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1142: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1143: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 128, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1144: {
    type: "clothing",
    type2: "mask",
    name: "Gray Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1145: {
    type: "clothing",
    type2: "mask",
    name: "Carbon Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1146: {
    type: "clothing",
    type2: "mask",
    name: "Tan Digital Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1147: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1148: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1149: {
    type: "clothing",
    type2: "mask",
    name: "Gray Splinter Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1150: {
    type: "clothing",
    type2: "mask",
    name: "Gray Striped Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1151: {
    type: "clothing",
    type2: "mask",
    name: "Moss Striped Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1152: {
    type: "clothing",
    type2: "mask",
    name: "Peach Camo Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1153: {
    type: "clothing",
    type2: "mask",
    name: "Woodland Digital Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1154: {
    type: "clothing",
    type2: "mask",
    name: "Skull Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1155: {
    type: "clothing",
    type2: "mask",
    name: "White Industrial Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1156: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Industrial Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1157: {
    type: "clothing",
    type2: "mask",
    name: "Orange Industrial Gas Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1158: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1159: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1160: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1161: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 129, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1162: {
    type: "clothing",
    type2: "mask",
    name: "Black Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1163: {
    type: "clothing",
    type2: "mask",
    name: "Flecktarn Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1164: {
    type: "clothing",
    type2: "mask",
    name: "Gray Digital Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1165: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1166: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1167: {
    type: "clothing",
    type2: "mask",
    name: "Gray Splinter Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1168: {
    type: "clothing",
    type2: "mask",
    name: "Tiger Striped Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1169: {
    type: "clothing",
    type2: "mask",
    name: "Moss Striped Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1170: {
    type: "clothing",
    type2: "mask",
    name: "Green Digital Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1171: {
    type: "clothing",
    type2: "mask",
    name: "Brushstroke Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1172: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1173: {
    type: "clothing",
    type2: "mask",
    name: "Cobble Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1174: {
    type: "clothing",
    type2: "mask",
    name: "Contrast Camo Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1175: {
    type: "clothing",
    type2: "mask",
    name: "Viper Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1176: {
    type: "clothing",
    type2: "mask",
    name: "Crosshatch Respirator",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1177: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1178: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1179: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1180: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 130, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1181: {
    type: "clothing",
    type2: "mask",
    name: "Hideous Krampus",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 131, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1182: {
    type: "clothing",
    type2: "mask",
    name: "Fearsome Krampus",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 131, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1183: {
    type: "clothing",
    type2: "mask",
    name: "Odious Krampus",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 131, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1184: {
    type: "clothing",
    type2: "mask",
    name: "Heinous Krampus",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 131, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1185: {
    type: "clothing",
    type2: "mask",
    name: "Black Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1186: {
    type: "clothing",
    type2: "mask",
    name: "White Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1187: {
    type: "clothing",
    type2: "mask",
    name: "Gray Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1188: {
    type: "clothing",
    type2: "mask",
    name: "Blue Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1189: {
    type: "clothing",
    type2: "mask",
    name: "Tan Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1190: {
    type: "clothing",
    type2: "mask",
    name: "Moss Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1191: {
    type: "clothing",
    type2: "mask",
    name: "Brown Camo Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1192: {
    type: "clothing",
    type2: "mask",
    name: "Aqua Camo Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1193: {
    type: "clothing",
    type2: "mask",
    name: "Gray Camo Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1194: {
    type: "clothing",
    type2: "mask",
    name: "White Digital Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1195: {
    type: "clothing",
    type2: "mask",
    name: "Green Digital Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1196: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1197: {
    type: "clothing",
    type2: "mask",
    name: "Dazzle Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1198: {
    type: "clothing",
    type2: "mask",
    name: "Brown Digital Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1199: {
    type: "clothing",
    type2: "mask",
    name: "Woodland Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1200: {
    type: "clothing",
    type2: "mask",
    name: "Gray Woodland Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1201: {
    type: "clothing",
    type2: "mask",
    name: "Crosshatch Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1202: {
    type: "clothing",
    type2: "mask",
    name: "Contrast Camo Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1203: {
    type: "clothing",
    type2: "mask",
    name: "Cobble Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1204: {
    type: "clothing",
    type2: "mask",
    name: "Moss Striped Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1205: {
    type: "clothing",
    type2: "mask",
    name: "White Camo Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 20, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1206: {
    type: "clothing",
    type2: "mask",
    name: "Skull Night Vision",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 21, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1207: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 22, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1208: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 23, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1209: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 24, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1210: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 132, 25, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1211: {
    type: "clothing",
    type2: "mask",
    name: "Dark Bigness SN Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1212: {
    type: "clothing",
    type2: "mask",
    name: "Blue Bigness SN Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1213: {
    type: "clothing",
    type2: "mask",
    name: "Light Bigness SN Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1214: {
    type: "clothing",
    type2: "mask",
    name: "Purple Bigness SN Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1215: {
    type: "clothing",
    type2: "mask",
    name: "Dark Camo Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1216: {
    type: "clothing",
    type2: "mask",
    name: "Light Camo Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1217: {
    type: "clothing",
    type2: "mask",
    name: "Purple Camo Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1218: {
    type: "clothing",
    type2: "mask",
    name: "Woodland Camo Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1219: {
    type: "clothing",
    type2: "mask",
    name: "Abstract Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1220: {
    type: "clothing",
    type2: "mask",
    name: "Geometric Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1221: {
    type: "clothing",
    type2: "mask",
    name: "Blue Digital Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1222: {
    type: "clothing",
    type2: "mask",
    name: "Gray Digital Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1223: {
    type: "clothing",
    type2: "mask",
    name: "Zebra Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1224: {
    type: "clothing",
    type2: "mask",
    name: "Harlequin Bigness SN Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1225: {
    type: "clothing",
    type2: "mask",
    name: "Wild Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1226: {
    type: "clothing",
    type2: "mask",
    name: "Fall Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1227: {
    type: "clothing",
    type2: "mask",
    name: "Orange Fall Hockey",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 133, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1228: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1229: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1230: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1231: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1232: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1233: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1234: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1235: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1236: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1237: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1238: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1239: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1240: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1241: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1242: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1243: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1244: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1245: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 17, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1246: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 18, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1247: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 134, 19, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1248: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 135, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1249: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 135, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1250: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 135, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1251: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 135, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1252: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 135, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1253: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 135, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1254: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 135, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1255: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 135, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1256: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 135, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1257: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 135, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1258: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 135, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1259: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 135, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1260: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 135, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1261: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 135, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1262: {
    type: "clothing",
    type2: "mask",
    name: "Light Brown Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1263: {
    type: "clothing",
    type2: "mask",
    name: "White Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1264: {
    type: "clothing",
    type2: "mask",
    name: "Black Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1265: {
    type: "clothing",
    type2: "mask",
    name: "Red Cross Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1266: {
    type: "clothing",
    type2: "mask",
    name: "Green Camo Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1267: {
    type: "clothing",
    type2: "mask",
    name: "Blue Camo Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1268: {
    type: "clothing",
    type2: "mask",
    name: "Beige Camo Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1269: {
    type: "clothing",
    type2: "mask",
    name: "Crosshatch Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1270: {
    type: "clothing",
    type2: "mask",
    name: "Splinter Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1271: {
    type: "clothing",
    type2: "mask",
    name: "Red Feather Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1272: {
    type: "clothing",
    type2: "mask",
    name: "Black & White Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1273: {
    type: "clothing",
    type2: "mask",
    name: "Ash Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1274: {
    type: "clothing",
    type2: "mask",
    name: "Black & Yellow Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1275: {
    type: "clothing",
    type2: "mask",
    name: "Red & White Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1276: {
    type: "clothing",
    type2: "mask",
    name: "Brown & White Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1277: {
    type: "clothing",
    type2: "mask",
    name: "Brown & Yellow Death Bird",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 136, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1278: {
    type: "clothing",
    type2: "mask",
    name: "Green Stalker",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 137, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1279: {
    type: "clothing",
    type2: "mask",
    name: "Brown Stalker",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 137, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1280: {
    type: "clothing",
    type2: "mask",
    name: "Purple Stalker",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 137, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1281: {
    type: "clothing",
    type2: "mask",
    name: "Red Stalker",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 137, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1282: {
    type: "clothing",
    type2: "mask",
    name: "Black Stalker",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 137, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1283: {
    type: "clothing",
    type2: "mask",
    name: "Stars Stalker",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 137, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1284: {
    type: "clothing",
    type2: "mask",
    name: "Brown Camo Stalker",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 137, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1285: {
    type: "clothing",
    type2: "mask",
    name: "Green Camo Stalker",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 137, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1286: {
    type: "clothing",
    type2: "mask",
    name: "Orange Raider",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 138, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1287: {
    type: "clothing",
    type2: "mask",
    name: "Chocolate Brown Raider",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 138, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1288: {
    type: "clothing",
    type2: "mask",
    name: "Brown Raider",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 138, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1289: {
    type: "clothing",
    type2: "mask",
    name: "Red Raider",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 138, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1290: {
    type: "clothing",
    type2: "mask",
    name: "Beige Raider",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 138, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1291: {
    type: "clothing",
    type2: "mask",
    name: "Bright Orange Raider",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 138, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1292: {
    type: "clothing",
    type2: "mask",
    name: "Blue Raider",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 138, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1293: {
    type: "clothing",
    type2: "mask",
    name: "Gray Raider",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 138, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1294: {
    type: "clothing",
    type2: "mask",
    name: "Green Raider",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 138, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1295: {
    type: "clothing",
    type2: "mask",
    name: "Brown Camo Raider",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 138, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1296: {
    type: "clothing",
    type2: "mask",
    name: "Red & Gray Raider",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 138, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1297: {
    type: "clothing",
    type2: "mask",
    name: "Orange & Gray Raider",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 138, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1298: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 139, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1299: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 139, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1300: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 139, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1301: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 139, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1302: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 139, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1303: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 139, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1304: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 139, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1305: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 139, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1306: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 139, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1307: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 139, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1308: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 139, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1309: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 139, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1310: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 140, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1311: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 140, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1312: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 140, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1313: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 140, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1314: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 140, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1315: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 140, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1316: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 140, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1317: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 140, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1318: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 140, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1319: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 140, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1320: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 140, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1321: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 140, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1322: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 141, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1323: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 141, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1324: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 141, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1325: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 141, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1326: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 141, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1327: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 141, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1328: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 141, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1329: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 141, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1330: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 141, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1331: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 141, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1332: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 141, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1333: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 141, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1334: {
    type: "clothing",
    type2: "mask",
    name: "Dark Brown Marauder",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 142, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1335: {
    type: "clothing",
    type2: "mask",
    name: "Radioactive Marauder",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 142, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1336: {
    type: "clothing",
    type2: "mask",
    name: "Bolt Marauder",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 142, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1337: {
    type: "clothing",
    type2: "mask",
    name: "Branded Marauder",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 142, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1338: {
    type: "clothing",
    type2: "mask",
    name: "Crossbones Marauder",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 142, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1339: {
    type: "clothing",
    type2: "mask",
    name: "Red Stripe Marauder",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 142, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1340: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Marauder",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 142, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1341: {
    type: "clothing",
    type2: "mask",
    name: "Eight-ball Marauder",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 142, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1342: {
    type: "clothing",
    type2: "mask",
    name: "Black Arrow Marauder",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 142, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1343: {
    type: "clothing",
    type2: "mask",
    name: "Shooting Stars Marauder",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 142, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1344: {
    type: "clothing",
    type2: "mask",
    name: "Beige Marauder",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 142, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1345: {
    type: "clothing",
    type2: "mask",
    name: "Black Marauder",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 142, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1346: {
    type: "clothing",
    type2: "mask",
    name: "Paco the Taco Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 143, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1347: {
    type: "clothing",
    type2: "mask",
    name: "Burger Shot Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 144, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1348: {
    type: "clothing",
    type2: "mask",
    name: "Cluckin' Bell Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 145, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1349: {
    type: "clothing",
    type2: "mask",
    name: "Blue Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1350: {
    type: "clothing",
    type2: "mask",
    name: "White Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1351: {
    type: "clothing",
    type2: "mask",
    name: "Black Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1352: {
    type: "clothing",
    type2: "mask",
    name: "Red Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1353: {
    type: "clothing",
    type2: "mask",
    name: "Green Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 4, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1354: {
    type: "clothing",
    type2: "mask",
    name: "Yellow Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 5, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1355: {
    type: "clothing",
    type2: "mask",
    name: "Pink Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 6, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1356: {
    type: "clothing",
    type2: "mask",
    name: "Orange Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 7, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1357: {
    type: "clothing",
    type2: "mask",
    name: "Purple Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 8, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1358: {
    type: "clothing",
    type2: "mask",
    name: "Gray & Red Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 9, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1359: {
    type: "clothing",
    type2: "mask",
    name: "Black & Green Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 10, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1360: {
    type: "clothing",
    type2: "mask",
    name: "Beige & Orange Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 11, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1361: {
    type: "clothing",
    type2: "mask",
    name: "Orange & Yellow Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 12, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1362: {
    type: "clothing",
    type2: "mask",
    name: "White & Blue Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 13, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1363: {
    type: "clothing",
    type2: "mask",
    name: "Purple & Black Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 14, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1364: {
    type: "clothing",
    type2: "mask",
    name: "Red & Black Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 15, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1365: {
    type: "clothing",
    type2: "mask",
    name: "Green & Yellow Optics Headset",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 146, 16, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1366: {
    type: "clothing",
    type2: "mask",
    name: "TODO-MISSING-NAME",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 147, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1367: {
    type: "clothing",
    type2: "mask",
    name: "Impotent Rage Eye Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 148, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1368: {
    type: "clothing",
    type2: "mask",
    name: "Strawberry Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 149, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1369: {
    type: "clothing",
    type2: "mask",
    name: "Lemon Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 150, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1370: {
    type: "clothing",
    type2: "mask",
    name: "Grapes Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 151, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1371: {
    type: "clothing",
    type2: "mask",
    name: "Pineapple Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 152, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1372: {
    type: "clothing",
    type2: "mask",
    name: "Cherries Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 153, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1373: {
    type: "clothing",
    type2: "mask",
    name: "Lucky Seven Mask",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 154, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1374: {
    type: "clothing",
    type2: "mask",
    name: "Blue Joker",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 155, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1375: {
    type: "clothing",
    type2: "mask",
    name: "Red Joker",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 155, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1376: {
    type: "clothing",
    type2: "mask",
    name: "Green Joker",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 155, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1377: {
    type: "clothing",
    type2: "mask",
    name: "Purple Joker",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 155, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1378: {
    type: "clothing",
    type2: "mask",
    name: "King of Hearts",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 156, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1379: {
    type: "clothing",
    type2: "mask",
    name: "King of Clubs",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 156, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1380: {
    type: "clothing",
    type2: "mask",
    name: "King of Diamonds",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 156, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1381: {
    type: "clothing",
    type2: "mask",
    name: "King of Spades",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 156, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1382: {
    type: "clothing",
    type2: "mask",
    name: "Queen of Spades",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 157, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1383: {
    type: "clothing",
    type2: "mask",
    name: "Queen of Hearts",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 157, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1384: {
    type: "clothing",
    type2: "mask",
    name: "Queen of Diamonds",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 157, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1385: {
    type: "clothing",
    type2: "mask",
    name: "Queen of Clubs",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 157, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1386: {
    type: "clothing",
    type2: "mask",
    name: "Jack of Spades",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 158, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1387: {
    type: "clothing",
    type2: "mask",
    name: "Jack of Hearts",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 158, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1388: {
    type: "clothing",
    type2: "mask",
    name: "Jack of Clubs",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 158, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1389: {
    type: "clothing",
    type2: "mask",
    name: "Jack of Diamonds",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 158, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1390: {
    type: "clothing",
    type2: "mask",
    name: "Ace of Spades",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 159, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1391: {
    type: "clothing",
    type2: "mask",
    name: "Ace of Hearts",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 159, 1, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1392: {
    type: "clothing",
    type2: "mask",
    name: "Ace of Clubs",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 159, 2, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
,
1393: {
    type: "clothing",
    type2: "mask",
    name: "Ace of Diamonds",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 159, 3, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}
    

}