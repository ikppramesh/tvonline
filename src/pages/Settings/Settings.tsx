import { AccountPanel } from '../../components/settings/AccountPanel';
import { Info, Tv, ExternalLink } from 'lucide-react';

export function Settings() {
  return (
    <div className="h-full overflow-y-auto px-6 py-6 space-y-6 fade-in">
      <div>
        <h1 className="text-white text-2xl font-bold mb-1">Settings</h1>
        <p className="text-tv-text-muted text-sm">Configure your TVOnline experience</p>
      </div>

      {/* Google Account */}
      <AccountPanel />

      {/* How it works */}
      <div className="bg-tv-surface-2 rounded-2xl p-6 border border-tv-border space-y-4">
        <div className="flex items-center gap-3">
          <Tv size={20} className="text-tv-focus" />
          <h3 className="text-white font-semibold text-lg">How Live TV works</h3>
        </div>
        <ul className="space-y-2 text-sm text-tv-text-muted list-disc list-inside">
          <li>All channels open directly on YouTube — no API key required</li>
          <li>Click any channel card to open its live page in a new tab</li>
          <li>Sign in with Google for personalised YouTube recommendations</li>
          <li>Use Search to find any YouTube channel or live stream</li>
        </ul>
      </div>

      {/* About */}
      <div className="bg-tv-surface-2 rounded-2xl p-6 border border-tv-border">
        <div className="flex items-center gap-3 mb-3">
          <Info size={20} className="text-tv-text-muted" />
          <h3 className="text-white font-semibold text-lg">About</h3>
        </div>
        <div className="space-y-3 text-sm text-tv-text-muted">
          <p>TVOnline — a Chromecast-inspired web TV OS</p>
          <p>Navigate with arrow keys · Enter to select · Esc to go back</p>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-tv-focus hover:underline w-fit"
          >
            Open YouTube <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
