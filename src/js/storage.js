export function save(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Set state error: ", error.message);
    }
};

export function load(key) {
    try {
        return (!localStorage.getItem(key))
            ? ""
            : JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
};

export default {
    save,
    load,
};