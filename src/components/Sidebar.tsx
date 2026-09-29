import React from 'react';
import { 
  Home, 
  ShieldCheck, 
  MessageSquareWarning, 
  Calculator, 
  PieChart, 
  Trophy, 
  BarChart3, 
  LockKeyhole,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { NavTab, UserStats } from '../types';
import { Mascot } from './Mascot';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  userStats: UserStats;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  userStats,
  onCloseMobile,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ElementType; color: string; bg: string }[] = [
    { id: 'home', label: 'Home', icon: Home, color: '#9B6CFF', bg: '#F3EDFF' },
    { id: 'simulator', label: 'Safety Simulator', icon: ShieldCheck, color: '#64C98A', bg: '#E8FAF1' },
    { id: 'message-lab', label: 'Message Lab', icon: MessageSquareWarning, color: '#FF72D2', bg: '#FFEAF6' },
    { id: 'loan-emi', label: 'Loan & EMI', icon: Calculator, color: '#78B7FF', bg: '#E9F6FD' },
    { id: 'budget-lab', label: 'Budget Lab', icon: PieChart, color: '#9BE7C1', bg: '#E6FAF2' },
    { id: 'progress', label: 'Progress', icon: BarChart3, color: '#9B6CFF', bg: '#F3EDFF' },
    { id: 'privacy', label: 'Privacy & Data', icon: LockKeyhole, color: '#777985', bg: '#F1F3F7' },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside className="w-full flex flex-col justify-between h-full bg-white rounded-[26px] p-5 border border-slate-200/80 shadow-[0_8px_30px_rgba(30,35,50,0.06)]">
      {/* Brand Header */}
      <div>
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer group flex items-center gap-3.5 pb-5 border-b border-slate-100"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#9B6CFF] to-[#FF72D2] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-heading font-extrabold tracking-tight text-lg text-[#17171C] leading-none flex items-center gap-1.5">
              <span>FINSAFE</span>
              <span className="text-[#9B6CFF]">CAMPUS</span>
            </div>
            <p className="text-[12px] font-medium text-[#777985] mt-1 tracking-tight">
              Learn Before You Pay.
            </p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="mt-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[14px] font-semibold transition-all duration-150 text-left ${
                  isActive
                    ? 'bg-[#F3EDFF] text-[#9B6CFF] shadow-[0_2px_8px_rgba(155,108,255,0.12)]'
                    : 'text-[#17171C] hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform"
                  style={{
                    backgroundColor: isActive ? '#9B6CFF' : item.bg,
                    color: isActive ? '#FFFFFF' : item.color,
                  }}
                >
                  <Icon className="w-4 h-4" strokeWidth={2.2} />
                </div>
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-4 bg-[#9B6CFF] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* "YOUR SAFETY PROFILE" summary card */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F8F9FC] to-[#F1EEFA] border border-slate-200/60">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold tracking-wider text-[#777985] uppercase">
              Safety Profile
            </span>
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs border border-purple-100">
              <Mascot size="sm" showStickers={false} className="scale-75" />
            </div>
          </div>

          <div className="space-y-2.5">
            {/* Safety Score */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#777985] font-medium">Safety Score</span>
              <span className="font-extrabold text-[#17171C] tabular-nums">
                <span className="text-[#9B6CFF] text-sm">{userStats.safetyScore}</span> / 100
              </span>
            </div>

            {/* Level & Rank */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#777985] font-medium flex items-center gap-1">
                Security Rank
              </span>
              <span className="font-bold text-[#9B6CFF] flex items-center gap-1 tabular-nums">
                <GraduationCap className="w-3.5 h-3.5 text-[#9B6CFF]" />
                Level {userStats.level < 10 ? `0${userStats.level}` : userStats.level}
              </span>
            </div>

            {/* Labs Covered */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#777985] font-medium">Active Labs</span>
              <span className="font-semibold text-slate-700 flex items-center gap-1 tabular-nums">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#64C98A]" />
                {userStats.modulesCompleted} / {userStats.totalModules} sandboxes
              </span>
            </div>
          </div>

          {/* Micro progress bar */}
          <div className="mt-3 w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#9B6CFF] to-[#64C98A] h-full rounded-full transition-all duration-500"
              style={{ width: `${(userStats.modulesCompleted / userStats.totalModules) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
