import { Outlet } from 'react-router-dom';
import { Sidebar, BottomNav } from './Sidebar';

export function RootLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-tv-bg">
      <Sidebar />
      <main className="flex-1 overflow-hidden relative pb-16 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
