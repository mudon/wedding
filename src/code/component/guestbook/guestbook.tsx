import Slider from "react-slick"; // Import Slider component from react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./guestbook.css";
import "../../../index.css";
import { useGuestWish } from "../../data-management/guestwishlist/guestwishlist";


export const GuestBook = () => {
  const { guestwishList } = useGuestWish();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <div className="w-full">
      {guestwishList.length > 0 ? (
        <Slider {...settings}>
          {guestwishList.map((guest: any, index) => (
            <div key={index} className="text-center mb-5">
              <p className="whitespace-normal break-words custom-font-marck-script text-xl">{guest.ucapan}</p>
              <p className="pt-[3px]">
                oleh <span className="font-semibold">{guest.name}</span>
              </p>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center">No guestbook entries available.</p>
      )}
    </div>
  );
};
