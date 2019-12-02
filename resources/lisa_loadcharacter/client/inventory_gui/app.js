
var tooltipstrings_inventory = {};
var tooltipstrings_equipped = {};
var tooltipstrings_pickup = {};

    function dragover(ev) {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
        console.log("allowDrop()");
    }

    function dragstart(ev, test) {
        ev.dataTransfer.dropEffect = "move";
        ev.dataTransfer.setData("text", ev.target.id);
        ev.dataTransfer.setData("lisa", test);
        ev.target.className += ' dragged';

        var img = new Image(); 
        img.src = `http://assets/lisa-assets/assets/icons/${ev.target.id}.png`;
        ev.dataTransfer.setDragImage(img, 30, 30);

        console.log(`drag(${ev.target.id})`);
    }

    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        var data2 = ev.dataTransfer.getData("lisa");
        //ev.target.appendChild(document.getElementById(data));
        if (data) {
            var childElement = document.getElementById(data);
            if (childElement) {
                if($(ev.target).hasClass( "droppable" ))    {           //Only allow drop inside divs with droppable class
                    let from = $(childElement).parent()[0].id;
                    let to = $(ev.target).parent().prevObject[0].id;

                    if(from != to) { //prevent self dropping
                        console.log("Dragged item #", childElement.id, "from", from, " -> ", to);
                        console.log(data2);
                        ev.target.appendChild(childElement);
                    }
                }
                if($(ev.target).hasClass( "draggable" ))    {           //put in parent when dropped on draggable -- Is this even working AT ALL?????
                    console.log('$(ev.target).parent()', $(ev.target).parent());
                    $(ev.target).parent()[0].appendChild(childElement);
                }
                return false;
            }
        }
    }


    function useitem(item) {
        console.log(`you used item ${item}`);
    }
    
    //bootstrap tooltips do not work in cef apparently... making my own. which works, even better.
    /*
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    */

/* UNWANTED behavior
document.querySelectorAll(".item-container").forEach( el => 
    el.addEventListener('contextmenu', e => {
        e.preventDefault();
        console.log("we right clicked on an item!");
        console.log(e);
    })
);
*/

/* also UNWANTED behavior
var item = $( "div.item-container" );
item.contextmenu(function() {
    //item.toggleClass( "contextmenu" );
    console.log(item);
});
*/

/*

custom context menu

*/

const menu = document.querySelector(".menu");
let menuVisible = false;

const toggleMenu = command => {
  menu.style.display = command === "show" ? "block" : "none";
  menuVisible = !menuVisible;
};

const setPosition = ({ top, left }) => {
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  //toggleMenu("show");
};

function rightclickitem(invenid, use, equip, unequip, drop, take) {
    //console.log(`opening contextmenu for item# ${invenid}`);
    //console.log(`use: ${use}, equip: ${equip}, unequip: ${unequip}, drop: ${drop}`);
    
    //this doesnt fully fix weird bug.
    if(menuVisible) {
        toggleMenu("hide");
        return;
    }

    //clear menu before construct.
    document.getElementById("lisa_contextmenucontent").innerHTML = '';

    //set allowed buttons.
    if(use)     { document.getElementById("lisa_contextmenucontent").innerHTML += `<li class="menu-option" onclick="onItemUse(${invenid})">Use</li>`}
    if(equip)   { document.getElementById("lisa_contextmenucontent").innerHTML += `<li class="menu-option" onclick="onItemEquip(${invenid})">Equip</li>`      }
    if(unequip) { document.getElementById("lisa_contextmenucontent").innerHTML += `<li class="menu-option" onclick="onItemUnEquip(${invenid})">Unequip</li>`    }
    if(drop)    { document.getElementById("lisa_contextmenucontent").innerHTML += `<li class="menu-option" onclick="onItemDrop(${invenid})">Drop</li>`       }
    if(take)    { document.getElementById("lisa_contextmenucontent").innerHTML += `<li class="menu-option" onclick="onItemPickup(${invenid})">Take</li>`       }
    
    toggleMenu("show");
}

window.addEventListener("click", e => {
  if(menuVisible)toggleMenu("hide");
});

window.addEventListener("contextmenu", e => {
  e.preventDefault();
  const origin = {
    left: e.pageX,
    top: e.pageY
  };
  setPosition(origin);
  return false;
});


function setCharacterInventoryViewMode(mode) {
    const allitems = document.querySelectorAll('.item-container');
    if(mode == "3x") {
        allitems.forEach(element => {
            element.style.width = '31.4%';
        });
    }
    else if(mode == "2x") {
        allitems.forEach(element => {
            element.style.width = '48%';
        });
    }
    else if(mode == "1x") {
        allitems.forEach(element => {
            element.style.width = '98%';
        });
    }
    else if(mode == "icons") {
        allitems.forEach(element => {
            element.style.width = 'auto';
            element.style.overflow = 'hidden';
        });
    }
}


function onItemDrop(invenid) {
    alt.emit('onRequestDrop', invenid);
    console.log(`Drop item with invid: ${invenid}`);
}

function onItemUse(invenid) {
    alt.emit('onRequestUse', invenid);
    console.log(`Use item with invid: ${invenid}`);
}

function onItemEquip(invenid) {
    alt.emit('onRequestEquip', invenid);
    console.log(`Equip item with invid: ${invenid}`);
}

function onItemUnEquip(invenid) {
    alt.emit('onRequestUnEquip', invenid);
    console.log(`UnEquip item with invid: ${invenid}`);
}

function clearCharacterInventory() {
    //should be called before constructing items.
    //first clear current inventory (incase we used an item and it should be gone?)
    document.getElementById("character_items_container").innerHTML = '';
    console.log("cleared character inventory");
}

var tooltipon = false;

$("body").mousemove(function(e) {
    if(tooltipon) {
        document.getElementById("tooltiplisa").style.top = `${e.pageY+20}px`;
        document.getElementById("tooltiplisa").style.left = `${e.pageX+20}px`;
    }
});

function maketooltip(invenid, type) {
    if(type == 'inventory') {  
        document.getElementById("tooltiplisa").innerHTML = tooltipstrings_inventory[invenid];
        document.getElementById("tooltiplisa").style.visibility = 'visible';
        tooltipon = true;
    }
    else if(type == 'equipped') {
        document.getElementById("tooltiplisa").innerHTML = tooltipstrings_equipped[invenid];
        document.getElementById("tooltiplisa").style.visibility = 'visible';
        tooltipon = true;
    }
    else if(type == 'pickup') {
        document.getElementById("tooltiplisa").innerHTML = tooltipstrings_pickup[invenid];
        document.getElementById("tooltiplisa").style.visibility = 'visible';
        tooltipon = true;
    }
}
/* OLD CODE
function maketooltip(str) {
    //console.log(JSON.stringify(str));
    document.getElementById("tooltiplisa").innerHTML = str;
    document.getElementById("tooltiplisa").style.visibility = 'visible';
    tooltipon = true;
}
*/


function hidetooltip() {
    //console.log('hiding tooltip');
    document.getElementById("tooltiplisa").style.visibility = 'hidden';
    tooltipon = false;
}





function removeItemFromNearbyItems(invenid) {
    let itemlist = document.querySelector('#nearby_items_container').children;
    for (i = 0; i < itemlist.length; i++) {
        if(itemlist[i].id == invenid) {
            itemlist[i].remove();
            console.log('removed dropped item with dropID: '+invenid);
        }
    }
}

function onItemPickup(invenid) {
    alt.emit('onRequestPickup', invenid);
    console.log('request pickup of dropID: '+invenid);
}

//invenid == dropitemid
function constructDroppedItem(invenid, itemid, itemname, itemdesc, itemdesclong, icon) {
    //if already exists, skip.
    let itemlist = document.querySelector('#nearby_items_container').children;
    for (i = 0; i < itemlist.length; i++) {
        if(itemlist[i].id == invenid) {
            console.log("this dropped item is already created. dropID: "+invenid);
            return;
        }
    }
    console.log('creating dropped item. dropID: '+invenid);
    //------------------------------------------------------------------------

    let use = false;
    let equip = false;
    let unequip = false;
    let drop = false;
    let take = true;
    
    //new icon system stuff.
    let itemicon = itemid;
    if(icon != undefined) {
        itemicon = icon;
    }

    tooltipstrings_pickup[invenid] = itemdesclong;
    document.getElementById("nearby_items_container").innerHTML += 
    `
    <div id="${invenid}" oncontextmenu="rightclickitem(${invenid}, ${use}, ${equip}, ${unequip}, ${drop}, ${take})" draggable="true" ondragstart="dragstart(event)" class="item-container draggable">
                                    
        <div class="item_mainview">

            <div class="item_icon">
                <img src="http://assets/lisa-assets/assets/icons/${itemicon}.png" onmouseover="maketooltip(${invenid}, 'pickup')" onmouseleave="hidetooltip()" onerror="this.src='http://assets/lisa-assets/assets/icons/icon.png';" draggable="false"> <!--fix, allow drag icon too.-->
                <!--<div class="item_hoverview">
                    ${itemdesclong}
                </div>-->
            </div>

            <div class="namedesc-container">
                <div class="item_name">${itemname}</div><br>
                <div class="item_desc">${itemdesc}</div>
            </div>

        </div>
    </div>
    `;
}

//remember durability needs to be percentage! calc serverside.
function constructCharacterInventoryItem(invenid, itemid, itemname, itemdesc, itemdesclong, durability, use, equip, unequip, drop, icon) {
    //console.log(invenid, itemid, itemname, itemdesc, itemdesclong, durability, use, equip, unequip, drop);

    //new icon system stuff.
    let itemicon = itemid;
    if(icon != undefined) {
        itemicon = icon;
    }

    //add item.
    let dblclick = ``;
    if(use) { dblclick = `ondblclick="onItemUse(${invenid})"`; } //enable doubleclick to use if use is available

    let durahtml = ``
    if(durability != '100') {
        durahtml = 
        `
        <div id="invitemdura_${invenid}" class="progress-container">
            <div class="progress">
                <div id="invitemduras_${invenid}" class="progress-bar bg-warning progress-lisa" role="progressbar" style="width: ${durability}%"></div>
            </div>
        </div>
        `;
    } else { //if 100, make but visibility is hidden.
        durahtml = 
        `
        <div id="invitemdura_${invenid}" class="progress-container" style="opacity: 0.0">
            <div class="progress">
                <div id="invitemduras_${invenid}" class="progress-bar bg-warning progress-lisa" role="progressbar" style="width: ${durability}%"></div>
            </div>
        </div>
        `;
    }
    tooltipstrings_inventory[invenid] = itemdesclong; //oldcode -- maketooltip('${itemdesclong}')
    document.getElementById("character_items_container").innerHTML += 
    `
    <div id="${invenid}" oncontextmenu="rightclickitem(${invenid}, ${use}, ${equip}, ${unequip}, ${drop}, false)" draggable="true" ondragstart="dragstart(event)" ${dblclick} class="item-container draggable">
                                    
        <div class="item_mainview">

            <div class="item_icon">
                <img src="http://assets/lisa-assets/assets/icons/${itemicon}.png" onmouseover="maketooltip(${invenid}, 'inventory')" onmouseleave="hidetooltip()" onerror="this.src='http://assets/lisa-assets/assets/icons/icon.png';" draggable="false"> <!--fix, allow drag icon too.-->
                <!--<div class="item_hoverview">
                    ${itemdesclong}
                </div>-->
            </div>

            <div class="namedesc-container">
                <div class="item_name">${itemname}</div><br>
                <div class="item_desc">${itemdesc}</div>
            </div>

            ${durahtml}

        </div>
    </div>
    `;
}

function removeItemFromCharacterInventory(invenid) {
    let itemlist = document.querySelector('#character_items_container').children;
    for (i = 0; i < itemlist.length; i++) {
        if(itemlist[i].id == invenid) {
            itemlist[i].remove();
        }
    }
}



function removeItemFromCharacterEquippedInventory(invenid) {
    let itemplace = document.getElementById(`char_equip_slot-${invenid}`);
    itemplace.innerHTML = ' ';
}

//TODO INCOMPLETE!
function constructCharacterEquippedItem(invenid, itemid, slot, itemname, itemdesc, itemdesclong, durability, unequip, icon) {
    let durahtml = ``
    if(durability != '100') {
        durahtml = 
        `
        <div id="eqitemdura_${invenid}" class="progress-container">
            <div class="progress">
                <div id="eqitemduras_${invenid}" class="progress-bar bg-warning progress-lisa" role="progressbar" style="width: ${durability}%"></div>
            </div>
        </div>
        `;
    } else {
        durahtml = 
        `
        <div id="eqitemdura_${invenid}" class="progress-container" style="opacity: 0.0">
            <div class="progress">
                <div id="eqitemduras_${invenid}" class="progress-bar bg-warning progress-lisa" role="progressbar" style="width: ${durability}%"></div>
            </div>
        </div>
        `;
    }
    //slot example "char_equip_slot-7" - lets make server -> less data.
    var saveslot = slot;
    slot = "char_equip_slot-"+slot;

    let itemicon = itemid;
    if(icon != undefined) {
        itemicon = icon;
    }

    let getslot = document.getElementById(slot);
    if(getslot != null) {
        console.log('got sync for' + slot);
        if(slot == "char_equip_slot-2") { unequip = false; } //hair is NEVER unequippable.
    tooltipstrings_equipped[itemid] = itemdesclong; //oldcode -- maketooltip('${itemdesclong}')
    getslot.innerHTML += 
    `
    <div id="${invenid}" oncontextmenu="rightclickitem(${saveslot}, false, false, ${unequip}, false, false)" draggable="true" ondragstart="dragstart(event)" class="item-container draggable">
                                    
        <div class="item_mainview">

            <div class="item_icon">
                <img src="http://assets/lisa-assets/assets/icons/${itemicon}.png" onmouseover="maketooltip(${itemid}, 'equipped')" onmouseleave="hidetooltip()" onerror="this.src='http://assets/lisa-assets/assets/icons/icon.png';" draggable="false"> <!--fix, allow drag icon too.-->
                <!--<div class="item_hoverview">
                    ${itemdesclong}
                </div>-->
            </div>

            <div class="namedesc-container">
                <div class="item_name">${itemname}</div><br>
                <div class="item_desc">${itemdesc}</div>
            </div>

            ${durahtml}

        </div>
    </div>
    `;
    }
}





//just testing the function - works
//invenid, itemid, itemname, itemdesc, itemdesclong, durability, use, equip, unequip, drop
/*
for (i = 0; i < 65; i++) {
    constructCharacterInventoryItem(i, 0, 'Sprunk Can 5', 'The essence of life!', 'this is fucking a test', '50', true, true, false, true);
}
*/
//testing reversed ordering? nice, works! this way we have newest items on top!

/*
for (i = 65; i >= 0; i--) {
    constructCharacterInventoryItem(i, 0, 'Sprunk Can 5', 'The essence of life!', 'this is a test', '50', true, true, false, true);
}

//just testing the function - works
//invenid, itemid, slot, itemname, itemdesc, itemdesclong, durability, unequip
for (i = 0; i <= 16; i++) {
    constructCharacterEquippedItem(`${i}`, 1, `${i}`, 'itemname', 'itemdesc', 'itemdesclong', 50, true);
}
*/

/*
let huhu = "test";
constructCharacterInventoryItem(0, 0, 'Sprunk Can 5', 'The essence of life!', `
<b>${huhu}</b> <br>
<i>${huhu}</i> <br>
${huhu}`, '50', true, true, false, true);
*/
//testing the clear - works
//clearCharacterInventory();

//testing remove specific invenid items. works
//removeItemFromCharacterInventory(65);

//testing remove equipped item -- works!
//removeItemFromCharacterEquippedInventory(4);

//default viewmod
setCharacterInventoryViewMode("3x");

//constructCharacterEquippedItem(2, 0, 2, "itemname", "itemdesc", "itemdesclong", 50, true)
/*
for (i = 0; i <= 32; i++) {
constructCharacterInventoryItem(0, 0, 'Sprunk Can 5', 'The essence of life!', 'this is fucking a test', '50', true, true, false, true);
}*/
/* this needs to be uncommented, just for offline testing. UNCOMMENT FOR LIVE */

/*
document.getElementById("charinvennearbypane").style.visibility = 'hidden'; //character inventory and nearby items.
document.getElementById("charequipane").style.visibility = 'hidden'; //default hide.
document.getElementById("interactionpane").style.visibility = 'hidden'; //default hide.
*/

document.getElementById("body").style.visibility = 'hidden'; //default hidden.

function toggleInventoryFullView() {
    const body = document.getElementById("body").style.visibility;
    if(body == 'hidden') {
        document.getElementById("body").style.visibility = 'visible';
    }
    else if(body == 'visible') {
        document.getElementById("body").style.visibility = 'hidden';
    }
}

function togglepaneview(pane) {
    if(pane == 'charinvennearbypane') { //i
        let elem = document.getElementById("charinvennearbypane");
        let elem2 = document.getElementById("interactionpane");
        let current = elem.style.visibility;
        let current2 = elem2.style.visibility;
        if(current == 'hidden') {
            elem.style.visibility = 'visible';
        } else { elem.style.visibility = 'hidden'; }
        if(current2 == 'hidden') {
            elem2.style.visibility = 'visible';
        } else { elem2.style.visibility = 'hidden'; }
    }
    else if(pane == 'charequipane') { //c
        let elem = document.getElementById("charequipane");
        let current = elem.style.visibility;
        if(current == 'hidden') {
            elem.style.visibility = 'visible';
        } else { elem.style.visibility = 'hidden'; }
    }
}

function updateInvDurability(invenid, newdura, duraintcur, duraintmax, duraintnew) {
    //ID - invitemdura_invenid - progress bar, change width.
    let elem = document.getElementById('invitemduras_'+invenid); //actual progressbar
    elem.style.width = newdura+'%';

    let elem2 = document.getElementById('invitemdura_'+invenid); //progress div container
    elem2.style.opacity = "1.0";

    //update tooltip somehow.
    let tooltiptext = tooltipstrings_inventory[invenid];
    let newtooltiptext = tooltiptext.replace(duraintcur+'/'+duraintmax, duraintnew+'/'+duraintmax);
    tooltipstrings_inventory[invenid] = newtooltiptext;

    console.log(invenid + "-" + newdura + "%");
}

function updateInventoryLisaValue(lisaid, value) {
    let elem = document.getElementById(lisaid);
    elem.innerHTML = value;
}

if('alt' in window) {
    alt.on('togglepane', togglepaneview);
    alt.on('toggleInventoryFullView', toggleInventoryFullView);

    alt.on('clearCharacterInventory', clearCharacterInventory); //clears characters inventory (just visually obviously, used for example if /reloadinventory if ever needed...)
    alt.on('constructCharacterInventoryItem', constructCharacterInventoryItem); //push item to character inventory
    
    //invenid
    alt.on('removeItemFromCharacterInventory', removeItemFromCharacterInventory); //remove item from character inventory
    //invenid, itemid, slot, itemname, itemdesc, itemdesclong, durability, unequip
    alt.on('constructCharacterEquippedItem', constructCharacterEquippedItem); //push characters equipped items.
    //invenid
    alt.on('removeItemFromCharacterEquippedInventory', removeItemFromCharacterEquippedInventory); //remove item from character equipped inventory.

    alt.on('updateInvDurability', updateInvDurability);
    alt.on('updateInventoryLisaValue', updateInventoryLisaValue);

    alt.on('constructDroppedItem', constructDroppedItem);
    alt.on('removeItemFromNearbyItems', removeItemFromNearbyItems);
}