import { APPS } from '../../config/apps.config';
import { AppTile } from './AppTile';

export function AppGrid() {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-5 sm:gap-6">
      {APPS.map((app) => (
        <AppTile key={app.id} app={app} />
      ))}
    </div>
  );
}
