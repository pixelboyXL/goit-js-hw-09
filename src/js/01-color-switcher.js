// Напиши скрипт, який після натискання кнопки «Start»,
// раз на секунду змінює колір фону < body > на випадкове значення, використовуючи інлайн стиль.
// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
    
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).

const body = document.querySelector("body");
const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");

startBtn.addEventListener("click", onChangeColorStart);
stopBtn.addEventListener("click", onChangeColorStop);

function onChangeColorStart() {
    stopBtn.removeAttribute("disabled");
    startBtn.setAttribute("disabled", "disabled");
    body.style.backgroundColor = getRandomHexColor();
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

function onChangeColorStop() {
    startBtn.removeAttribute("disabled");
    stopBtn.setAttribute("disabled", "disabled");
    clearInterval(intervalId);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
