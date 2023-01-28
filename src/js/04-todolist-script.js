import { addNewTask, handleTaskBehaviour, fillTasksList } from "./04-todolist-functions.js";

const addBtn = document.getElementById("addBtn");
const myUL = document.getElementById("myUL");

addBtn.addEventListener("click", addNewTask);
myUL.addEventListener("click", handleTaskBehaviour);
window.addEventListener("DOMContentLoaded", fillTasksList)

// Событие DOMContentLoaded происходит когда весь HTML был полностью загружен и пройден парсером,
// не дожидаясь окончания загрузки таблиц стилей, изображений и фреймов.
// Значительно отличающееся от него событие load(en - US) используется для отслеживания только полностью загруженной страницы.