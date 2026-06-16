import { AppGrid } from '../../components/launcher/AppGrid';

export function AppLauncher() {
  return (
    <div className="h-full overflow-y-auto px-4 py-5 md:px-8 md:py-8 space-y-6 fade-in">
      <div>
        <h1 className="text-white text-2xl font-bold tracking-tight mb-0.5">Apps</h1>
        <p className="text-white/35 text-sm">Launch your favourite streaming services</p>
      </div>
      <AppGrid />
    </div>
  );
}
