import {
  useButtonSelection,
  BottomNavBarItem,
} from "./buttonSelection/buttonSelection";
import { IconButton } from "../iconButton/iconButton";
import { PiListHeart } from "react-icons/pi";
import { LuCalendarHeart } from "react-icons/lu";
import { GrMapLocation } from "react-icons/gr";
import { IoPeopleSharp } from "react-icons/io5";
import { GiCardPlay } from "react-icons/gi";
import { TbMessage2Up } from "react-icons/tb";
import { Calendar } from "./calendar/calendar";
import { Location } from "./location/location";
import { TnG } from "./tng/tng";
import { Call } from "./call/call";
import { RVSP } from "./rsvp/rvsp";
import { ShopeeGiftLink } from "./shopee/shopee";

export const Footer = () => {
  const { buttonSelection, setButtonSelection } = useButtonSelection();

  function handleButtonClick(item: BottomNavBarItem) {
    setButtonSelection((prevSelection) => (prevSelection === item ? 0 : item));
  }

  const listNavButton = [
    {
      iconImage: <LuCalendarHeart />,
      title: "Kalendar",
      item: BottomNavBarItem.Calendar,
      childNode: <Calendar />,
    },
    {
      iconImage: <GrMapLocation />,
      title: "Lokasi",
      item: BottomNavBarItem.Location,
      childNode: <Location />,
    },
    {
      iconImage: <IoPeopleSharp />,
      title: "Hubungi",
      item: BottomNavBarItem.Call,
      childNode: <Call />,
    },
    {
      iconImage: <GiCardPlay />,
      title: "Gift",
      item: BottomNavBarItem.TNG,
      childNode: <TnG />,
    },
    {
      iconImage: <TbMessage2Up />,
      title: "Rvsp",
      item: BottomNavBarItem.RVSP,
      childNode: <RVSP />,
    },
    {
      iconImage: <PiListHeart />,
      title: "Wish List",
      item: BottomNavBarItem.SHOPEE,
      childNode: <ShopeeGiftLink />,
    },
  ];

  return (
    <div
      className="fixed bottom-0 p-3 h-[4rem] bg-[#cf5951] text-white flex justify-around items-center rounded-[30px] w-[25rem]"
      style={{ boxShadow: " 0 0 7px 3px rgba(0, 0, 0, 0.6)" }}
    >
      {/* <div className="fixed bottom-0 h-[4rem] w-full max-w-[400px] bg-[#cf5951] text-white flex justify-around items-center rounded-[30px] px-4" style={{ boxShadow: ' 0 0 7px 3px rgba(0, 0, 0, 0.6)' }}> */}
      {listNavButton.map((navButton) => (
        <IconButton
          key={navButton.item}
          iconImage={navButton.iconImage}
          title={navButton.title}
          clickFunc={() => handleButtonClick(navButton.item)}
          isSelected={buttonSelection === navButton.item}
          children={navButton.childNode}
        />
      ))}
    </div>
  );
};
