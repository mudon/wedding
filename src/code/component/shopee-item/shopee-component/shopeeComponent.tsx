import { FaArrowRightToBracket } from "react-icons/fa6";

type ShopeeProps = {
    barangId: number;
    namaBarang: string;
    pathGambarBarang: string;
    onItemClick: (id: number, tempah: boolean) => void; // Callback type for clicked item
  };
  
  export const ShopeeComponent = ({
    barangId,
    namaBarang,
    pathGambarBarang,
    onItemClick,
  }: ShopeeProps) => {
    // Handle button click
    const tempahWindow = () => {
      onItemClick(barangId, true); // Call parent callback with item's ID
    };
    return (
      <div className="flex gap-x-3 items-center">
        <div className="w-1/4 flex justify-center">
          <img
            src={pathGambarBarang}
            alt={namaBarang}
          />
        </div>
        <div className="w-3/4">
          <p className="mb-2 default-font-not-center text-sm">{namaBarang}</p>
          <button
            className="flex items-center gap-3 border border-black bg-white px-3 py-1 rounded-lg"
            onClick={tempahWindow}
          >
            <div>
              <FaArrowRightToBracket/>
            </div>
            <span>
              Tempah
            </span>
          </button>
        </div>
      </div>
    );
  };
  