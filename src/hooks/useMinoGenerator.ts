import { useState, useRef } from 'react';
import { MinoType } from 'tetriminos';

const NUM_MINO_SHOWN = 6;
const initialMinoBag: MinoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

const useMinoGenerator = () => {
  const [next, setNext] = useState<(MinoType | null)[]>(
    Array.from(Array(NUM_MINO_SHOWN), () => null)
  );
  const [hold, setHold] = useState<MinoType | null>(null);
  const [alreadyHolded, setAlreadyHolded] = useState(false);
  const bag = useRef([...initialMinoBag]);

  const popFromBag = () => {
    if (bag.current.length === 0) {
      bag.current = [...initialMinoBag];
    }
    const index = Math.floor(Math.random() * bag.current.length);
    const mino = bag.current[index];
    bag.current.splice(index, 1);

    return mino;
  };

  const resetMinoGenerator = () => {
    bag.current = [...initialMinoBag];
    const newNext = Array.from(Array(NUM_MINO_SHOWN), () => popFromBag());
    setNext(newNext);
    setHold(null);
  };

  const getNext = () => {
    const nextCopy = [...next];
    const nextOne = nextCopy.shift();
    setAlreadyHolded(false);
    if (nextOne) {
      nextCopy.push(popFromBag());
      setNext(nextCopy);
      return nextOne;
    }

    // Assume nextOne is never null/undefined when this func called
    throw new Error('Invalid call of getNext().');
  };

  const execHold = (mino: MinoType) => {
    if (alreadyHolded) return false;
    setHold(mino);
    setAlreadyHolded(true);
    return true;
  };

  return { next, getNext, resetMinoGenerator, hold, execHold };
};

export default useMinoGenerator;
