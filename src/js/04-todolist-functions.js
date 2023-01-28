import { save, load } from "./storage.js";

const STORAGE_KEY = "tasks";
let currentId = 0;

const myInput = document.getElementById("myInput");

/*
Функция заполняет список задач
загружаем в переменную currentState текущее состояние локалсторадж (массив)
 если массив непустой то перебираем его методом forEach и на каждой итерации создаем li и добавляем её в DOM
Обновляем переменную currentId в глобальной области видимости по тернарнику - 
 если массив непустой то обращаемся к id последнего элемента массива и добавляем к нему 1
 если пустой то присваиваем 0
*/
function fillTasksList() {
    const currentState = load(STORAGE_KEY);
    if (currentState) {
        currentState.forEach(({ text, isDone, id }) => createLI(text, isDone, id));

        currentId =
            currentState.length
                ? currentState[currentState.length - 1].id + 1
                : 0;
    }
}

/*
Функция добавляет таску в DOM из инпута
загружаем в переменную inputValue результат инпута 
---Метод trim() удаляет пробельные символы с начала и конца строки
  Если инпут пуст то выдаем алерт alert("You must write something!") и выходим из функции
добавляем li из инпута, очищаем инпут 
добавляет задачу в локалсторадж addTaskToStorage(inputValue)
*/
function addNewTask() {
    const inputValue = myInput.value.trim();
    if (!inputValue) {
        alert("You must write something!");
        return;
    }
    createLI(inputValue);
    myInput.value = "";
    addTaskToStorage(inputValue);
}

/*
Функция создаёт li и добавляет её в DOM
---createElement(tag) – создаёт элемент с заданным тегом, document
---createTextNode() позволяет создать и вернуть текстовый узел с указанным текстом.
---Свойство dataset позволяет считывать или устанавливать любые дата-атрибуты на HTML-элементе.
---Дата-атрибут — это пользовательский атрибут на элементе, название которого начинается с data-
---В свойстве classList хранится объект с методами для работы с классами элемента.
---elem.classList.add(cls) - добавляет класс cls в список классов элемента.
---appendChild() добавляет узел в конец списка дочерних элементов указанного родительского узла
 */
function createLI(text, isDone = false, id = currentId) {
    const liEL = document.createElement("LI");
    const liText = document.createTextNode(text);
    liEL.appendChild(liText);
    liEL.dataset.id = id;
    if (isDone) liEL.classList.add("checked");
    myUL.appendChild(liEL);

    addCross(liEL);
}

/*
Функция описывает поведение таски при кликах на саму таску и на крестик
принимает event и деструктуризирует из него { target }
---event.target - это ссылка на исходный элемент на котором произошло событие, в процессе всплытия он неизменен.
загружаем в переменную currentState текущее состояние локалсторадж (массив)
загружаем в переменную taskIndex результат выполения метода findIndex на массиве currentState (id текущей таски)
---Свойство tagName объекта Element возвращает имя тега элемента, на котором он вызывается
  Если это "LI" то тогглим класс "checked" на текущей таске и меняем буль в isDone на противоположное значение
  Иначе если текущий элемент содержит класс "close" то 1) удаляем li из DOM 2)удаляем элемент из массива currentState
Записываем в локалсторадж массив currentState
---В свойстве classList хранится объект с методами для работы с классами элемента.
---classList – объект с методами add/remove/toggle/contains , удобно для управления отдельными классами
---elem.classList.contains(cls) - возвращает true или false в зависимости от того, есть ли у элемента класс cls.
---elem.classList.toggle("class") – добавить класс, если его нет, иначе удалить
---Свойство parentNode возвращает узел, который является родителем данного узла
---Метод Element.remove() удаляет элемент из DOM-дерева, в котором он находится
*/
function handleTaskBehaviour({ target }) {
    const currentState = load(STORAGE_KEY);
    const taskIndex = currentState.findIndex(task => Number(task.id) === Number(target.dataset.id));

    if (target.tagName === "LI") {
        target.classList.toggle("checked");
        currentState[taskIndex].isDone = !currentState[taskIndex].isDone;
    } else if (target.classList.contains("close")) {
        target.parentNode.remove();
        currentState.splice(taskIndex, 1);
    }
    save(STORAGE_KEY, currentState);
}

/*
---event.target - это ссылка на исходный элемент на котором произошло событие, в процессе всплытия он неизменен.
---createElement(tag) – создаёт элемент с заданным тегом
---createTextNode() позволяет создать и вернуть текстовый узел с указанным текстом.
---className – строковое значение, удобно для управления всем набором классов.
---classList – объект с методами add/remove/toggle/contains , удобно для управления отдельными классами
---appendChild() добавляет узел в конец списка дочерних элементов указанного родительского узла
 */
function addCross(target) {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    target.appendChild(span);
}

/*
Функция возвращает обьект со свойствами text,isDone,id
 */
function createTaskObject(text, isDone) {
    return {
        text,
        isDone,
        id: currentId,
    };
}

/*
Функция добавляет задачу в локалсторадж
загружает в переменную currentState текущее состояние локалсторадж
Если в локалсторадж ничего нет то добавляет запись по ключу STORAGE_KEY, создавая пустой массив 
 и добавляя в него результат вызова функции createTaskObject(text, isDone)
Если есть то пушит в массив currentState результат вызова функции createTaskObject(text, isDone)
Увеличивает на 1 переменную currentId в глобальной области видимости
 */
function addTaskToStorage(text, isDone = false) {
    const currentState = load(STORAGE_KEY);
    if (!currentState) {
        save(STORAGE_KEY, [createTaskObject(text, isDone)]);
    } else {
        currentState.push(createTaskObject(text, isDone));
        save(STORAGE_KEY, currentState);
    }
    currentId += 1;
}

export { addNewTask, handleTaskBehaviour, fillTasksList };
