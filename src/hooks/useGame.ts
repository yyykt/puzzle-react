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
import { MinoType } from 'tetriminos';
import useTimeout from '@rooks/use-timeout';
import useMinoGenerator from './useMinoGenerator';

const useGame = () => {
  const [mino, setMino] = useState<Mino | null>(null);
  const [field, setField] = useState<Field>(createEmptyFiled());
  const [gameOver, setGameOver] = useState(false);
  const [lineCleared, setLineCleared] = useState(0);
  const [timer, setTimer] = useState(0);
  const {
    next,
    getNext,
    resetMinoGenerator,
    hold,
    execHold,
  } = useMinoGenerator();

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

  const resetMino = (minoType: MinoType) => {
    const newMino = createMino(minoType);
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
    const newMino = createMino(getNext());
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

  const TIME_FOR_START = 1000; // ms
  const { start, clear } = useTimeout(() => {
    resetMino(getNext());
    setTimer(0);
  }, TIME_FOR_START);

  const startGame = () => {
    // Reset everything
    resetField();
    setMino(null);
    setGameOver(false);
    setLineCleared(0);
    resetMinoGenerator();
    start();
  };

  const placeMino = () => {
    if (!mino) return;
    const updatedField = place(mino, field);
    setField(updatedField);
    setMino(null);
  };

  const holdMino = () => {
    if (!mino) return;
    const succeed = execHold(mino.minoType);
    if (succeed) {
      if (hold) {
        resetMino(hold);
      } else {
        resetMino(getNext());
      }
    }
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
    next,
    hold,
    holdMino,
  };
};

export default useGame;
