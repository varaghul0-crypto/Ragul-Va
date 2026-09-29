import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Search, 
  Lock, 
  Eye, 
  PiggyBank, 
  ArrowRight,
  Award,
  Zap
} from 'lucide-react';
import { Badge, UserStats } from '../types';
import { BADGES } from '../data/mockData';

interface GamificationCardProps {
  stats: UserStats;
  onViewAllBadges?: () => void;
}

export const GamificationCard: React.FC<GamificationCardProps> = ({
  stats,
  onViewAllBadges,
}) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const getBadgeIcon = (name: string) => {
    switch (name) {
      case 'First Safe Decision':
        return <ShieldCheck className="w-5 h-5 text-[#9B6CFF]" />;
      case 'Red Flag Hunter':
        return <Search className="w-5 h-5 text-[#FF72D2]" />;
      case 'Payment Protector':
        return <Lock className="w-5 h-5 text-[#64C98A]" />;
      case 'Scam Spotter':
        return <Eye className="w-5 h-5 text-[#78B7FF]" />;
      case 'Budget Builder':
        return <PiggyBank className="w-5 h-5 text-[#FFB86B]" />;
      default:
        return <Award className="w-5 h-5 text-[#FFD95A]" />;
    }
  };

  const currentLevelBadges = BADGES.slice(0, 5);

  return (
    <div className="soft-card p-6 bg-white">
      {/* Header with Level and XP */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#9B6CFF]">
            Level {stats.level < 10 ? `0${stats.level}` : stats.level}
          </span>
          <h4 className="font-heading font-extrabold text-lg text-[#17171C]">
            {stats.levelTitle}
          </h4>
        </div>

        <div className="w-10 h-10 rounded-2xl bg-[#FFF9E6] border border-[#FFD95A]/60 flex items-center justify-center text-[#FFB86B]">
          <Trophy className="w-5 h-5 text-[#FFD95A]" />
        </div>
      </div>

      {/* Progress to next level */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
          <span className="text-slate-500">Next Level (Lvl 09)</span>
          <span className="text-[#17171C] font-bold tabular-nums">
            {stats.currentXp} / {stats.nextLevelXp} XP
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#9B6CFF] via-[#FF72D2] to-[#FFD95A] transition-all duration-700"
            style={{ width: `${(stats.currentXp / stats.nextLevelXp) * 100}%` }}
          />
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <div className="p-3 rounded-2xl bg-[#FFF3E7] border border-orange-100/80 text-center">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
            XP Earned
          </div>
          <div className="font-heading font-extrabold text-base text-[#FF806D] flex items-center justify-center gap-1 mt-0.5 tabular-nums">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{stats.currentXp}</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-[#E8FAF1] border border-emerald-100/80 text-center">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
            Solved
          </div>
          <div className="font-heading font-extrabold text-base text-[#64C98A] flex items-center justify-center gap-1 mt-0.5 tabular-nums">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{stats.challengesCompleted}</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-[#F3EDFF] border border-purple-100/80 text-center">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
            Gain
          </div>
          <div className="font-heading font-extrabold text-base text-[#9B6CFF] flex items-center justify-center gap-1 mt-0.5 tabular-nums">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{stats.learningGainPercent}%</span>
          </div>
        </div>
      </div>

      {/* Badges Carousel / Icons */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-[#777985] uppercase tracking-wider">
            Earned Badges ({currentLevelBadges.filter(b => b.unlocked).length}/{currentLevelBadges.length})
          </span>
          {onViewAllBadges && (
            <button
              onClick={onViewAllBadges}
              className="text-xs font-bold text-[#9B6CFF] hover:underline"
            >
              View all
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-1.5">
          {currentLevelBadges.map((badge) => (
            <button
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              title={`${badge.name}: ${badge.description}`}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
                badge.unlocked
                  ? 'bg-slate-50 border-2 border-slate-200/80 hover:scale-110 hover:border-[#9B6CFF] shadow-xs'
                  : 'bg-slate-100 opacity-40 grayscale cursor-not-allowed'
              }`}
            >
              {getBadgeIcon(badge.name)}
            </button>
          ))}
        </div>

        {/* Selected badge details tooltip / modal */}
        {selectedBadge && (
          <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center justify-between font-bold text-[#17171C]">
              <span>{selectedBadge.name}</span>
              <span className="text-[10px] text-[#64C98A] font-extrabold uppercase">Unlocked</span>
            </div>
            <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
              {selectedBadge.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
