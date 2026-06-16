import { AppGrid } from '../../components/launcher/AppGrid';

export function AppLauncher() {
  return (
    <div className="h-full overflow-y-auto px-6 py-6 space-y-6 fade-in">
      <div>
        <h1 className="text-white text-2xl font-bold mb-1">Apps</h1>
        <p className="text-tv-text-muted text-sm">Launch your favourite streaming services</p>
      </div>
      <AppGrid />
    </div>
  );
}
