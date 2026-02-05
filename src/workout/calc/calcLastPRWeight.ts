interface SetRecord {
  weight: number;
  reps: number;
  isSuccess: boolean;
  createdAt: Date;
}

export function calcLastPR1RM(sets: SetRecord[], lookback = 10): number | null {
  const recentSuccessSets = sets.filter((s) => s.isSuccess).slice(0, lookback);

  if (recentSuccessSets.length === 0) return null;

  return recentSuccessSets.reduce((best1RM, cur) => {
    const cur1RM = cur.weight * (1 + cur.reps / 30);
    return Math.max(best1RM, cur1RM);
  }, 0);
}
