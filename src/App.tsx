import { useState, useEffect } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60 * 1000);
  const [intervalID, setIntervalID] = useState(null);

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25);
  };

  const countdown = () => setTimeLeft((timeLeft) => timeLeft - 1000);

  const startStop = () => {
    if (intervalID === null) {
      setIntervalID(setInterval(countdown, 1000));
    } else {
      clearInterval(intervalID);
      setIntervalID(null);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1>25+5 Clock</h1>
      <div>
        <h2 id="break-label">Break length</h2>
        <p id="break-length">{breakLength}</p>
        <button
          id="break-decrement"
          onClick={() => {
            if (breakLength > 0) {
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
            if (sessionLength > 0) {
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
        <h2 id="timer-label">Session</h2>
        <p id="time-left">
          {new Intl.DateTimeFormat("en-GB", {
            minute: "numeric",
            second: "numeric",
          }).format(timeLeft * 60 * 1000)}
        </p>
        <button id="start_stop" onClick={startStop}>
          []
        </button>
        <button id="reset" onClick={reset}>
          X
        </button>
      </div>
    </div>
  );
}
export default App;
