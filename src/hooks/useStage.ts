import { useState, useEffect } from 'react';
import { createStage, createEmptyFiled, Field } from 'gameHelper';
import MINOINFOS, { randomMino } from 'tetrominos';
import { Mino } from 'hooks/useMino';

import { Props as CellProps } from 'components/Cell';

const useStage = (player: Mino, resetPlayer: () => void) => {
  const [stage, setStage] = useState(createStage());

  const [field, setField] = useState(createEmptyFiled());

  useEffect(() => {
    const updateStage = (prevStage: CellProps[][]) => {
      // flush the stage
      // TODO should use foreach instead
      const newStage: CellProps[][] = prevStage.map((row) =>
        row.map((cell) => (cell.type === 'empty' ? cell : { type: 'empty' }))
      );

      // Then draw the tetromino

      return newStage;
    };
    setStage((prev) => updateStage(prev));
  }, [player]);

  return { stage, setStage };
};

export default useStage;
