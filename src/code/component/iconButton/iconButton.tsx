import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

type CallBackFunction = () => void;
type Props = {
  iconImage: ReactNode;
  title: string;
  clickFunc: CallBackFunction;
  isSelected: boolean;
  children?: ReactNode;
};

export const IconButton = ({
  iconImage,
  title,
  clickFunc,
  isSelected,
  children,
}: Props) => {
  const colCenter = "flex justify-center items-center flex-col";
  const windowRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState<boolean>(false);
  const [openWindow, setOpenWindow] = useState<boolean>(false);

    const handleButtonClick = () => {
        if (!isSelected) {
            setOpenWindow(true); // Open the box only if not selected
            setHighlight(true);
        } else {
            setOpenWindow(false); // Close the box if already selected
            setHighlight(false);
        }
        clickFunc(); // Notify the parent of selection state
  };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (windowRef.current && !windowRef.current.contains(event.target as Node)) {
            setOpenWindow(false); // Close the box
            setHighlight(false);
        }
    };

    if (openWindow) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openWindow]);

    return (
      <div
        className={`${isSelected && highlight ? "border-2 border-[#353238]" : ""} w-[15rem] h-full flex justify-center items-center rounded-xl py-2`}
      >
        <div className={colCenter}>
          <button
            onClick={handleButtonClick}
            className={`w-full h-full ${colCenter}`}
          >
            {iconImage}
            <span className="text-sm font-extralight">{title}</span>
          </button>
        </div>
        <AnimatePresence>
            {openWindow && (
            <motion.div
                ref={windowRef}
                initial={{ opacity: 0, y: 100 }} // Start slightly below
                animate={{ opacity: 1, y: 0 }} // Move up to the desired position
                exit={{ opacity: 0, y: 100 }} // Move back down on exit
                className={`w-[350px] min-h-0 bg-white absolute bottom-[5.5rem] left-5 rounded-lg`}
            >
                {children}
            </motion.div>
            )}
        </AnimatePresence>
      </div>
    );
};
