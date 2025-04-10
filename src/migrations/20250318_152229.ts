import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_faq_block" ADD COLUMN "bottom_image_id" integer;
  ALTER TABLE "_pages_v_blocks_faq_block" ADD COLUMN "bottom_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_faq_block" ADD CONSTRAINT "pages_blocks_faq_block_bottom_image_id_media_id_fk" FOREIGN KEY ("bottom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_faq_block" ADD CONSTRAINT "_pages_v_blocks_faq_block_bottom_image_id_media_id_fk" FOREIGN KEY ("bottom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_block_bottom_image_idx" ON "pages_blocks_faq_block" USING btree ("bottom_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_block_bottom_image_idx" ON "_pages_v_blocks_faq_block" USING btree ("bottom_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_faq_block" DROP CONSTRAINT "pages_blocks_faq_block_bottom_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_faq_block" DROP CONSTRAINT "_pages_v_blocks_faq_block_bottom_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_faq_block_bottom_image_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_faq_block_bottom_image_idx";
  ALTER TABLE "pages_blocks_faq_block" DROP COLUMN IF EXISTS "bottom_image_id";
  ALTER TABLE "_pages_v_blocks_faq_block" DROP COLUMN IF EXISTS "bottom_image_id";`)
}
