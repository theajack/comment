let _showTip = null;

export function injectShowTip (fn) {
    _showTip = fn;
}

export function showTip (text, time) {
    if (!_showTip) {return;}
    _showTip({text, time, type: 'info'});
}

export function showErrorTip (text, time) {
    if (!_showTip) {return;}
    _showTip({text, time, type: 'error'});
}

export function showSuccessTip (text, time) {
    if (!_showTip) {return;}
    _showTip({text, time, type: 'success'});
}
export function showWarningTip (text, time) {
    if (!_showTip) {return;}
    _showTip({text, time, type: 'warning'});
}