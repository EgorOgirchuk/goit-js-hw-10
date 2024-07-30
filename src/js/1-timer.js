import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

let userSelectetdDate = null;
let currentDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    document.querySelector('[data-start]').disabled = false;

    currentDate = new Date();
    console.log(selectedDates[0]);
    userSelectetdDate = new Date(selectedDates[0]);
    console.log(userSelectetdDate);
    if (userSelectetdDate.getTime() < currentDate.getTime()) {
      // window.alert('Please choose a date in the future');
      iziToast.error({
        title: 'Hey',
        message: 'Please choose a date in the future',
        position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      });
      document.querySelector('[data-start]').disabled = true;
      return;
    }
  },
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr('#datetime-picker', options);

const buttonStart = document.querySelector('[data-start]');
buttonStart.addEventListener('click', () => {
  let intervalId = setInterval(() => {
    const diff = userSelectetdDate.getTime() - new Date().getTime();
    console.log(diff);
    if (diff <= 0) {
      clearInterval(intervalId);
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
  document.querySelector('[data-start]').disabled = true;
});

function addLeadingZero(num) {
  num = num.toString();
  while (num.length < 2) num = '0' + num;
  return num;
}
