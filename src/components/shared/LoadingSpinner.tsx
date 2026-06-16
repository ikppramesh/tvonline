export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} rounded-full border-2 border-tv-surface-3 border-t-tv-focus animate-spin`}
      />
    </div>
  );
}
