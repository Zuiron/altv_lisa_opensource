import * as alt from "alt";
import * as game from "natives";

var shopviewstate = false;
var shopview = new alt.WebView("http://resource/client/business_shop/index.html");

alt.on('keyup', (key) => {
    if (key != 'E'.charCodeAt(0))
        return;
    
    var ped = alt.Player.local;
    if(ped.getSyncedMeta('business_shop_active') && !shopviewstate) {
        //open menu.
        shopview.focus();
        alt.toggleGameControls(false);
        alt.showCursor(true);

        shopview.emit('toggleview', true);
        shopviewstate = true;
    } else if(shopviewstate) {
        //close menu.
        shopview.unfocus();
        alt.toggleGameControls(true);
        alt.showCursor(false);

        shopview.emit('toggleview', false);
        shopviewstate = false;
    }
});

alt.onServer('business_shop:clearitems', () => {
    shopview.emit('business_shop:clearitems');
});

alt.onServer('business_shop:additem', (itemid, cost, stock, bid, itemname, itemd1, itemd2, index) => {
    shopview.emit('business_shop:additem', itemid, cost, stock, bid, itemname, itemd1, itemd2, index);
});

shopview.on('buyitem', (itemid, businessid, index) => {
    alt.emitServer('business_shop:buyitem', itemid, businessid, index);
});