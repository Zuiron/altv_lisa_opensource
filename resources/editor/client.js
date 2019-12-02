import alt from 'alt';
import game from 'natives';

let loaded = false;
let opened = false;
let currentMouseState = null;

let view = new alt.WebView("http://resource/html/index.html");

view.on('clientEvalExecute', (evalcode) => {
    eval(evalcode);
});

view.on('serverEvalExecute', (evalcode) => {
    alt.emitServer('serverEvalExecute', evalcode);
});

view.on('editorReady', () => {
    loaded = true;
});

view.on('editorOpened', (active) => {
    opened = active;
    alt.toggleGameControls(!active);
    if(currentMouseState !== active){
      alt.showCursor(active)
      currentMouseState = active;
    }
    if(active)
      view.focus();
});

alt.on('keyup', (key) => {
    if (!loaded) return;

    // list of key codes https://docs.microsoft.com/en-us/windows/desktop/inputdev/virtual-key-codes
    if (key == 0x73) { //f4
        view.emit('toggleEditor');
    } else if (opened && key == 0x1B) {
        view.emit('toggleEditor');
    }
});