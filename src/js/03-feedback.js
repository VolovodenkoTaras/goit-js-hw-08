import throttle from 'lodash.throttle';
import { save, load } from "./storage.js"

const formEl = document.querySelector('.feedback-form');
const { email, message } = formEl.elements;
const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(onInputToLocalStorage, 500));
formEl.addEventListener('submit', onSubmit);

const formData = {};

updateFormData();

function onInputToLocalStorage(e) {
    formData[e.target.name] = e.target.value
    save(STORAGE_KEY, formData)
}

function onSubmit(e) {
    e.preventDefault();
    if (email.value && message.value) {
        console.log(formData);
        localStorage.removeItem(STORAGE_KEY);
        e.currentTarget.reset();
    } else {
        alert("Please fill out all form fields before submitting!")
    }


}

function updateFormData() {

    let userFeedback = load(STORAGE_KEY);

    if (userFeedback) {
        const formData = userFeedback;
        email.value = formData.email || '';
        message.value = formData.message || '';
    }
}
