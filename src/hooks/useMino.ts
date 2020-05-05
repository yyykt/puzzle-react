import { useState, useCallback } from 'react';
import MINOINFOS, { randomMino, MinoType, Rotation } from 'tetrominos';
import { STAGE_HEIGHT, STAGE_WIDTH } from 'gameHelper';

export type Mino = {
  pos: { x: number; y: number };
  minoType: MinoType;
  rotation: Rotation;
};

const createMino = (minoType: MinoType): Mino => {
  return {
    minoType,
    pos: {
      x: Math.floor(STAGE_WIDTH / 2) - 2,
      y: STAGE_HEIGHT,
    },
    rotation: 0,
  };
};

// TODO give a type
const useMino = () => {
  const [mino, setMino] = useState<Mino | null>(null);

  const updateMinoPos = ({ dx, dy }: { dx: number; dy: number }) => {
    setMino((prev) =>
      prev
        ? {
            ...prev,
            pos: { x: prev.pos.x + dx, y: prev.pos.y + dy },
          }
        : null
    );
  };

  const resetMino = useCallback(() => {
    setMino(createMino(randomMino()));
  }, []);

  return { mino, updateMinoPos, resetMino };
};

export default useMino;
