import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_appointment_block" DROP COLUMN IF EXISTS "left_content_button_text";
  ALTER TABLE "pages_blocks_appointment_block" DROP COLUMN IF EXISTS "left_content_button_url";
  ALTER TABLE "_pages_v_blocks_appointment_block" DROP COLUMN IF EXISTS "left_content_button_text";
  ALTER TABLE "_pages_v_blocks_appointment_block" DROP COLUMN IF EXISTS "left_content_button_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_appointment_block" ADD COLUMN "left_content_button_text" varchar;
  ALTER TABLE "pages_blocks_appointment_block" ADD COLUMN "left_content_button_url" varchar;
  ALTER TABLE "_pages_v_blocks_appointment_block" ADD COLUMN "left_content_button_text" varchar;
  ALTER TABLE "_pages_v_blocks_appointment_block" ADD COLUMN "left_content_button_url" varchar;`)
}
