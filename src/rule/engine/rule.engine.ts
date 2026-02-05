import { RuleContext } from '../interface/rule-context.interface';
import { RuleResult } from '../interface/rule-result.interface';
import { Rule } from '../interface/rule.interface';

export class RuleEngine {
  constructor(private readonly rules: Rule[]) {}

  run(context: RuleContext): RuleResult[] {
    const results = this.rules
      .map((rule) => rule.evaluate(context))
      .filter((r): r is NonNullable<typeof r> => r !== null);

    if (results.length === 0) return [];

    return results.map((r) => ({
      ...r,
      recommendedWeight: clampRecommendation(
        r.recommendedWeight,
        context.currentSet.weight,
      ),
    }));
  }
}

function clampRecommendation(recommended: number, current: number): number {
  const maxIncrease = current * 1.1; // +10%
  const maxAbsoluteIncrease = current + 5; // or +5kg

  return Math.min(recommended, maxIncrease, maxAbsoluteIncrease);
}
