import React from 'react';
import { 
  ShieldCheck, 
  MessageSquareWarning, 
  Calculator, 
  PieChart, 
  ClipboardCheck, 
  ArrowRight 
} from 'lucide-react';
import { LEARNING_MODULES } from '../data/mockData';
import { NavTab } from '../types';

interface LearningModulesGridProps {
  onSelectTab: (tab: NavTab) => void;
}

export const LearningModulesGrid: React.FC<LearningModulesGridProps> = ({ onSelectTab }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'mod-upi':
        return <ShieldCheck className="w-5 h-5" />;
      case 'mod-msg':
        return <MessageSquareWarning className="w-5 h-5" />;
      case 'mod-loan':
        return <Calculator className="w-5 h-5" />;
      case 'mod-budget':
        return <PieChart className="w-5 h-5" />;
      default:
        return <ClipboardCheck className="w-5 h-5" />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#777985]">
            Practice Labs
          </span>
          <h3 className="font-heading font-extrabold text-xl md:text-2xl text-[#17171C]">
            Interactive Safety Sandboxes
          </h3>
        </div>
        <span className="text-xs font-semibold text-[#777985]">
          {LEARNING_MODULES.length} specialized simulation tools
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LEARNING_MODULES.map((mod) => (
          <div
            key={mod.id}
            onClick={() => onSelectTab(mod.tab)}
            className="soft-card soft-card-hover p-5 bg-white cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Top row with icon & category badge */}
              <div className="flex items-center justify-between mb-3.5">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: mod.accent }}
                >
                  {getIcon(mod.id)}
                </div>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  {mod.category}
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="font-heading font-extrabold text-base text-[#17171C] group-hover:text-[#9B6CFF] transition-colors">
                {mod.title}
              </h4>
              <p className="mt-1 text-xs text-[#777985] line-clamp-2 leading-relaxed">
                {mod.description}
              </p>
            </div>

            {/* Bottom Progress & Arrow */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="w-2/3">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
                  <span>Progress</span>
                  <span className="tabular-nums font-bold text-slate-700">{mod.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${mod.progress}%`,
                      backgroundColor: mod.accent,
                    }}
                  />
                </div>
              </div>

              <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-[#F3EDFF] flex items-center justify-center text-slate-400 group-hover:text-[#9B6CFF] transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
