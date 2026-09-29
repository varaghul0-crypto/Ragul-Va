import React, { useState } from 'react';
import { 
  Calculator, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Info, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';

export const LoanEMILab: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(150000);
  const [annualRate, setAnnualRate] = useState<number>(14);
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [processingFeePercent, setProcessingFeePercent] = useState<number>(2.5);

  // EMI Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = annualRate / 12 / 100;
  const emi = monthlyRate === 0 
    ? loanAmount / tenureMonths 
    : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const roundedEmi = Math.round(emi);
  const totalRepayment = Math.round(roundedEmi * tenureMonths);
  const totalInterest = Math.max(0, totalRepayment - loanAmount);
  const processingFee = Math.round((loanAmount * processingFeePercent) / 100);
  const netDisbursed = loanAmount - processingFee;
  const totalCost = totalInterest + processingFee;

  // Chart data
  const chartData = [
    { name: 'Principal Borrowed', value: loanAmount, color: '#9B6CFF' },
    { name: 'Total Interest', value: totalInterest, color: '#FF806D' },
    { name: 'Processing Cut', value: processingFee, color: '#FFD95A' },
  ];

  const tenureYears = (tenureMonths / 12).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-[#78B7FF] uppercase tracking-wider block">
            Borrowing Simulator
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#17171C]">
            Loan & EMI Lab
          </h2>
          <p className="text-sm text-[#777985] mt-1">
            Simulate real borrowing costs, discover hidden APRs, and avoid predatory campus loan traps.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="px-3.5 py-1.5 rounded-full bg-[#E9F6FD] text-[#78B7FF] text-xs font-bold border border-blue-200">
            Transparent Cost Engine
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Control Deck (6 cols) */}
        <div className="lg:col-span-6 soft-card p-6 md:p-8 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-bold text-[#777985] uppercase tracking-wider">
                Loan Parameters
              </span>
              <span className="text-xs font-semibold text-[#9B6CFF]">
                Instant Live Calculation
              </span>
            </div>

            <div className="space-y-6">
              {/* Slider 1: Loan Amount */}
              <div>
                <div className="flex items-center justify-between mb-2 text-sm font-semibold">
                  <span className="text-slate-700">Loan Amount</span>
                  <span className="font-extrabold text-[#17171C] text-base tabular-nums">
                    ₹{loanAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={300000}
                  step={5000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#9B6CFF] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>₹10,000 (Micro loan)</span>
                  <span>₹3,00,000 (Degree/Laptop)</span>
                </div>
              </div>

              {/* Slider 2: Interest Rate */}
              <div>
                <div className="flex items-center justify-between mb-2 text-sm font-semibold">
                  <span className="text-slate-700">Annual Interest Rate</span>
                  <span className={`font-extrabold text-base tabular-nums ${annualRate > 24 ? 'text-rose-600' : 'text-[#17171C]'}`}>
                    {annualRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={45}
                  step={0.5}
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className="w-full accent-[#FF806D] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>8.5% (Bank Student Loan)</span>
                  <span className="text-rose-500 font-semibold">36%+ (Predatory Apps)</span>
                </div>
              </div>

              {/* Slider 3: Tenure */}
              <div>
                <div className="flex items-center justify-between mb-2 text-sm font-semibold">
                  <span className="text-slate-700">Tenure (Duration)</span>
                  <span className="font-extrabold text-[#17171C] text-base tabular-nums">
                    {tenureMonths} Months ({tenureYears} yrs)
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={48}
                  step={3}
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full accent-[#78B7FF] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>3 Months (Short)</span>
                  <span>48 Months (Long)</span>
                </div>
              </div>

              {/* Slider 4: Upfront Processing Fee */}
              <div>
                <div className="flex items-center justify-between mb-2 text-sm font-semibold">
                  <span className="text-slate-700">Processing Fee</span>
                  <span className="font-extrabold text-[#17171C] text-base tabular-nums">
                    {processingFeePercent}% (₹{processingFee.toLocaleString('en-IN')})
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15}
                  step={0.5}
                  value={processingFeePercent}
                  onChange={(e) => setProcessingFeePercent(Number(e.target.value))}
                  className="w-full accent-[#FFD95A] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>0% (Subsidized)</span>
                  <span>15% (High upfront cut)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Note */}
          <div className="mt-6 pt-4 border-t border-slate-100 p-3.5 rounded-2xl bg-[#F8FAFC] text-xs text-slate-600">
            <span className="font-bold text-[#17171C] block mb-1">
              💡 Student Finance Rule:
            </span>
            “Changing the tenure changes both the monthly payment and total interest. Longer tenures lower monthly EMI but significantly increase total interest paid.”
          </div>
        </div>

        {/* Results & Visual Chart (6 cols) */}
        <div className="lg:col-span-6 soft-card p-6 md:p-8 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#777985] uppercase tracking-wider">
                Repayment Breakdown
              </span>
              {annualRate > 24 && (
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-extrabold uppercase">
                  High APR Warning
                </span>
              )}
            </div>

            {/* Primary Result Metric Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-[#F3EDFF] border border-purple-200/60 text-left">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight block">
                  Estimated EMI
                </span>
                <div className="font-heading font-extrabold text-xl md:text-2xl text-[#9B6CFF] mt-1 tabular-nums">
                  ₹{roundedEmi.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-400">per month</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF3E7] border border-orange-200/60 text-left">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight block">
                  Total Interest
                </span>
                <div className="font-heading font-extrabold text-xl md:text-2xl text-[#FF806D] mt-1 tabular-nums">
                  ₹{totalInterest.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-400">cost of borrowing</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#E8FAF1] border border-emerald-200/60 text-left">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight block">
                  Total Repaid
                </span>
                <div className="font-heading font-extrabold text-xl md:text-2xl text-[#64C98A] mt-1 tabular-nums">
                  ₹{totalRepayment.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-400">Principal + Interest</span>
              </div>
            </div>

            {/* Mini Donut Chart */}
            <div className="h-44 w-full flex items-center justify-center my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`₹${Number(val ?? 0).toLocaleString('en-IN')}`, 'Amount']}
                    contentStyle={{ borderRadius: '14px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Chart Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#9B6CFF]" />
                <span>Principal: ₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF806D]" />
                <span>Interest: ₹{totalInterest.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FFD95A]" />
                <span>Fee: ₹{processingFee.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Predatory App Trap Alert */}
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Campus Safety Alert: Beware 7-Day Instant Loan APKs</span>
            </div>
            <p className="leading-relaxed text-[11px] text-rose-900/90">
              Unlicensed apps disburse ₹7,000 on a ₹10,000 loan (taking ₹3,000 fee upfront) and demand ₹10,000 in just 7 days. That represents over <strong>2,000% APR</strong>. Always borrow only through verified NBFCs or banks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
