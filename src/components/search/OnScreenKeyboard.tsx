interface OnScreenKeyboardProps {
  onKey: (key: string) => void;
}

const ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ['SPACE', 'BACKSPACE'],
];

export function OnScreenKeyboard({ onKey }: OnScreenKeyboardProps) {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1 sm:gap-2 justify-center flex-wrap">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKey(key)}
              className={`${
                key === 'SPACE'
                  ? 'px-6 sm:px-10'
                  : key === 'BACKSPACE'
                  ? 'px-4 sm:px-6'
                  : 'w-8 sm:w-10'
              } h-8 sm:h-10 bg-tv-surface-2 border border-tv-border rounded-lg text-white text-xs sm:text-sm font-medium hover:bg-tv-surface-3 hover:border-tv-focus focus:outline-none focus:border-tv-focus transition-all duration-150`}
            >
              {key === 'SPACE' ? '⎵' : key === 'BACKSPACE' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
