import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './code/opening/App';
import Content from './code/content/content';
import { Footer } from './code/component/footer/footer';
import { ButtonSelectionProvider } from "./code/component/footer/buttonSelection/buttonSelection";
import { Gate } from './code/component/gate/gate';

export const Main = () => {
  const [showGate, setShowGate] = useState(true); // Show the Gate initially

  const handleGateOpen = () => {
    setShowGate(false); // Hide the Gate and show the App content
  };

  return (
    <>
      <div className={`absolute top-0 left-0 w-full h-full`}>
        {/* First div (Gate) - visible */}
        <div className={`relative z-10 flex justify-center items-center flex-col  ${ showGate? "":"hidden" }`}>
          <Gate onGateOpen={handleGateOpen}>
          </Gate>
        </div>

        {/* Second div (hidden initially) */}
        <div className={`absolute top-0 left-0 w-full h-full ${ showGate? "overflow-hidden hidden":"overflow-x-hidden" }`} 
        style={{
          transition: "all 1s",
        }}>
          <div className={`flex justify-center items-center flex-col `}>
            <App/>
            <Content/>
            <Footer/>
          </div>
        </div>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ButtonSelectionProvider>
        <Main/>
    </ButtonSelectionProvider>
  </StrictMode>,
)
