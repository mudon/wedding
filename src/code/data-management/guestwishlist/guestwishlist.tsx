import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@supabase/supabase-js";

// Type of one wish
type GuestWish = {
  ucapan: string;
  name: string;
};

// Context type
type GuestWishContextType = {
  guestwishList: GuestWish[];
  setGuestwishList: React.Dispatch<React.SetStateAction<GuestWish[]>>;
};

// Create context
const GuestWishContext = createContext<GuestWishContextType | undefined>(undefined);

export const GuestWishProvider = ({ children }: { children: ReactNode }) => {
  const [guestwishList, setGuestwishList] = useState<GuestWish[]>([]);

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  const fetchData = async () => {
    try {
      const { data } = await supabase
        .from("Senarai")
        .select("*")
        .order("id", { ascending: false })
        .limit(6);
      if (Array.isArray(data)) {
        setGuestwishList(data);
      } else {
        setGuestwishList([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setGuestwishList([]);
    }
  };

  useEffect(() => {
    fetchData();

    const channel = supabase
    .channel('guestbook_channel')
    .on(
        'postgres_changes',
        {
          event: 'INSERT', 
          schema: 'public',
          table: "Senarai",
        },
        payload => {
        const newData: GuestWish = {name: payload.new.name, ucapan: payload.new.ucapan};

        setGuestwishList(prev => {
            const updatedList = [newData, ...prev]; // Add the new wish
            return updatedList.slice(0, 6); // Keep only the 6 latest entries
        });
    })
    .subscribe();

    return () => {
        supabase.removeChannel(channel);
      };
  }, []);

  return (
    <GuestWishContext.Provider value={{ guestwishList, setGuestwishList }}>
      {children}
    </GuestWishContext.Provider>
  );
};

// Hook to access context
export const useGuestWish = () => {
  const context = useContext(GuestWishContext);
  if (!context) {
    throw new Error("useGuestWish must be used within a GuestWishProvider");
  }
  return context;
};
