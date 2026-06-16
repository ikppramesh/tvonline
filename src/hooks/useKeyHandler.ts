import { useEffect } from 'react';

type KeyAction = () => void;

interface KeyHandlers {
  onBack?: KeyAction;
  onEnter?: KeyAction;
}

export function useKeyHandler({ onBack, onEnter }: KeyHandlers) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === 'Escape' || e.key === 'Backspace') && onBack) {
        onBack();
      }
      if (e.key === 'Enter' && onEnter) {
        onEnter();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onBack, onEnter]);
}
