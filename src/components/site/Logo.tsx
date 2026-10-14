// Placeholder logo (circle + flower). Replace with the real logo file.
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
      />
      <g fill="var(--rose)">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <ellipse
            key={r}
            cx="32"
            cy="20"
            rx="5"
            ry="10"
            transform={`rotate(${r} 32 32)`}
            opacity="0.85"
          />
        ))}
      </g>
      <circle cx="32" cy="32" r="5" fill="var(--saffron)" />
    </svg>
  );
}

export function Mandala({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <g fill="none" stroke="var(--primary)" strokeWidth="1.2" opacity="0.9">
        {[180, 150, 120, 90].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} />
        ))}
      </g>
      <g fill="var(--rose)" opacity="0.18">
        {Array.from({ length: 16 }, (_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="75"
            rx="18"
            ry="50"
            transform={`rotate(${i * 22.5} 200 200)`}
          />
        ))}
      </g>
      <g fill="none" stroke="var(--rose)" strokeWidth="1.5">
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="140"
            rx="14"
            ry="42"
            transform={`rotate(${i * 30} 200 200)`}
          />
        ))}
      </g>
      <g fill="var(--saffron)">
        {Array.from({ length: 24 }, (_, i) => (
          <circle
            key={i}
            cx="200"
            cy="15"
            r="4"
            transform={`rotate(${i * 15} 200 200)`}
          />
        ))}
      </g>
      <circle cx="200" cy="200" r="34" fill="var(--saffron)" opacity="0.9" />
      <circle cx="200" cy="200" r="16" fill="var(--primary)" />
    </svg>
  );
}
