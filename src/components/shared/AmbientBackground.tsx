interface AmbientBackgroundProps {
  color: string;
}

export function AmbientBackground({ color }: AmbientBackgroundProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none transition-all duration-1000"
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${color}40 0%, transparent 70%)`,
        zIndex: 0,
      }}
    />
  );
}
