import { useState } from "react";
import background from "/background/INVITATION WEDDING CARD OPENING.jpg";

type Props = {
  onGateOpen: () => void;
};

export const Gate = ({ onGateOpen }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleGateOpen = () => {
    setTimeout(() => {
      onGateOpen();
    }, 1000);

    setIsOpen(true);
  };

  return (
    <div
      className={`flex w-[28rem] min-h-screen`}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <div
        className="relative w-1/2 h-full bg-transparent flex justify-end items-center"
        style={{
          zIndex: 7,
          transformOrigin: "left",
          transition: "all 1s",
          transform: isOpen ? "rotateY(150deg)" : "",
        }}
      ></div>
      <div
        className="absolute w-full h-full left-0 backdrop-blur-sm"
        style={{
          zIndex: 6,
          transformOrigin: "left",
          transition: "all 1s",
          transform: isOpen ? "rotateY(150deg)" : "",
        }}
      >
        <div className="flex justify-center items-center flex-col h-full w-full">
          <div className="relative bottom-7 flex justify-center items-center flex-col gap-3 h-full w-[270px]">
            {/* First element */}
            <p
              className="w-[200px] text-lg text-center text-customOrange default-font"
              style={{
                opacity: 0, // Start as invisible
                animation: "fadeInUp 0.5s ease-out forwards",
                animationDelay: "0s",
              }}
            >
              RENJANA PUJANGGA BERTAUT
            </p>

            {/* Second element */}
            <div className="flex flex-col items-center">
              <div
                style={{
                  opacity: 0,
                  animation: "fadeInUp 0.5s ease-out forwards",
                  animationDelay: "0.5s",
                }}
              >
                <p className="custom-font-Ananda">Hazim</p>
              </div>

              {/* Third element */}
              <div
                style={{
                  opacity: 0,
                  animation: "fadeInUp 0.5s ease-out forwards",
                  animationDelay: "1s",
                }}
              >
                <p className="custom-font-Ananda">&</p>
              </div>

              {/* Fourth element */}
              <div
                style={{
                  opacity: 0,
                  animation: "fadeInUp 0.5s ease-out forwards",
                  animationDelay: "1.5s",
                }}
              >
                <p className="custom-font-Ananda">Yana</p>
              </div>
            </div>
            {/* Fifth element */}
            <div
              className="flex justify-center items-center flex-col"
              style={{
                opacity: 0, // Start as invisible
                animation: "fadeInUp 0.5s ease-out forwards",
                animationDelay: "2s",
              }}
            >
              <p className="default-font text-md">SABTU</p>
              <p className="default-font text-md">10 MAY 2025</p>
            </div>
            <button
              className="bg-black text-white p-4 rounded-lg relative z-10"
              style={{
                transformOrigin: "left",
                transition: "all 1s",
                transform: isOpen ? "rotateY(200deg)" : "rotateY(0deg)",
              }}
              onClick={handleGateOpen}
            >
              BUKA
            </button>
          </div>
        </div>
      </div>
      <div
        className="w-1/2 h-full bg-transparent"
        style={{
          zIndex: 1,
          transformOrigin: "right",
          transition: "all 1s",
          transform: isOpen ? "rotateY(-150deg)" : "",
        }}
      ></div>
    </div>
  );
};
