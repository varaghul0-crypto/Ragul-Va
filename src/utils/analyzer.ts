import { MessageAnalysisResult, WarningSignal } from '../types';

export function analyzeSyntheticMessage(text: string): MessageAnalysisResult {
  const lower = text.toLowerCase();
  const signals: WarningSignal[] = [];
  let score = 10; // baseline safe score

  // 1. Credential Request Check
  const pinTerms = ['upi pin', 'enter pin', 'secret pin', 'atm pin', 'password', 'cvv', 'card expiry', 'netbanking password'];
  const otpTerms = ['otp', 'one time password', 'verification code', 'share code', '9-digit code'];
  
  if (pinTerms.some(term => lower.includes(term))) {
    signals.push({
      id: 'sig-pin',
      label: 'Credential Request',
      severity: 'high',
      description: 'The message asks for a UPI PIN or password. Legitimate institutions never ask for your PIN.',
    });
    score += 35;
  } else if (otpTerms.some(term => lower.includes(term))) {
    signals.push({
      id: 'sig-otp',
      label: 'OTP / Code Demand',
      severity: 'high',
      description: 'Asks to share or forward an OTP or access code. OTPs are private security keys.',
    });
    score += 30;
  }

  // 2. QR Code / Receive-by-PIN Trap
  if (lower.includes('scan') && (lower.includes('qr') || lower.includes('barcode'))) {
    signals.push({
      id: 'sig-qr',
      label: 'QR Payment Trap',
      severity: 'high',
      description: 'QR codes are used to SEND money, never to receive rewards, grants, or reimbursements.',
    });
    score += 25;
  }

  // 3. Urgency / Panic Triggers
  const urgencyTerms = ['immediately', 'urgent', 'expires', 'today only', 'within 2 hours', 'tonight', 'last chance', 'hurry', 'suspended', 'cancelled'];
  if (urgencyTerms.some(term => lower.includes(term))) {
    signals.push({
      id: 'sig-urgency',
      label: 'Urgency & Pressure',
      severity: 'medium',
      description: 'Creates artificial panic or tight deadlines to prevent you from pausing and verifying.',
    });
    score += 15;
  }

  // 4. Unexpected Rewards / Free Money
  const rewardTerms = ['scholarship', 'congratulations', 'selected', 'won', 'lottery', 'reward', 'cashback', 'bonus', 'free', '₹5,000', '₹10,000'];
  if (rewardTerms.some(term => lower.includes(term)) && (lower.includes('selected') || lower.includes('won') || lower.includes('claim'))) {
    signals.push({
      id: 'sig-reward',
      label: 'Unexpected Reward',
      severity: 'medium',
      description: 'Promises unexpected money or scholarships without official administrative application.',
    });
    score += 20;
  }

  // 5. Threat / Disconnection / Suspension
  const threatTerms = ['disconnect', 'block', 'freeze', 'kyc expired', 'deactivated', 'arrest', 'penalty', 'legal action', 'fail'];
  if (threatTerms.some(term => lower.includes(term))) {
    signals.push({
      id: 'sig-threat',
      label: 'Intimidation & Fear',
      severity: 'high',
      description: 'Uses fear of account freezing or service disruption to force hasty compliance.',
    });
    score += 20;
  }

  // 6. Suspicious links / APKs
  const linkTerms = ['bit.ly', 'tinyurl', '.apk', 't.me/', 'wa.me/', 'http://', 'goo.gl'];
  if (linkTerms.some(term => lower.includes(term))) {
    signals.push({
      id: 'sig-link',
      label: 'Unverified Link / APK',
      severity: 'high',
      description: 'Contains a shortened or third-party download link that may harvest login credentials or install malware.',
    });
    score += 25;
  }

  // 7. Remote desktop / Screen sharing
  const remoteTerms = ['anydesk', 'teamviewer', 'rustdesk', 'quicksupport', 'screenshare', 'screen share'];
  if (remoteTerms.some(term => lower.includes(term))) {
    signals.push({
      id: 'sig-remote',
      label: 'Remote Screen-Share Tool',
      severity: 'high',
      description: 'Asking you to install remote access tools enables attackers to view OTPs and take over your device.',
    });
    score += 35;
  }

  // Determine risk level
  const clampedScore = Math.min(100, Math.max(10, score));
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let verdict = 'LOW EDUCATIONAL RISK';

  if (clampedScore >= 60 || signals.some(s => s.severity === 'high')) {
    riskLevel = 'HIGH';
    verdict = 'HIGH EDUCATIONAL RISK';
  } else if (clampedScore >= 35 || signals.length > 0) {
    riskLevel = 'MEDIUM';
    verdict = 'MODERATE EDUCATIONAL RISK';
  } else {
    riskLevel = 'LOW';
    verdict = 'LIKELY SAFE INFORMATIONAL NOTICE';
  }

  const explanation: string[] = [];
  if (signals.length === 0) {
    explanation.push('No obvious high-risk patterns (such as credential demands, urgency triggers, or malicious links) were detected.');
    explanation.push('However, always verify incoming bank notifications directly inside your official banking or campus app.');
  } else {
    signals.forEach(sig => {
      explanation.push(`${sig.label}: ${sig.description}`);
    });
  }

  const safeAction = riskLevel === 'HIGH'
    ? 'PAUSE → DO NOT ENTER CREDENTIALS → VERIFY INDEPENDENTLY via official campus helpdesk or dial 1930.'
    : riskLevel === 'MEDIUM'
    ? 'PAUSE → Cross-check sender details on the official university portal before taking action.'
    : 'VERIFY sender domain and cross-check against official campus records.';

  return {
    riskLevel,
    riskScore: clampedScore,
    signals,
    verdict,
    explanation,
    safeAction,
  };
}
