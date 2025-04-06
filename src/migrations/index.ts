import * as migration_20250310_040548 from './20250310_040548';
import * as migration_20250318_101454 from './20250318_101454';
import * as migration_20250318_143910 from './20250318_143910';
import * as migration_20250318_152229 from './20250318_152229';
import * as migration_20250319_093502 from './20250319_093502';
import * as migration_20250403_054411 from './20250403_054411';
import * as migration_20250406_110659 from './20250406_110659';
import * as migration_20250406_135143 from './20250406_135143';
import * as migration_20250406_142654 from './20250406_142654';
import * as migration_20250406_142841 from './20250406_142841';

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
    name: '20250319_093502',
  },
  {
    up: migration_20250403_054411.up,
    down: migration_20250403_054411.down,
    name: '20250403_054411',
  },
  {
    up: migration_20250406_110659.up,
    down: migration_20250406_110659.down,
    name: '20250406_110659',
  },
  {
    up: migration_20250406_135143.up,
    down: migration_20250406_135143.down,
    name: '20250406_135143',
  },
  {
    up: migration_20250406_142654.up,
    down: migration_20250406_142654.down,
    name: '20250406_142654',
  },
  {
    up: migration_20250406_142841.up,
    down: migration_20250406_142841.down,
    name: '20250406_142841'
  },
];
