function roundToPlate(weight: number) {
  return Math.round(weight / 2.5) * 2.5;
}

export function calcBaseWeight(
  lastPR1RM: number,
  recentSets: {
    weight: number;
    reps: number;
    isSuccess: boolean;
  }[],
): number {
  const successRate =
    recentSets.filter((s) => s.isSuccess).length / recentSets.length;

  // working intensity는 보수적으로
  let intensity = 0.75;

  if (successRate >= 0.8) intensity = 0.8;
  else if (successRate < 0.5) intensity = 0.7;

  return roundToPlate(lastPR1RM * intensity);
}
