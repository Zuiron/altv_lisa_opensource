function toggleview(toggle) {
    if(toggle){ //open
        document.getElementById('body').style.visibility = 'visible';
        document.getElementById('body').style.opacity = 1.0;
    }
    else { //close
        document.getElementById('body').style.visibility = 'hidden';
        document.getElementById('body').style.opacity = 0.0;
    }
}

function buyitem(itemid, businessid, index) {
    alt.emit('buyitem', itemid, businessid, index);
}

function clearitems() {
    document.getElementById("itemlist").innerHTML = "";
    console.log('cleared items');
}

function additem(itemid, cost, stock, bid, itemname, itemd1, itemd2, index) {
    let item = `
    <div class="row align-items-center">
        <div class="col-12">
            ${itemname} - ${itemd1}
        </div>
    </div>
    <div class="row align-items-center">
        <div class="col-2">
            <img src="http://assets/lisa-assets/assets/icons/${itemid}.png" class="img-fluid">
        </div>
        <div class="col-5 desctext">
            ${itemd2}
        </div>
        <div class="col-3">
        <br> $ ${cost}
        </div>
        <div class="col-2">
        <button type="button" class="btn btn-success" onclick="buyitem(${itemid}, ${bid}, ${index})">BUY</button>
        </div>
    </div><br><br>
    `;
    document.getElementById("itemlist").innerHTML += item;
    console.log('adding item to shoplist');
}

if('alt' in window) {
    alt.on('business_shop:clearitems', clearitems);
    alt.on('business_shop:additem', additem);
    alt.on('toggleview', toggleview);
}