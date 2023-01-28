// Задание 3 - форма обратной связи
// В HTML есть разметка формы.Напиши скрипт который будет сохранять значения полей в локальное хранилище
//  когда пользователь что - то печатает.

// < form class="feedback-form" autocomplete = "off" >
//   <label>
//     Email
//     <input type="email" name="email" autofocus />
//   </label>
//   <label>
//     Message
//     <textarea name="message" rows="8"></textarea>
//   </label>
//   <button type="submit">Submit</button>
// </ >

//     Выполняй это задание в файлах 03 - feedback.html и 03 - feedback.js.Разбей его на несколько подзадач:

// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message,
// в которых сохраняй текущие значения полей формы.Пусть ключом для хранилища будет строка "feedback-form-state".
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные,
//  заполняй ими поля формы.В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд.
// Для этого добавь в проект и используй библиотеку lodash.throttle.

import throttle from 'lodash.throttle';
import { save, load } from "./storage.js"

const formEl = document.querySelector('.feedback-form');

//Свойство elements DOM-элемента формы содержит обьект со ссылками на все её элементы у которых есть атрибут name
const { email, message } = formEl.elements;

const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(onInputToLocalStorage, 500));
formEl.addEventListener('submit', onSubmit);

let formData = {};

updateFormData();

function onInputToLocalStorage(e) {
    //В обьект formData в квадратных скобках передаю название атрибута name , на котором произошло событие
    //и присваиваю ему значение value. При этом в обьекте создается пара ключ:значение (или изменяется если уже есть ключ)
    formData[e.target.name] = e.target.value
    save(STORAGE_KEY, formData)
}

function onSubmit(e) {
    e.preventDefault();                       //Сабмит формы перезагружает страницу, поэтому отменяем действие по умолчанию методом preventDefault()
    if (email.value && message.value) {
        console.log(formData);
        localStorage.removeItem(STORAGE_KEY); //Метод removeItem(key) удаляет из хранилища уже существующую запись с ключом key.
        e.currentTarget.reset();              //Метод HTMLFormElement.reset() восстанавливает стандартные значения всем элементам формы.
        formData = {};
    } else {
        alert("Please fill out all form fields before submitting!")
    }
}

function updateFormData() {
    let userFeedback = load(STORAGE_KEY);
    if (userFeedback) {
        formData = userFeedback;
        email.value = formData.email || '';
        message.value = formData.message || '';
    }
}
