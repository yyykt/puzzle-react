export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export type CellData = {
  type: number;
  x: 'clear';
};
export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    Array.from(Array(STAGE_WIDTH), (): CellData => ({ type: 0, x: 'clear' }))
  );
