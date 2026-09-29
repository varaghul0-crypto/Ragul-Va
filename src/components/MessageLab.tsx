import React, { useState } from 'react';
import { 
  MessageSquareWarning, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  Lock, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { PRESET_MESSAGES } from '../data/mockData';
import { analyzeSyntheticMessage } from '../utils/analyzer';
import { MessageAnalysisResult } from '../types';

export const MessageLab: React.FC = () => {
  const [inputText, setInputText] = useState<string>(PRESET_MESSAGES[0].text);
  const [analysis, setAnalysis] = useState<MessageAnalysisResult>(() => 
    analyzeSyntheticMessage(PRESET_MESSAGES[0].text)
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeSyntheticMessage(inputText);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 250);
  };

  const handleSelectPreset = (text: string) => {
    setInputText(text);
    const result = analyzeSyntheticMessage(text);
    setAnalysis(result);
  };

  const handleCopyExample = () => {
    navigator.clipboard?.writeText(inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-[#FF72D2] uppercase tracking-wider block">
            Synthetic Text Analyzer
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#17171C]">
            Message Safety Lab
          </h2>
          <p className="text-sm text-[#777985] mt-1">
            Paste suspicious student SMS, WhatsApp alerts, or emails to detect social engineering cues in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="px-3.5 py-1.5 rounded-full bg-[#FFEAF6] text-[#FF72D2] text-xs font-bold border border-pink-200">
            Educational Heuristic Engine
          </div>
        </div>
      </div>

      {/* Strict Privacy Safety Warning Banner */}
      <div className="rounded-2xl p-4 bg-[#FFF9E6] border border-[#FFD95A]/80 flex items-start gap-3 text-xs text-[#17171C]">
        <Lock className="w-5 h-5 text-[#FFB86B] shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-amber-900">
            EDUCATIONAL SIMULATION ONLY — ZERO SENSITIVE DATA
          </div>
          <p className="text-amber-800/90 mt-0.5 leading-relaxed">
            Never enter real OTPs, UPI PINs, CVVs, passwords, Aadhaar, PAN, bank accounts or transaction information. All tests run locally inside your browser.
          </p>
        </div>
      </div>

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT PANEL: Message Input & Presets (7 cols) */}
        <div className="lg:col-span-7 soft-card p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#777985] uppercase tracking-wider">
                Simulated Message Input
              </span>
              <button
                onClick={handleCopyExample}
                className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste simulated student message here..."
                rows={5}
                className="w-full p-4 rounded-2xl bg-[#F8FAFC] border-2 border-slate-200/90 focus:border-[#9B6CFF] focus:bg-white focus:outline-none text-sm text-[#17171C] font-medium leading-relaxed resize-none transition-colors"
              />
              <div className="text-[11px] text-slate-400 text-right mt-1 font-mono">
                {inputText.length} characters
              </div>
            </div>

            {/* Quick Preset Selector */}
            <div className="mt-4">
              <span className="text-[11px] font-bold text-[#777985] uppercase tracking-wider block mb-2">
                Quick Sample Scenarios:
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_MESSAGES.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handleSelectPreset(preset.text)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-[#F3EDFF] hover:text-[#9B6CFF] text-slate-700 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => handleSelectPreset(PRESET_MESSAGES[0].text)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Default</span>
            </button>

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing || !inputText.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#9B6CFF] hover:bg-[#8854F5] disabled:opacity-50 text-white rounded-2xl text-xs font-bold transition-all shadow-[0_4px_14px_rgba(155,108,255,0.3)] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAnalyzing ? 'Analyzing Signals...' : 'Analyze Message'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Risk Analysis & Signals (5 cols) */}
        <div className="lg:col-span-5 soft-card p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#777985] uppercase tracking-wider">
                Risk Analysis Result
              </span>
              <span className="text-xs font-bold tabular-nums text-slate-500">
                Risk Score: {analysis.riskScore}/100
              </span>
            </div>

            {/* Large Verdict Block */}
            <div 
              className={`p-4 rounded-2xl border-2 mb-5 ${
                analysis.riskLevel === 'HIGH'
                  ? 'bg-rose-50/70 border-rose-200 text-rose-800'
                  : analysis.riskLevel === 'MEDIUM'
                  ? 'bg-amber-50/70 border-amber-200 text-amber-800'
                  : 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div 
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    analysis.riskLevel === 'HIGH'
                      ? 'bg-rose-100 text-rose-600'
                      : analysis.riskLevel === 'MEDIUM'
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-emerald-100 text-emerald-600'
                  }`}
                >
                  {analysis.riskLevel === 'HIGH' ? (
                    <AlertTriangle className="w-6 h-6" />
                  ) : analysis.riskLevel === 'MEDIUM' ? (
                    <ShieldAlert className="w-6 h-6" />
                  ) : (
                    <ShieldCheck className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest block opacity-75">
                    Verdict
                  </span>
                  <div className="font-heading font-extrabold text-base md:text-lg">
                    {analysis.verdict}
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Chips Detected */}
            <div className="mb-4">
              <span className="text-[11px] font-bold text-[#777985] uppercase tracking-wider block mb-2">
                Identified Red Flags:
              </span>
              {analysis.signals.length === 0 ? (
                <div className="text-xs text-slate-500 italic py-2">
                  No blatant red flags found.
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {analysis.signals.map((sig) => (
                    <span
                      key={sig.id}
                      className="px-2.5 py-1 rounded-xl text-xs font-bold bg-[#FFEAF6] text-[#FF72D2] border border-pink-200 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF72D2]" />
                      <span>{sig.label}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* WHY Breakdown */}
            <div className="space-y-2 mb-4">
              <span className="text-[11px] font-bold text-[#777985] uppercase tracking-wider block">
                Why Was This Flagged?
              </span>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-700 leading-relaxed max-h-48 overflow-y-auto">
                {analysis.explanation.map((item, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="text-[#9B6CFF] font-bold">•</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Core Safe Action */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#9B6CFF]/10 to-[#78B7FF]/10 border border-purple-200 text-xs">
            <span className="font-bold text-[#9B6CFF] uppercase text-[10px] tracking-wider block mb-0.5">
              Recommended Safe Action
            </span>
            <p className="font-semibold text-slate-800">
              {analysis.safeAction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
