import { RuleContext } from './rule-context.interface';
import { RuleResult } from './rule-result.interface';

export interface Rule {
  evaluate(context: RuleContext): RuleResult | null;
}
