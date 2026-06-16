import { APPS } from '../../config/apps.config';
import { AppTile } from './AppTile';

export function AppGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {APPS.map((app) => (
        <AppTile key={app.id} app={app} />
      ))}
    </div>
  );
}
