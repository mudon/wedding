import { useState, useEffect, useRef } from "react";
import "./countdown.css";
import { AnimatePresence, motion } from "framer-motion";

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [days, setDays] = useState<number>(0);

  const formatTime = (time: number) => {
    setSeconds(Math.floor((time / 1000) % 60));
    setMinutes(Math.floor((time / (1000 * 60)) % 60));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
  };

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const eventTime = new Date("May 03, 2025 12:30:00").getTime();
      let remainingTime = eventTime - currentTime;

      formatTime(remainingTime);
      return () => clearInterval(countdownInterval);
    }, 1000);
  }, []);
  // const [number, setNumber] = useState(0);
  // const [prevNumber, setPrevNumber] = useState<number | null>(null);
  // const [isAnimating, setIsAnimating] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setNumber((n) => n + 1);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [number]);

  return (
    <div className="flex justify-evenly flex-wrap gap-x-20">

      <div className="grid grid-flow-col text-center auto-cols-max bg-[#c9a87b] rounded-md p-2 shadow-md shadow-black/30">
        <div className="flex flex-col p-1 custom-font-cinzel ">
            <div className="flex flex-row font-mono text-2xl">
              <motion.div
                key={days.toString().padStart(2, "0")}
                initial={{ opacity: 1, y: -15 }} // Start slightly below
                animate={{ opacity: 1, y: 0 }} // Move up to the desired position
                // exit={{ opacity: 0, y: 100 }} // Move back down on exit
                transition={{
                  x: { type: "spring", bounce: 0 }, // Remove bounce
                }}
              >
                <span aria-live="polite">{days.toString().padStart(2, "0")}</span>
              </motion.div>
              <span className="ml-1">:</span>
            </div>
          days
        </div>
        <div className="flex flex-col p-1 custom-font-cinzel">
            <div className="flex flex-row font-mono text-2xl">
              <motion.div
                key={hours.toString().padStart(2, "0")}
                initial={{ opacity: 1, y: -15 }} // Start slightly below
                animate={{ opacity: 1, y: 0 }} // Move up to the desired position
                // exit={{ opacity: 0, y: 100 }} // Move back down on exit
                transition={{
                  x: { type: "spring", bounce: 0 }, // Remove bounce
                }}
              >
                <span aria-live="polite">{hours.toString().padStart(2, "0")}</span>
              </motion.div>
              <span className="ml-1">:</span>
            </div>
          hours
        </div>
        <div className="flex flex-col p-1 custom-font-cinzel">
            <div className="flex flex-row font-mono text-2xl">
              <motion.div
                key={minutes.toString().padStart(2, "0")}
                initial={{ opacity: 1, y: -15 }} // Start slightly below
                animate={{ opacity: 1, y: 0 }} // Move up to the desired position
                transition={{
                  x: { type: "spring", bounce: 0 }, // Remove bounce
                }}
              >
                <span aria-live="polite">{minutes.toString().padStart(2, "0")}</span>
              </motion.div>
              <span className="ml-1">:</span>
            </div>
          min
        </div>
        <div className="flex flex-col p-1 custom-font-cinzel number-container">
            <div className="flex flex-row font-mono text-2xl">
            <motion.div
              key={seconds.toString().padStart(2, "0")}
              initial={{ opacity: 1, y: -15 }} // Start slightly below
              animate={{ opacity: 1, y: 0 }} // Move up to the desired position
              transition={{
                x: { type: "spring", bounce: 0 }, // Remove bounce
              }}
            >
              <span aria-live="polite">{seconds.toString().padStart(2, "0")}</span>
            </motion.div>
            </div>
          sec
        </div>
      </div>

    </div>

    // <div className="relative w-24 h-12 text-3xl font-bold overflow-hidden text-center">
    //   <AnimatePresence>
    //       <motion.div
    //         key={number}
    //         className="absolute inset-0"
    //         initial={{ opacity: 0, y: 100 }} // Start slightly below
    //         animate={{ opacity: 1, y: 0 }} // Move up to the desired position
    //         exit={{ opacity: 0, y: 100 }} // Move back down on exit
    //         transition={{
    //           x: { type: "spring", bounce: 0 }, // Remove bounce
    //         }}
    //       >
    //         {number}
    //       </motion.div>
    //   </AnimatePresence>
    // </div>
  );
};

export default CountdownTimer;
