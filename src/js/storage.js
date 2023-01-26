// Сервис для localStorage
// Для того чтобы сократить количество повторяющегося кода при работе с веб - хранилищем,
// можно написать сервис с стандартными методами, например save и load.
// Они будут абстрагировать повторяющийся код проверки ошибок парса и тому подобную рутину.

/*
localStorage.setItem(key, value) - делает новую, или обновляет уже существующую запись в хранилище.
JSON.stringify(value) - Принимает значение и преобразовывает его в JSON (строку). Значением может быть число, буль, null, массив или обьект
 */
function save(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Set state error: ", error.name, error.message);
    }
};


/*
Метод localStorage.getItem(key) позволяет прочитать из хранилища запись с ключом key. Если в хранилище нет записи с таким ключом, метод возвращает null
JSON.parse() -получает (парсит) из JSON валидное JavaScript значение. Это операция обратная преобразованию в строку (stringify)
 */
function load(key) {
    try {
        return (!localStorage.getItem(key))
            ? ""
            : JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.error("Get state error: ", error.name, error.message);
    }
};

export {
    save,
    load,
};