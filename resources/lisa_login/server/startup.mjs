import * as alt from "alt";
import chat from "chat";
import mysql from "mysql";
import sjcl from 'sjcl';
import * as dbstore from "lisa_dbstore";
import * as itemstore from "lisa_itemstore";
import * as lisa_residence from "lisa_residence";

function encryptPassword(password) {
  const saltBits = sjcl.random.randomWords(2, 0);
  const salt = sjcl.codec.base64.fromBits(saltBits);

  const key = sjcl.codec.base64.fromBits(
      sjcl.misc.pbkdf2(password, saltBits, 2000, 256)
  );

  return `${key}$${salt}`;
}

function verifyPassword(password, storedPasswordHash) {
  const [_key, _salt] = storedPasswordHash.split('$');
  const saltBits = sjcl.codec.base64.toBits(_salt);
  const derivedKey = sjcl.misc.pbkdf2(password, saltBits, 2000, 256);
  const derivedBaseKey = sjcl.codec.base64.fromBits(derivedKey);

  if (_key != derivedBaseKey) {
      return false;
  }

  return true;
}

alt.on("playerConnect", (player) => {
  let charpos = {
    x: -577.107666015625,
    y: 4438.12744140625,
    z: 17.6871337890625
  };

  player.model = "player_two";
  player.pos = charpos;
  player.dimension = player.id;

  //alt.emitClient(player, "lisa_loadcharacter", "runEval", `alt.toggleGameControls(false);`); //disable controls.
  alt.emitClient(player, "blockInventory", true); //block inventory
  alt.emitClient(player, "onFirstConnect");
  player.setSyncedMeta('isCharacterLoggedInn', false);
});

var storeglobals = dbstore.Globals();

var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : storeglobals.host,
  user            : storeglobals.user,
  password        : storeglobals.password,
  database        : storeglobals.database
}); 

const default_male = {
  0:"game.setPedComponentVariation(alt.Player.local.scriptID, 0, 0, 0, 2);",
  1:"game.setPedComponentVariation(alt.Player.local.scriptID, 1, 0, 0, 2);",
  2:"game.setPedComponentVariation(alt.Player.local.scriptID, 2, 12, 0, 2);", //hair - defaults to 12 - if durability = 0 remove users equipped hair and apply this. simulate growing and or loss of shape/style.
  3:"game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 2);",
  4:"game.setPedComponentVariation(alt.Player.local.scriptID, 4, 21, 0, 2);",
  5:"game.setPedComponentVariation(alt.Player.local.scriptID, 5, 0, 0, 2);",
  6:"game.setPedComponentVariation(alt.Player.local.scriptID, 6, 34, 0, 2);",
  7:"game.setPedComponentVariation(alt.Player.local.scriptID, 7, 0, 0, 2);",
  8:"game.setPedComponentVariation(alt.Player.local.scriptID, 8, 57, 0, 2);",
  9:"game.setPedComponentVariation(alt.Player.local.scriptID, 9, 0, 0, 2);",
  10:"game.setPedComponentVariation(alt.Player.local.scriptID, 10, 0, 0, 2);",
  11:"game.setPedComponentVariation(alt.Player.local.scriptID, 11, 15, 0, 2); game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 2);",
  12:"game.clearPedProp(alt.Player.local.scriptID, 0);",
  13:"game.clearPedProp(alt.Player.local.scriptID, 1);",
  14:"game.clearPedProp(alt.Player.local.scriptID, 2);",
  15:"game.clearPedProp(alt.Player.local.scriptID, 6);",
  16:"game.clearPedProp(alt.Player.local.scriptID, 7);",
};

const default_female = {
  0:"game.setPedComponentVariation(alt.Player.local.scriptID, 0, 0, 0, 2);",
  1:"game.setPedComponentVariation(alt.Player.local.scriptID, 1, 0, 0, 2);",
  2:"game.setPedComponentVariation(alt.Player.local.scriptID, 2, 16, 0, 2);", //default hair
  3:"game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 2);",
  4:"game.setPedComponentVariation(alt.Player.local.scriptID, 4, 21, 0, 2);", //game.setPedComponentVariation(alt.Player.local.scriptID, 4, 21, 0, 2); //now actually nude is- 4, 21 with mod.
  5:"game.setPedComponentVariation(alt.Player.local.scriptID, 5, 0, 0, 2);",
  6:"game.setPedComponentVariation(alt.Player.local.scriptID, 6, 35, 0, 2);",
  7:"game.setPedComponentVariation(alt.Player.local.scriptID, 7, 0, 0, 2);",
  8:"game.setPedComponentVariation(alt.Player.local.scriptID, 8, 2, 0, 2);",
  9:"game.setPedComponentVariation(alt.Player.local.scriptID, 9, 0, 0, 2);",
  10:"game.setPedComponentVariation(alt.Player.local.scriptID, 10, 0, 0, 2);",
  11:"game.setPedComponentVariation(alt.Player.local.scriptID, 11, -1, 0, 2); game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 2);",
  12:"game.clearPedProp(alt.Player.local.scriptID, 0);",
  13:"game.clearPedProp(alt.Player.local.scriptID, 1);",
  14:"game.clearPedProp(alt.Player.local.scriptID, 2);",
  15:"game.clearPedProp(alt.Player.local.scriptID, 6);",
  16:"game.clearPedProp(alt.Player.local.scriptID, 7);",
};

alt.onClient("setModelFreemode", (player, type) => {
  if(type == 0) {
    //Male
    player.model = "mp_m_freemode_01";
  } else if(type == 1) {
    //Female
    player.model = "mp_f_freemode_01";
  }
});

function getNativesFromEquippedInventory(equippedJSON, gender) {
  let nativelist = '';
  
  let debug = false;
  let equipped = JSON.parse(equippedJSON);

  for (var key in equipped) {
      if (equipped.hasOwnProperty(key)) {
          //console.log(key + " -> " + equipped[key]);
          if(equipped[key] != null) { //slot NOT empty.
              var eq2 = equipped[key];
              for (var key2 in eq2) {
                  if (eq2.hasOwnProperty(key2)) {
                      //console.log(key2 + " -2> " + JSON.stringify(eq2[key2]));
                      //console.log(JSON.stringify(eq2[0]) + "-" + key2);
                      
                      var key3 = eq2[key2];
                      if(key3 != null) {
                      var itemdata = itemstore.getItem(key2); //key2 is ITEMID
                          if(itemdata.equipClientEval !== undefined){
                              if(debug) { console.log(itemdata.type, itemdata.name, itemdata.desc, itemdata.equipClientEval);
                              console.log("executing client eval for player."); }
                              //alt.emitClient(player, "lisa_loadcharacter", "runEval", itemdata.equipClientEval);
                              nativelist += itemdata.equipClientEval;
                          }
                      }
                  }
              }
          } else {
              //skip hair default... load from DB instead.
              if(key == 2) {
                  continue;
              }

              //if no item equipped, use defaults "NAKED"
              if(debug) { console.log(`no item in slot: ${key}, setting default...`); }
              if(gender == "Male") {
                  //alt.emitClient(player, "lisa_loadcharacter", "runEval", default_male[key] );
                  nativelist += default_male[key];
                  if(debug) { console.log(`default male slot: ${key}: ${default_male[key]}`); }
              }
              else if(gender == "Female") {
                  //alt.emitClient(player, "lisa_loadcharacter", "runEval", default_female[key] );
                  nativelist += default_female[key];
                  if(debug) { console.log(`default female slot: ${key}: ${default_female[key]}`); }
              }
          }
      }
  }

  return nativelist;
}

var loggedInAccounts = [];

//logout account if disconnect.
alt.on('playerDisconnect', (player, reason) => {
  if(player.getMeta('AccountID') != undefined || player.getMeta('AccountID') != null) {
    if(player.getMeta('AccountID') == true) {
      loggedInAccounts[player.getMeta('AccountID')] = false;
      console.log('logged out account with id: '+player.getMeta('AccountID'));

      let pos = `${player.pos.x}, ${player.pos.y}, ${player.pos.z}`;
      dbstore.CharacterValue(player.id, "Position", pos);
      dbstore.CharacterValue(player.id, "Dimension", player.dimension);
    }
  }
});

alt.onClient("checkLogin", (player, username, password) => {
  pool.getConnection(function(err, connection) {
    if (err) throw error;

    var sql = "SELECT * FROM user_accounts WHERE user_name = ? LIMIT 1";
    var inserts = [username];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      
      if(results.length != 1) {
        console.log("No accounts with this username and password - #purple");
        alt.emitClient(player, 'login_error', "No account with this username and password");
        return;
      }
      const accountid = results[0].ID;
      const checkpw = verifyPassword(password, results[0].user_password_hash);
      if(!checkpw) {
        console.log("No accounts with this username and password - #yellow");
        alt.emitClient(player, 'login_error', "No account with this username and password");
        return;
      }

      //check if account is active.
      if(results[0].user_active == 0) {
        console.log("Account not activated. Get whitelisted on discord!");
        alt.emitClient(player, 'login_error', "Account not activated. Get whitelisted on discord!");
        return;
      }

      //check if account already logged in.
      if(loggedInAccounts[results[0].ID] != undefined || loggedInAccounts[results[0].ID] != null) {
        if(loggedInAccounts[results[0].ID] == true) {
          console.log("Account already logged in!");
          alt.emitClient(player, 'login_error', "Already logged in!");
          return;
        }
      }

      //correct, set account as logged in.
      loggedInAccounts[results[0].ID] = true;
      player.setMeta('AccountID', results[0].ID);
      console.log('Logged in account with ID: '+results[0].ID);

      //console.log("Password correct, continue!");

      pool.getConnection(function(err, connection) {
        if (err) throw error;

        var sql2 = "SELECT * FROM characters WHERE ?? = ?";
        var inserts2 = ['User_Account_ID', accountid];
        sql2 = mysql.format(sql2, inserts2);

        var query = connection.query(sql2, function (error, results, fields) {
          connection.release();
          if (error) throw error;

          //hide login window, and display characters panel.
          alt.emitClient(player, "hideLoginWindow");

          /*
          if(results.length == 0) {
            console.log("No characters on this account, Nothing to construct.");
            return;
          }
          */

          //construct accounts characters
          for (var i in results) {
            alt.emitClient(player, "constructCharacters", results[i].Character_Name, results[i].ID, JSON.stringify(results[i]), getNativesFromEquippedInventory(results[i].Equipped, results[i].Gender));
          }

          //display char select.
          alt.emitClient(player, "showCharSelect");
        });
      });

      //query, get characters and construct.
    });
  });
});

function loginCharacterWithCharID(player, charid) {
  pool.getConnection(function(err, connection) {
    if (err) throw error;

    var sql3 = "SELECT * FROM characters WHERE ?? = ?";
    var inserts3 = ['ID', charid];
    sql3 = mysql.format(sql3, inserts3);
    var query = connection.query(sql3, function (error, results, fields) {
      connection.release();
      
      if (error) throw error;

      for (var i in results) {
          //be careful with parsing, doesnt work right when getting from dbstore...
          //results[i].ResidenceIdent = JSON.parse(results[i].ResidenceIdent); //dont ever parse on load, parse when needs reading n shit.

          dbstore.Character(player.id, results[i]);
          //also initialize characters temp values, set empty obj ?
          dbstore.CharacterTemp(player.id, {"tempinit":true});
          chat.send(player, "you are now logged inn, check /chardata");

          alt.emitClient(player, "lisa_loadcharacter", "runEval", 'game.switchOutPlayer(alt.Player.local.scriptID, 1, 1);');

          var x = setInterval(function() {
            alt.emit('load_character', player);
            clearInterval(x);
        }, 3000);
          
      }
      //give back access n shit.

      //MOVED to after teleport finished.

      //alt.emitClient(player, "lisa_loadcharacter", "runEval", `alt.toggleGameControls(true);`); //disable controls.
      //alt.emitClient(player, "blockInventory", false); //block inventory
      alt.emitClient(player, "disableLoginStuff");

    });
  });
}

alt.onClient("loginCharacter", (player, charid) => {
  loginCharacterWithCharID(player, charid);
});

alt.onClient("superSimpleLogin", (player) => {
  //OLD CODE, do this instead for quick connect and autologin character!
  alt.emitClient(player, "lisa_loadcharacter", "runEval", `alt.toggleGameControls(true);`); //disable controls.
  alt.emitClient(player, "blockInventory", false); //block inventory
  
  pool.getConnection(function(err, connection) {
    if (err) throw error;
    var query = connection.query(`SELECT * FROM characters WHERE Character_Name = '${player.name}' LIMIT 1`, function (error, results, fields) {
      connection.release();
      
      if (error) throw error;

      for (var i in results) {
          //be careful with parsing, doesnt work right when getting from dbstore...
          //results[i].ResidenceIdent = JSON.parse(results[i].ResidenceIdent); //dont ever parse on load.

          dbstore.Character(player.id, results[i]);
          //also initialize characters temp values, set empty obj ?
          dbstore.CharacterTemp(player.id, {"tempinit":true});
          chat.send(player, "we have now supersimply logged you inn, check /chardata");

          alt.emit('load_character', player);

      }
    });
  });
  
});

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function registerAccount(player, username, email, password) {
  pool.getConnection(function(err, connection) {
    var post  = {user_name: username, user_email: email, user_password_hash: password};
    var query = connection.query(`INSERT INTO user_accounts SET ?`, post, function (error, results, fields) {
      connection.release();
      if (error) {
        alt.emitClient(player, 'register_error', 'Something went wrong! Contact an admin.');
        throw error;
      }

      //console.log("----------Saved this to DB----------");
      console.log('SQL => '+query.sql);
      //console.log("------------------------------------");

      alt.emitClient(player, 'register_error', '<n style="color:greenyellow !important">Account created! You may now login.</n>');
    });
  });
}

alt.onClient("checkRegisterData", (player, username, email, password1) => {
  //console.log('got from client - checkRegisterData, '+username+', '+email+', '+password1);

  //check if we can use email.
  if(email != null) {
    if(!emailIsValid(email)) {
      console.log('email not valid, stopping here.');
      alt.emitClient(player, 'register_error', 'Please enter a valid email address or empty for none.');
      return;
    } else {
      console.log('email valid! continue.');
    }
  } else {
    console.log('no email. thats fine.');
  }

  //check if username is available.
  pool.getConnection(function(err, connection) {
    if (err) throw error;

    var sql = "SELECT * FROM user_accounts WHERE user_name = ? LIMIT 1";
    var inserts = [username];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      
      if(results.length >= 1) {
        console.log("username taken! stopping...");
        alt.emitClient(player, 'register_error', 'Username is already taken.');
        return;
      }

      //available so continue.
      console.log('username available, continuing...');

      //now, actually create the user!
      //console.log('creating new account: username: '+username+', email: '+email+', password: '+password1);
      let encpw = encryptPassword(password1);
      console.log('encrypted password: '+encpw);
      //insert into DB.
      registerAccount(player, username, email, encpw);

    });
  });
});


alt.onClient("createCharacter", (player) => {
    console.log('creating character for player: '+player.name);
});

async function isCharacterNameAvailable(charname, player) {
  pool.getConnection(function(err, connection) {
    if (err) {
      //throw error;
      console.log(error);
      alt.emitClient(player, 'CharNameAnswer', false, 'Unknown error #31, Try again.');
      return;
    }

    let username = charname.toLowerCase();

    var sql = "SELECT * FROM characters WHERE Character_Name = ? LIMIT 1";
    var inserts = [username];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) { 
        //throw error;
        console.log(error);
        alt.emitClient(player, 'CharNameAnswer', false, 'Unknown error #32, Try again.');
        return;
      }
      
      if(results.length >= 1) {
        console.log("username taken! stopping...");
        alt.emitClient(player, 'CharNameAnswer', false, 'Character name is already taken.');
        return;
      } else {
        //available so continue.
        console.log('charname available, continuing...');
        alt.emitClient(player, 'CharNameAnswer', true, 'Character name is available!<br> You can now create character!');
        return;
      }
    });
  });
}

alt.onClient('isCharacterNameAvailable', (player, charname) => {
  isCharacterNameAvailable(charname, player);
});

alt.onClient("createSaveCharacter", (player, charname, gender, headBlendData, newChar_hairstyle, newChar_haircolor, newChar_eyecolor, 
  newChar_FaceFeatures, newChar_headOverlay, newChar_headOverlayOpacity, newChar_headOverlayColor, newChar_headOverlayColor2) => {

  let db_gender;
  if(gender == 0) { db_gender = "Male"; } else if(gender == 1) { db_gender = "Female"; }

  let db_headBlendData = `${headBlendData[0]}, ${headBlendData[1]}, ${headBlendData[2]}, ${headBlendData[3]}, ${headBlendData[4]}, ${headBlendData[5]}, ${headBlendData[6]}, ${headBlendData[7]}, ${headBlendData[8]}, ${headBlendData[9]}`;
  
  let db_newChar_hairstyle = `${newChar_hairstyle[0]}, ${newChar_hairstyle[1]}, ${newChar_hairstyle[2]}`;
  let db_newChar_haircolor = `${newChar_haircolor[0]}, ${newChar_haircolor[1]}`;

  let db_newChar_eyecolor = newChar_eyecolor;

  let db_FaceFeatures = `${newChar_FaceFeatures[0]}, ${newChar_FaceFeatures[1]}, ${newChar_FaceFeatures[2]}, ${newChar_FaceFeatures[3]}, ${newChar_FaceFeatures[4]}, ${newChar_FaceFeatures[5]}, ${newChar_FaceFeatures[6]}, ${newChar_FaceFeatures[7]}, ${newChar_FaceFeatures[8]}, ${newChar_FaceFeatures[9]}, ${newChar_FaceFeatures[10]}, ${newChar_FaceFeatures[11]}, ${newChar_FaceFeatures[12]}, ${newChar_FaceFeatures[13]}, ${newChar_FaceFeatures[14]}, ${newChar_FaceFeatures[15]}, ${newChar_FaceFeatures[16]}, ${newChar_FaceFeatures[17]}, ${newChar_FaceFeatures[18]}, ${newChar_FaceFeatures[19]}`;

  //0-12
  let h0 = newChar_headOverlay;
  let h1 = newChar_headOverlayOpacity;
  let db_headOverlay = `${h0[0]}&${h1[0]}, ${h0[1]}&${h1[1]}, ${h0[2]}&${h1[2]}, ${h0[3]}&${h1[3]}, ${h0[4]}&${h1[4]}, ${h0[5]}&${h1[5]}, ${h0[6]}&${h1[6]}, ${h0[7]}&${h1[7]}, ${h0[8]}&${h1[8]}, ${h0[9]}&${h1[9]}, ${h0[10]}&${h1[10]}, ${h0[11]}&${h1[11]}, ${h0[12]}&${h1[12]}`;

  //0-12
  let hc0 = newChar_headOverlayColor;
  let hc1 = newChar_headOverlayColor2;
  let db_headOverlayColor = `${hc0[0]}&${hc1[0]}, ${hc0[1]}&${hc1[1]}, ${hc0[2]}&${hc1[2]}, ${hc0[3]}&${hc1[3]}, ${hc0[4]}&${hc1[4]}, ${hc0[5]}&${hc1[5]}, ${hc0[6]}&${hc1[6]}, ${hc0[7]}&${hc1[7]}, ${hc0[8]}&${hc1[8]}, ${hc0[9]}&${hc1[9]}, ${hc0[10]}&${hc1[10]}, ${hc0[11]}&${hc1[11]}, ${hc0[12]}&${hc1[12]}`;

  console.log(`
  Character Name: ${charname}
  Gender: ${db_gender}
  pedHeadBlendData: ${db_headBlendData}
  Hairstyle: ${db_newChar_hairstyle}
  HairColor: ${db_newChar_haircolor}
  EyeColor: ${db_newChar_eyecolor}
  FaceFeature: ${db_FaceFeatures}
  - ALLDB ^

  HeadOverlay: ${newChar_headOverlay}
  HeadOverlayOpacity: ${newChar_headOverlayOpacity}
  db_headoverlay: ${db_headOverlay}

  HeadOverlayColor1: ${newChar_headOverlayColor}
  HeadOverlayColor2: ${newChar_headOverlayColor2}
  db_headOverlayColor: ${db_headOverlayColor}
  `);

  pool.getConnection(function(err, connection) {
    if (err) {
      //throw error;
      console.log(error);
      alt.emitClient(player, 'CharNameAnswer', false, 'Unknown error #31, Try again.');
      return;
    }

    let username = charname.toLowerCase();

    var sql = "SELECT * FROM characters WHERE Character_Name = ? LIMIT 1";
    var inserts = [username];
    sql = mysql.format(sql, inserts);

    var query = connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) { 
        //throw error;
        console.log(error);
        alt.emitClient(player, 'CharNameAnswer', false, 'Unknown error #32, Try again.');
        return;
      }
      
      if(results.length >= 1) {
        console.log("username taken! stopping...");
        alt.emitClient(player, 'CharNameAnswer', false, 'Character name is already taken.');
        return;
      } else {
        //available so continue.
        console.log('charname available, continuing...');
        alt.emitClient(player, 'CharNameAnswer', true, 'Character name is available!<br> Creating character...');

        let accountID = player.getMeta('AccountID');
        let usecharname = charname.toLowerCase();
        
        pool.getConnection(function(err, connection) {

          let startingInventoryEquipped = '{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":null,"9":null,"10":null,"11":null,"12":null,"13":null,"14":null,"15":null,"16":null}';
          if(db_gender == "Male") {
            startingInventoryEquipped = '{"0":null,"1":null,"2":null,"3":null,"4":{"18":{"timedurability":2880}},"5":null,"6":{"19":{"timedurability":2880}},"7":null,"8":null,"9":null,"10":null,"11":{"17":{"timedurability":2880}}}';
          }
          else if(db_gender == "Female") {
            startingInventoryEquipped = '{"0":null,"1":null,"2":null,"3":null,"4":{"15":{"timedurability":2880}},"5":null,"6":{"16":{"timedurability":2880}},"7":null,"8":null,"9":null,"10":null,"11":{"14":{"timedurability":2880}}}';
          }

          var post  = {
            User_Account_ID: accountID, 
            Gender: db_gender, 
            Character_Name: usecharname,
            Position: '459.5340576171875, -859.1868286132812, 27.2916259765625',
            Dimension: 0,
            setPedHeadBlendData: `${db_headBlendData}`,
            setPedEyeColor: `${db_newChar_eyecolor}`,
            setPedHairStyle: `${db_newChar_hairstyle}`,
            setPedHairColor: `${db_newChar_haircolor}`,
            setPedHeadOverlay: `${db_headOverlay}`,
            setPedHeadOverlayColor: `${db_headOverlayColor}`,
            setPedFaceFeature: `${db_FaceFeatures}`,
            Inventory: '{"0":{"0":{"usedurability":4}}}', //sprunk can
            Equipped: startingInventoryEquipped,
            Money_Pocket: '10.0',
            Money_Bank: '0.0',
            IsPlayerInResidenceCol: 0,
            ResidenceIdent: null,
            ResidenceColType: null,
            isinsideinterior: 0
          };

          var query = connection.query(`INSERT INTO characters SET ?`, post, function (error, results, fields) {
            connection.release();
            if (error) {
              alt.emitClient(player, 'CharNameAnswer', false, 'Something went wrong! Please try again.');
              throw error;
            }

            //console.log("----------Saved this to DB----------");
            console.log('SQL => '+query.sql);
            //console.log("------------------------------------");

            alt.emitClient(player, 'CharNameAnswer', true, 'Character created!<br> Logging you in...');

            //characterID - results.insertId
            if(results.affectedRows == 1) {
              console.log('autologin now for character ID: '+results.insertId);
              setTimeout(() => {
                loginCharacterWithCharID(player, results.insertId);
              }, 1000);
            }
          });
        });

        return;
      }
    });
  });

  
});