import { LogIn, LogOut, User } from 'lucide-react';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';

export function AccountPanel() {
  const { user, isAuthenticated, signIn, signOut } = useGoogleAuth();

  return (
    <div className="bg-tv-surface-2 rounded-2xl p-6 border border-tv-border">
      <h3 className="text-white font-semibold text-lg mb-4">Google Account</h3>
      <p className="text-tv-text-muted text-sm mb-6">
        Sign in with Google to use your YouTube account for higher API quota and personalised content.
      </p>

      {isAuthenticated && user ? (
        <div className="flex items-center gap-4">
          <img
            src={user.picture}
            alt={user.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <p className="text-white font-medium">{user.name}</p>
            <p className="text-tv-text-muted text-sm">{user.email}</p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 bg-tv-surface-3 border border-tv-border text-tv-text-muted rounded-xl hover:text-white hover:border-red-500 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="flex items-center gap-3 px-6 py-3 bg-tv-focus text-white rounded-xl font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-tv-focus"
        >
          <User size={18} />
          Sign in with Google
          <LogIn size={16} />
        </button>
      )}
    </div>
  );
}
