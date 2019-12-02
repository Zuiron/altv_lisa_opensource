function updatenameplate(style_l, style_t, bol, scale) {
    if(bol) {
        //console.log("got update!");
        const plate = document.getElementById("renderthis");
        plate.style.visibility = "visible";
        const coordtext = document.getElementById("coordinates");
        plate.style.left = style_l + "px";
        plate.style.top = style_t + "px";
        coordtext.innerHTML = `left: ${style_l} <br>top: ${style_t}`;
        //console.log("update done...");
        //console.log("left is now: " + plate.style.left + ", top is now: " + plate.style.top);
        plate.style.scale = scale;
    }
    else {
        const plate = document.getElementById("renderthis");
        const vis = plate.style.visibility;
        if(vis == "visible") {
            plate.style.visibility = "hidden";
        }
    }
}

if('alt' in window) {
    alt.on('updatenameplate', updatenameplate);
}