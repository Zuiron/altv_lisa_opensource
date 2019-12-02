import alt from 'alt';

let cmdHandlers = {};

function invokeCmd(player, cmd, args) {
  const callback = cmdHandlers[cmd];

  if (callback) {
    callback(player, args);
  } else {
    send(player, `{FF0000} Unknown command /${cmd}`);
  }
}

//player.getMeta('Character_Name')
alt.onClient('chatmessage', (player, msg) => {
  var metaname = player.getMeta('Character_Name');
  if (msg[0] === '/') {
    msg = msg.trim().slice(1);

    if (msg.length > 0) {
      alt.log('[chat:cmd] ' + metaname + ': /' + msg); //player.name

      let args = msg.split(' ');
      let cmd = args.shift();

      invokeCmd(player, cmd, args);
    }
  } else {
    msg = msg.trim();

    if (msg.length > 0) {
      alt.log('[chat:msg] ' + metaname + ': ' + msg); //player.name

      alt.emitClient(null, 'chatmessage', metaname, msg.replace(/</g, '&lt;').replace(/'/g, '&#39').replace(/"/g, '&#34'));
    }
  }
});

export function send(player, msg) {
  alt.emitClient(player, 'chatmessage', null, msg);
}

export function broadcast(msg) {
  send(null, msg);
}

export function registerCmd(cmd, callback) {
  if (cmdHandlers[cmd] !== undefined) {
    alt.logError(`Failed to register command /${cmd}, already registered`);
  } else {
    cmdHandlers[cmd] = callback;
  }
}

alt.on('playerConnect', (player) => {
  alt.emitClient(player, 'disableChat');
});

export default { send, broadcast, registerCmd };
