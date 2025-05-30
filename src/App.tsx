import { useState, useEffect } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5 * 60);
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [breakOn, setBreakOn] = useState(false);

  const reset = () => {
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    setTimeLeft(25 * 60);
    setTimerOn(false);
    setBreakOn(false);
    pauseSound();
  };

  const startStop = () => {
    if (timerOn) {
      setTimerOn(false);
    } else if (!breakOn) {
      setTimerOn(true);
    } else if (breakOn) {
      setBreakOn(false);
    } else if (!timerOn) {
      setBreakOn(true);
    }
  };

  const countDown = () => {
    setTimeLeft((timeLeft) => timeLeft - 1);
  };

  const playSound = () => {
    const audioElement = document.getElementById(
      "beep"
    ) as HTMLAudioElement;
    audioElement.play();
  };

  const pauseSound = () => {
    const audioElement = document.getElementById(
      "beep"
    ) as HTMLAudioElement;
    audioElement.pause();
    audioElement.load();
  };

  useEffect(() => {
    if (!timerOn && !breakOn) return;
    if (timeLeft === 0) {
      playSound();
    }
    const interval = setInterval(() => {
      if (timeLeft === 0) {
        if (timerOn) {
          setBreakOn(true);
          setTimeLeft(breakLength);
          setTimerOn(false);
        } else if (breakOn) {
          setTimerOn(true);
          setTimeLeft(sessionLength);
          setBreakOn(false);
        }
      } else if (timeLeft > 0) {
        countDown();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timerOn, timeLeft, breakLength, breakOn, sessionLength]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);
  const timeString =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1>25+5 Clock</h1>
      <div>
        <h2 id="break-label">Break length</h2>
        <p id="break-length">{breakLength / 60}</p>
        <button
          id="break-decrement"
          onClick={() => {
            if (breakLength > 60) {
              setBreakLength(breakLength - 60);
            }
          }}
        >
          -
        </button>
        <button
          id="break-increment"
          onClick={() => {
            if (breakLength < 3600) {
              setBreakLength(breakLength + 60);
            }
          }}
        >
          +
        </button>
      </div>
      <div>
        <h2 id="session-label">Session length</h2>
        <p id="session-length">{sessionLength / 60}</p>
        <button
          id="session-decrement"
          onClick={() => {
            if (sessionLength > 60) {
              setSessionLength(sessionLength - 60);
              setTimeLeft(timeLeft - 60);
            }
          }}
        >
          -
        </button>
        <button
          id="session-increment"
          onClick={() => {
            if (sessionLength < 3600) {
              setSessionLength(sessionLength + 60);
              setTimeLeft(timeLeft + 60);
            }
          }}
        >
          +
        </button>
      </div>
      <div>
        <h2 id="timer-label">
          Session
          {timerOn && <span>Timer</span>}
          {breakOn && <span>Break started</span>}
        </h2>
        <p id="time-left">{timeString}</p>
        <button id="start_stop" onClick={startStop}>
          START/STOP
        </button>
        <button id="reset" onClick={reset}>
          RESET
        </button>
      </div>
      <audio id="beep" hidden>
        <source src="beep.mp3" type="audio/mpeg"></source>
      </audio>
    </div>
  );
}
export default App;
