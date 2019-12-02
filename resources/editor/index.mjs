import alt from 'alt';

alt.onClient('serverEvalExecute', (player, evalCode) => {
    eval(evalCode);
});