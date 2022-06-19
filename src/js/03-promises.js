// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) 
// стільки разів, скільки ввели в поле amount.Під час кожного виклику передай їй номер промісу(position), 
// що створюється, і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).

// Доповни код функції createPromise таким чином, щоб вона повертала один проміс, 
// який виконується або відхиляється через delay часу.
// Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay 
// зі значеннями однойменних параметрів.
// Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.

import Notiflix from 'notiflix';

const form = document.querySelector(".form")
const { elements: { delay, step, amount } } = form;

form.addEventListener("submit", onSubmitForm);
  
function makePromise(index, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({index, delay})
      } else {
        reject({index, delay})
      }
    }, delay);
  });
}

function onSubmitForm(event) {
  event.preventDefault()
  let delayTime = Number(delay.value)
  for (let i = 1; i <= amount.value; i++) {
    makePromise(i, delayTime)
      .then(({ index, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${index} in ${delay}ms`);
      })
      .catch(({ index, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${index} in ${delay}ms`);
      });
      delayTime += Number(step.value);
  };
};