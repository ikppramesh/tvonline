export function LiveBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white tracking-wide"
      style={{ background: 'rgba(255,55,95,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,80,110,0.4)' }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white pulse-glow" />
      LIVE
    </span>
  );
}
