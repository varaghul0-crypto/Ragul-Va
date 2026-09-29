import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { NavTab, UserStats } from './types';
import { INITIAL_USER_STATS, SCENARIOS } from './data/mockData';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { HeroCard } from './components/HeroCard';
import { TodayChallenge } from './components/TodayChallenge';
import { SafetyScoreCard } from './components/SafetyScoreCard';
import { GamificationCard } from './components/GamificationCard';
import { LearningModulesGrid } from './components/LearningModulesGrid';
import { MessageLab } from './components/MessageLab';
import { LoanEMILab } from './components/LoanEMILab';
import { BudgetLab } from './components/BudgetLab';
import { ProgressView } from './components/ProgressView';
import { PrivacyPage } from './components/PrivacyPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [userStats, setUserStats] = useState<UserStats>(INITIAL_USER_STATS);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeScenario = SCENARIOS[currentScenarioIndex];

  const handleEarnXp = (xp: number) => {
    setUserStats(prev => {
      const newXp = prev.currentXp + xp;
      const leveledUp = newXp >= prev.nextLevelXp;
      const newLevel = leveledUp ? prev.level + 1 : prev.level;
      const newScore = Math.min(100, prev.safetyScore + 2);

      if (leveledUp) {
        showToast(`🎉 Level Up! You reached Level ${newLevel}: Master Guardian!`);
      } else {
        showToast(`✨ +${xp} XP Added to your Safety Score!`);
      }

      return {
        ...prev,
        currentXp: leveledUp ? newXp - prev.nextLevelXp : newXp,
        level: newLevel,
        safetyScore: newScore,
        challengesCompleted: prev.challengesCompleted + 1,
      };
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleNextScenario = () => {
    setCurrentScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
  };

  const handleStartSimulation = () => {
    setCurrentTab('simulator');
  };

  return (
    <div className="min-h-screen bg-[#F4F5F8] text-[#17171C] flex flex-col font-sans">
      {/* Top Bar Header */}
      <TopBar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        userStats={userStats}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#17171C] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-bold animate-bounce">
          <Sparkles className="w-5 h-5 text-[#FFD95A]" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Mobile Drawer Navigation Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden flex">
          <div className="w-72 bg-white h-full p-4 overflow-y-auto relative animate-slideRight">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-500 hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar
              currentTab={currentTab}
              onSelectTab={setCurrentTab}
              userStats={userStats}
              onCloseMobile={() => setMobileMenuOpen(false)}
            />
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main App Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr_360px] gap-6 items-start">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Navigation & Student Learning Summary */}
          {/* ======================================================== */}
          <div className="hidden lg:block sticky top-20">
            <Sidebar
              currentTab={currentTab}
              onSelectTab={setCurrentTab}
              userStats={userStats}
            />
          </div>

          {/* ======================================================== */}
          {/* CENTER COLUMN: Primary View / Lab / Simulator */}
          {/* ======================================================== */}
          <div className="space-y-6 min-w-0">
            {currentTab === 'home' && (
              <>
                {/* Greeting banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#17171C]">
                      Good evening 👋
                    </h1>
                    <p className="text-sm text-[#777985] font-medium mt-0.5">
                      Practice financial safety before real money is involved.
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                    <ShieldCheck className="w-4 h-4 text-[#64C98A]" />
                    <span>Campus Shield: Active</span>
                  </div>
                </div>

                {/* Hero Card */}
                <HeroCard onStartSimulation={handleStartSimulation} />

                {/* Learning Modules Grid */}
                <LearningModulesGrid onSelectTab={setCurrentTab} />

                {/* Mobile/Tablet only right column widgets */}
                <div className="xl:hidden space-y-6 pt-2">
                  <SafetyScoreCard stats={userStats} />
                  <GamificationCard
                    stats={userStats}
                    onViewAllBadges={() => setCurrentTab('progress')}
                  />
                </div>
              </>
            )}

            {currentTab === 'simulator' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#64C98A] uppercase tracking-wider block">
                      Live Simulation Sandbox
                    </span>
                    <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#17171C]">
                      Scenario Simulator
                    </h2>
                  </div>
                  <button
                    onClick={handleNextScenario}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors"
                  >
                    <span>Switch Scenario ({currentScenarioIndex + 1}/{SCENARIOS.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <TodayChallenge
                  scenario={activeScenario}
                  onComplete={handleEarnXp}
                  onNextScenario={handleNextScenario}
                />

                <div className="xl:hidden">
                  <SafetyScoreCard stats={userStats} />
                </div>
              </div>
            )}

            {currentTab === 'message-lab' && <MessageLab />}

            {currentTab === 'loan-emi' && <LoanEMILab />}

            {currentTab === 'budget-lab' && <BudgetLab />}

            {currentTab === 'progress' && <ProgressView stats={userStats} />}

            {currentTab === 'privacy' && <PrivacyPage />}
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Safety Score + Gamification + Widgets */}
          {/* ======================================================== */}
          <div className="hidden xl:flex flex-col gap-6 sticky top-20">
            <SafetyScoreCard stats={userStats} />
            <GamificationCard
              stats={userStats}
              onViewAllBadges={() => setCurrentTab('progress')}
            />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200/80 bg-white py-6 px-4">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777985]">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-[#17171C]">FinSafe Campus</span>
            <span>·</span>
            <span>“Learn Before You Pay.”</span>
            <span>·</span>
            <span>Zero Real Financial Data Stored</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentTab('privacy')}
              className="hover:text-[#9B6CFF] font-semibold transition-colors"
            >
              Privacy Architecture
            </button>
            <button
              onClick={() => setCurrentTab('simulator')}
              className="hover:text-[#9B6CFF] font-semibold transition-colors"
            >
              Simulations
            </button>
            <button
              onClick={() => setCurrentTab('progress')}
              className="hover:text-[#9B6CFF] font-semibold transition-colors"
            >
              Progress & Badges
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
