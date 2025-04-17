import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_ielts_block" DROP COLUMN IF EXISTS "cta_button_text";
  ALTER TABLE "pages_blocks_ielts_block" DROP COLUMN IF EXISTS "cta_button_href";
  ALTER TABLE "_pages_v_blocks_ielts_block" DROP COLUMN IF EXISTS "cta_button_text";
  ALTER TABLE "_pages_v_blocks_ielts_block" DROP COLUMN IF EXISTS "cta_button_href";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_ielts_block" ADD COLUMN "cta_button_text" varchar DEFAULT 'Join The Classes';
  ALTER TABLE "pages_blocks_ielts_block" ADD COLUMN "cta_button_href" varchar DEFAULT '/join';
  ALTER TABLE "_pages_v_blocks_ielts_block" ADD COLUMN "cta_button_text" varchar DEFAULT 'Join The Classes';
  ALTER TABLE "_pages_v_blocks_ielts_block" ADD COLUMN "cta_button_href" varchar DEFAULT '/join';`)
}
