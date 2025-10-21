import { Outlet } from 'react-router-dom';
import Sidebar from './Seidebar';

function Driver() {
  return (
    <div className="flex flex-col h-screen md:flex-row gap-10 p-4 ">
      <Sidebar></Sidebar>
      <div className="w-full h-full  overflow-y-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Driver;
