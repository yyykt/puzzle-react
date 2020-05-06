import { Props as CellProps } from 'components/Cell';
import MINOINFOS, { MinoType, Rotation } from 'tetrominos';

export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 21; // including partly visible top line
export const STAGE_TOTAL_HEIGHT = 40;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    Array.from(Array(STAGE_WIDTH), (): CellProps => ({ type: 'empty' }))
  );

export type Field = ('empty' | MinoType)[][];
export const createEmptyFiled = (): Field =>
  Array.from(Array(STAGE_TOTAL_HEIGHT), () =>
    Array.from(Array(STAGE_WIDTH), () => 'empty')
  );

export const calcVisibleStage = (
  field: Field,
  mino: Mino | null
): CellProps[][] => {
  const stage: CellProps[][] = field
    .slice(0, STAGE_HEIGHT)
    .map((row) =>
      row.map((elem) =>
        elem === 'empty'
          ? { type: 'empty' }
          : { type: 'fixedBlock', minoType: elem }
      )
    );

  if (mino) {
    const { x, y } = mino.pos;
    const shape = MINOINFOS[mino.minoType].shape[mino.rotation];
    shape.forEach((row, dy) =>
      row.forEach((flag, dx) => {
        if (flag && y - dy < STAGE_HEIGHT) {
          stage[y - dy][x + dx] = {
            type: 'activeMino',
            minoType: mino.minoType,
          };
        }
      })
    );
  }

  return stage;
};

export const isValidPos = (mino: Mino, field: Field) => {
  const shape = MINOINFOS[mino.minoType].shape[mino.rotation];
  return shape.every((row, dy) =>
    row.every(
      (elem, dx) =>
        elem === 0 ||
        (() => {
          const x = mino.pos.x + dx;
          const y = mino.pos.y - dy;
          return (
            x >= 0 &&
            x < STAGE_WIDTH &&
            y >= 0 &&
            y < STAGE_TOTAL_HEIGHT &&
            field[y][x] === 'empty'
          );
        })()
    )
  );
};

export const moveIfValid = (
  mino: Mino,
  field: Field,
  dx: number,
  dy: number
): {
  succeed: boolean;
  updatedMino: Mino;
} => {
  const { x, y } = mino.pos;
  const updatedMino = { ...mino, pos: { x: x + dx, y: y + dy } };
  const succeed = isValidPos(updatedMino, field);
  return { succeed, updatedMino: succeed ? updatedMino : mino };
};

export const hardDrop = (mino: Mino, field: Field) => {
  let succeed = true;
  let updatedMino = mino;
  while (succeed) {
    ({ succeed, updatedMino } = moveIfValid(updatedMino, field, 0, -1));
  }
  return updatedMino;
};

export const rotate = (r: Rotation, dir: 'L' | 'R'): Rotation => {
  if (r === 0) {
    return dir === 'R' ? 1 : 3;
  }
  if (r === 1) {
    return dir === 'R' ? 2 : 0;
  }
  if (r === 2) {
    return dir === 'R' ? 3 : 1;
  }
  // r === 3
  return dir === 'R' ? 0 : 2;
};

export const rotateIfValid = (
  mino: Mino,
  field: Field,
  dir: 'L' | 'R'
): {
  succeed: boolean;
  updatedMino: Mino;
} => {
  const updatedMino = { ...mino, rotation: rotate(mino.rotation, dir) };
  const succeed = isValidPos(updatedMino, field);
  return { succeed, updatedMino: succeed ? updatedMino : mino };
};

export type Mino = {
  pos: { x: number; y: number };
  minoType: MinoType;
  rotation: Rotation;
};

export const createMino = (minoType: MinoType): Mino => {
  return {
    minoType,
    pos: {
      x: Math.floor(STAGE_WIDTH / 2) - 2,
      y: STAGE_HEIGHT,
    },
    rotation: 0,
  };
};

export const place = (mino: Mino, field: Field) => {
  const fieldCopy: Field = Array.from(field, (row) => Array.from(row));
  const shape = MINOINFOS[mino.minoType].shape[mino.rotation];
  shape.forEach((row, dy) =>
    row.forEach((elem, dx) => {
      if (elem) {
        fieldCopy[mino.pos.y - dy][mino.pos.x + dx] = mino.minoType;
      }
    })
  );
  return fieldCopy;
};

const deleteOneLine = (field: Field) => {
  const fieldCopy: Field = Array.from(field, (row) => Array.from(row));
  const LineIndex = fieldCopy.findIndex((row) =>
    row.every((elem) => elem !== 'empty')
  );
  if (LineIndex === -1) return { deleted: 0, updatedField: field };

  fieldCopy.splice(LineIndex, 1);
  fieldCopy.push(Array.from(Array(STAGE_WIDTH), () => 'empty'));
  return { deleted: 1, updatedField: fieldCopy };
};

export const deleteLines = (field: Field) => {
  let count = 0;
  let { deleted, updatedField } = deleteOneLine(field);
  count += deleted;
  while (deleted) {
    ({ deleted, updatedField } = deleteOneLine(updatedField));
    count += deleted;
  }
  return { count, updatedField };
};
