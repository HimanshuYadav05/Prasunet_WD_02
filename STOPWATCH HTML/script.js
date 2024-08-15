let startTime, updateTime, elapsedTime = 0, isRunning = false, laps = [];
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        pause();
    } else {
        start();
    }
});

resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function start() {
    startTime = Date.now() - elapsedTime;
    updateTime = setInterval(updateDisplay, 10);
    startStopBtn.textContent = 'Pause';
    isRunning = true;
}

function pause() {
    clearInterval(updateTime);
    elapsedTime = Date.now() - startTime;
    startStopBtn.textContent = 'Start';
    isRunning = false;
}

function reset() {
    clearInterval(updateTime);
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    startStopBtn.textContent = 'Start';
    laps = [];
    updateLaps();
    isRunning = false;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    let time = new Date(elapsedTime);
    let minutes = time.getUTCMinutes().toString().padStart(2, '0');
    let seconds = time.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = time.getUTCMilliseconds().toString().padStart(3, '0').slice(0, 2);
    display.textContent = `${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (isRunning) {
        laps.push(display.textContent);
        updateLaps();
    }
}

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(lapItem);
    });
}
