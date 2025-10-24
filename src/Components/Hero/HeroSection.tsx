import { useState } from 'react';
import { Button } from '../ui/button';
import SingUpUser from '../LoginForm';

function HeroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className=" h-full flex flex-col  bg-gray-50 p-5  md:p-15 gap-10">
      <div className=" flex items-center gap-5 ">
        <img
          src="/images/logo.png"
          alt="CargoSymc log"
          className="w-20 h-20 object-contain"
        />
        <span className="text-3xl font-semibold text-gray-800">CargoSync</span>
      </div>
      <div className="w-full flex flex-col md:flex-row  justify-between  ">
        {!open ? (
          <>
            <div className=" max-w-xl  md:text-left mb-5 md:mb-0 ">
              <h1 className="text-2xl md:text-5xl font-bold mb-4 text-gray-900 ">
                CargoSync — Die moderne Lösung für Logistikmanagement
              </h1>
              <p className="text-gray-600 mb-6 text-lg  md:text-2xl">
                Behalten Sie Ihre Lieferungen im Blick, verwalten Sie Fahrer
                effizient und optimieren Sie Ihre Aufträge – alles an einem Ort.
              </p>
              <Button onClick={() => setOpen(true)}>Jetz Starten</Button>
            </div>
            <div className=" w-full  md:w-1/2 flex justify-center ">
              <img
                src="/images/hero-cargosync.png"
                alt="CargoSync Vorschau"
                className="w-lg  md:w-2xl h-auto  object-contain"
              />
            </div>
          </>
        ) : (
          <div className="w-full flex justify-center items-center ">
            <SingUpUser />
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSection;
