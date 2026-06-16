import { Outlet } from 'react-router-dom';
import { Sidebar, BottomNav } from './Sidebar';

export function RootLayout() {
  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 70% -15%, rgba(60,20,180,0.22) 0%, transparent 48%),
          radial-gradient(ellipse at -5%  90%, rgba(10,60,200,0.14) 0%, transparent 48%),
          #050509
        `,
      }}
    >
      <Sidebar />
      <main className="flex-1 overflow-hidden relative pb-16 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
