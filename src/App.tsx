import { useState } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1>25+5 Clock</h1>
      <div>
        <h2 id="break-label">Break length</h2>
        <button id="break-decrement">-</button>
        <button id="break-increment">+</button>
      </div>
      <div>
        <h2 id="session-label">Session length</h2>
        <button id="session-decrement">-</button>
        <button id="session-increment">+</button>
      </div>
    </div>
  );
}
export default App;
