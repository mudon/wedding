import Slider from "react-slick"; // Import Slider component from react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./guestbook.css";
import "../../../index.css";
import { useEffect, useState } from "react";

// Define the type for a single guest wish entry
interface GuestWish {
  ucapan: string;
  nama: string;
}

export const GuestBook = () => {
  // Set the state with the correct type
  const [guestwishList, setGuestwishList] = useState<GuestWish[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://wed-service.onrender.com/kehadiran', {
          method: 'GET',
        });
        const data = await response.json(); // Parse the response as JSON
        console.log(data.data); // Log the fetched data

        // Ensure the fetched data is an array of GuestWish objects
        if (Array.isArray(data.data)) {
          setGuestwishList(data.data);
        } else {
          console.error("Expected an array but received:", data);
          setGuestwishList([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching data:", error); // Handle errors
        setGuestwishList([]); // Fallback to an empty array
      }
    };

    fetchData(); // Call the async function
  }, []);

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
