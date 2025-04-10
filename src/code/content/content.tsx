import { useEffect, useState } from 'react';
import '../../index.css';
import Slider from '../component/slider/slider';
import Countdown from "../component/countdown/countdown";
import backgroundLow from "../../assets/background-low.jpg";
import img1 from "../../assets/engaged/photo_2025-01-07_20-59-45.jpg";
import img2 from "../../assets/engaged/photo_2025-01-07_20-59-48.jpg";
import img3 from '../../assets/engaged/photo_2025-01-07_20-59-50.jpg';
import img4 from '../../assets/engaged/photo_2025-01-07_20-59-53.jpg';
import wedLine from '../../assets/weedingLine.png';
import { GuestBook } from '../component/guestbook/guestbook';
import { Ucapan } from '../component/ucapan/ucapan';
import { LuCalendarHeart } from 'react-icons/lu';
import ucapanImg from '../../assets/border-ucapan.png'

function Content() {
  const [backgroundImageVisible, setBackgroundImageVisible] = useState(false); 

  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-animation");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            setBackgroundImageVisible(true);
          }
        });
      },
      {
        threshold: 0.3, 
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const imageUrls = [
    img1,
    img2,
    img3,
    img4
  ];

  const buttonUcapan = {
      iconImage: <LuCalendarHeart />,
      title: "Ucapan",
      item: 10,
      childNode: <Ucapan />,
    }

  return (
    <>
      <section className="w-[28rem] flex justify-center items-center pt-[2rem]" style={{ backgroundImage: `url(${backgroundLow})`, backgroundSize: '100%', backgroundPosition: "center" }} >
        <div className='w-[240px] flex justify-center items-center flex-col gap-y-7 '>
          <div className='flex justify-center items-center flex-col gap-y-5 scroll-animation invisible-animation'>
            <div className='flex justify-center items-center flex-col custom-font-Ananda-normal-size text-xl scroll-animation invisible-animation' >
              <p>Undangan</p>
              <p>Majlis Perkahwinan</p>
            </div>
            <div className='custom-font-cinzel text-center scroll-animation invisible-animation'>
              <p>Assalamualaikum wbt & salam sejahtera</p>
            </div>
            <div className='flex justify-center items-center flex-col scroll-animation invisible-animation'>
              <p className='text-center font-medium text-2xl custom-font-cinzel'>RAZALI</p>
              <p className='text-lg default-font'>(Bapa Pengantin Perempuan)</p>
              <p className='default-font'>&</p>
              <p className='text-center font-medium text-2xl custom-font-cinzel'>MARYAM</p>
              <p className='text-lg default-font'>(Ibu Pengantin Perempuan)</p>
            </div>
            <div className='flex justify-center items-center flex-col scroll-animation invisible-animation'>
              <p className='text-center custom-font-cinzel'>Dengan penuh kesyukuran, kami menjemput</p>
              <p className='text-center custom-font-cinzel'>Dato' | Datin | Tuan | Puan | Encik | Cik</p>
              <p className='text-center custom-font-cinzel'>ke majlis perkahwinan anakanda kami</p>
            </div>
            <div className='flex justify-center items-center flex-col scroll-animation invisible-animation'>
              <p className='text-center font-medium text-2xl custom-font-cinzel'>MUHAMMAD HAZIM BIN HISHAMUDDIN</p>
              <p className='default-font'>&</p>
              <p className='text-center font-medium text-2xl custom-font-cinzel'>NURLIYANA BINTI RAZALI</p>
            </div>
            <div className='w-[13rem] scroll-animation invisible-animation'>
              <img src={wedLine}/>
            </div>
          </div>
        </div>
      </section>
      <section className="w-[28rem] flex flex-col items-center pt-7" style={{ backgroundImage: `url(${backgroundImageVisible? backgroundLow : ""})`, backgroundSize: '100%', backgroundPosition: "center" }} >
        <div className='w-[240px] flex justify-center items-center flex-col gap-y-7'>
          <div className='flex justify-center items-center flex-col scroll-animation invisible-animation'>
            <p className='text-xl font-medium custom-font-cinzel'>Sabtu</p>
            <p className="text-xl font-medium custom-font-cinzel">03 May 2025</p>
            <p className='text-[15px] custom-font-cinzel mb-7'>5 Zulkaedah 1446H</p>
            <div className='w-[13rem] scroll-animation invisible-animation'>
              <img src={wedLine}/>
            </div>
          </div>
          <div className='flex justify-center items-center flex-col gap-y-7 scroll-animation invisible-animation'>
            <div className='flex justify-center items-center flex-col gap-3 scroll-animation invisible-animation'>
              <p className='font-bold custom-font-cinzel'>LOKASI MAJLIS</p>
              <p className='w-[15rem] text-center default-font'>Pasir Mas</p>
            </div>
            <div className='flex justify-center items-center flex-col gap-3 scroll-animation invisible-animation'>
                <p className='font-bold default-font custom-font-cinzel'>ATUR CARA MAJLIS</p>
              <div className='flex justify-center items-center flex-col'>
                <p className='text-center default-font'>Jamuan Makan:</p>
                <p>11.00 pagi - 5.00 petang</p>
              </div>
              <div className='flex justify-center items-center flex-col scroll-animation invisible-animation'>
                <p className='text-center default-font'>Jamuan Makan:</p>
                <p>11.00 pagi - 5.00 petang</p>
              </div>
            </div>
            <div className='w-[13rem] scroll-animation invisible-animation'>
              <img src={wedLine}/>
            </div>
          </div>
        </div>
      </section>
      <section className="w-[28rem] flex flex-col items-center pt-7" style={{ backgroundImage: `url(${backgroundImageVisible? backgroundLow : ""})`, backgroundSize: '100%', backgroundPosition: "center" }} >
        <div className='w-[240px] flex justify-center items-center flex-col gap-y-7'>
          <div className='flex justify-center items-center flex-col scroll-animation invisible-animation'>
            <div className='h-[200px] w-[200px] my-3'>
              <Slider imagesUrl={imageUrls}/>
            </div>
          </div>
          <div className='flex justify-center items-center flex-col gap-3 w-full scroll-animation invisible-animation'>
            <p className='font-bold custom-font-cinzel'>Menanti Hari</p>
            <div className='w-full'>
              <Countdown/>
            </div>
          </div>
          <div className='w-[13rem] scroll-animation invisible-animation'>
              <img src={wedLine}/>
          </div>
        </div>
      </section>
      <section className="w-[28rem] flex flex-col items-center pt-7 gap-5" style={{ backgroundImage: `url(${backgroundImageVisible? backgroundLow : ""})`, backgroundSize: '100%', backgroundPosition: "center" }} >
        <div className='font-bold custom-font-cinzel'>GUESTBOOK</div>
        <div className='w-[240px] flex justify-center items-center flex-col gap-y-7'>
          <GuestBook/> 
          <Ucapan/>
          <div className='w-[13rem] scroll-animation invisible-animation'>
              <img src={wedLine}/>
          </div>
        </div>
      </section>
      <section className="w-[28rem] h-[39rem] flex flex-col items-center pt-7 gap-5" style={{ backgroundImage: `url(${backgroundImageVisible? backgroundLow : ""})`, backgroundSize: '100%', backgroundPosition: "center" }} >
          <div className='w-[240px] flex justify-center items-center flex-col'>
            <div className='border border-black rounded-md p-5 text-lg font-base custom-font-cormorant-garamond scroll-animation invisible-animation'>
              <div>
                Ya Allah, berkatilah majlis perkahwinan ini, limpahkan baraqah dan rahmat kepada kedua mempelai ini, 
              </div>
              <div>
                Kurniakanlah mereka zuriat yang soleh dan solehah.
              </div>
              <div>
                Kekalkanlah jodoh mereka di dunia dan di akhirat dan 
                sempurnakanlah agama mereka dengan berkat ikatan ini.
              </div>
            </div>
            <div className='mt-[5rem] scroll-animation invisible-animation text-2xl custom-font-cormorant-garamond'>
                #HazimAndYanaForever
            </div>
          </div>
      </section>
    </>
  )
}

export default Content
