import qrBank from "/hongleongqr.png";

export const TnG = () => {
  const colCenter = "flex justify-center items-center flex-col";

  return (
    <div className={`${colCenter}`}>
      <div className="h-[30rem] w-full bg-white border-2 border-[#353238] absolute bottom-0 text-black flex justify-center items-center flex-col gap-4 rounded-md">
        <div className="default-font text-xl">Money Gift</div>
        <div>
          <p className="text-center mb-1">Nama Bank</p>
          <div className="py-1 px-10 rounded-lg bg-gray-100 border-[1px] text-center">
            <span>Hong Leong</span>
          </div>
        </div>
        <div>
          <p className="text-center mb-1">Akaun Bank</p>
          <div className="bg-gray-100 text-center py-1 px-10 rounded-lg">
            <span>29051057003</span>
          </div>
        </div>
        <div>
          <img
            alt="qrBank"
            src={qrBank}
            className="h-[260px] w-[260px] border-2 border-gray-100"
          ></img>
        </div>
      </div>
    </div>
  );
};
