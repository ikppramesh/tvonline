import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../components/layout/RootLayout';
import { Home } from '../pages/Home/Home';
import { LiveTV } from '../pages/LiveTV/LiveTV';
import { AppLauncher } from '../pages/AppLauncher/AppLauncher';
import { Player } from '../pages/Player/Player';
import { Search } from '../pages/Search/Search';
import { Settings } from '../pages/Settings/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'live', element: <LiveTV /> },
      { path: 'live/:category', element: <LiveTV /> },
      { path: 'apps', element: <AppLauncher /> },
      // type = 'ch' (channel live embed) | 'v' (specific video)
      { path: 'player/:type/:id', element: <Player /> },
      { path: 'search', element: <Search /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);
