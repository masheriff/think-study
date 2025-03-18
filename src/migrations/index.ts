import * as migration_20250310_040548 from './20250310_040548';
import * as migration_20250318_101454 from './20250318_101454';

export const migrations = [
  {
    up: migration_20250310_040548.up,
    down: migration_20250310_040548.down,
    name: '20250310_040548',
  },
  {
    up: migration_20250318_101454.up,
    down: migration_20250318_101454.down,
    name: '20250318_101454'
  },
];
