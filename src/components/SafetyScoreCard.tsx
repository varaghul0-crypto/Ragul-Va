import React from 'react';
import { TrendingUp, ShieldCheck, HelpCircle } from 'lucide-react';
import { UserStats } from '../types';

interface SafetyScoreCardProps {
  stats: UserStats;
}

export const SafetyScoreCard: React.FC<SafetyScoreCardProps> = ({ stats }) => {
  const score = stats.safetyScore;
  const radius = 64;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const categories = [
    { label: 'Scam Recognition', score: stats.categoryScores.scamRecognition, color: '#9B6CFF', bg: '#F3EDFF' },
    { label: 'Payment Safety', score: stats.categoryScores.paymentSafety, color: '#64C98A', bg: '#E8FAF1' },
    { label: 'Budget Awareness', score: stats.categoryScores.budgetAwareness, color: '#FFB86B', bg: '#FFF3E7' },
    { label: 'Loan Awareness', score: stats.categoryScores.loanAwareness, color: '#78B7FF', bg: '#E9F6FD' },
  ];

  return (
    <div className="soft-card p-6 bg-white flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#777985]">
            Safety Score
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-[#64C98A] bg-[#E8FAF1] px-2.5 py-0.5 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{stats.scoreGainWeek} this week</span>
          </span>
        </div>

        {/* Circular Progress Gauge */}
        <div className="flex flex-col items-center justify-center my-3 relative">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#F1F3F7"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Animated Gradient Progress Circle */}
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9B6CFF" />
                <stop offset="60%" stopColor="#C9A7FF" />
                <stop offset="100%" stopColor="#64C98A" />
              </linearGradient>
            </defs>
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#scoreGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Score Readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-heading font-extrabold text-4xl text-[#17171C] leading-none tabular-nums">
              {score}
            </span>
            <span className="text-xs font-bold text-[#777985] mt-1">
              / 100
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9B6CFF] mt-1">
              High Safety Level
            </span>
          </div>
        </div>

        <p className="text-center text-xs text-[#777985] font-medium mb-5 px-2">
          Calculated from {stats.challengesCompleted} scenario decisions across payment, loan and message labs.
        </p>

        {/* Breakdown Progress Bars */}
        <div className="space-y-3.5 pt-3 border-t border-slate-100">
          {categories.map((cat) => (
            <div key={cat.label}>
              <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
                <span className="text-slate-700">{cat.label}</span>
                <span className="text-[#17171C] font-bold tabular-nums">{cat.score}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${cat.score}%`,
                    backgroundColor: cat.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Golden Student Safety Tip */}
      <div className="mt-5 p-3 rounded-2xl bg-gradient-to-r from-[#F3EDFF] to-[#FFEAF6] border border-purple-100/70 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#9B6CFF] mb-1">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Campus Safety Principle</span>
        </div>
        <p className="text-slate-700 text-[11px] leading-relaxed">
          PIN is required ONLY when money leaves your bank. You never enter PIN to accept money or refunds.
        </p>
      </div>
    </div>
  );
};
