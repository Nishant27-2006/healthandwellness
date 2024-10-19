import sentiment from 'sentiment';  // Example using a simple package

export const analyzeSentiment = (text: string) => {
  const analysis = sentiment(text);
  const score = analysis.score;  // Returns a positive/negative score
  return score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
};
