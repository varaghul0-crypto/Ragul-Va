import React from 'react';
import { 
  LockKeyhole, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Cpu, 
  EyeOff, 
  DatabaseZap, 
  ArrowDown, 
  FileText, 
  Sparkles,
  ServerOff
} from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const guarantees = [
    { title: 'No OTP collection', desc: 'We never prompt for or store verification codes.' },
    { title: 'No UPI PIN collection', desc: 'Simulations demonstrate why you should NEVER type your PIN.' },
    { title: 'No CVV or Card Numbers', desc: 'Zero card payment forms or gateways exist in this app.' },
    { title: 'No Password collection', desc: 'Practice does not require your campus or netbanking login.' },
    { title: 'No PAN / Aadhaar collection', desc: 'No government identity documents are ever requested.' },
    { title: 'No Bank Account numbers', desc: 'We do not ask for IFSC or account credentials.' },
    { title: 'No Transaction history access', desc: 'We never link to or inspect your actual bank accounts.' },
    { title: 'No Real transaction processing', desc: 'Zero monetary transactions can occur on this platform.' },
    { title: 'No Banking API dependency', desc: 'Purely synthetic offline-capable student sandbox.' },
  ];

  const pipelineSteps = [
    { step: '01', title: 'Synthetic Scenario', desc: 'Simulated SMS, UPI QR, or loan pitch' },
    { step: '02', title: 'Text Normalization', desc: 'Client-side keyword tokenization & sanitization' },
    { step: '03', title: 'Heuristic Rules & URL Check', desc: 'Detection of urgency, credentials & fraud domains' },
    { step: '04', title: 'Risk Evidence Extraction', desc: 'Flagging specific triggers without user logging' },
    { step: '05', title: 'Pedagogical Explanation', desc: 'Clear student-friendly breakdown of why it was flagged' },
    { step: '06', title: 'Safe Action Protocol', desc: 'Pause → Don’t Share → Verify Independently' },
    { step: '07', title: 'Scenario Verification + Security XP', desc: 'Instant feedback & safety score saved strictly in local storage' },
  ];

  return (
    <div className="space-y-8">
      {/* Premium Hero Privacy Banner */}
      <div className="soft-card p-8 md:p-10 bg-white border-2 border-purple-100 relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8FAF1] text-[#64C98A] text-xs font-bold mb-3 border border-emerald-200">
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy-By-Design Guarantee</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-[#17171C] leading-tight">
            YOUR DATA <br />
            <span className="text-[#9B6CFF]">STAYS YOUR DATA.</span>
          </h2>

          <p className="mt-4 text-base text-[#777985] font-medium leading-relaxed">
            FinSafe Campus is built on a non-negotiable principle: students must never sacrifice personal privacy to learn financial security.
          </p>
        </div>

        {/* Large Highlight Box */}
        <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-[#17171C] to-[#2A2338] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#9BE7C1]">
              <EyeOff className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-purple-300">
                Core Architectural Invariant
              </div>
              <div className="font-heading font-extrabold text-lg md:text-xl text-white">
                ZERO PERSONAL FINANCIAL DATA RETENTION.
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-300 font-semibold text-center sm:text-right">
            Client-Side Sandbox Execution
          </div>
        </div>
      </div>

      {/* 3 Colorful Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="soft-card p-6 bg-white border-t-4 border-t-[#9B6CFF]">
          <div className="w-10 h-10 rounded-2xl bg-[#F3EDFF] text-[#9B6CFF] flex items-center justify-center mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#9B6CFF] block">
            Pillar 1
          </span>
          <h4 className="font-heading font-extrabold text-lg text-[#17171C] mt-1">
            SIMULATIONS
          </h4>
          <p className="mt-2 text-xs text-[#777985] leading-relaxed">
            Synthetic scenarios only. Every phone number, QR code, bank handle, and scholarship message is generated strictly for pedagogical safety.
          </p>
        </div>

        <div className="soft-card p-6 bg-white border-t-4 border-t-[#FF72D2]">
          <div className="w-10 h-10 rounded-2xl bg-[#FFEAF6] text-[#FF72D2] flex items-center justify-center mb-4">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF72D2] block">
            Pillar 2
          </span>
          <h4 className="font-heading font-extrabold text-lg text-[#17171C] mt-1">
            ANALYSIS
          </h4>
          <p className="mt-2 text-xs text-[#777985] leading-relaxed">
            Explainable rules + client-side heuristics. No private student inputs are ever sent to remote tracking servers or sold to data brokers.
          </p>
        </div>

        <div className="soft-card p-6 bg-white border-t-4 border-t-[#64C98A]">
          <div className="w-10 h-10 rounded-2xl bg-[#E8FAF1] text-[#64C98A] flex items-center justify-center mb-4">
            <DatabaseZap className="w-5 h-5" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#64C98A] block">
            Pillar 3
          </span>
          <h4 className="font-heading font-extrabold text-lg text-[#17171C] mt-1">
            PROGRESS
          </h4>
          <p className="mt-2 text-xs text-[#777985] leading-relaxed">
            Learning progress only. Badges, module completions, and safety XP stay securely in your device browser storage.
          </p>
        </div>
      </div>

      {/* 9 Explicit Privacy Protections Checklist */}
      <div className="soft-card p-6 md:p-8 bg-white">
        <div className="mb-6">
          <span className="text-xs font-bold text-[#777985] uppercase tracking-wider block">
            Absolute Protections
          </span>
          <h3 className="font-heading font-extrabold text-xl text-[#17171C]">
            What FinSafe Campus Never Collects
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guarantees.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#F8F9FC] border border-slate-200/70 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#17171C]">
                  {item.title}
                </h5>
                <p className="text-[11px] text-[#777985] mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Visualization Pipeline */}
      <div className="soft-card p-6 md:p-8 bg-white">
        <div className="mb-6">
          <span className="text-xs font-bold text-[#9B6CFF] uppercase tracking-wider block">
            System Inspection
          </span>
          <h3 className="font-heading font-extrabold text-xl text-[#17171C]">
            Simulation Pipeline Architecture
          </h3>
          <p className="text-xs text-[#777985] mt-1">
            How raw synthetic scenarios transform into explainable student safety education.
          </p>
        </div>

        <div className="space-y-2">
          {pipelineSteps.map((step, idx) => (
            <React.Fragment key={step.step}>
              <div className="p-4 rounded-2xl bg-[#F9FAFC] border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-mono font-bold text-xs text-[#9B6CFF] shadow-xs">
                    {step.step}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-[#17171C]">
                      {step.title}
                    </div>
                    <div className="text-xs text-[#777985]">
                      {step.desc}
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  Sandboxed
                </div>
              </div>

              {idx < pipelineSteps.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <ArrowDown className="w-4 h-4 text-purple-300" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
