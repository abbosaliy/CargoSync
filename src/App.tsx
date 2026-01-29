import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Driver from './Components/DriverDashboard/Driver';
import Disponent from './Components/DisponentDashboard/Disponent';
import CreateOrder from './Components/DisponentDashboard/CreateOrder';
import ProfileData from './Components/DisponentDashboard/Profile/ProfilesData';
import UberApp from './Components/UberApp/UberApp';
import EditProfile from './Components/DisponentDashboard/Profile/EditProfile';
import { Toaster } from 'sonner';
import ProfilesInfo from './Components/DriverDashboard/Profile/ProfilesInfo';
import EditProfilesInfo from './Components/DriverDashboard/Profile/EditProfilesInfo';
import CompletedLoads from './Components/DisponentDashboard/CompletedLoads';
import ActiveLoads from './Components/DisponentDashboard/ActiveLoad/ActiveLoads';
import LoadListe from './Components/DriverDashboard/LoadListe';
import LoadDetails from './Components/DriverDashboard/LoadDetails';
import EditLoads from './Components/DisponentDashboard/ActiveLoad/EditActiveLoads';

import Rooute from './Components/routes/Root';
import HeroSection from './Components/Hero/HeroSection';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Rooute />,
        children: [
          {
            index: true,
            element: <HeroSection />,
          },
          {
            path: 'fahrer-dashboard',
            element: <Driver />,
            children: [
              {
                index: true,
                element: <LoadListe />,
              },
              {
                path: 'auftrage',
                element: <LoadListe />,
              },
              { path: 'auftrage/:id', element: <LoadDetails /> },
              {
                path: 'personliche-info',
                children: [
                  {
                    index: true,
                    element: <ProfilesInfo />,
                  },
                  {
                    path: 'bearbeiten',
                    element: <EditProfilesInfo />,
                  },
                ],
              },

              {
                path: 'uber-app',
                element: <UberApp />,
              },
            ],
          },
          {
            path: 'disponent-dashboard',
            element: <Disponent />,
            children: [
              {
                index: true,
                element: <CreateOrder />,
              },
              {
                index: true,
                path: 'auftrag-erstellen',
                element: <CreateOrder />,
              },
              {
                path: 'offene-aufträge',
                children: [
                  {
                    index: true,
                    element: <ActiveLoads />,
                  },
                  {
                    path: 'bearbeiten/:id',
                    element: <EditLoads />,
                  },
                ],
              },
              {
                path: 'erledigkte-aufträge',
                element: <CompletedLoads />,
              },
              {
                path: 'personliche-data',
                children: [
                  {
                    index: true,
                    element: <ProfileData />,
                  },
                  {
                    path: 'bearbeiten',
                    element: <EditProfile />,
                  },
                ],
              },
              {
                path: 'uber-app',
                element: <UberApp />,
              },
            ],
          },
        ],
      },
    ],
    {
      basename: '/CargoSync"',
    },
  );
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        richColors
      />
    </>
  );
}

export default App;
