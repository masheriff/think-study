import * as migration_20250409_095740 from './20250409_095740';
import * as migration_20250410_111747 from './20250410_111747';
import * as migration_20250410_112110 from './20250410_112110';

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
    name: '20250410_112110'
  },
];
