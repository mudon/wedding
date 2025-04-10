import { FaWhatsapp } from "react-icons/fa";

export const Call = () => {
  const colCenter = "flex justify-center items-center flex-col";
  const wassapNum = ["https://www.wassap.my/601119472127", "https://www.wassap.my/601169370518", "https://www.wassap.my/60145197269"];

  const wassap = (wassapURL: string) => {
    window.open(wassapURL, "_blank");
  };

  return (
    <div className={`${colCenter}`}> 
      <div className="w-full bg-white border-2 border-[#353238] absolute bottom-0 text-black flex justify-center items-center flex-col gap-4 rounded-md">
        <div className="default-font text-xl">Hubungi</div>
        <div className="w-full flex flex-col gap-3 px-10 py-2">
          <div className="flex justify-between w-full">
              <span>Salwuan(Emak Pengantin)</span>
              <button onClick={() => wassap(wassapNum[0])}><FaWhatsapp size={24}/></button>
          </div>
          <div className="flex justify-between w-full">
              <span>Harith</span>
              <button onClick={() => wassap(wassapNum[1])}><FaWhatsapp size={24}/></button>
          </div>
          <div className="flex justify-between w-full">
              <span>Hazim(Pengantin)</span>
              <button onClick={() => wassap(wassapNum[2])}><FaWhatsapp size={24}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};