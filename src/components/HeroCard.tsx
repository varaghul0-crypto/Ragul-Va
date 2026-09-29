import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Mascot } from './Mascot';

interface HeroCardProps {
  onStartSimulation: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({ onStartSimulation }) => {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-pastel-hero border border-purple-200/50 p-6 md:p-8 shadow-[0_8px_30px_rgba(155,108,255,0.08)]">
      {/* Decorative background blurs */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF72D2]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#9B6CFF]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left max-w-md">
          {/* Subtle educational kicker */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#9B6CFF] mb-2 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Safety Simulation</span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl md:text-3xl lg:text-4xl text-[#17171C] leading-tight">
            Learn Before <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B6CFF] via-[#FF72D2] to-[#FF806D]">
              You Pay.
            </span>
          </h2>

          <p className="mt-3 text-sm md:text-base text-[#777985] font-medium leading-relaxed">
            Practice identifying deceptive payment requests, suspicious messages, and predatory loans inside safe synthetic simulations.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartSimulation}
              className="group flex items-center gap-2.5 px-6 py-3 bg-[#9B6CFF] hover:bg-[#8854F5] active:scale-[0.98] text-white rounded-2xl font-bold text-sm transition-all shadow-[0_6px_20px_rgba(155,108,255,0.35)]"
            >
              <span>Launch Simulator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white/80 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-white/60">
              <ShieldCheck className="w-4 h-4 text-[#64C98A]" />
              <span>Synthetic · 0 Risk</span>
            </div>
          </div>
        </div>

        {/* Playful FinSafe Mascot */}
        <div className="relative shrink-0 flex items-center justify-center">
          <Mascot size="hero" variant="shield" showStickers={true} />
        </div>
      </div>
    </div>
  );
};
