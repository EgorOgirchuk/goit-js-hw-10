import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');

const button = document.querySelector('[data-start]');
button.disabled = true;

flatpickr('#datetime-picker', options);

let userSelectetdDate = null;
let currentDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    button.disabled = false;

    currentDate = new Date();

    userSelectetdDate = new Date(selectedDates[0]);

    if (userSelectetdDate.getTime() < currentDate.getTime()) {
      iziToast.error({
        title: 'Hey',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      button.disabled = true;
      return;
    }
  },
};

button.addEventListener('click', () => {
  let intervalId = setInterval(() => {
    const diff = userSelectetdDate.getTime() - new Date().getTime();
    input.disabled = true;

    if (diff <= 0) {
      clearInterval(intervalId);
      input.disabled = false;
      button.disabled = true;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(diff);

    document.querySelector('[data-days]').innerHTML = addLeadingZero(days);
    document.querySelector('[data-hours]').innerHTML = addLeadingZero(hours);
    document.querySelector('[data-minutes]').innerHTML =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').innerHTML =
      addLeadingZero(seconds);
  }, 1000);
  button.disabled = true;
});

const addLeadingZero = num => num.toString().padStart(2, '0');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
