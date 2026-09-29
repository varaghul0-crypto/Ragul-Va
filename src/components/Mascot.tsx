import React from 'react';

interface MascotProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  variant?: 'shield' | 'celebrate' | 'magnify' | 'alert' | 'thinking';
  className?: string;
  showStickers?: boolean;
}

export const Mascot: React.FC<MascotProps> = ({
  size = 'md',
  variant = 'shield',
  className = '',
  showStickers = true,
}) => {
  const dimensions = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    hero: 'w-48 h-48 md:w-56 md:h-56',
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${dimensions} ${className}`}>
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A7FF]/25 via-[#FF72D2]/20 to-[#9BE7C1]/30 rounded-full blur-xl scale-95" />

      {/* Floating Stickers / Sparkles */}
      {showStickers && (
        <>
          {/* Top-Right Star */}
          <div className="absolute -top-1 -right-1 text-[#FFD95A] animate-pulse">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.4 8.6L21 9.2L16 13.8L17.5 20.4L12 17L6.5 20.4L8 13.8L3 9.2L9.6 8.6L12 2Z" />
            </svg>
          </div>

          {/* Bottom-Left Sparkle */}
          <div className="absolute -bottom-1 -left-1 text-[#9B6CFF] opacity-80">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" />
            </svg>
          </div>

          {/* Floating Pastel Bubble */}
          {variant === 'alert' && (
            <div className="absolute -top-3 left-0 bg-[#FF806D] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
              Caution!
            </div>
          )}
          {variant === 'celebrate' && (
            <div className="absolute -top-3 right-0 bg-[#64C98A] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
              +50 XP
            </div>
          )}
        </>
      )}

      {/* Main Mascot SVG */}
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-md overflow-visible relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="20" y1="20" x2="140" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EDE5FF" />
            <stop offset="0.6" stopColor="#D9C2FF" />
            <stop offset="1" stopColor="#C9A7FF" />
          </linearGradient>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="40" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9B6CFF" />
            <stop offset="1" stopColor="#78B7FF" />
          </linearGradient>
          <linearGradient id="bellyGrad" x1="50" y1="60" x2="110" y2="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#F5EEFF" />
          </linearGradient>
          <linearGradient id="earGrad" x1="0" y1="0" x2="20" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF72D2" />
            <stop offset="1" stopColor="#FFA6E3" />
          </linearGradient>
        </defs>

        {/* Mascot Ears / Feathers */}
        <path d="M40 50 C28 20 52 14 62 36 Z" fill="url(#bodyGrad)" />
        <path d="M44 46 C36 28 50 24 56 38 Z" fill="url(#earGrad)" opacity="0.8" />
        <path d="M120 50 C132 20 108 14 98 36 Z" fill="url(#bodyGrad)" />
        <path d="M116 46 C124 28 110 24 104 38 Z" fill="url(#earGrad)" opacity="0.8" />

        {/* Mascot Head & Body (Cute Round Chibi) */}
        <ellipse cx="80" cy="85" rx="54" ry="50" fill="url(#bodyGrad)" />

        {/* Soft Tummy Patch */}
        <ellipse cx="80" cy="98" rx="36" ry="32" fill="url(#bellyGrad)" />

        {/* Rosy Cheeks */}
        <circle cx="48" cy="88" r="9" fill="#FF72D2" opacity="0.35" />
        <circle cx="112" cy="88" r="9" fill="#FF72D2" opacity="0.35" />

        {/* Big Expressive Anime Eyes */}
        <circle cx="62" cy="74" r="8.5" fill="#17171C" />
        <circle cx="60" cy="71" r="3" fill="#FFFFFF" />
        <circle cx="64" cy="76" r="1.5" fill="#FFFFFF" />

        <circle cx="98" cy="74" r="8.5" fill="#17171C" />
        <circle cx="96" cy="71" r="3" fill="#FFFFFF" />
        <circle cx="100" cy="76" r="1.5" fill="#FFFFFF" />

        {/* Cute Mascot Beak / Smile */}
        <path d="M74 81 Q80 88 86 81 Q80 84 74 81 Z" fill="#FFB86B" />

        {/* Friendly Graduation / Student Cap */}
        <path d="M80 16 L124 30 L80 44 L36 30 Z" fill="#2A1B4E" />
        <path d="M60 40 L60 52 C60 62 100 62 100 52 L100 40 Z" fill="#3D296F" />
        {/* Cap Tassel */}
        <circle cx="80" cy="28" r="3" fill="#FFD95A" />
        <path d="M80 28 Q118 32 122 48" stroke="#FFD95A" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="122" cy="50" r="3" fill="#FFD95A" />

        {/* Variant: Protective Shield in Arm */}
        {variant === 'shield' && (
          <g transform="translate(98, 70)">
            <path
              d="M18 4 C32 4 36 10 36 24 C36 38 20 48 18 50 C16 48 0 38 0 24 C0 10 4 4 18 4 Z"
              fill="url(#shieldGrad)"
              filter="drop-shadow(0 3px 6px rgba(155, 108, 255, 0.4))"
            />
            {/* Glowing checkmark on shield */}
            <path
              d="M11 25 L16 30 L26 19"
              stroke="#FFFFFF"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Variant: Magnifying Glass */}
        {variant === 'magnify' && (
          <g transform="translate(100, 68)">
            <circle cx="16" cy="16" r="14" fill="#FFFFFF" stroke="#9B6CFF" strokeWidth="4" />
            <path d="M26 26 L38 38" stroke="#9B6CFF" strokeWidth="5" strokeLinecap="round" />
            <circle cx="16" cy="16" r="8" fill="#E8FAF1" />
            <path d="M13 13 L19 19" stroke="#64C98A" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* Variant: Alert Warning Sign */}
        {variant === 'alert' && (
          <g transform="translate(102, 65)">
            <polygon points="18,4 34,34 2,34" fill="#FF806D" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="18" y1="14" x2="18" y2="24" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <circle cx="18" cy="29" r="1.8" fill="#FFFFFF" />
          </g>
        )}

        {/* Variant: Celebrating with Confetti */}
        {variant === 'celebrate' && (
          <g transform="translate(20, 20)">
            <circle cx="10" cy="10" r="3" fill="#FF72D2" />
            <circle cx="110" cy="8" r="4" fill="#FFD95A" />
            <circle cx="118" cy="30" r="3" fill="#64C98A" />
            <path d="M8 28 L14 34" stroke="#78B7FF" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* Feet / Paws */}
        <ellipse cx="64" cy="132" rx="10" ry="6" fill="#FFB86B" />
        <ellipse cx="96" cy="132" rx="10" ry="6" fill="#FFB86B" />
      </svg>
    </div>
  );
};
