export function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold text-white bg-red-600">
      <span className="w-1.5 h-1.5 rounded-full bg-white pulse-glow" />
      LIVE
    </span>
  );
}
