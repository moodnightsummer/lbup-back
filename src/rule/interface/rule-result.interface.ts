export interface RuleResult {
  recommendedWeight: number;
  recommendedReps: number;
  reason: string;
  confidence: number; // 0~1
}
