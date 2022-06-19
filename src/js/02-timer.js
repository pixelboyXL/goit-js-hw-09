// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.

// Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу.

// Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів.

// Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr. 
// Саме у ньому варто обробляти дату, обрану користувачем. Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент.
// Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
// Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
// Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.

// Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.
// Кількість днів може складатися з більше, ніж двох цифр.
// Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто 00:00:00:00.

// Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати.
// Зверни увагу, що вона не форматує результат.
// Тобто, якщо залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне 4, а не 04.
// В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів.
// Напиши функцію addLeadingZero(value), яка використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

let selectedTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      startBtn.setAttribute("disabled", "disabled");
      Notiflix.Notify.failure('Please choose a date in the future')
    } else {
      startBtn.removeAttribute("disabled")
      Notiflix.Notify.info('Your can run your timer');
      selectedTime = selectedDates[0];
    }
  },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", startTimer);

let intervalId = null;
function startTimer() {
  Notiflix.Notify.success('Your timer is running');
  Notiflix.Loading.pulse('In progress', {
    backgroundColor: 'transparent',
    cssAnimationDuration: 1000
  });
  startBtn.setAttribute("disabled", "disabled");
  let differenceTime = selectedTime - Date.now();
  intervalId = setInterval(() => {
    differenceTime -= 1000;
    if (differenceTime < 0) {
      clearInterval(intervalId);
      Notiflix.Loading.remove(1000)
      return;
    }
    const convertedTime = convertMs(differenceTime);
    dataDays.textContent = convertedTime.days
    dataHours.textContent = convertedTime.hours;
    dataMinutes.textContent = convertedTime.minutes;
    dataSeconds.textContent = convertedTime.seconds;
  }, 1000)
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

