import * as migration_20250227_050950 from './20250227_050950';

export const migrations = [
  {
    up: migration_20250227_050950.up,
    down: migration_20250227_050950.down,
    name: '20250227_050950'
  },
];
