import { createContext, useContext, useState, ReactNode } from "react";

// Your existing enums
export enum BottomNavBarItem {
  Calendar = 1,
  Location = 2,
  Call = 3,
  TNG = 4,
  RVSP = 5,
  SHOPEE = 6
}

export enum Kehadiran {
  Hadir = "Hadir",
  TidakHadir = "Tidak Hadir"
}

type ButtonSelectionContextType = {
  buttonSelection: number;
  setButtonSelection: React.Dispatch<React.SetStateAction<number>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // New state for the gate
};

const ButtonSelectionContext = createContext<ButtonSelectionContextType | undefined>(undefined);

export const ButtonSelectionProvider = ({ children }: { children: ReactNode }) => {
  const [buttonSelection, setButtonSelection] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false); // Track the open state of the gate

  return (
    <ButtonSelectionContext.Provider value={{ buttonSelection, setButtonSelection, isOpen, setIsOpen }}>
      {children}
    </ButtonSelectionContext.Provider>
  );
};

export const useButtonSelection = () => {
  const context = useContext(ButtonSelectionContext);
  if (!context) {
    throw new Error("useButtonSelection must be used within a ButtonSelectionProvider");
  }
  return context;
};
