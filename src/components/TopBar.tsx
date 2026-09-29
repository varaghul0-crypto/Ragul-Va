import React from 'react';
import { Menu, ShieldAlert, Sparkles } from 'lucide-react';
import { NavTab, UserStats } from '../types';

interface TopBarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  userStats: UserStats;
  onOpenMobileMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onSelectTab,
  userStats,
  onOpenMobileMenu,
}) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-30 px-5 md:px-8 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
      {/* Zone 1: Brand wordmark (single element) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <a 
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('home');
          }}
          className="font-heading font-extrabold text-xl tracking-tight text-[#17171C] flex items-center gap-1.5"
        >
          <span>FinSafe</span>
          <span className="text-[#9B6CFF]">Campus</span>
        </a>
      </div>

      {/* Zone 2: Clean 4-6 text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#777985]">
        <button
          onClick={() => onSelectTab('home')}
          className={`hover:text-[#17171C] transition-colors ${currentTab === 'home' ? 'text-[#9B6CFF]' : ''}`}
        >
          Overview
        </button>
        <button
          onClick={() => onSelectTab('simulator')}
          className={`hover:text-[#17171C] transition-colors ${currentTab === 'simulator' ? 'text-[#9B6CFF]' : ''}`}
        >
          Simulator
        </button>
        <button
          onClick={() => onSelectTab('message-lab')}
          className={`hover:text-[#17171C] transition-colors ${currentTab === 'message-lab' ? 'text-[#9B6CFF]' : ''}`}
        >
          Message Lab
        </button>
        <button
          onClick={() => onSelectTab('loan-emi')}
          className={`hover:text-[#17171C] transition-colors ${currentTab === 'loan-emi' ? 'text-[#9B6CFF]' : ''}`}
        >
          Loan & EMI
        </button>
        <button
          onClick={() => onSelectTab('budget-lab')}
          className={`hover:text-[#17171C] transition-colors ${currentTab === 'budget-lab' ? 'text-[#9B6CFF]' : ''}`}
        >
          Budget Lab
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3">
        {/* Quick Action Button */}
        <button
          onClick={() => onSelectTab('simulator')}
          className="flex items-center gap-2 px-4 py-2 bg-[#9B6CFF] hover:bg-[#8A57F5] active:scale-[0.98] text-white rounded-2xl text-xs font-bold transition-all shadow-[0_4px_14px_rgba(155,108,255,0.3)] whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Practice Simulator</span>
        </button>
      </div>
    </header>
  );
};
