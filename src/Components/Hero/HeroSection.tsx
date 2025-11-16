import { useState } from 'react';
import { Button } from '../ui/button';
import SingUpUser from '../LoginForm';
import ThemaToggle from '../ThemaToggle';

function HeroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className=" dark:bg-slate-900  min-h-screen flex flex-col  bg-gray-50   md:p-15 ">
      <div className=" flex items-center justify-between ">
        <div className="flex items-center">
          <img
            src="/images/logo.png"
            alt="CargoSymc log"
            className="w-20 h-20 object-contain"
          />
          <span className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
            CargoSync
          </span>
        </div>

        <ThemaToggle></ThemaToggle>
      </div>
      <div className="w-full flex flex-col md:flex-row py-10 md:py-20 justify-between  ">
        {!open ? (
          <>
            <div className=" max-w-xl  md:text-left mb-5 md:mb-0 ">
              <h1 className="text-2xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-200 ">
                CargoSync — Die moderne Lösung für Logistikmanagement
              </h1>
              <p className="text-gray-600 mb-6 text-lg  md:text-2xl dark:text-gray-300">
                Behalten Sie Ihre Lieferungen im Blick, verwalten Sie Fahrer
                effizient und optimieren Sie Ihre Aufträge – alles an einem Ort.
              </p>
              <Button
                onClick={() => setOpen(true)}
                className="cursor-pointer"
              >
                Jetzt Starten
              </Button>
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
