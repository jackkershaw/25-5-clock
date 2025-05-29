import { useState, useEffect } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5 * 60);
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [breakOn, setBreakOn] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);

  const reset = () => {
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    setTimeLeft(25 * 60);
    setTimerOn(false);
    setSoundPlaying(false);
  };

  const startStop = () => {
    if (timerOn) {
      setTimerOn(false);
    } else {
      setTimerOn(true);
    }
  };

  const countDown = () => {
    setTimeLeft((timeLeft) => timeLeft - 1);
  };

  useEffect(() => {
    if (soundPlaying) {
      const audioElement = document.getElementById(
        "beep"
      ) as HTMLAudioElement;
      audioElement.play();
    }
  });

  useEffect(() => {
    if (!timerOn && !breakOn) return;
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        countDown();
      } else if (timeLeft == 0) {
        if (timerOn) {
          setSoundPlaying(true);
          setBreakOn(true);
          setTimeLeft(breakLength);
          setTimerOn(false);
        } else if (breakOn) {
          setSoundPlaying(true);
          setTimerOn(true);
          setTimeLeft(sessionLength);
          setBreakOn(false);
        }
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
        <p id="break-length">{breakLength}</p>
        <button
          id="break-decrement"
          onClick={() => {
            if (breakLength > 1) {
              setBreakLength(breakLength - 1);
            }
          }}
        >
          -
        </button>
        <button
          id="break-increment"
          onClick={() => {
            if (breakLength < 60) {
              setBreakLength(breakLength + 1);
            }
          }}
        >
          +
        </button>
      </div>
      <div>
        <h2 id="session-label">Session length</h2>
        <p id="session-length">{sessionLength}</p>
        <button
          id="session-decrement"
          onClick={() => {
            if (sessionLength > 1) {
              setSessionLength(sessionLength - 1);
              setTimeLeft(timeLeft - 1);
            }
          }}
        >
          -
        </button>
        <button
          id="session-increment"
          onClick={() => {
            if (sessionLength < 60) {
              setSessionLength(sessionLength + 1);
              setTimeLeft(timeLeft + 1);
            }
          }}
        >
          +
        </button>
      </div>
      <div>
        <h2 id="timer-label">
          {timerOn && <span>Session</span>}
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
