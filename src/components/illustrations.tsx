// Custom 3D-style SVG illustrations for psychology theme
// All gender-neutral, abstract, calming

interface IllustrationProps {
  className?: string;
}

// 3D-style brain - for NEO test (emerald/green)
export function BrainIllustration({ className = "w-full h-full" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="brainGrad" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="60%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </radialGradient>
        <radialGradient id="brainHighlight" cx="30%" cy="25%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="brainShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="8" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Shadow */}
      <ellipse cx="100" cy="175" rx="55" ry="8" fill="#000" opacity="0.12" />
      {/* Brain shape */}
      <g filter="url(#brainShadow)">
        <path
          d="M 60 80 Q 50 50 75 45 Q 85 30 110 35 Q 135 30 145 55 Q 165 60 160 85 Q 170 100 155 115 Q 155 140 130 145 Q 115 160 90 150 Q 65 155 60 130 Q 45 120 50 100 Q 45 90 60 80 Z"
          fill="url(#brainGrad)"
        />
        {/* Brain folds */}
        <path
          d="M 75 60 Q 85 70 80 85 M 100 50 Q 105 70 95 85 M 125 55 Q 130 75 120 90 M 140 80 Q 145 100 130 110 M 70 110 Q 80 120 75 135 M 100 110 Q 110 125 100 140 M 130 115 Q 140 130 125 140"
          stroke="#065f46"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Highlight */}
        <ellipse cx="80" cy="65" rx="22" ry="15" fill="url(#brainHighlight)" />
      </g>
    </svg>
  );
}

// 3D-style abstract hand reaching up - for Glasser (rose/red)
export function HandIllustration({ className = "w-full h-full" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="handGrad" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="60%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#9f1239" />
        </radialGradient>
        <radialGradient id="handHighlight" cx="30%" cy="25%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="handShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="8" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Shadow */}
      <ellipse cx="100" cy="180" rx="50" ry="7" fill="#000" opacity="0.12" />
      <g filter="url(#handShadow)">
        {/* Palm */}
        <path
          d="M 70 110 Q 60 130 70 150 Q 80 165 100 165 Q 120 165 130 150 Q 140 130 130 110 L 130 80 Q 130 70 120 70 Q 110 70 110 80 L 110 105 L 110 60 Q 110 50 100 50 Q 90 50 90 60 L 90 105 L 90 50 Q 90 40 80 40 Q 70 40 70 50 L 70 105 L 70 75 Q 70 65 60 65 Q 50 65 50 75 L 50 110 Z"
          fill="url(#handGrad)"
        />
        {/* Highlight */}
        <ellipse cx="80" cy="100" rx="15" ry="20" fill="url(#handHighlight)" />
      </g>
    </svg>
  );
}

// 3D-style abstract face/mask - for Millon (violet)
export function MaskIllustration({ className = "w-full h-full" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="maskGrad" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#d8b4fe" />
          <stop offset="60%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6b21a8" />
        </radialGradient>
        <radialGradient id="maskHighlight" cx="30%" cy="25%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="maskShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="8" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Shadow */}
      <ellipse cx="100" cy="180" rx="45" ry="7" fill="#000" opacity="0.12" />
      <g filter="url(#maskShadow)">
        {/* Mask shape */}
        <path
          d="M 60 60 Q 60 40 100 40 Q 140 40 140 60 L 140 110 Q 140 140 100 160 Q 60 140 60 110 Z"
          fill="url(#maskGrad)"
        />
        {/* Eyes (two holes) */}
        <ellipse cx="82" cy="90" rx="9" ry="12" fill="#3b0764" opacity="0.6" />
        <ellipse cx="118" cy="90" rx="9" ry="12" fill="#3b0764" opacity="0.6" />
        {/* Mouth (subtle smile) */}
        <path
          d="M 85 125 Q 100 135 115 125"
          stroke="#3b0764"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Highlight */}
        <ellipse cx="80" cy="65" rx="18" ry="12" fill="url(#maskHighlight)" />
      </g>
    </svg>
  );
}

// 3D-style abstract mind/orb - decorative
export function MindOrb({ className = "w-full h-full", color = "teal" }: IllustrationProps & { color?: "teal" | "rose" | "violet" | "amber" | "emerald" }) {
  const colorMap = {
    teal: { c1: "#7dd3fc", c2: "#0ea5e9", c3: "#0369a1", shadow: "#0c4a6e" },
    rose: { c1: "#fda4af", c2: "#f43f5e", c3: "#9f1239", shadow: "#881337" },
    violet: { c1: "#d8b4fe", c2: "#a855f7", c3: "#6b21a8", shadow: "#581c87" },
    amber: { c1: "#fde68a", c2: "#f59e0b", c3: "#b45309", shadow: "#78350f" },
    emerald: { c1: "#6ee7b7", c2: "#10b981", c3: "#047857", shadow: "#064e3b" },
  };
  const c = colorMap[color];
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`orb-${color}`} cx="35%" cy="35%">
          <stop offset="0%" stopColor={c.c1} />
          <stop offset="60%" stopColor={c.c2} />
          <stop offset="100%" stopColor={c.c3} />
        </radialGradient>
        <radialGradient id={`orb-h-${color}`} cx="30%" cy="25%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="170" rx="50" ry="6" fill={c.shadow} opacity="0.2" />
      <circle cx="100" cy="100" r="55" fill={`url(#orb-${color})`} />
      <ellipse cx="80" cy="80" rx="20" ry="14" fill={`url(#orb-h-${color})`} />
    </svg>
  );
}

// Decorative composition of floating orbs - for hero section
export function FloatingComposition({ className = "w-full h-full" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="comp-teal">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </radialGradient>
        <radialGradient id="comp-rose">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#f43f5e" />
        </radialGradient>
        <radialGradient id="comp-violet">
          <stop offset="0%" stopColor="#d8b4fe" />
          <stop offset="100%" stopColor="#a855f7" />
        </radialGradient>
        <radialGradient id="comp-amber">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        <radialGradient id="comp-emerald">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#10b981" />
        </radialGradient>
      </defs>
      {/* Large teal orb */}
      <circle cx="100" cy="120" r="50" fill="url(#comp-teal)" opacity="0.85" />
      {/* Smaller orbs */}
      <circle cx="200" cy="80" r="28" fill="url(#comp-emerald)" opacity="0.85" />
      <circle cx="280" cy="180" r="35" fill="url(#comp-rose)" opacity="0.85" />
      <circle cx="160" cy="200" r="22" fill="url(#comp-amber)" opacity="0.85" />
      <circle cx="330" cy="80" r="18" fill="url(#comp-teal)" opacity="0.7" />
      {/* Highlights */}
      <ellipse cx="85" cy="105" rx="14" ry="9" fill="#ffffff" opacity="0.5" />
      <ellipse cx="190" cy="70" rx="8" ry="5" fill="#ffffff" opacity="0.5" />
      <ellipse cx="270" cy="170" rx="10" ry="6" fill="#ffffff" opacity="0.5" />
      <ellipse cx="155" cy="193" rx="6" ry="4" fill="#ffffff" opacity="0.5" />
    </svg>
  );
}
