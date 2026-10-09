export default function BasketArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="ফলমূল ও সবজিভরা ঝুড়ি"
    >
      <ellipse cx="160" cy="214" rx="104" ry="12" fill="#14231a" opacity="0.08" />
      {/* leaves & stems */}
      <path d="M150 70c-6-20-2-34 6-44" stroke="#2a7d3b" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M205 62c4-18 14-28 26-32" stroke="#2a7d3b" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* produce */}
      <circle cx="152" cy="108" r="40" fill="#ef4444" />
      <ellipse cx="138" cy="94" rx="9" ry="14" fill="#fff" opacity="0.35" />
      <circle cx="214" cy="100" r="42" fill="#22c55e" />
      <ellipse cx="200" cy="84" rx="9" ry="14" fill="#fff" opacity="0.3" />
      <circle cx="108" cy="140" r="22" fill="#a855f7" />
      <circle cx="262" cy="136" r="22" fill="#f59e0b" />
      <circle cx="186" cy="146" r="22" fill="#f97316" />
      {/* basket */}
      <path d="M78 152h164l-14 56a10 10 0 0 1-9.7 7.6H101.700a10 10 0 0 1-9.700-7.600z" fill="#b45309" />
      <rect x="70" y="140" width="180" height="20" rx="4" fill="#92400e" />
      <g stroke="#78350f" strokeWidth="3" opacity="0.55">
        <path d="M112 162v50M144 162v52M176 162v52M208 162v50" />
      </g>
    </svg>
  );
}
