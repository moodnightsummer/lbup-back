import { RuleContext } from '../interface/rule-context.interface';
import { RuleResult } from '../interface/rule-result.interface';
import { Rule } from '../interface/rule.interface';

export class FatigueRule implements Rule {
  evaluate(context: RuleContext): RuleResult | null {
    const { currentSet, sessionSets } = context;

    // 세트 수가 너무 적으면 판단하지 않음
    if (sessionSets.length < 2) return null;

    const last = currentSet;
    const prev = sessionSets[sessionSets.length - 2];

    const restShort = last.restSeconds < 60;
    const repsDropped = prev.reps - last.reps >= 2;
    const failed = !last.isSuccess;

    // 휴식 부족 + 성과 저하가 동시에 있을 때만 개입
    if (restShort && (repsDropped || failed)) {
      return {
        recommendedWeight: last.weight,
        recommendedReps: Math.max(last.reps - 1, 5),
        reason: '휴식 부족 + 퍼포먼스 저하 → 반복 수 감소',
        confidence: 0.7,
      };
    }

    return null;
  }
}
