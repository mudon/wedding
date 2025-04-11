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
      namaBarang: "Thermopot",
      linkBarang:
        "https://shopee.com.my/product/161002832/2576528242?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkWVp3RFo3Mkw5czd4Z0hzdEF1WVFia1RMeEZ1cDRjSHo2V0lxS0NDNWxPM0ErU0V1WDhvd0V1ZEtrSUNTVTl2bDdzb3kralpHTDg5bUxzUFVFYzQxOVllNG4vNFl2bVAwQ3JpbXI5RDVpS3E&gad_source=1&gclid=Cj0KCQjw2N2_BhCAARIsAK4pEkV6FbSiAbpKxeh3MsCL3rtauM379mOmXMHKlZP7VG5eIYpJY6utj98aAvmlEALw_wcB", // Example link
      pathGambarBarang: "./shopeeImg/thermopot.png",
    },
    {
      id: 1,
      namaBarang: "Set Pisau",
      linkBarang: "https://shopee.com.my/product/450829972/20869202133?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkVHQ3ZkZSUTMrR3pBWmZZNzdrcnRBMGpGS0Uxd2ZtYzdsNHBLTWw3dlFEVWhRT3VMdGd1ZHl4TEZOV3NXd3hZM2hyclFpZmx4bEdyOGoybU9SYU4xWkVLMXF4NHNlcWVoWmlZbmZlT0NVNVYzZTluQXNmc1NyRWNwRUpJTGpnN0hnPT0&gad_source=1&gclid=Cj0KCQjw2N2_BhCAARIsAK4pEkV9LjevGNRd6Gbk15qUFodjJk94DboqX1Q9-Bhtk0WptY_V4kVLgC4aAuHvEALw_wcB", // Example link
      pathGambarBarang: "./shopeeImg/set-pisau.png",
    },
    {
      id: 2,
      namaBarang: "Set Pinggan",
      linkBarang: "https://shopee.com.my/product/254358663/3932487396?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkWVp3RFo3Mkw5czd4Z0hzdEF1WVFia0E2QUpCbXpNeXEvTDZta0RIMlpoRnFaa1dUUDZheWdQUkR2S0NKL3FGR3ZDWkN5TTZHeVBhVkluR213ajcwT0RZdXA5dUdXQXdBQm1HcUpsdGF4d28&gad_source=1&gclid=Cj0KCQjw2N2_BhCAARIsAK4pEkUftbti0Tui4MqxjjJiWumGYEu9aspB95sTQ13nsjtHQ6TpKz73PLIaAq4PEALw_wcB", // Example link
      pathGambarBarang: "./shopeeImg/set-pinggan.png",
    },
    {
      id: 3,
      namaBarang: "Vacuum Stick",
      linkBarang: "https://shopee.com.my/product/154039251/6833166779?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkWVp3RFo3Mkw5czd4Z0hzdEF1WVFibVl3cFlpakdhSXlGUnJoQ0hiWk42MGpIekFWVVVhbVBCUFV2T3hpQmY1TFV0RFlOaVRYYzA3UkIybDRuMlNSYU1oZk1QcjNBbTNEY1ZsK1pVRGdERCs&gad_source=1&gclid=Cj0KCQjw2N2_BhCAARIsAK4pEkUEz8PupPqTS6J0IuPokeHceI5nP89tMVc8VqWoW83xLSRFhyMeOz8aAnl7EALw_wcB", // Example link
      pathGambarBarang: "./shopeeImg/vacuum-stick.png",
    },
    {
      id: 4,
      namaBarang: "Foldable Broom",
      linkBarang: "https://shopee.com.my/product/595961616/22352056017?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkVHQ3ZkZSUTMrR3pBWmZZNzdrcnRBM1dLK1NROGxMUkpMUm9OVEpRcEpVVyt1RVNwZnE4aWx5QUVvbzVIMWNwbTdKN0tMU3VnYU5XUDdJQndES3kxSUduc0d5S2UxRGJTaUJlSjJ1ZDZBS1c0N243WFRrVHo0Uk90ZTJrcEpHWElBPT0&gad_source=1&gclid=Cj0KCQjw2N2_BhCAARIsAK4pEkU8oRoNa8wgPRoBnDVG3tgoe8J-Kg-ez5LHgXJlGOHs66lD3KOA4NMaAlWqEALw_wcB", // Example link
      pathGambarBarang: "./shopeeImg/penyapu.png",
    },
    {
      id: 5,
      namaBarang: "Koleksi Pan",
      linkBarang: "https://shopee.com.my/product/4856352/5820735266?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkVEg0SDd3VWo1MDQyT052d3EvY1B4WXdMd0JWUkRIaGo1c0czQ2tDTjF3M2lyT2tRQ2p3UWQ3Y3lnQW4wU0pnSHdMdTNKd1ZCTlBRYmttdExPWUZiaE92SWFIVWt2THhGUjU0Zm1qaHdxeU0&gad_source=1&gclid=Cj0KCQjw2N2_BhCAARIsAK4pEkXgsLHA8RSduqOBRHD09NZNgRdT4hztl8NI0e2s42xoZ10n0RM4z9saAtpKEALw_wcB", // Example link
      pathGambarBarang: "./shopeeImg/set-kuali.png",
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
