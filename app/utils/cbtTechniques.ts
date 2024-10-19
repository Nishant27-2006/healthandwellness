const cbtStrategies = [
    'Identify negative thought patterns and challenge them with positive alternatives.',
    'Practice deep breathing exercises when feeling anxious.',
    'Write down your thoughts and evaluate their realism.',
  ];
  
  export const getCBTResponse = (emotion: string) => {
    if (emotion === 'anxious') {
      return cbtStrategies[0];  // Return specific strategy based on analysis
    }
    return cbtStrategies[1];  // Default response
  };
  