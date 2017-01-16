// local settings: notify permission, reminders

const notify = document.querySelector(`#notifyCheckbox`);
notify.checked = (Notification.permission === `granted`);
notify.addEventListener(`input`, (event) => {
    if (notify.checked) {
        // only set checked if permission is granted
        notify.checked = false;
        Notification.requestPermission()
            .then((result) => {
                notify.checked = (result === `granted`);
            });
    }
});

class Reminder {
    constructor (title, time, recurring = 0) {
        this.id = Date.now();
        this.title = title;
        this.time = time;
        this.recurring = recurring;  // 0 if one-time event
    }
}

// set a reminder for every 20 minutes
const twentyMinutes = 20 * 60 * 1000;
let now = Date.now();
let nextTwenty = now - (now % twentyMinutes) + twentyMinutes;
const twentyReminder = new Reminder(`20/20/20`, nextTwenty, twentyMinutes);

// get items from local storage and associate with html elements
let reminders = [twentyReminder];
let fragment = document.createDocumentFragment();
for (let reminder of reminders) {
    let block = document.createElement(`div`);
    block.classList.add(`reminder`);
    block.dataset.id = reminder.id;
    for (let name of [`title`, `time`, `remaining`, `recurring`]) {
        let el = document.createElement(`div`);
        el.classList.add(`reminder__${name}`);
        block.appendChild(el);
    }
    fragment.appendChild(block);
}
const container = document.querySelector(`#reminders`);
container.innerHTML = ``;
container.appendChild(fragment);


function render() {
    renderClock();
    renderReminders();
}
function renderClock() {
    const date = document.querySelector(`#date`);
    const time = document.querySelector(`#time`);
    const now = new Date();
    date.datetime = now.toISOString();
    date.textContent = now.toDateString();
    time.textContent = now.toLocaleTimeString();
    time.datetime = now.toISOString();
}

function renderReminders() {
    document.querySelectorAll(`#reminders .reminder`)
        .forEach((el) => {
            let rem = reminders.find((r) => r.id === +el.dataset.id);
            el.querySelector(`.reminder__title`)
                .textContent = rem.title;
            el.querySelector(`.reminder__time`)
                .textContent = new Date(rem.time).toLocaleTimeString();
            let seconds = Math.round(((rem.time - Date.now()) / 1000));
            el.querySelector(`.reminder__remaining`)
                .textContent = `${seconds} s`;
            el.querySelector(`.reminder__recurring`)
                .textContent = `every ${Math.round(rem.recurring / 60000)} minutes`;
        })
}
setInterval(render, 1000);