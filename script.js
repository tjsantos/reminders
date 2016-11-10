let minutes = document.querySelector('#minutes');
minutes.value = 10;
let reminderButton = document.querySelector('#reminderButton');
let active = false;

function activate() {
  active = true;
  reminderButton.innerText = 'pause';
}
function deactivate() {
  active = false;
  reminderButton.innerText = 'start';
}
function toggleActive() {
  active ? deactivate() : activate();
}
reminderButton.addEventListener('click', toggleActive);