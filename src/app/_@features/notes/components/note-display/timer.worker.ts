/// <reference lib="webworker" />

let timerInterval: string | number | NodeJS.Timeout | undefined;

addEventListener('message', ({ data }) => {
  if (data.action === 'start') {
    startTimer(data.countdownMilliseconds);
  } else if (data.action === 'stop') {
    stopTimer();
  }
});

function startTimer(countdownMilliseconds: number) {
  timerInterval = setInterval(() => {
    countdownMilliseconds -= 1000;
    if (countdownMilliseconds < 0) {
      postMessage({ action: 'finished' });
      clearInterval(timerInterval);
    } else {
      postMessage({ action: 'tick', countdownMilliseconds });
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}
