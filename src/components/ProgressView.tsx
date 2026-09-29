import React, { useState } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  Lock, 
  Eye, 
  PiggyBank, 
  Award,
  Calendar,
  Sparkles,
  Download,
  Share2,
  Zap,
  Target
} from 'lucide-react';
import { BADGES } from '../data/mockData';
import { UserStats, Badge } from '../types';
import { Mascot } from './Mascot';

interface ProgressViewProps {
  stats: UserStats;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ stats }) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const getBadgeIcon = (name: string) => {
    switch (name) {
      case 'First Safe Decision':
        return <ShieldCheck className="w-6 h-6 text-[#9B6CFF]" />;
      case 'Red Flag Hunter':
        return <Search className="w-6 h-6 text-[#FF72D2]" />;
      case 'Payment Protector':
        return <Lock className="w-6 h-6 text-[#64C98A]" />;
      case 'Scam Spotter':
        return <Eye className="w-6 h-6 text-[#78B7FF]" />;
      case 'Budget Builder':
        return <PiggyBank className="w-6 h-6 text-[#FFB86B]" />;
      case 'Simulation Master':
        return <Target className="w-6 h-6 text-[#FF806D]" />;
      default:
        return <Award className="w-6 h-6 text-[#FFD95A]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-[#9B6CFF] uppercase tracking-wider block">
            Student Financial Safety Milestones
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#17171C]">
            Learning Progress & Badges
          </h2>
          <p className="text-sm text-[#777985] mt-1">
            Track your simulation history, earned credentials, and safety readiness score.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="px-3.5 py-1.5 rounded-full bg-[#F3EDFF] text-[#9B6CFF] text-xs font-bold border border-purple-200">
            Level 08 · Safety Explorer
          </div>
        </div>
      </div>

      {/* Hero Overview Card */}
      <div className="soft-card p-6 md:p-8 bg-white border-2 border-purple-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-md">
          <div className="flex items-center gap-2 text-xs font-bold text-[#9B6CFF] mb-1">
            <Sparkles className="w-4 h-4 text-[#9B6CFF]" />
            <span>Interactive Safety Simulation</span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-[#17171C]">
            Level {stats.level}: {stats.levelTitle}
          </h3>
          <p className="mt-2 text-sm text-[#777985] leading-relaxed">
            You have successfully identified and neutralized <strong>{stats.challengesCompleted} synthetic scams</strong> without risking a single rupee.
          </p>

          {/* XP Progress Bar */}
          <div className="mt-5">
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-600">XP Progress</span>
              <span className="text-[#17171C] tabular-nums">{stats.currentXp} / {stats.nextLevelXp} XP</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#9B6CFF] via-[#FF72D2] to-[#FFD95A]"
                style={{ width: `${(stats.currentXp / stats.nextLevelXp) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="relative shrink-0 flex items-center justify-center">
          <Mascot size="lg" variant="celebrate" showStickers={true} />
        </div>
      </div>

      {/* 4 Stat Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="soft-card p-5 bg-white text-left">
          <div className="text-xs font-bold text-[#777985] uppercase tracking-tight">
            Safety Score
          </div>
          <div className="font-heading font-extrabold text-3xl text-[#9B6CFF] mt-1 tabular-nums">
            {stats.safetyScore}/100
          </div>
          <div className="text-[11px] text-[#64C98A] font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{stats.scoreGainWeek} this week</span>
          </div>
        </div>

        <div className="soft-card p-5 bg-white text-left">
          <div className="text-xs font-bold text-[#777985] uppercase tracking-tight">
            Total XP Earned
          </div>
          <div className="font-heading font-extrabold text-3xl text-[#FF806D] mt-1 tabular-nums flex items-center gap-1">
            <Zap className="w-6 h-6 fill-current text-[#FF806D]" />
            <span>{stats.currentXp} XP</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Across all simulations
          </div>
        </div>

        <div className="soft-card p-5 bg-white text-left">
          <div className="text-xs font-bold text-[#777985] uppercase tracking-tight">
            Missions Completed
          </div>
          <div className="font-heading font-extrabold text-3xl text-[#64C98A] mt-1 tabular-nums">
            {stats.challengesCompleted}/{stats.totalChallenges}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            80% challenge completion
          </div>
        </div>

        <div className="soft-card p-5 bg-white text-left">
          <div className="text-xs font-bold text-[#777985] uppercase tracking-tight">
            Detection Accuracy
          </div>
          <div className="font-heading font-extrabold text-3xl text-[#78B7FF] mt-1 tabular-nums">
            +{stats.learningGainPercent}%
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Simulated decision score
          </div>
        </div>
      </div>

      {/* Badges Showcase Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-[#777985] uppercase tracking-wider">
              Student Safety Credentials
            </span>
            <h3 className="font-heading font-extrabold text-xl text-[#17171C]">
              Earned Badges ({BADGES.filter(b => b.unlocked).length} / {BADGES.length})
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGES.map((b) => (
            <div
              key={b.id}
              onClick={() => setSelectedBadge(b)}
              className={`soft-card p-5 cursor-pointer transition-all duration-150 flex flex-col justify-between ${
                b.unlocked
                  ? 'bg-white hover:border-[#9B6CFF] hover:shadow-md'
                  : 'bg-slate-50/70 border-dashed border-slate-300 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-center">
                    {getBadgeIcon(b.name)}
                  </div>
                  {b.unlocked ? (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                      Locked
                    </span>
                  )}
                </div>

                <h4 className="font-heading font-extrabold text-base text-[#17171C]">
                  {b.name}
                </h4>
                <p className="mt-1 text-xs text-[#777985] leading-relaxed">
                  {b.description}
                </p>
              </div>

              {b.unlockedAt && (
                <div className="mt-4 pt-2.5 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                  Earned {b.unlockedAt}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Safety Certificate Preview Card */}
      <div className="soft-card p-6 md:p-8 bg-gradient-to-br from-white to-[#F9FAFC] border-2 border-purple-200/70">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#9B6CFF]/10 text-[#9B6CFF] flex items-center justify-center font-bold">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#9B6CFF]">
                Verified Campus Readiness
              </div>
              <h4 className="font-heading font-extrabold text-xl text-[#17171C]">
                Student Financial Safety Certificate
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Demonstrated proficiency in UPI payment safety, loan cost transparency, and message verification.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Certificate downloaded for campus profile!')}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#17171C] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Badge</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
