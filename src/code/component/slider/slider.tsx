import { useState, useEffect } from 'react';
import '../../../index.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Frame from "/background/output.png"

type SliderProps = {
  imagesUrl: string[];
};

function Slider( { imagesUrl }: SliderProps ) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === imagesUrl.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? imagesUrl.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 2000);

    return () => clearInterval(interval);
}, [currentIndex]);

  return (
    <>
      <div className="h-full w-full flex justify-center relative items-center"> 
        <div className='h-[15rem] w-[25rem] border-[2.5rem] border-black' style={{
        borderImageSource: `url(${Frame})`,
        borderImageSlice: "40% 13% 40% 14%",
        borderImageWidth: "100% 20% 100% 20%",
        borderImageRepeat: "round repeat"
      }} >
            <img key={currentIndex} src={imagesUrl[currentIndex]} className='h-full w-full rounded-full'/>
        </div>
        <div>
          <button className='w-[2rem] absolute top-0 bottom-0 left-0' onClick={ handlePrevious }>
            <IoIosArrowBack/>
          </button>
          <button className='w-[2rem] absolute top-0 bottom-0 right-0' onClick={ handleNext }>
            <IoIosArrowForward/>
          </button>
        </div>
      </div>
    </>
  );
}

export default Slider
