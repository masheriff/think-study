import * as migration_20250310_040548 from './20250310_040548';
import * as migration_20250318_101454 from './20250318_101454';
import * as migration_20250318_143910 from './20250318_143910';
import * as migration_20250318_152229 from './20250318_152229';
import * as migration_20250319_093502 from './20250319_093502';

export const migrations = [
  {
    up: migration_20250310_040548.up,
    down: migration_20250310_040548.down,
    name: '20250310_040548',
  },
  {
    up: migration_20250318_101454.up,
    down: migration_20250318_101454.down,
    name: '20250318_101454',
  },
  {
    up: migration_20250318_143910.up,
    down: migration_20250318_143910.down,
    name: '20250318_143910',
  },
  {
    up: migration_20250318_152229.up,
    down: migration_20250318_152229.down,
    name: '20250318_152229',
  },
  {
    up: migration_20250319_093502.up,
    down: migration_20250319_093502.down,
    name: '20250319_093502'
  },
];
