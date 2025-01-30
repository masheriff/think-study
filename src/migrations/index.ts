import * as migration_20250127_122916_initial_migration from './20250127_122916_initial_migration';
import * as migration_20250130_071640_mid_migration from './20250130_071640_mid_migration';

export const migrations = [
  {
    up: migration_20250127_122916_initial_migration.up,
    down: migration_20250127_122916_initial_migration.down,
    name: '20250127_122916_initial_migration',
  },
  {
    up: migration_20250130_071640_mid_migration.up,
    down: migration_20250130_071640_mid_migration.down,
    name: '20250130_071640_mid_migration'
  },
];
