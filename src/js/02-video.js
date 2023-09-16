import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const PLAYER_LS_KEY = "videoplayer-current-time";
let savedTime = localStorage.getItem(PLAYER_LS_KEY) ?? 0;

const onPlay = function (data) {
    // console.log(data.seconds);
    localStorage.setItem(PLAYER_LS_KEY, JSON.stringify(data.seconds));
};

player.on('timeupdate', throttle(onPlay,1000));
player.setCurrentTime(savedTime);