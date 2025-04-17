import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_counseling_block" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "pages_blocks_counseling_block" DROP COLUMN IF EXISTS "button_url";
  ALTER TABLE "_pages_v_blocks_counseling_block" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "_pages_v_blocks_counseling_block" DROP COLUMN IF EXISTS "button_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_counseling_block" ADD COLUMN "button_text" varchar;
  ALTER TABLE "pages_blocks_counseling_block" ADD COLUMN "button_url" varchar;
  ALTER TABLE "_pages_v_blocks_counseling_block" ADD COLUMN "button_text" varchar;
  ALTER TABLE "_pages_v_blocks_counseling_block" ADD COLUMN "button_url" varchar;`)
}
