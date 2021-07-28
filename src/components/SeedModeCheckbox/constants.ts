export enum SEED_MODE {
  GLOBAL = 0,
  SINGLE = 1,
  UNLIMITED = 2,
}

export type ModeValue = 0 | 1 | 2;

export const SEED_MODE_NEXT_VALUE_MAP = {
  [SEED_MODE.GLOBAL]: SEED_MODE.SINGLE,
  [SEED_MODE.SINGLE]: SEED_MODE.UNLIMITED,
  [SEED_MODE.UNLIMITED]: SEED_MODE.GLOBAL,
};

export const getNextValue = (value: ModeValue): ModeValue =>
  SEED_MODE_NEXT_VALUE_MAP[value] || SEED_MODE.GLOBAL;
