import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load } from "./storage.js"

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENT_TIME = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
    save(CURRENT_TIME, data.seconds)
}

let seconds = load(CURRENT_TIME)
if (seconds) {
    player.setCurrentTime(seconds);
}
