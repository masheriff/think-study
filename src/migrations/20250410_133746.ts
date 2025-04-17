import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_counseling_block_link_type" AS ENUM('reference', 'custom', 'popup');
  CREATE TYPE "public"."enum__pages_v_blocks_counseling_block_link_type" AS ENUM('reference', 'custom', 'popup');
  ALTER TABLE "pages_blocks_counseling_block" ADD COLUMN "link_type" "enum_pages_blocks_counseling_block_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_counseling_block" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_counseling_block" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_counseling_block" ADD COLUMN "link_popup_id" integer;
  ALTER TABLE "pages_blocks_counseling_block" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_counseling_block" ADD COLUMN "link_type" "enum__pages_v_blocks_counseling_block_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_counseling_block" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_counseling_block" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_counseling_block" ADD COLUMN "link_popup_id" integer;
  ALTER TABLE "_pages_v_blocks_counseling_block" ADD COLUMN "link_label" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_counseling_block" ADD CONSTRAINT "pages_blocks_counseling_block_link_popup_id_popups_id_fk" FOREIGN KEY ("link_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_counseling_block" ADD CONSTRAINT "_pages_v_blocks_counseling_block_link_popup_id_popups_id_fk" FOREIGN KEY ("link_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_counseling_block_link_link_popup_idx" ON "pages_blocks_counseling_block" USING btree ("link_popup_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_counseling_block_link_link_popup_idx" ON "_pages_v_blocks_counseling_block" USING btree ("link_popup_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_counseling_block" DROP CONSTRAINT "pages_blocks_counseling_block_link_popup_id_popups_id_fk";
  
  ALTER TABLE "_pages_v_blocks_counseling_block" DROP CONSTRAINT "_pages_v_blocks_counseling_block_link_popup_id_popups_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_counseling_block_link_link_popup_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_counseling_block_link_link_popup_idx";
  ALTER TABLE "pages_blocks_counseling_block" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "pages_blocks_counseling_block" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "pages_blocks_counseling_block" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "pages_blocks_counseling_block" DROP COLUMN IF EXISTS "link_popup_id";
  ALTER TABLE "pages_blocks_counseling_block" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_counseling_block" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "_pages_v_blocks_counseling_block" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "_pages_v_blocks_counseling_block" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "_pages_v_blocks_counseling_block" DROP COLUMN IF EXISTS "link_popup_id";
  ALTER TABLE "_pages_v_blocks_counseling_block" DROP COLUMN IF EXISTS "link_label";
  DROP TYPE "public"."enum_pages_blocks_counseling_block_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_counseling_block_link_type";`)
}
