import { motion } from "framer-motion";
import {  useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaPenNib } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";


type Inputs = {
  name: string;
  fon: string;
  jumlah: number;
  ucapan: string;
};

export const Ucapan = () => {
  const [openWindow, setOpenWindow] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const windowRef = useRef<HTMLDivElement>(null);

  const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

  const handleButtonClick = () => {
    if (!isSelected) {
        setOpenWindow(true); // Open the box only if not selected
    } else {
        setOpenWindow(false); // Close the box if already selected
    }
  };
  const onClose = () => {
    setOpenWindow(!openWindow);
  }

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
        Swal.fire({
            icon: "success",
            title: "Ucapan sudah di catat",
            showConfirmButton: false,
            timer: 1500
        });
        const updateData = {
            name: data.name,
            fon: "",
            jumlah: "",
            ucapan: data.ucapan,
            kehadiran: ""
        };
          
        await supabase.from("Senarai").insert({
          id: Date.now().toString(),
          name: updateData.name,
          nomborFon: updateData.fon,
          jumlahKehadiran: parseInt(updateData.jumlah),
          ucapan: updateData.ucapan,
          kehadiran: updateData.kehadiran,
        });

        // const result = await response.json();
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Tolong masukkan semula",
            showConfirmButton: false,
            timer: 1500
        });
        console.error('Error:', error);
    }
}

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      
      if (windowRef.current && !windowRef.current.contains(event.target as Node)) {
          setOpenWindow(false); // Close the box
      }
    };

  if (openWindow) {
    document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openWindow]);

  return(
    <>
      <button onClick={handleButtonClick} className="mt-5 flex justify-center items-center border-[2px] border-gray-900 p-3 rounded-full gap-2">
        <span><FaPenNib/></span>
        <span>Ucapan</span>
      </button>
      {
        openWindow &&
        <motion.div
          initial={{ opacity: 0, y: 100 }} // Start below the screen with 0 opacity
          animate={{ opacity: 1, y: 0 }}    // Animate to the normal position with full opacity
          exit={{ opacity: 0, y: 100 }}     // Animate back to the bottom with 0 opacity on exit
        >
        <div className="h-[29rem] w-[21rem] relative bottom-[30rem] text-black bg-white rounded-lg" ref={windowRef}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex ">
              <div className="w-full h-full flex flex-col gap-6 border-2 border-[#353238] px-10 rounded-md">
                <div className="flex flex-col gap-y-3 mt-5">
                    <div>
                        <p className="mb-1 text-center">Nama</p>
                        <div><input {...register("name")} className="w-full rounded-md border-[0.5px] border-black bg-gray-100 px-3 py-1" placeholder="Hana" /></div>
                    </div>
                    <div>
                        <p className="mb-1 text-center">Ucapan</p>
                        <div><textarea {...register("ucapan")} className="w-full rounded-md border-[0.5px] bg-gray-100 border-black px-3 py-1 resize-y h-[13rem]" placeholder="Semoga berbahagia" /></div>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-x-4">
                    <button className='bg-white border-[0.5px] border-black px-5 py-2 rounded-lg' type="submit">Hantar</button>
                    <button className='bg-white border-[0.5px] border-black px-5 py-2 rounded-lg' type="button" onClick={onClose}>Batal</button>
                </div>
              </div>
          </form>
        </div>
        </motion.div>
      }
    </>
  );
};
