import { useState, useEffect } from "react";
import "./countdown.css"

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [days, setDays] = useState<number>(0);

  useEffect(() => {
      const countdownInterval = setInterval( () => {
        const currentTime = new Date().getTime();
        const eventTime = new Date("May 03, 2025 12:30:00").getTime();
        let remainingTime = eventTime - currentTime;

        formatTime( remainingTime );
      return () => clearInterval(countdownInterval);
  },1000 )}, []); 


  const formatTime = (time: number) => {
    setSeconds( Math.floor( ( time / 1000 ) % 60 ) );
    setMinutes( Math.floor( ( time / ( 1000 * 60 ) ) % 60) );
    setHours( Math.floor( ( time / ( 1000 * 60 * 60 ) ) % 24 ) );
    setDays( Math.floor( time / ( 1000 * 60 * 60 * 24 ) ) );
  };

  return (
    <div className="flex justify-evenly flex-wrap gap-x-20">
      <div className="text-center text-[25px] default-font">
        {days.toString().padStart(2, "0")} 
        <span className="block text-xl custom-font-cinzel">Hari</span>
      </div>
      <div className="text-center text-[25px] default-font">
        <span>
          {hours.toString().padStart(2, "0")} 
        </span>
        <span className="block text-xl custom-font-cinzel">Jam</span>
      </div>
      <div className="text-center text-[25px] default-font">
        {minutes.toString().padStart(2, "0")} 
        <span className="block text-xl custom-font-cinzel">Minit</span>
      </div>
      <div className="text-center text-[25px] default-font">
        {seconds.toString().padStart(2, "0")} 
        <span className="block text-xl custom-font-cinzel">Saat</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
