import { RuleContext } from '../interface/rule-context.interface';
import { RuleResult } from '../interface/rule-result.interface';
import { Rule } from '../interface/rule.interface';

export class VolumeRule implements Rule {
  evaluate(context: RuleContext): RuleResult | null {
    const { currentSet, sessionSets, userStats } = context;

    // 최소 2세트 이상일 때만 판단
    if (sessionSets.length < 2) return null;

    const lastTwo = sessionSets.slice(-2);

    const consecutiveSuccess = lastTwo.every((s) => s.isSuccess);
    if (!consecutiveSuccess) return null;

    // 베이스 기준 소폭 증량
    const increased = userStats.baseWeight * 1.025;

    // PR 보호 캡
    const capped = Math.min(increased, userStats.lastPR1RM * 1.05);

    // 이미 현재 중량이 상한 근접이면 패스
    if (currentSet.weight >= capped) return null;

    return {
      recommendedWeight: Math.round(capped),
      recommendedReps: currentSet.reps,
      reason: '연속 성공 → 중량 2.5% 증가',
      confidence: 0.7,
    };
  }
}
