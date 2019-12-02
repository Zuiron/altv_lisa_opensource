/* app */
var progressTimeout = false;

function clearPage(fast) {
    clearTimeout(progressTimeout);
    
    if(fast) {
        document.getElementById('body').innerHTML = '';
    } else {
        setTimeout(() => {
            document.getElementById('body').innerHTML = '';
        }, 500);
    }
}

function construct(text, itemid, ms, animclass) {
    var elem = document.getElementById('body');
    let seconds = Math.floor((ms/1000) % 60);

    let icon = '';
    if(itemid != null) {
        icon = `
    <div class="progress-icon"><img src="http://assets/lisa-assets/assets/icons/${itemid}.png" height="40px" onerror="this.src='http://assets/lisa-assets/assets/icons/${itemid}.png';"></div>
    `;
    }

    let html = `
    <div id="leprugress" class="progress-bar">
        <div class="progress-text">${text}</div>
        ${icon}
        <span class="bar">
            <span id="progressbar" class="progress ${animclass}"></span>
        </span>
    </div>
    `;
    elem.innerHTML = html;

    document.getElementById('progressbar').style.animationDuration = seconds+'s';

    progressTimeout = setTimeout(() => {
        document.getElementById('leprugress').style.opacity = 0.0;
        clearPage();
    }, ms);
}

//construct('Repairing engine...', '20', 10000, 'anim-ldsmooth');
//construct('Please wait.', '13', 3000, 'anim-cdsmooth');
//construct('Please wait.', null, 99999999999, 'anim-cdsmooth');

if('alt' in window) {
    alt.on('progress:new', construct);
    alt.on('progress:clear', clearPage);
}