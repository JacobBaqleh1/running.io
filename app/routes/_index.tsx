import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [timer, setTimer] = useState(false);
  const [finish, setFinish] = useState(false);
  const [start, setStart] = useState(true);
  const [paragraphs, setParagraph] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer) {
        setSecond((prevSecond: number) => {
          return prevSecond + 1;
        });
      }
      if (second === 59) {
        setSecond((prevSecond: number) => {
          return (prevSecond = 0);
        });
        setMinute((prevMinute) => {
          return prevMinute + 1;
        });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer, second]);

  const pause = () => {
    setTimer(false);
  };
  const resume = () => setTimer(true);
  const startBtn = () => {
    setTimer(true);
    setFinish(true);
    setStart(false);
  };
  const finishBtn = () => {
    setParagraph((prevParagraph) => [
      ...prevParagraph,
      `${hour < 10 ? "0" + hour : hour}:${
        minute < 10 ? "0" + minute : minute
      }:${second < 10 ? "0" + second : second}`,
    ]);

    setTimer(false);
    setStart(true);
    setFinish(false);
    setSecond(0);
    setMinute(0);
    setHour(0);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {/* stopwatch */}
      <div className="border-2 border-pink-500 flex flex-col items-center justify-center m-auto h-[20rem] w-[20rem] ">
        {/* timer display */}
        <div>
          {hour < 10 ? 0 : ""}
          {hour}:{minute < 10 ? 0 : ""}
          {minute}:{second < 10 ? 0 : ""}
          {second}
        </div>
        {/* start  */}
        <div className={finish ? "hidden" : ""}>
          <button onClick={startBtn}>Start</button>
        </div>
        {/* pause */}
        <div>
          <button onClick={pause}>Pause</button>
        </div>
        {/* resume */}
        <div>
          <button onClick={resume}>Resume</button>
        </div>
        {/* finish */}
        <div className={start ? "hidden" : ""}>
          <button onClick={finishBtn}>Finish</button>
        </div>
      </div>
      {/* Time Results */}
      <div>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}
