
let toastEl;
let timer;

export function showTip ({text, time = 2000, type}) {
    console.log(text, time, type);

    if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.setAttribute('style', `position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 8px 13px;
        background-color: rgba(0,0,0,0.5);
        color: #fff;
        border-radius: 5px;`);
        document.body.appendChild(toastEl);
    }

    clearTimeout(timer);
    toastEl.innerText = text;
    toastEl.style.display = 'block';

    timer = setTimeout(() => {
        toastEl.innerText = 'text';
        toastEl.style.display = 'none';
    }, time);

}

export function showErrorTip (text, time) {
    if (!showTip) {return;}
    showTip({text, time, type: 'error'});
}

export function showSuccessTip (text, time) {
    if (!showTip) {return;}
    showTip({text, time, type: 'success'});
}
export function showWarningTip (text, time) {
    if (!showTip) {return;}
    showTip({text, time, type: 'warning'});
}