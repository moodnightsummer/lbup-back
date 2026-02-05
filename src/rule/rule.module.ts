import { Module } from '@nestjs/common';
import { RuleEngine } from './engine/rule.engine';
import { FailureRule } from './rules/failure.rule';
import { VolumeRule } from './rules/volume.rule';
import { FatigueRule } from './rules/fatigure.rule';

@Module({
  providers: [
    FailureRule,
    VolumeRule,
    FatigueRule,
    {
      provide: RuleEngine,
      useFactory: (
        failureRule: FailureRule,
        volumeRule: VolumeRule,
        fatigueRule: FatigueRule,
      ) => {
        return new RuleEngine([failureRule, volumeRule, fatigueRule]);
      },
      inject: [FailureRule, VolumeRule, FailureRule],
    },
  ],
  exports: [RuleEngine],
})
export class RuleModule {}
