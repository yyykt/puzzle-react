import { useState } from 'react';
import { randomTeromino } from 'tetrominos';

const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: randomTeromino(),
    collided: false,
  });

  return [player];
};

export default usePlayer;
