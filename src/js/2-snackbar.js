import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', e => {
  e.preventDefault();
  let states = document.querySelectorAll('input[name=state]');

  const delay = document.querySelector('input[name=delay]').value;
  let isSuccess = false;
  states.forEach(item => {
    if (item.checked && item.value == 'fulfilled') {
      isSuccess = true;
    }
  });

  console.log(isSuccess);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  // Registering promise callbacks
  promise.then(
    value =>
      iziToast.success({
        message: value,
        position: 'topRight',
      }),
    error =>
      iziToast.error({
        message: error,
        position: 'topRight',
      })
  );
});
