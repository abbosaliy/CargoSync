import { Outlet } from 'react-router-dom';
import Sidebar from './SeidebarDriver';

function Driver() {
  return (
    <div className="dark:bg-slate-900 duration-300 flex flex-col h-screen bg-gray-50 md:flex-row gap-10 p-4 ">
      <Sidebar></Sidebar>
      <div className="w-full h-full  overflow-y-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Driver;
