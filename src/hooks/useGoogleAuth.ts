import { useGoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';

export function useGoogleAuth() {
  const { user, accessToken, setAuth, clearAuth } = useAuthStore();

  const signIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        setAuth(
          {
            name: data.name,
            email: data.email,
            picture: data.picture,
            sub: data.sub,
          },
          tokenResponse.access_token
        );
      } catch (err) {
        console.error('Failed to fetch user info', err);
      }
    },
    onError: (err) => console.error('Google login failed', err),
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
  });

  return {
    user,
    accessToken,
    isAuthenticated: !!user,
    signIn,
    signOut: clearAuth,
  };
}
