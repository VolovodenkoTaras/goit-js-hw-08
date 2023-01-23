import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENT_TIME = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

function save(key, value) {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.error("Set state error: ", error.message);
    }
};

function load(key) {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
};

function onPlay(data) {
    save(CURRENT_TIME, data.seconds)
}

player.setCurrentTime(load(CURRENT_TIME));


export default {
    save,
    load,
};