export type NavTab = 
  | 'home'
  | 'simulator'
  | 'message-lab'
  | 'loan-emi'
  | 'budget-lab'
  | 'progress'
  | 'privacy';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface WarningSignal {
  id: string;
  label: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  foundInText?: string;
}

export interface Scenario {
  id: string;
  title: string;
  category: 'UPI' | 'QR Code' | 'Scholarship' | 'Delivery' | 'Support' | 'Job' | 'Loan';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xp: number;
  sender: string;
  channel: 'SMS' | 'WhatsApp' | 'Email' | 'Phone' | 'UPI App' | 'Telegram';
  time: string;
  messageText: string;
  details?: {
    claimedAmount?: string;
    actionRequired?: string;
    counterparty?: string;
  };
  signals: WarningSignal[];
  correctAnswer: 'safe' | 'suspicious' | 'scam';
  explanation: string;
  safeAction: string;
}

export interface MessageAnalysisResult {
  riskLevel: RiskLevel;
  riskScore: number; // 0 to 100
  signals: WarningSignal[];
  verdict: string;
  explanation: string[];
  safeAction: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'safety' | 'analysis' | 'budget' | 'streak';
  color: string;
}

export interface UserStats {
  level: number;
  levelTitle: string;
  currentXp: number;
  nextLevelXp: number;
  streakDays: number;
  safetyScore: number;
  scoreGainWeek: number;
  challengesCompleted: number;
  totalChallenges: number;
  learningGainPercent: number;
  modulesCompleted: number;
  totalModules: number;
  categoryScores: {
    scamRecognition: number;
    paymentSafety: number;
    budgetAwareness: number;
    loanAwareness: number;
  };
}
