import Slider from "react-slick"; // Import Slider component from react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./guestbook.css";
import "../../../index.css";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";


// Define the type for a single guest wish entry
interface GuestWish {
  ucapan: string;
  nama: string;
}

export const GuestBook = () => {
  // Set the state with the correct type
  const [guestwishList, setGuestwishList] = useState<GuestWish[]>([]);

  const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

  const fetchData = async () => {
    try {
        const { data } = await supabase
        .from("Senarai")
        .select("*") // Adjust columns if needed
        .order("id", { ascending: false }) // Order by "id" in descending order
        .limit(6); // Limit to only the latest record        
      if (Array.isArray(data)) {
        setGuestwishList(data);
      } else {
        console.error("Expected an array but received:", data);
        setGuestwishList([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Handle errors
      setGuestwishList([]); // Fallback to an empty array
    }
  };

  useEffect(() => {
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
