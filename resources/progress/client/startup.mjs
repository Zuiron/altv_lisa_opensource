/* client startup */
import alt from 'alt';

var progress = new alt.WebView("http://resource/client/index.html");

//from server side.
alt.onServer('progress:new', (text, itemid, ms, animclass) => {
    progress.emit('progress:new', text, itemid, ms, animclass);
});
  
//from client side.
alt.on('progress:new', (text, itemid, ms, animclass) => {
    progress.emit('progress:new', text, itemid, ms, animclass);
});



//from server side.
alt.onServer('progress:clear', () => {
    progress.emit('progress:clear');
});
  
//from client side.
alt.on('progress:clear', () => {
    progress.emit('progress:clear');
});