import { Props as CellProps } from 'components/Cell';
import MINOINFOS, { MinoType } from 'tetrominos';

import { Mino } from 'hooks/useMino';

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

export const isValid = (field: Field, mino: Mino) => {
  const shape = MINOINFOS[mino.minoType].shape[mino.rotation];
  return shape.every((row, dy) =>
    row.every(
      (elem, dx) =>
        elem === 0 ||
        (() => {
          const x = mino.pos.x + dx;
          const y = mino.pos.y + dy;
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
