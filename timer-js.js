let timers = [];
let timerIdCounter = 0;

function addCountdown() {
    const input = document.getElementById("datetime-picker");
    const datetime = input.value;
    if (!datetime) {
        alert("Please select a valid date and time.");
        return;
    }

    const targetDate = new Date(datetime);
    const now = new Date();
    if (targetDate <= now) {
        alert("Please select a future time.");
        return;
    }

    const timerId = timerIdCounter++;
    const container = document.getElementById("timers-container");

    const box = document.createElement("div");
    box.className = "timer-box";
    box.id = `timer-${timerId}`;

    const timeDisplay = document.createElement("div");
    timeDisplay.className = "timer-time";

    const controls = document.createElement("div");
    controls.className = "timer-controls";

    const pauseBtn = document.createElement("button");
    pauseBtn.textContent = "Pause";
    pauseBtn.onclick = () => togglePause(timerId);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.onclick = () => deleteTimer(timerId);

    controls.appendChild(pauseBtn);
    controls.appendChild(deleteBtn);
    box.appendChild(timeDisplay);
    box.appendChild(controls);
    container.appendChild(box);

    const intervalId = setInterval(() => {
        updateTimer(timerId);
    }, 1000);

    timers.push({
        id: timerId,
        targetDate,
        paused: false,
        element: timeDisplay,
        intervalId,
        pauseBtn,
    });

    updateTimer(timerId);
}

function updateTimer(id) {
    const timer = timers.find(t => t.id === id);
    if (!timer || timer.paused) return;

    const now = new Date();
    const diff = timer.targetDate - now;

    if (diff <= 0) {
        timer.element.textContent = "Time's up!";
        clearInterval(timer.intervalId);
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timer.element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function togglePause(id) {
    const timer = timers.find(t => t.id === id);
    if (!timer) return;

    timer.paused = !timer.paused;
    timer.pauseBtn.textContent = timer.paused ? "Resume" : "Pause";
}

function deleteTimer(id) {
    const timer = timers.find(t => t.id === id);
    if (!timer) return;

    clearInterval(timer.intervalId);
    const box = document.getElementById(`timer-${id}`);
    if (box) box.remove();

    timers = timers.filter(t => t.id !== id);
}
