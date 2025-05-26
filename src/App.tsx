import { useState } from "react";

function App() {
  const [input, setInput] = useState("0");
  const [decimalCount, setDecimalCount] = useState("0");
  const [lastEquals, setLastEquals] = useState(false);

  const clearInput = () => {
    setInput("0");

    setLastEquals(false);
    setDecimalCount("0");
  };

  const addNumber = (number: string) => {
    if (lastEquals) {
      return;
    } else if (input === "0") {
      setInput(number);
    } else {
      setInput(input + number);
    }
  };

  const addDecimal = () => {
    if (decimalCount == "0") {
      if (lastEquals) {
        return;
      } else setInput(input + ".");
      setDecimalCount("1");
    } else {
      return;
    }
  };

  const addZero = () => {
    if (lastEquals) {
      return;
    } else if (input === "0") {
      return;
    } else {
      addNumber("0");
    }
  };

  const addOperator = (operator: string) => {
    if (lastEquals) {
      setInput(input + operator);
      setDecimalCount("0");
      setLastEquals(false);
    } else if (
      (input.endsWith("+") ||
        input.endsWith("*") ||
        input.endsWith("/")) &&
      operator == "-"
    ) {
      setInput(input + operator);
      setDecimalCount("0");
      setLastEquals(false);
    } else if (
      input.endsWith("*-") ||
      input.endsWith("/-") ||
      input.endsWith("+-")
    ) {
      setInput(input.slice(0, -2) + operator);
      setDecimalCount("0");
      setLastEquals(false);
    } else if (
      input.endsWith("+") ||
      input.endsWith("*") ||
      input.endsWith("/") ||
      input.endsWith("-")
    ) {
      setInput(input.slice(0, -1) + operator);
      setDecimalCount("0");
      setLastEquals(false);
    } else if (input.endsWith(operator)) {
      return;
    } else {
      setInput(input + operator);
      setDecimalCount("0");
    }
  };

  const calc = () => {
    const total = eval(input);
    setInput(total);
    setDecimalCount("0");
    setLastEquals(true);
  };

  return (
    <div className="p-3 m-1 bg-neutral-200 min-h-screen flex flex-col items-center justify-center">
      <div className="w-80 bg-neutral-600 p-5 rounded-xl">
        <div className="bg-green-400/40 text-4xl font-bold p-10 my-5 rounded-xl w-full h-30 flex flex-col justify-center text-right">
          <span id="display" className="text-neutral-900">
            {input}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <button
            id="clear"
            className="bg-black hover:bg-neutral-900 col-start-4"
            onClick={clearInput}
          >
            C
          </button>
        </div>
        <div className="grid-cols-4 grid gap-3">
          <div className="col-span-3 grid-cols-3 grid gap-3">
            <button
              id="zero"
              onClick={addZero}
              className="bg-neutral-900 "
            >
              0
            </button>
            <button
              id="one"
              onClick={() => addNumber("1")}
              className="bg-neutral-900 "
            >
              1
            </button>
            <button
              id="two"
              onClick={() => addNumber("2")}
              className="bg-neutral-900 "
            >
              2
            </button>
            <button
              id="three"
              onClick={() => addNumber("3")}
              className="bg-neutral-900 "
            >
              3
            </button>
            <button
              id="four"
              onClick={() => addNumber("4")}
              className="bg-neutral-900 "
            >
              4
            </button>
            <button
              id="five"
              onClick={() => addNumber("5")}
              className="bg-neutral-900 "
            >
              5
            </button>
            <button
              onClick={() => addNumber("6")}
              id="six"
              className="bg-neutral-900 "
            >
              6
            </button>
            <button
              onClick={() => addNumber("7")}
              id="seven"
              className="bg-neutral-900 "
            >
              7
            </button>
            <button
              id="eight"
              onClick={() => addNumber("8")}
              className="bg-neutral-900 "
            >
              8
            </button>
            <button
              id="nine"
              onClick={() => addNumber("9")}
              className="bg-neutral-900 "
            >
              9
            </button>
            <button
              id="decimal"
              onClick={addDecimal}
              className="bg-neutral-900 "
            >
              .
            </button>
            <button
              id="equals"
              onClick={calc}
              className="bg-amber-400"
            >
              =
            </button>
          </div>
          <div className="flex-col flex gap-3">
            <button
              id="add"
              onClick={() => addOperator("+")}
              className="bg-gray-500 "
            >
              +
            </button>
            <button
              id="subtract"
              onClick={() => addOperator("-")}
              className="bg-gray-500 "
            >
              -
            </button>
            <button
              id="multiply"
              onClick={() => addOperator("*")}
              className="bg-gray-500 "
            >
              x
            </button>
            <button
              id="divide"
              onClick={() => addOperator("/")}
              className="bg-gray-500 "
            >
              ÷
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
