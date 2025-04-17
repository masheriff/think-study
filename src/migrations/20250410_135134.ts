import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_study_abroad_block_cards" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "pages_blocks_study_abroad_block_cards" DROP COLUMN IF EXISTS "button_link";
  ALTER TABLE "_pages_v_blocks_study_abroad_block_cards" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "_pages_v_blocks_study_abroad_block_cards" DROP COLUMN IF EXISTS "button_link";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_study_abroad_block_cards" ADD COLUMN "button_text" varchar DEFAULT 'Get Course List';
  ALTER TABLE "pages_blocks_study_abroad_block_cards" ADD COLUMN "button_link" varchar;
  ALTER TABLE "_pages_v_blocks_study_abroad_block_cards" ADD COLUMN "button_text" varchar DEFAULT 'Get Course List';
  ALTER TABLE "_pages_v_blocks_study_abroad_block_cards" ADD COLUMN "button_link" varchar;`)
}
