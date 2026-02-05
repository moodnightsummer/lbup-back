export interface RuleContext {
  userId: string;
  sessionId: string;
  exerciseId: string;

  currentSet: {
    setNumber: number;
    weight: number;
    reps: number;
    isSuccess: boolean;
    restSeconds: number;
  };

  sessionSets: {
    setNumber: number;
    weight: number;
    reps: number;
    isSuccess: boolean;
    restSeconds: number;
  }[];

  userStats: {
    baseWeight: number;
    lastPR1RM: number;
    avgVolume7d: number;
  };
}
