import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_world_items_block" DROP COLUMN IF EXISTS "center_point_x_position";
  ALTER TABLE "pages_blocks_world_items_block" DROP COLUMN IF EXISTS "center_point_y_position";
  ALTER TABLE "_pages_v_blocks_world_items_block" DROP COLUMN IF EXISTS "center_point_x_position";
  ALTER TABLE "_pages_v_blocks_world_items_block" DROP COLUMN IF EXISTS "center_point_y_position";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_world_items_block" ADD COLUMN "center_point_x_position" numeric DEFAULT 67;
  ALTER TABLE "pages_blocks_world_items_block" ADD COLUMN "center_point_y_position" numeric DEFAULT 45;
  ALTER TABLE "_pages_v_blocks_world_items_block" ADD COLUMN "center_point_x_position" numeric DEFAULT 67;
  ALTER TABLE "_pages_v_blocks_world_items_block" ADD COLUMN "center_point_y_position" numeric DEFAULT 45;`)
}
