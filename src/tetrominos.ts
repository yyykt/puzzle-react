export type MinoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'; // TODO rename
export type Rotation = 0 | 90 | 180 | 270;
type CellType = 0 | MinoType;

type MinoInfo = {
  shape: { [rotation in Rotation]: (0 | 1)[][] };
  color: string;
};

const MINOINFOS: { [minoType in MinoType]: MinoInfo } = {
  I: {
    shape: {
      0: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      90: [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
      180: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      270: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
    },
    color: '0, 255, 255', // Cyan
  },
  J: {
    shape: {
      0: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      90: [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      180: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      270: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
    },
    color: '0, 0, 255', // Blue
  },
  L: {
    shape: {
      0: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      90: [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      180: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      270: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
    },
    color: '255, 165, 0', // Orange
  },
  O: {
    shape: {
      0: [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
      90: [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      180: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      270: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
    },
    color: '255, 255, 0 ', // Yellow
  },
  S: {
    shape: {
      0: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      90: [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      180: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      270: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
    },
    color: '0, 255, 0', // Green
  },
  T: {
    shape: {
      0: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      90: [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      180: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      270: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
    },
    color: '128, 0, 128', // Purple
  },
  Z: {
    shape: {
      0: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      90: [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      180: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      270: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
    },
    color: '255, 0, 0', // Red
  },
};

export const randomMino = () => {
  const minos: MinoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const randMino = minos[Math.floor(Math.random() * minos.length)];
  return randMino;
};

export default MINOINFOS;
