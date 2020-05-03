import { useState } from 'react';
import { createStage } from 'gameHelper';
import { randomTeromino } from 'tetrominos';

const useStage = () => {
  const [stage, setStage] = useState(createStage());

  return [stage];
};

export default useStage;
