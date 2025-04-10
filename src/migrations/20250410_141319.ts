import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_connect_block" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "_pages_v_blocks_connect_block" DROP COLUMN IF EXISTS "button_text";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_connect_block" ADD COLUMN "button_text" varchar DEFAULT 'Schedule Counseling';
  ALTER TABLE "_pages_v_blocks_connect_block" ADD COLUMN "button_text" varchar DEFAULT 'Schedule Counseling';`)
}
