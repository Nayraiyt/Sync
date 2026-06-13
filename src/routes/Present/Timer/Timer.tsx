import { useEffect, useState } from "react";
import "./Time.css";

type Props = {
  isRunning: boolean;
};

export const Timer = ({ isRunning }: Props) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: any;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <h1 className="timer-count">
        {formatTime(seconds)}
      </h1>
    </div>
  );
};