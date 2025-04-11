import { useState, useEffect } from "react";
import "./countdown.css";

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [days, setDays] = useState<number>(0);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const eventTime = new Date("May 03, 2025 12:30:00").getTime();
      let remainingTime = eventTime - currentTime;

      formatTime(remainingTime);
      return () => clearInterval(countdownInterval);
    }, 1000);
  }, []);

  const formatTime = (time: number) => {
    setSeconds(Math.floor((time / 1000) % 60));
    setMinutes(Math.floor((time / (1000 * 60)) % 60));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="flex justify-evenly flex-wrap gap-x-20">
      {/* <div className="text-center text-[2em] default-font">
        {days.toString().padStart(2, "0")}
        <span className="block text-xl custom-font-cinzel">Hari</span>
      </div>
      <div className="text-center text-[25px] default-font">
        <span>{hours.toString().padStart(2, "0")}</span>
        <span className="block text-xl custom-font-cinzel">Jam</span>
      </div>
      <div className="text-center text-[25px] default-font">
        {minutes.toString().padStart(2, "0")}
        <span className="block text-xl custom-font-cinzel">Minit</span>
      </div>
      <div className="text-center text-[25px] default-font">
        {seconds.toString().padStart(2, "0")}
        <span className="block text-xl custom-font-cinzel">Saat</span>
      </div> */}

      <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
        <div className="flex flex-col p-2 rounded-md custom-font-cinzel bg-[#c9a87b] p-2 shadow-md shadow-black/30">
          <span className="countdown font-mono text-2xl">
            <span style={{"--value":15} as React.CSSProperties} aria-live="polite">{days.toString().padStart(2, "0")}</span>
          </span>
          days
        </div>
        <div className="flex flex-col p-2 rounded-md custom-font-cinzel bg-[#c9a87b] p-2 shadow-md shadow-black/30">
          <span className="countdown font-mono text-2xl">
            <span style={{"--value":10} as React.CSSProperties} aria-live="polite">{hours.toString().padStart(2, "0")}</span>
          </span>
          hours
        </div>
        <div className="flex flex-col p-2 rounded-md custom-font-cinzel bg-[#c9a87b] p-2 shadow-md shadow-black/30">
          <span className="countdown font-mono text-2xl">
            <span style={{"--value":24} as React.CSSProperties } aria-live="polite">{minutes.toString().padStart(2, "0")}</span>
          </span>
          min
        </div>
        <div className="flex flex-col p-2 rounded-md custom-font-cinzel bg-[#c9a87b] p-2 shadow-md shadow-black/30">
          <span className="countdown font-mono text-2xl">
            <span style={{"--value":59} as React.CSSProperties } aria-live="polite">{seconds.toString().padStart(2, "0")}</span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
