let maxim, media, play, bar, progress, mute, volume, loop;

function initiate() {
    maxim=400;
    mmedia=document.getElementById('media');
    play=document.getElementById('play');
    bar=document.getElementById('bar');
    progress=document.getElementById('progress');
    mute=document.getElementById('mute');
    volume=document.getElementById('volume');

play.addEventListener('click',push);
bar.addEventListener('click',move);
mute.addEventListener('click',sound);
volume.addEventListener('change',level);
}

addEventListener('load',initiate)

function push() {
    if (!mmedia.paused && !mmedia.ended) {
        mmedia.pause();
        play.value='Воспр.';
        clearInterval(loop);
    }
    else {
        mmedia.play();
        play.value = 'Пауза';
        loop=setInterval(status,1000);
    }
}

function status() {
    if (!mmedia.ended) {
        let size = parseInt(mmedia.currentTime * maxim / mmedia.duration);
        progress.style.width = size + 'px';
    }
    else {
        progress.style.width = '0px';
        play.value = 'Воспр.';
        clearInterval(loop);
    }
}

function move(e) {
    if (!mmedia.paused && !mmedia.ended) {
        let mouseX = e.pageX - bar.offsetLeft;
        let newtime = mouseX * mmedia.duration / maxim;

        mmedia.currentTime = newtime;
        progress.style.width = mouseX + 'px';
    }
}

function sound() {
    if(mute.value == 'Звук') {
        mmedia.muted = true;
        mute.value = 'Вкл';
    }
    else {
        mmedia.muted=false;
        mute.value = 'Звук';
    }
}

function level() {
    mmedia.volume = volume.value;
}