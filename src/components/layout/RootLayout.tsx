import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function RootLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-tv-bg">
      <Sidebar />
      <main className="flex-1 overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
}
