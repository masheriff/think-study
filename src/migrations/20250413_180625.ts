import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_appointment_block" ADD COLUMN "visibility" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_appointment_block" ADD COLUMN "visibility" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_appointment_block" DROP COLUMN IF EXISTS "visibility";
  ALTER TABLE "_pages_v_blocks_appointment_block" DROP COLUMN IF EXISTS "visibility";`)
}
