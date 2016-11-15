let minutes = document.querySelector('#minutes');
let seconds = document.querySelector('#seconds');
let millis = document.querySelector('#millis');
minutes.value = 10;

let frameId = 0;
let endTime;

function render(timestamp) {
    "use strict";
    let timeLeft = endTime - Date.now();
    minutes.value = Math.floor(timeLeft / 60000);
    let millisLeft = timeLeft % 60000;
    seconds.value = Math.floor(millisLeft / 1000);
    millis.value = millisLeft % 1000;
    frameId = requestAnimationFrame(render);
}
function activate() {
    frameId = requestAnimationFrame(render);
    let minutesVal = parseInt(minutes.value, 10) || 0;
    let secondsVal = parseInt(seconds.value, 10) || 0;
    let millisVal = parseInt(millis.value, 10) || 0;
    console.log("started", minutesVal, secondsVal, millisVal);
    endTime = Date.now() + (minutesVal*60000 + secondsVal*1000 + millisVal);
    reminderButton.innerText = 'pause';
}
function deactivate() {
    console.log("paused", minutes.value, seconds.value, millis.value);
    cancelAnimationFrame(frameId);
    frameId = 0;
    reminderButton.innerText = 'start';
}
function toggleActive() {
    frameId ? deactivate() : activate();
}
let reminderButton = document.querySelector('#reminderButton');
reminderButton.addEventListener('click', toggleActive);