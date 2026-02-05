import { RuleContext } from '../interface/rule-context.interface';
import { RuleResult } from '../interface/rule-result.interface';
import { Rule } from '../interface/rule.interface';

export class FailureRule implements Rule {
  evaluate(context: RuleContext): RuleResult | null {
    const { currentSet, sessionSets, userStats } = context;

    // 성공이면 관여 안 함
    if (currentSet.isSuccess) return null;

    const failedStreak = sessionSets.slice(-2).every((set) => !set.isSuccess);

    // 1회 실패면 유지
    if (!failedStreak) {
      return {
        recommendedWeight: currentSet.weight,
        recommendedReps: currentSet.reps,
        reason: '단일 실패 → 중량 유지',
        confidence: 0.6,
      };
    }

    // 연속 실패 → 감량 (base 기준)
    const decreased = Math.max(
      userStats.baseWeight * 0.9,
      currentSet.weight * 0.9,
    );

    return {
      recommendedWeight: decreased,
      recommendedReps: currentSet.reps,
      reason: '연속 실패 → 중량 10% 감소',
      confidence: 0.9,
    };
  }
}
