import googleMaps from '../../../../assets/icon components/icons8-google-maps.svg'
import waze from '../../../../assets/icon components/icons8-waze.svg'

const centerItem = "w-full flex justify-center items-center";
const centerCol = `${centerItem} flex-col`;

export const Location = () => {
  const location = "Dewan Jubli Perak Kuala Kangsar, Jalan Raja Idris, 33000 Kuala Kangsar, Perak, 10c, Persiaran Perbandaran, Bandar Baru, 33000 Kuala Kangsar, Perak";

  function openGoogleMap(){
    const locationUrl = `https://www.google.com/maps?q=${encodeURIComponent(location)}`
    window.open(locationUrl, "_blank");
  }
  function openWaze() {
    const location = "Kuala Lumpur, Malaysia"; // Replace with your desired location
    const wazeUrl = `https://www.waze.com/ul?q=${encodeURIComponent(location)}&navigate=yes`;
    window.open(wazeUrl, "_blank");
  }

  return (
    <div className="h-full flex justify-evenly p-3">
    <div className={centerItem}>
      <button className={centerCol} onClick={openGoogleMap}>
        <img src={googleMaps} alt="google-calendar" className='max-w-[24px]'/>
        <span className='text-black text-sm default-font'>Google Map</span>
      </button>
    </div>
    <div className={centerItem}>
      <button className={centerCol} onClick={openWaze}>
        <img src={waze} alt="iphone-calendar" className='max-w-[24px]'/>
        <span className='text-black text-sm default-font'>Waze</span>
      </button> 
    </div>
  </div>
  );
};