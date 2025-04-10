import googleCalendar from '../../../../assets/icon components/icons8-google-calendar.svg'
import appleCalendar from '../../../../assets/icon components/icons8-apple-calendar.svg'

const centerItem = "w-full flex justify-center items-center";
const centerCol = `${centerItem} flex-col`;

export const Calendar = () => {
 
  const formatDateToGoogleCalendar = (date: Date) => {
    const localDate = new Date(date); // Convert to local time
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');
    const seconds = String(localDate.getSeconds()).padStart(2, '0');
  
    // Format: YYYYMMDDTHHMMSS+0800
    return `${year}${month}${day}T${hours}${minutes}${seconds}+0800`;
  };

  const startDate = new Date(2025, 4, 3, 11, 0);
  const endDate = new Date(2025, 4, 3, 16, 0);

  const formattedStartDate = formatDateToGoogleCalendar(startDate);
  const formattedEndDate = formatDateToGoogleCalendar(endDate);
  const title = "Wedding of Hazim & Yana";
  const location = "Dewan Jubli Perak Kuala Kangsar, Jalan Raja Idris, 33000 Kuala Kangsar, Perak, 10c, Persiaran Perbandaran, Bandar Baru, 33000 Kuala Kangsar, Perak";

  const openGoogleCalendar = () => {
    const params = new URLSearchParams({
      action: "TEMPLATE", // Ensures the event creation screen opens
      text: title, // Event title
      details: "", // Event description
      location: location, // Event location
      dates: `${formattedStartDate}/${formattedEndDate}`, // Start and end dates
    });
  
    const calendarUrl = `https://www.google.com/calendar/render?${params.toString()}`;
    window.open(calendarUrl, "_blank");
  };

  const openAppleCalendar = () => {
    const formatDate = (date: Date) => {
      const pad = (num: number) => String(num).padStart(2, "0");
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1); // Months are 0-based
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());
      return `${year}${month}${day}T${hours}${minutes}${seconds}`;
    };

    const icsContent = `
      BEGIN:VCALENDAR
      VERSION:2.0
      BEGIN:VEVENT
      UID:${Date.now()}@example.com
      DTSTAMP:${formatDate(new Date())}Z
      DTSTART;TZID=Asia/Kuala_Lumpur:${formatDate(startDate)}
      DTEND;TZID=Asia/Kuala_Lumpur:${formatDate(endDate)}
      SUMMARY:${title}
      DESCRIPTION:${""}
      LOCATION:${location}
      END:VEVENT
      END:VCALENDAR
      `.trim();

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to download the file
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/\s+/g, "_")}.ics`;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
      <div className="h-full flex justify-evenly p-3">
        <div className={centerItem}>
          <button className={centerCol} onClick={openGoogleCalendar}>
            <img src={googleCalendar} alt="google-calendar" className='max-w-[24px]'/>
            <span className='text-black text-sm default-font'>Google Calendar</span>
          </button>
        </div>
        <div className={centerItem}>
          <button className={centerCol} onClick={openAppleCalendar}>
            <img src={appleCalendar} alt="iphone-calendar" className='max-w-[24px]'/>
            <span className='text-black text-sm default-font'>Iphone Calendar</span>
          </button> 
        </div>
      </div>
    );
};