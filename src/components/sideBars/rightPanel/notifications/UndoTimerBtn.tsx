import { useState, useEffect } from "react";
export default function UndoTimerBtn({
  setState,
}: {
  setState: React.Dispatch<
    React.SetStateAction<"rejecting" | "accepting" | "none">
  >;
}) {
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setState("none");
    }
  }, [counter, setState]);

  return <button onClick={() => setState("none")}>{counter}</button>;
}
