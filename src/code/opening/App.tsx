import './App.css';
import '../../index.css';
import background from '/background/INVITATION WEDDING CARD OPENING.jpg';

function App() {

  return (
    <>
      <div
      className="w-[28rem] min-h-screen bg-black"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
      >
        <div className="absolute left-0 flex justify-center items-center flex-col h-full w-full">
          <div className="relative flex justify-center items-center flex-col gap-3 h-full w-[270px]">
            {/* First element */}
            <p
              className="w-[200px] text-lg text-center text-customOrange default-font"
              style={{
                opacity: 0, // Start as invisible
                animation: "fadeInUp 0.5s ease-out forwards",
                animationDelay: "0s",
              }}
            >
              RENJANA PUJANGGA BERTAUT
            </p>
            
            {/* Second element */}
            <div className='flex flex-col items-center'>
              <div
                style={{
                  opacity: 0, // Start as invisible
                  animation: "fadeInUp 0.5s ease-out forwards",
                  animationDelay: "0.5s",
                }}
              >
                <p className="custom-font-Ananda">Hazim</p>
              </div>

              {/* Third element */}
              <div
                style={{
                  opacity: 0, // Start as invisible
                  animation: "fadeInUp 0.5s ease-out forwards",
                  animationDelay: "1s",
                }}
              >
                <p className="custom-font-Ananda">&</p>
              </div>

              {/* Fourth element */}
              <div
                style={{
                  opacity: 0, // Start as invisible
                  animation: "fadeInUp 0.5s ease-out forwards",
                  animationDelay: "1.5s",
                }}
              >
                <p className="custom-font-Ananda">Yana</p>
              </div>
            </div>
            {/* Fifth element */}
            <div
              className="flex justify-center items-center flex-col"
              style={{
                opacity: 0, // Start as invisible
                animation: "fadeInUp 0.5s ease-out forwards",
                animationDelay: "2s",
              }}
            >
              <p className="default-font text-md">SABTU</p>
              <p className="default-font text-md">10 FEBRUARI 2025</p>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default App
