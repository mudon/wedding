import { useState, useRef, useEffect } from "react";
import { Window } from "../../window/window";
import {
  useButtonSelection,
  BottomNavBarItem,
  Kehadiran,
} from "../buttonSelection/buttonSelection";
import { AnimatePresence } from "framer-motion";
import hadirIcon from "../../../../assets/icon components/checklist-svgrepo-com.svg";
import tidakHadirIcon from "../../../../assets/icon components/list-cross-svgrepo-com.svg";

const centerItem = "flex justify-center items-center";
const centerCol = `${centerItem} flex-col`;

export const RVSP = () => {
  const { buttonSelection } = useButtonSelection();

  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [kehadiran, setKehadiran] = useState<Kehadiran | null>(null);
  const windowRef = useRef<HTMLDivElement>(null); // Ref for the Window component

  const addHadir = () => {
    if (!openWindow) setOpenWindow(true);
    setKehadiran(Kehadiran.Hadir);
  };

  const addTidakHadir = () => {
    if (!openWindow) setOpenWindow(true);
    setKehadiran(Kehadiran.TidakHadir);
  };

  if (buttonSelection !== BottomNavBarItem.RVSP && openWindow) {
    setOpenWindow(false);
  }

  // Handle click outside of the window
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        windowRef.current &&
        !windowRef.current.contains(event.target as Node)
      ) {
        setOpenWindow(false); // Close the window
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
    <>
      <div className="h-full flex justify-evenly p-3">
        <div className={centerItem}>
          <button className={centerCol} onClick={addHadir}>
            <img src={hadirIcon} alt="hadir" className="max-w-[24px]" />
            <span className="text-black text-sm default-font">Hadir</span>
          </button>
        </div>
        <div className={centerItem}>
          <button className={centerCol} onClick={addTidakHadir}>
            <img
              src={tidakHadirIcon}
              alt="tidak-hadir"
              className="max-w-[24px]"
            />
            <span className="text-black text-sm default-font">Tidak Hadir</span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {openWindow && (
          <Window
            isOpen={openWindow}
            setOpenWindow={setOpenWindow}
            kehadiran={kehadiran}
          />
        )}
      </AnimatePresence>
    </>
  );
};
