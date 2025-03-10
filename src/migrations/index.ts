import * as migration_20250310_040548 from './20250310_040548';

export const migrations = [
  {
    up: migration_20250310_040548.up,
    down: migration_20250310_040548.down,
    name: '20250310_040548'
  },
];
