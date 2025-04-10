import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaPenNib } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import { useGuestWish } from "../../data-management/guestwishlist/guestwishlist";

type Inputs = {
  name: string;
  ucapan: string;
};

export const Ucapan = () => {
  const [openWindow, setOpenWindow] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const windowRef = useRef<HTMLDivElement>(null);

  const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);
  const { guestwishList, setGuestwishList } = useGuestWish();

  const handleButtonClick = () => {
    setOpenWindow(!openWindow);
  };

  const onClose = () => {
    setOpenWindow(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const { data: insertedData, error } = await supabase.from("Senarai").insert({
        id: Date.now().toString(),
        name: data.name,
        ucapan: data.ucapan,
        nomborFon: "",
        jumlahKehadiran: 0,
        kehadiran: "",
      }).select(); // <- so we can access the new data

      if (error) throw error;

      if (insertedData && insertedData.length > 0) {
        setGuestwishList(prev => {
          const updatedList = [insertedData[0], ...prev]; // Add the new wish
          return updatedList.slice(0, 6); // Keep only the 6 latest entries
        });

        Swal.fire({
          icon: "success",
          title: "Ucapan sudah dicatat",
          showConfirmButton: false,
          timer: 1500,
        });

        reset(); // Clear form
        onClose(); // Close modal
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Tolong masukkan semula",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (windowRef.current && !windowRef.current.contains(event.target as Node)) {
        setOpenWindow(false);
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
      <button onClick={handleButtonClick} className="mt-5 flex justify-center items-center border-[2px] border-gray-900 p-3 rounded-full gap-2">
        <FaPenNib />
        <span>Ucapan</span>
      </button>

      {openWindow && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <div ref={windowRef} className="h-[29rem] w-[21rem] relative bottom-[30rem] text-black bg-white rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex">
              <div className="w-full h-full flex flex-col gap-6 border-2 border-[#353238] px-10 rounded-md">
                <div className="flex flex-col gap-y-3 mt-5">
                  <div>
                    <p className="mb-1 text-center">Nama</p>
                    <input
                      {...register("name", { required: true })}
                      className="w-full rounded-md border-[0.5px] border-black bg-gray-100 px-3 py-1"
                      placeholder="Hana"
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-center">Ucapan</p>
                    <textarea
                      {...register("ucapan", { required: true })}
                      className="w-full rounded-md border-[0.5px] bg-gray-100 border-black px-3 py-1 resize-y h-[13rem]"
                      placeholder="Semoga berbahagia"
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center gap-x-4">
                  <button className="bg-white border-[0.5px] border-black px-5 py-2 rounded-lg" type="submit">Hantar</button>
                  <button className="bg-white border-[0.5px] border-black px-5 py-2 rounded-lg" type="button" onClick={onClose}>Batal</button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
};
