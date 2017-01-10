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

const date = document.querySelector(`#date`);
const time = document.querySelector(`#time`);

function tick() {
  const now = new Date();
  date.datetime = now.toISOString();
  date.textContent = now.toDateString();
  time.textContent = now.toLocaleTimeString();
  time.datetime = now.toISOString();
}
setInterval(tick, 1000);

class Reminder {
  constructor (text, time, recurring) {
    this.text = text;
    this.time = time;
    this.recurring = recurring;
  }
}