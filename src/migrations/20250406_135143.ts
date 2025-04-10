import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footer" ADD COLUMN "whatsapp_button_show_button" boolean DEFAULT true;
  ALTER TABLE "footer" ADD COLUMN "whatsapp_button_phone_number" numeric DEFAULT 919025186185 NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "whatsapp_button_message" varchar DEFAULT 'Hello, I have a question regarding your services.' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footer" DROP COLUMN IF EXISTS "whatsapp_button_show_button";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "whatsapp_button_phone_number";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "whatsapp_button_message";`)
}
