import { useState } from 'react';
import { Key, Eye, EyeOff, Save, ExternalLink } from 'lucide-react';

const STORAGE_KEY = 'tvonline-yt-api-key';

export function ApiKeyPanel() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    localStorage.setItem(STORAGE_KEY, apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="bg-tv-surface-2 rounded-2xl p-6 border border-tv-border">
      <div className="flex items-center gap-3 mb-4">
        <Key size={20} className="text-tv-focus" />
        <h3 className="text-white font-semibold text-lg">YouTube API Key</h3>
      </div>

      <p className="text-tv-text-muted text-sm mb-4">
        Required for Live TV channels. Get your free key from Google Cloud Console.
      </p>

      <a
        href="https://console.cloud.google.com/apis/credentials"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-tv-focus text-sm hover:underline mb-5"
      >
        Get API Key <ExternalLink size={14} />
      </a>

      <div className="flex gap-3 mt-2">
        <div className="relative flex-1">
          <input
            type={show ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-tv-surface-3 border border-tv-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-tv-text-muted focus:outline-none focus:border-tv-focus"
          />
          <button
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-tv-text-muted hover:text-white"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all focus:outline-none ${
            saved
              ? 'bg-green-600 text-white'
              : 'bg-tv-focus text-white hover:bg-blue-600'
          }`}
        >
          <Save size={16} />
          {saved ? 'Saved!' : 'Save'}
        </button>
      </div>

      <p className="text-tv-text-muted text-xs mt-3">
        Note: The API key in <code className="text-tv-focus">.env</code> file takes precedence over this setting.
      </p>
    </div>
  );
}
