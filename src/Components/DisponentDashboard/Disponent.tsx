import { Outlet } from 'react-router-dom';
import SidebarDiponenten from './SeidebarDisponent';

function Disponent() {
  return (
    <div className="flex  flex-col h-screen md:flex-row bg-gray-50  p-4 gap-10">
      <SidebarDiponenten />
      <div className="w-full h-full overflow-y-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
export default Disponent;
