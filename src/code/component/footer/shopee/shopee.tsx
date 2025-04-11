import { useState, useRef } from "react";
import { ShopeeComponent } from "../../shopee-item/shopee-component/shopeeComponent";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { createClient } from "@supabase/supabase-js";

export const ShopeeGiftLink = () => {
  const senaraiBarang = [
    {
      id: 0,
      namaBarang: "ELBA STAINLESS STEEL/PEMANAS AIR THERMOPOT",
      linkBarang:
        "https://shopee.com.my/product/275298889/14100201304?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkVHQ3ZkZSUTMrR3pBWmZZNzdrcnRBMFlyTE9RS0wzMlYyS01TMmFLMDA2WXo2S0JSMmc5amhJekZEUXZsQXJvT0t5alpVM000OWJMOXhhOUk2OVlCS05QbGhETlZ2RGFHNnEwdFNURVhVL1RkSWdmL1ZhSTRPL29sUkJudHROaUNBPT0&gad_source=1&gclid=Cj0KCQiAyoi8BhDvARIsAO_CDsB301N-ybYeBJBdoVmRfV3xJZdMKKpE0067_QcFeQ19LOrt8PRTudIaAid-EALw_wcB", // Example link
      pathGambarBarang: "/shopeeImg/pemanasAir.webp",
    },
    {
      id: 1,
      namaBarang: "Another Item",
      linkBarang: "https://www.example.com/item2", // Example link
      pathGambarBarang: "./item2.jpg",
    },
  ];

  const [clickedItemId, setClickedItemId] = useState<number | null>(null);
  const [isTempah, setIsTempah] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Handle when a specific item is clicked
  const handleItemClick = (id: number, tempah: boolean) => {
    setClickedItemId(id);
    setIsTempah(tempah);
  };

  type Inputs = {
    id: number;
    name: string;
  };

  const tempah: SubmitHandler<Inputs> = async (data) => {
    const supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY
    );

    if (linkRef.current) {
      try {
        const updateData = {
          id: clickedItemId !== null ? senaraiBarang[clickedItemId].id : null,
          name: data.name,
          itemName:
            clickedItemId !== null
              ? senaraiBarang[clickedItemId].namaBarang
              : null,
        };

        await supabase.from("Tempahan").insert({
          id: Date.now().toString(),
          name: updateData.name,
          itemName: updateData.itemName,
        });

        linkRef.current.click();
        setIsTempah(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const batal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsTempah(false);
  };

  return (
    <>
      {!isTempah && (
        <motion.div
          key="itemList"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <div>
            <div className="default-font text-black text-xl my-[10px]">
              Wishlist
            </div>
            <div className={isTempah ? "hidden" : ""}>
              <div className="h-2/4 mx-5 mb-5">
                <div className="default-font text-black">
                  <p className="text-lg">Alamat Penghantaran</p>
                  <div className="bg-gray-100 text-center py-1 px-5 rounded-lg">
                    Lot 1007 Kampung Pengkalan Batu, 17000, Pasir Mas, Kelantan
                  </div>
                </div>
                <div className="default-font text-black">
                  <p className="text-lg">Nombor Telefon</p>
                  <span className="bg-gray-100 text-center py-1 px-5 rounded-lg">
                    0145197269
                  </span>
                </div>
              </div>
              <div
                className={`${"h-[27rem] w-full bg-white text-black flex flex-col gap-5 overflow-scroll rounded-md p-4"}`}
              >
                {senaraiBarang.map((barang) => (
                  <ShopeeComponent
                    key={barang.id}
                    barangId={barang.id}
                    namaBarang={barang.namaBarang}
                    pathGambarBarang={barang.pathGambarBarang}
                    onItemClick={handleItemClick} // Pass callback function
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <AnimatePresence>
        {isTempah && (
          <motion.div
            key="itemList"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form
              onSubmit={handleSubmit(tempah)}
              className="w-full bg-white rounded-md text-black flex flex-col gap-2 p-3"
            >
              <div className="flex gap-x-3 items-center">
                {clickedItemId !== null && (
                  <div className="flex gap-3 items-start">
                    <div className="w-1/4 flex justify-center">
                      <img
                        src={senaraiBarang[clickedItemId].pathGambarBarang}
                        alt={senaraiBarang[clickedItemId].namaBarang}
                        className="w-full rounded"
                      />
                    </div>
                    <div className="w-3/4">
                      <p className="mb-2 default-font-not-center text-sm">
                        {senaraiBarang[clickedItemId].namaBarang}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center flex-col">
                <p>Nama</p>
                <div>
                  <input
                    {...register("name")}
                    className="w-full rounded-md border-[0.5px] border-black bg-gray-100 px-3 py-1"
                    placeholder="Hana"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-3 my-3">
                <button
                  className="flex items-center gap-[5px] border border-black bg-white px-3 py-1 rounded-lg"
                  type="submit"
                >
                  <div>
                    <FaArrowRightToBracket />
                  </div>
                  <span>Tempah</span>
                </button>
                <button
                  className="flex items-center gap-[5px] border border-black bg-white px-3 py-1 rounded-lg"
                  onClick={batal}
                >
                  <div>
                    <IoClose />
                  </div>
                  <span>Batal</span>
                </button>
              </div>
              <a
                ref={linkRef}
                href={
                  clickedItemId !== null
                    ? senaraiBarang.find(
                        (barang) => barang.id === clickedItemId
                      )?.linkBarang
                    : "#"
                }
                target="_blank"
                className="hidden"
              ></a>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
