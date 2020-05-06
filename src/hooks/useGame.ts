import { useState } from 'react';
import {
  createMino,
  createEmptyFiled,
  Mino,
  Field,
  isValidPos,
  rotate,
  hardDrop,
  place,
  deleteLines,
} from 'gameHelper';
import { randomMino } from 'tetriminos';

const useGame = () => {
  const [mino, setMino] = useState<Mino | null>(null);
  const [field, setField] = useState<Field>(createEmptyFiled());
  const [gameOver, setGameOver] = useState(false);
  const [lineCleared, setLineCleared] = useState(0);
  const [timer, setTimer] = useState(0);

  const resetField = () => setField(createEmptyFiled());

  const checkAndSetMino = (newMino: Mino) => {
    if (mino) {
      const succeed = isValidPos(newMino, field);
      if (succeed) {
        setMino(newMino);
      }
      return succeed;
    }
    return false;
  };

  const resetMino = () => {
    const newMino = createMino(randomMino());
    if (isValidPos(newMino, field)) {
      setMino(newMino);
      return true;
    }

    setGameOver(true);
    return false;
  };

  const shiftMino = (dir: 1 | -1) => {
    return mino
      ? checkAndSetMino({
          ...mino,
          pos: { x: mino.pos.x + dir, y: mino.pos.y },
        })
      : false;
  };

  const dropMino = () => {
    return mino
      ? checkAndSetMino({
          ...mino,
          pos: { x: mino.pos.x, y: mino.pos.y - 1 },
        })
      : false;
  };

  const hardDropMino = () => {
    if (!mino) return;
    const updatedMino = hardDrop(mino, field);
    const updatedField = place(updatedMino, field);

    // reset mino. needed to copy because of the async behaviour of hooks
    // TODO wait for a while ?
    const newMino = createMino(randomMino());
    if (isValidPos(newMino, updatedField)) {
      setMino(newMino);
    } else {
      setGameOver(true);
    }

    const { count, updatedField: finalField } = deleteLines(updatedField);
    setField(finalField);
    setLineCleared(lineCleared + count);
  };

  const rotateMino = (dir: 'L' | 'R') => {
    return mino
      ? checkAndSetMino({
          ...mino,
          rotation: rotate(mino.rotation, dir),
        })
      : false;
  };
  const startGame = () => {
    // Reset everything
    resetField();
    resetMino();
    setGameOver(false);
    setLineCleared(0);
    setTimer(0);
  };

  const placeMino = () => {
    if (!mino) return;
    const updatedField = place(mino, field);
    setField(updatedField);
    setMino(null);
  };

  const game = {
    mino,
    field,
    gameOver,
    lineCleared,
  };
  return {
    game,
    startGame,
    shiftMino,
    dropMino,
    rotateMino,
    resetMino,
    placeMino,
    hardDropMino,
    timer,
    setTimer,
  };
};

export default useGame;
