import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  QrCode, 
  Clock, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Scenario } from '../types';

interface TodayChallengeProps {
  scenario: Scenario;
  onComplete?: (xpEarned: number) => void;
  onNextScenario?: () => void;
}

export const TodayChallenge: React.FC<TodayChallengeProps> = ({
  scenario,
  onComplete,
  onNextScenario,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<'safe' | 'suspicious' | 'scam' | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const [selectedChipId, setSelectedChipId] = useState<string | null>(null);

  const handleSelectAnswer = (choice: 'safe' | 'suspicious' | 'scam') => {
    setSelectedAnswer(choice);
    setShowResult(true);

    if (choice === scenario.correctAnswer && !hasCompleted) {
      setHasCompleted(true);
      if (onComplete) {
        onComplete(scenario.xp);
      }
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#9B6CFF', '#FF72D2', '#FFD95A', '#64C98A'],
        });
      } catch {
        // Safe fallback if canvas not available
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setSelectedChipId(null);
  };

  const isCorrect = selectedAnswer === scenario.correctAnswer;

  return (
    <div id="scenario-simulator" className="soft-card p-6 md:p-8 bg-white relative overflow-hidden">
      {/* Top Banner & Category */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#9B6CFF] block mb-1">
            Scenario Investigation
          </span>
          <h3 className="font-heading font-extrabold text-xl md:text-2xl text-[#17171C]">
            {scenario.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-[#F3EDFF] text-[#9B6CFF] text-xs font-bold border border-purple-200/50">
            {scenario.difficulty} · +{scenario.xp} XP
          </div>
          <div className="px-3 py-1 rounded-full bg-slate-100 text-[#777985] text-xs font-semibold">
            {scenario.channel} Simulation
          </div>
        </div>
      </div>

      {/* Simulated Message Phone Container */}
      <div className="rounded-2xl p-5 bg-[#F9FAFC] border border-slate-200/70 mb-6">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 text-xs text-[#777985]">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-[#64C98A] animate-ping" />
            <span>Incoming {scenario.channel}: {scenario.sender}</span>
          </div>
          <span className="tabular-nums">{scenario.time}</span>
        </div>

        {/* Message Content with simulated visual styling */}
        <div className="p-4 rounded-xl bg-white border border-purple-100 shadow-xs relative">
          <p className="text-[15px] md:text-base text-[#17171C] font-semibold leading-relaxed">
            “{scenario.messageText}”
          </p>

          {scenario.details && (
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs">
              {scenario.details.claimedAmount && (
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="text-slate-400 font-medium">Claimed Amount:</span>
                  <span className="font-bold text-[#17171C]">{scenario.details.claimedAmount}</span>
                </div>
              )}
              {scenario.details.actionRequired && (
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="text-slate-400 font-medium">Action:</span>
                  <span className="font-bold text-[#FF806D]">{scenario.details.actionRequired}</span>
                </div>
              )}
            </div>
          )}

          {/* Simulated QR Mock if applicable */}
          {scenario.category === 'Scholarship' && (
            <div className="mt-4 p-3 rounded-xl bg-[#F8FAFC] border border-dashed border-purple-200 flex items-center justify-between gap-4 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#9B6CFF]/10 text-[#9B6CFF] flex items-center justify-center">
                  <QrCode className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Simulated Reward QR</div>
                  <div className="text-[11px] text-slate-500">EduGrants_Cashback@upi</div>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-1 rounded-md border border-rose-200">
                Debits Money!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Warning Chips Cues */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-[#777985] uppercase tracking-wider">
            Detected Warning Signals (Tap to Inspect)
          </span>
          <span className="text-xs text-slate-400">
            {scenario.signals.length} signals flagged
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {scenario.signals.map((sig) => {
            const isSelected = selectedChipId === sig.id;
            return (
              <button
                key={sig.id}
                onClick={() => setSelectedChipId(isSelected ? null : sig.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#17171C] text-white shadow-md'
                    : 'bg-[#FFF3E7] text-[#FF806D] border border-orange-200/60 hover:bg-[#FFE8D6]'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{sig.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected chip insight popup */}
        {selectedChipId && (
          <div className="mt-3 p-3.5 rounded-xl bg-[#FFF9E6] border border-[#FFD95A]/70 text-xs text-[#17171C] flex items-start gap-2.5 animate-fadeIn">
            <Info className="w-4 h-4 text-[#FFB86B] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">
                {scenario.signals.find(s => s.id === selectedChipId)?.label}
              </div>
              <p className="text-slate-700 mt-0.5">
                {scenario.signals.find(s => s.id === selectedChipId)?.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Decision Buttons */}
      {!showResult ? (
        <div>
          <div className="text-xs font-bold text-[#777985] uppercase tracking-wider mb-3">
            What is your assessment?
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleSelectAnswer('safe')}
              className="px-4 py-3 rounded-2xl border-2 border-slate-200 font-bold text-sm text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Looks Safe</span>
            </button>

            <button
              onClick={() => handleSelectAnswer('suspicious')}
              className="px-4 py-3 rounded-2xl border-2 border-slate-200 font-bold text-sm text-slate-700 hover:border-amber-400 hover:bg-amber-50/50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Suspicious</span>
            </button>

            <button
              onClick={() => handleSelectAnswer('scam')}
              className="px-4 py-3 rounded-2xl border-2 border-rose-300 bg-rose-50 text-rose-700 font-bold text-sm hover:bg-rose-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Definitely a Scam</span>
            </button>
          </div>
          <div className="text-center text-[11px] text-slate-400 mt-2.5 font-medium">
            🔒 Synthetic simulation · No actual financial transaction will ever occur
          </div>
        </div>
      ) : (
        /* Result & Educational Breakdown */
        <div className="rounded-2xl p-5 bg-[#F9FAFC] border-2 border-purple-200 animate-fadeIn">
          {/* Risk Level Verdict */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600">
                  Risk Level
                </span>
                <h4 className="font-heading font-extrabold text-xl text-[#17171C]">
                  HIGH EDUCATIONAL RISK
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isCorrect ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Correct Assessment! (+{scenario.xp} XP)</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold">
                  <XCircle className="w-4 h-4" />
                  <span>Review Red Flags Below</span>
                </div>
              )}
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-3 mb-5">
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              {scenario.explanation}
            </p>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Signals Detected:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {scenario.signals.map(s => (
                  <li key={s.id} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF806D] mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-[#17171C]">{s.label}:</strong> {s.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Core Learning Action Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#9B6CFF] to-[#78B7FF] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-200 block">
                Core Student Action
              </span>
              <div className="font-heading font-extrabold text-sm md:text-base tracking-wide">
                PAUSE → DON’T SHARE → VERIFY INDEPENDENTLY
              </div>
            </div>
            <div className="text-xs text-purple-100 font-medium text-center sm:text-right">
              Never enter UPI PIN to receive money.
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Scenario</span>
            </button>

            {onNextScenario && (
              <button
                onClick={() => {
                  handleReset();
                  onNextScenario();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#17171C] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
              >
                <span>Next Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
