import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_ielts_packages" DROP COLUMN IF EXISTS "enroll_button_text";
  ALTER TABLE "_pages_v_blocks_ielts_packages" DROP COLUMN IF EXISTS "enroll_button_text";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_ielts_packages" ADD COLUMN "enroll_button_text" varchar DEFAULT 'Enroll Now';
  ALTER TABLE "_pages_v_blocks_ielts_packages" ADD COLUMN "enroll_button_text" varchar DEFAULT 'Enroll Now';`)
}
