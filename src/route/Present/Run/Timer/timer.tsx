import { createContext,useContext,useEffect, useRef,useState } from "react";

type TimerContextType = {
  seconds: number;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  running: boolean;
};

const TimerContext = createContext<TimerContextType | null>(null);

export const TimerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const savedStart = localStorage.getItem("timerStart");
    const savedRunning = localStorage.getItem("timerRunning");

    if (savedStart && savedRunning === "true") {
      const elapsed = Math.floor(
        (Date.now() - Number(savedStart)) / 1000
      );

      setSeconds(elapsed);
      setRunning(true);
    }
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        const start = Number(localStorage.getItem("timerStart"));

        setSeconds(
          Math.floor((Date.now() - start) / 1000)
        );
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running]);

  const startTimer = () => {
    localStorage.setItem("timerStart", Date.now().toString());
    localStorage.setItem("timerRunning", "true");

    setRunning(true);
  };

  const stopTimer = () => {
    localStorage.setItem("timerRunning", "false");

    setRunning(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    stopTimer();

    setSeconds(0);

    localStorage.removeItem("timerStart");
  };

  return (
    <TimerContext.Provider
      value={{
        seconds,
        startTimer,
        stopTimer,
        resetTimer,
        running,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error("useTimer must be used inside TimerProvider");
  }

  return context;
};