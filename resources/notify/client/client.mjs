import alt from 'alt';

const notify = {
  isLoaded: false,
  view: null
};

alt.on('connectionComplete', () => {
  //notify.view = new alt.WebView('http://resource/client/view/index.html');
  notify.view = new alt.WebView('http://resource/client/view/index.html');
  notify.view.on('notify:loaded', () => {
    notify.isLoaded = true;
  });
});

/*
alt.on('consoleCommand', (command, ...args) => {
  if(command === 'notify' && notify.isLoaded) {
    const text = args.join(' ');
    notify.view.emit('notify:send', {
      text: text,
      timeout: 5000,
      textColor: '#000000',
      backgroundColor: 'rgba(236,236,255,0.85)',
      lineColor: '#6c7ae0'
    });
  }
});
*/

//alt.emitClient(player, 'notify:msg', 'test message', 5000, '#000000', 'rgba(236,236,255,0.85)', '#6c7ae0');
//from server side.
alt.onServer('notify:msg', (msg, timeout, textcolor, bgcolor, linecolor) => {
  if(notify.isLoaded) {
    notify.view.emit('notify:send', {
      text: msg,
      timeout: timeout,
      textColor: textcolor,
      backgroundColor: bgcolor,
      lineColor: linecolor
    });
  }
});

//from client side.
alt.on('notify:msg', (msg, timeout, textcolor, bgcolor, linecolor) => {
  if(notify.isLoaded) {
    notify.view.emit('notify:send', {
      text: msg,
      timeout: timeout,
      textColor: textcolor,
      backgroundColor: bgcolor,
      lineColor: linecolor
    });
  }
});