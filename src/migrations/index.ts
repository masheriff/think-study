import * as migration_20250409_095740 from './20250409_095740';
import * as migration_20250410_111747 from './20250410_111747';
import * as migration_20250410_112110 from './20250410_112110';
import * as migration_20250410_124344 from './20250410_124344';
import * as migration_20250410_125347 from './20250410_125347';
import * as migration_20250410_133537 from './20250410_133537';
import * as migration_20250410_133746 from './20250410_133746';
import * as migration_20250410_135134 from './20250410_135134';
import * as migration_20250410_135354 from './20250410_135354';

export const migrations = [
  {
    up: migration_20250409_095740.up,
    down: migration_20250409_095740.down,
    name: '20250409_095740',
  },
  {
    up: migration_20250410_111747.up,
    down: migration_20250410_111747.down,
    name: '20250410_111747',
  },
  {
    up: migration_20250410_112110.up,
    down: migration_20250410_112110.down,
    name: '20250410_112110',
  },
  {
    up: migration_20250410_124344.up,
    down: migration_20250410_124344.down,
    name: '20250410_124344',
  },
  {
    up: migration_20250410_125347.up,
    down: migration_20250410_125347.down,
    name: '20250410_125347',
  },
  {
    up: migration_20250410_133537.up,
    down: migration_20250410_133537.down,
    name: '20250410_133537',
  },
  {
    up: migration_20250410_133746.up,
    down: migration_20250410_133746.down,
    name: '20250410_133746',
  },
  {
    up: migration_20250410_135134.up,
    down: migration_20250410_135134.down,
    name: '20250410_135134',
  },
  {
    up: migration_20250410_135354.up,
    down: migration_20250410_135354.down,
    name: '20250410_135354'
  },
];
