import React, { useState } from 'react';
import { 
  PieChart as PieIcon, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  TrendingUp, 
  ShieldCheck, 
  RotateCcw,
  Sliders,
  Settings2,
  Edit3,
  SlidersHorizontal
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export const BudgetLab: React.FC = () => {
  // Budget & Range settings
  const [minBudgetRange, setMinBudgetRange] = useState<number>(5000);
  const [maxBudgetRange, setMaxBudgetRange] = useState<number>(100000);
  const [budgetStep, setBudgetStep] = useState<number>(1000);
  const [showRangeSettings, setShowRangeSettings] = useState<boolean>(false);

  const [totalBudget, setTotalBudget] = useState<number>(20000);
  const [needsPercent, setNeedsPercent] = useState<number>(50); // e.g. 10,000
  const [wantsPercent, setWantsPercent] = useState<number>(25); // e.g. 5,000
  const [savingsPercent, setSavingsPercent] = useState<number>(15); // e.g. 3,000
  const [emergencyPercent, setEmergencyPercent] = useState<number>(10); // e.g. 2,000

  const needsAmount = Math.round((totalBudget * needsPercent) / 100);
  const wantsAmount = Math.round((totalBudget * wantsPercent) / 100);
  const savingsAmount = Math.round((totalBudget * savingsPercent) / 100);
  const emergencyAmount = Math.round((totalBudget * emergencyPercent) / 100);

  const totalAllocatedPercent = needsPercent + wantsPercent + savingsPercent + emergencyPercent;
  const totalAllocatedAmount = needsAmount + wantsAmount + savingsAmount + emergencyAmount;
  const remainingAmount = totalBudget - totalAllocatedAmount;

  // Handle typing total budget directly
  const handleBudgetInputChange = (val: string) => {
    if (val === '') {
      setTotalBudget(0);
      return;
    }
    const num = parseInt(val.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num)) {
      setTotalBudget(num);
      // If user types higher than max range or lower than min range, expand range dynamically
      if (num > maxBudgetRange) {
        setMaxBudgetRange(Math.ceil(num / 10000) * 10000);
      }
      if (num < minBudgetRange && num > 0) {
        setMinBudgetRange(Math.floor(num / 1000) * 1000);
      }
    }
  };

  // Handle typing min range bound
  const handleMinRangeChange = (val: string) => {
    const num = parseInt(val.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num)) {
      setMinBudgetRange(Math.max(0, num));
    }
  };

  // Handle typing max range bound
  const handleMaxRangeChange = (val: string) => {
    const num = parseInt(val.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num)) {
      setMaxBudgetRange(Math.max(minBudgetRange + 1000, num));
    }
  };

  // Handle typing category rupee amounts directly
  const handleCategoryAmountChange = (
    category: 'needs' | 'wants' | 'savings' | 'emergency',
    amtStr: string
  ) => {
    if (totalBudget <= 0) return;
    const amt = parseInt(amtStr.replace(/[^0-9]/g, ''), 10) || 0;
    const pct = Math.min(100, Math.max(0, Math.round((amt / totalBudget) * 100)));
    if (category === 'needs') setNeedsPercent(pct);
    if (category === 'wants') setWantsPercent(pct);
    if (category === 'savings') setSavingsPercent(pct);
    if (category === 'emergency') setEmergencyPercent(pct);
  };

  // Handle typing category percentages directly
  const handleCategoryPercentChange = (
    category: 'needs' | 'wants' | 'savings' | 'emergency',
    pctStr: string
  ) => {
    const pct = Math.min(100, Math.max(0, parseInt(pctStr.replace(/[^0-9]/g, ''), 10) || 0));
    if (category === 'needs') setNeedsPercent(pct);
    if (category === 'wants') setWantsPercent(pct);
    if (category === 'savings') setSavingsPercent(pct);
    if (category === 'emergency') setEmergencyPercent(pct);
  };

  // Determine Budget Health
  let healthStatus: 'BALANCED' | 'DEFICIT' | 'NEEDS SAVINGS' | 'HEALTHY & RESILIENT' = 'BALANCED';
  let healthColor = '#64C98A';
  let healthBg = '#E8FAF1';
  let healthMessage = 'Well-proportioned allocation with reliable savings and emergency cushion.';

  if (totalAllocatedPercent > 100) {
    healthStatus = 'DEFICIT';
    healthColor = '#FF806D';
    healthBg = '#FFF3E7';
    healthMessage = `You are spending ${(totalAllocatedPercent - 100)}% more than your total monthly stipend.`;
  } else if (savingsPercent + emergencyPercent < 15) {
    healthStatus = 'NEEDS SAVINGS';
    healthColor = '#FFB86B';
    healthBg = '#FFF9E6';
    healthMessage = 'Aim for at least 15% combined savings and emergency fund to protect against unforeseen expenses.';
  } else if (savingsPercent >= 20 && emergencyPercent >= 10 && totalAllocatedPercent <= 100) {
    healthStatus = 'HEALTHY & RESILIENT';
    healthColor = '#9B6CFF';
    healthBg = '#F3EDFF';
    healthMessage = 'Outstanding student financial discipline! Strong safety cushion built.';
  }

  const chartData = [
    { name: 'Needs (50%)', amount: needsAmount, percent: needsPercent, color: '#78B7FF' },
    { name: 'Wants (30%)', amount: wantsAmount, percent: wantsPercent, color: '#FF72D2' },
    { name: 'Savings (10%)', amount: savingsAmount, percent: savingsPercent, color: '#9B6CFF' },
    { name: 'Emergency (10%)', amount: emergencyAmount, percent: emergencyPercent, color: '#64C98A' },
  ];

  const handleApplyPreset = (preset: 'balanced' | 'frugal' | 'social') => {
    if (preset === 'balanced') {
      setNeedsPercent(50);
      setWantsPercent(25);
      setSavingsPercent(15);
      setEmergencyPercent(10);
    } else if (preset === 'frugal') {
      setNeedsPercent(45);
      setWantsPercent(15);
      setSavingsPercent(25);
      setEmergencyPercent(15);
    } else {
      setNeedsPercent(55);
      setWantsPercent(30);
      setSavingsPercent(10);
      setEmergencyPercent(5);
    }
  };

  const handleCelebrateBalance = () => {
    if (healthStatus === 'BALANCED' || healthStatus === 'HEALTHY & RESILIENT') {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#64C98A', '#9B6CFF', '#FFD95A'],
        });
      } catch {}
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-[#64C98A] uppercase tracking-wider block">
            Gamified Cashflow Planner
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#17171C]">
            Student Budget Lab
          </h2>
          <p className="text-sm text-[#777985] mt-1">
            Simulate your monthly campus stipend, balance essentials with social life, and test your financial runway.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="px-3.5 py-1.5 rounded-full bg-[#E8FAF1] text-[#64C98A] text-xs font-bold border border-emerald-200">
            50-30-20 Smart Rule
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Allocation Deck (6 cols) */}
        <div className="lg:col-span-6 soft-card p-6 md:p-8 bg-white flex flex-col justify-between">
          <div>
            {/* Monthly Budget Picker with Typed Input & Range Controls */}
            <div className="pb-5 mb-5 border-b border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <span className="text-[11px] font-extrabold text-[#777985] uppercase tracking-wider block">
                    Synthetic Monthly Stipend
                  </span>
                  <p className="text-xs text-slate-500">
                    Type your exact budget or customize the slider range limits.
                  </p>
                </div>

                {/* Range Settings Toggle */}
                <button
                  type="button"
                  onClick={() => setShowRangeSettings(!showRangeSettings)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    showRangeSettings
                      ? 'bg-[#F3EDFF] text-[#9B6CFF] border-purple-200 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                  title="Configure minimum and maximum range of the budget amount"
                >
                  <Settings2 className="w-3.5 h-3.5 text-[#9B6CFF]" />
                  <span>{showRangeSettings ? 'Close Range Settings' : 'Type Range Limits'}</span>
                </button>
              </div>

              {/* Direct Typed Amount Box */}
              <div className="p-4 rounded-2xl bg-[#F8F9FC] border border-slate-200/80 mb-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-2xl text-[#9B6CFF]">₹</span>
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={totalBudget === 0 ? '' : totalBudget.toLocaleString('en-IN')}
                        onChange={(e) => handleBudgetInputChange(e.target.value)}
                        placeholder="e.g. 20,000"
                        className="font-heading font-extrabold text-2xl md:text-3xl text-[#17171C] bg-white px-3 py-1.5 rounded-xl border border-slate-200 focus:border-[#9B6CFF] focus:outline-none w-44 sm:w-52 shadow-xs tabular-nums"
                      />
                    </div>
                    <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
                      / month
                    </span>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[10000, 15000, 20000, 30000, 50000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setTotalBudget(amt);
                          if (amt > maxBudgetRange) setMaxBudgetRange(amt + 20000);
                          if (amt < minBudgetRange) setMinBudgetRange(Math.max(1000, amt - 5000));
                        }}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                          totalBudget === amt
                            ? 'bg-[#17171C] text-white shadow-xs'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Range Slider for Stipend */}
                <div className="mt-4 pt-3 border-t border-slate-200/60">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#9B6CFF]" />
                      <span>Adjust within range:</span>
                    </span>
                    <span className="tabular-nums font-bold text-[#17171C]">
                      ₹{minBudgetRange.toLocaleString('en-IN')} – ₹{maxBudgetRange.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={minBudgetRange}
                    max={maxBudgetRange}
                    step={budgetStep}
                    value={Math.min(maxBudgetRange, Math.max(minBudgetRange, totalBudget))}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="w-full accent-[#9B6CFF] cursor-pointer"
                  />

                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                    <span>Min: ₹{minBudgetRange.toLocaleString('en-IN')}</span>
                    <span className="text-[#9B6CFF] font-bold">Active: ₹{totalBudget.toLocaleString('en-IN')}</span>
                    <span>Max: ₹{maxBudgetRange.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Type Range Limits Settings Box (Collapsible) */}
              {showRangeSettings && (
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 mb-4 animate-in fade-in duration-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#17171C] flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#9B6CFF]" />
                      <span>Type Custom Range Bounds</span>
                    </span>
                    <span className="text-[11px] text-purple-700 font-semibold">
                      Define your preferred slider limits
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Min Range Bound (₹)
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={minBudgetRange === 0 ? '' : minBudgetRange.toLocaleString('en-IN')}
                        onChange={(e) => handleMinRangeChange(e.target.value)}
                        className="w-full bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#17171C] focus:border-[#9B6CFF] focus:outline-none"
                        placeholder="e.g. 5,000"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Max Range Bound (₹)
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={maxBudgetRange === 0 ? '' : maxBudgetRange.toLocaleString('en-IN')}
                        onChange={(e) => handleMaxRangeChange(e.target.value)}
                        className="w-full bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#17171C] focus:border-[#9B6CFF] focus:outline-none"
                        placeholder="e.g. 100,000"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Step Increment (₹)
                      </label>
                      <select
                        value={budgetStep}
                        onChange={(e) => setBudgetStep(Number(e.target.value))}
                        className="w-full bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#17171C] focus:border-[#9B6CFF] focus:outline-none"
                      >
                        <option value={500}>₹500 step</option>
                        <option value={1000}>₹1,000 step</option>
                        <option value={2500}>₹2,500 step</option>
                        <option value={5000}>₹5,000 step</option>
                        <option value={10000}>₹10,000 step</option>
                      </select>
                    </div>
                  </div>

                  {/* Quick Range Presets */}
                  <div className="pt-2 border-t border-purple-100 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-500">Quick Ranges:</span>
                    <button
                      type="button"
                      onClick={() => { setMinBudgetRange(3000); setMaxBudgetRange(20000); }}
                      className="px-2 py-1 rounded-lg bg-white border border-purple-200 text-[11px] font-bold text-slate-700 hover:bg-purple-100 transition-colors"
                    >
                      Basic: ₹3k – ₹20k
                    </button>
                    <button
                      type="button"
                      onClick={() => { setMinBudgetRange(10000); setMaxBudgetRange(50000); }}
                      className="px-2 py-1 rounded-lg bg-white border border-purple-200 text-[11px] font-bold text-slate-700 hover:bg-purple-100 transition-colors"
                    >
                      Hostel: ₹10k – ₹50k
                    </button>
                    <button
                      type="button"
                      onClick={() => { setMinBudgetRange(20000); setMaxBudgetRange(150000); }}
                      className="px-2 py-1 rounded-lg bg-white border border-purple-200 text-[11px] font-bold text-slate-700 hover:bg-purple-100 transition-colors"
                    >
                      Metro: ₹20k – ₹150k
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sliders with Direct Amount & Percent Typing */}
            <div className="space-y-5">
              {/* Needs */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold mb-1.5">
                  <span className="text-slate-700 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#78B7FF]" />
                    <span>Needs (Hostel, Mess, Books, Travel)</span>
                  </span>
                  
                  {/* Typed Inputs for Needs */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 focus-within:border-[#78B7FF] focus-within:bg-white transition-all shadow-xs">
                      <span className="text-xs font-bold text-slate-400 mr-0.5">₹</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={needsAmount === 0 ? '' : needsAmount.toLocaleString('en-IN')}
                        onChange={(e) => handleCategoryAmountChange('needs', e.target.value)}
                        className="w-18 text-xs font-extrabold text-[#17171C] bg-transparent focus:outline-none tabular-nums"
                        placeholder="0"
                        title="Type exact amount for Needs"
                      />
                    </div>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 focus-within:border-[#78B7FF] focus-within:bg-white transition-all shadow-xs">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={needsPercent}
                        onChange={(e) => handleCategoryPercentChange('needs', e.target.value)}
                        className="w-8 text-xs font-extrabold text-[#17171C] bg-transparent focus:outline-none text-right tabular-nums"
                        title="Type percentage for Needs"
                      />
                      <span className="text-xs font-bold text-slate-400 ml-0.5">%</span>
                    </div>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={needsPercent}
                  onChange={(e) => setNeedsPercent(Number(e.target.value))}
                  className="w-full accent-[#78B7FF] cursor-pointer"
                />
              </div>

              {/* Wants */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold mb-1.5">
                  <span className="text-slate-700 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF72D2]" />
                    <span>Wants (Cafes, Streaming, Outings)</span>
                  </span>

                  {/* Typed Inputs for Wants */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 focus-within:border-[#FF72D2] focus-within:bg-white transition-all shadow-xs">
                      <span className="text-xs font-bold text-slate-400 mr-0.5">₹</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={wantsAmount === 0 ? '' : wantsAmount.toLocaleString('en-IN')}
                        onChange={(e) => handleCategoryAmountChange('wants', e.target.value)}
                        className="w-18 text-xs font-extrabold text-[#17171C] bg-transparent focus:outline-none tabular-nums"
                        placeholder="0"
                        title="Type exact amount for Wants"
                      />
                    </div>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 focus-within:border-[#FF72D2] focus-within:bg-white transition-all shadow-xs">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={wantsPercent}
                        onChange={(e) => handleCategoryPercentChange('wants', e.target.value)}
                        className="w-8 text-xs font-extrabold text-[#17171C] bg-transparent focus:outline-none text-right tabular-nums"
                        title="Type percentage for Wants"
                      />
                      <span className="text-xs font-bold text-slate-400 ml-0.5">%</span>
                    </div>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={wantsPercent}
                  onChange={(e) => setWantsPercent(Number(e.target.value))}
                  className="w-full accent-[#FF72D2] cursor-pointer"
                />
              </div>

              {/* Savings */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold mb-1.5">
                  <span className="text-slate-700 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9B6CFF]" />
                    <span>Savings (Future Courses, Career Prep)</span>
                  </span>

                  {/* Typed Inputs for Savings */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 focus-within:border-[#9B6CFF] focus-within:bg-white transition-all shadow-xs">
                      <span className="text-xs font-bold text-slate-400 mr-0.5">₹</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={savingsAmount === 0 ? '' : savingsAmount.toLocaleString('en-IN')}
                        onChange={(e) => handleCategoryAmountChange('savings', e.target.value)}
                        className="w-18 text-xs font-extrabold text-[#17171C] bg-transparent focus:outline-none tabular-nums"
                        placeholder="0"
                        title="Type exact amount for Savings"
                      />
                    </div>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 focus-within:border-[#9B6CFF] focus-within:bg-white transition-all shadow-xs">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={savingsPercent}
                        onChange={(e) => handleCategoryPercentChange('savings', e.target.value)}
                        className="w-8 text-xs font-extrabold text-[#17171C] bg-transparent focus:outline-none text-right tabular-nums"
                        title="Type percentage for Savings"
                      />
                      <span className="text-xs font-bold text-slate-400 ml-0.5">%</span>
                    </div>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={savingsPercent}
                  onChange={(e) => setSavingsPercent(Number(e.target.value))}
                  className="w-full accent-[#9B6CFF] cursor-pointer"
                />
              </div>

              {/* Emergency Buffer */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold mb-1.5">
                  <span className="text-slate-700 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#64C98A]" />
                    <span>Emergency Buffer (Medical, Urgent repair)</span>
                  </span>

                  {/* Typed Inputs for Emergency */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 focus-within:border-[#64C98A] focus-within:bg-white transition-all shadow-xs">
                      <span className="text-xs font-bold text-slate-400 mr-0.5">₹</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={emergencyAmount === 0 ? '' : emergencyAmount.toLocaleString('en-IN')}
                        onChange={(e) => handleCategoryAmountChange('emergency', e.target.value)}
                        className="w-18 text-xs font-extrabold text-[#17171C] bg-transparent focus:outline-none tabular-nums"
                        placeholder="0"
                        title="Type exact amount for Emergency Buffer"
                      />
                    </div>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 focus-within:border-[#64C98A] focus-within:bg-white transition-all shadow-xs">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={emergencyPercent}
                        onChange={(e) => handleCategoryPercentChange('emergency', e.target.value)}
                        className="w-8 text-xs font-extrabold text-[#17171C] bg-transparent focus:outline-none text-right tabular-nums"
                        title="Type percentage for Emergency Buffer"
                      />
                      <span className="text-xs font-bold text-slate-400 ml-0.5">%</span>
                    </div>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={emergencyPercent}
                  onChange={(e) => setEmergencyPercent(Number(e.target.value))}
                  className="w-full accent-[#64C98A] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-500">Apply Blueprint:</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleApplyPreset('balanced')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Balanced 50/25/25
              </button>
              <button
                onClick={() => handleApplyPreset('frugal')}
                className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#9B6CFF] text-xs font-bold transition-colors"
              >
                Super Saver
              </button>
            </div>
          </div>
        </div>

        {/* Results & Health Status (6 cols) */}
        <div className="lg:col-span-6 soft-card p-6 md:p-8 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#777985] uppercase tracking-wider">
                Budget Health Analysis
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide"
                style={{ backgroundColor: healthBg, color: healthColor }}
              >
                {healthStatus}
              </span>
            </div>

            {/* Big Health Banner */}
            <div
              className="p-5 rounded-2xl border mb-5 transition-colors"
              style={{ backgroundColor: healthBg, borderColor: `${healthColor}40` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shrink-0"
                  style={{ backgroundColor: healthColor }}
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-base md:text-lg text-[#17171C]">
                    Budget Health: {healthStatus}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {healthMessage}
                  </p>
                </div>
              </div>
            </div>

            {/* Stat Cards Matrix */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="p-3.5 rounded-2xl bg-[#F8F9FC] border border-slate-200/80 text-left">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight block">
                  Savings Rate
                </span>
                <div className="font-heading font-extrabold text-lg text-[#9B6CFF] mt-0.5 tabular-nums">
                  {savingsPercent}%
                </div>
                <span className="text-[10px] text-slate-400">₹{savingsAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F9FC] border border-slate-200/80 text-left">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight block">
                  Emergency Buffer
                </span>
                <div className="font-heading font-extrabold text-lg text-[#64C98A] mt-0.5 tabular-nums">
                  ₹{emergencyAmount.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-400">{emergencyPercent}% buffer</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F9FC] border border-slate-200/80 text-left">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight block">
                  Unallocated
                </span>
                <div className={`font-heading font-extrabold text-lg mt-0.5 tabular-nums ${remainingAmount < 0 ? 'text-rose-600' : 'text-[#17171C]'}`}>
                  {remainingAmount < 0 ? `-₹${Math.abs(remainingAmount).toLocaleString('en-IN')}` : `₹${remainingAmount.toLocaleString('en-IN')}`}
                </div>
                <span className="text-[10px] text-slate-400">
                  {remainingAmount < 0 ? 'Overbudget!' : 'Free cushion'}
                </span>
              </div>
            </div>

            {/* Bar Chart Visualization */}
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(val: any) => [`₹${Number(val ?? 0).toLocaleString('en-IN')}`, 'Allocated']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '11px' }}
                  />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Action to validate */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Ready to test this in simulated scenarios?
            </span>
            <button
              onClick={handleCelebrateBalance}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#64C98A] hover:bg-[#52B877] text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Validate Plan (+30 XP)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
