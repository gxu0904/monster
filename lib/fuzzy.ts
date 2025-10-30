/**
 * Simple fuzzy search implementation
 * Returns a score from 0-1 indicating how well the pattern matches the target
 */
export function fuzzyScore(pattern: string, target: string): number {
  const patternLower = pattern.toLowerCase();
  const targetLower = target.toLowerCase();

  // Exact match gets highest score
  if (targetLower === patternLower) return 1;
  if (targetLower.includes(patternLower)) return 0.9;

  let patternIdx = 0;
  let targetIdx = 0;
  let score = 0;
  let consecutive = 0;

  while (patternIdx < patternLower.length && targetIdx < targetLower.length) {
    if (patternLower[patternIdx] === targetLower[targetIdx]) {
      score++;
      consecutive++;
      patternIdx++;
    } else {
      consecutive = 0;
    }
    targetIdx++;
  }

  // Didn't match all characters
  if (patternIdx !== patternLower.length) return 0;

  // Calculate score based on matched characters and consecutive matches
  const matchRatio = score / targetLower.length;
  const consecutiveBonus = consecutive / patternLower.length;

  return (matchRatio * 0.6) + (consecutiveBonus * 0.4);
}

export interface FuzzyMatch<T> {
  item: T;
  score: number;
}

export function fuzzySearch<T>(
  pattern: string,
  items: T[],
  getText: (item: T) => string,
  threshold = 0.3
): FuzzyMatch<T>[] {
  if (!pattern) return items.map(item => ({ item, score: 1 }));

  return items
    .map(item => ({
      item,
      score: fuzzyScore(pattern, getText(item)),
    }))
    .filter(match => match.score >= threshold)
    .sort((a, b) => b.score - a.score);
}
