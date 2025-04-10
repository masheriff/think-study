import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_hero_links_link_type" ADD VALUE 'popup';
  ALTER TYPE "public"."enum_pages_blocks_content_columns_link_type" ADD VALUE 'popup';
  ALTER TYPE "public"."enum__pages_v_version_hero_links_link_type" ADD VALUE 'popup';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_type" ADD VALUE 'popup';
  ALTER TYPE "public"."enum_header_nav_items_sub_menu_link_type" ADD VALUE 'popup';
  ALTER TYPE "public"."enum_header_nav_items_link_type" ADD VALUE 'popup';
  ALTER TYPE "public"."enum_header_buttons_links_link_type" ADD VALUE 'popup';
  ALTER TYPE "public"."enum_footer_navigation_links_link_type" ADD VALUE 'popup';
  ALTER TYPE "public"."enum_footer_legal_links_link_type" ADD VALUE 'popup';
  ALTER TYPE "public"."enum_footer_social_link_type" ADD VALUE 'popup';
  ALTER TYPE "public"."enum_footer_call_to_action_link_type" ADD VALUE 'popup';
  ALTER TYPE "public"."enum_footer_copyright_section_powered_by_text_link_type" ADD VALUE 'popup';
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_popup_id" integer;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_popup_id" integer;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_popup_id" integer;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_popup_id" integer;
  ALTER TABLE "header_nav_items_sub_menu" ADD COLUMN "link_popup_id" integer;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_popup_id" integer;
  ALTER TABLE "header_buttons_links" ADD COLUMN "link_popup_id" integer;
  ALTER TABLE "footer_navigation_links" ADD COLUMN "link_popup_id" integer;
  ALTER TABLE "footer_legal_links" ADD COLUMN "link_popup_id" integer;
  ALTER TABLE "footer_social" ADD COLUMN "link_popup_id" integer;
  ALTER TABLE "footer" ADD COLUMN "call_to_action_link_popup_id" integer;
  ALTER TABLE "footer" ADD COLUMN "copyright_section_powered_by_text_link_popup_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_link_popup_id_popups_id_fk" FOREIGN KEY ("link_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_link_popup_id_popups_id_fk" FOREIGN KEY ("link_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_link_popup_id_popups_id_fk" FOREIGN KEY ("link_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_link_popup_id_popups_id_fk" FOREIGN KEY ("link_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_sub_menu" ADD CONSTRAINT "header_nav_items_sub_menu_link_popup_id_popups_id_fk" FOREIGN KEY ("link_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_popup_id_popups_id_fk" FOREIGN KEY ("link_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_buttons_links" ADD CONSTRAINT "header_buttons_links_link_popup_id_popups_id_fk" FOREIGN KEY ("link_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_navigation_links" ADD CONSTRAINT "footer_navigation_links_link_popup_id_popups_id_fk" FOREIGN KEY ("link_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_link_popup_id_popups_id_fk" FOREIGN KEY ("link_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_social" ADD CONSTRAINT "footer_social_link_popup_id_popups_id_fk" FOREIGN KEY ("link_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer" ADD CONSTRAINT "footer_call_to_action_link_popup_id_popups_id_fk" FOREIGN KEY ("call_to_action_link_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer" ADD CONSTRAINT "footer_copyright_section_powered_by_text_link_popup_id_popups_id_fk" FOREIGN KEY ("copyright_section_powered_by_text_link_popup_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_links_link_link_popup_idx" ON "pages_hero_links" USING btree ("link_popup_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_link_link_popup_idx" ON "pages_blocks_content_columns" USING btree ("link_popup_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_link_link_popup_idx" ON "_pages_v_version_hero_links" USING btree ("link_popup_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_link_link_popup_idx" ON "_pages_v_blocks_content_columns" USING btree ("link_popup_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_sub_menu_link_link_popup_idx" ON "header_nav_items_sub_menu" USING btree ("link_popup_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_link_link_popup_idx" ON "header_nav_items" USING btree ("link_popup_id");
  CREATE INDEX IF NOT EXISTS "header_buttons_links_link_link_popup_idx" ON "header_buttons_links" USING btree ("link_popup_id");
  CREATE INDEX IF NOT EXISTS "footer_navigation_links_link_link_popup_idx" ON "footer_navigation_links" USING btree ("link_popup_id");
  CREATE INDEX IF NOT EXISTS "footer_legal_links_link_link_popup_idx" ON "footer_legal_links" USING btree ("link_popup_id");
  CREATE INDEX IF NOT EXISTS "footer_social_link_link_popup_idx" ON "footer_social" USING btree ("link_popup_id");
  CREATE INDEX IF NOT EXISTS "footer_call_to_action_link_call_to_action_link_popup_idx" ON "footer" USING btree ("call_to_action_link_popup_id");
  CREATE INDEX IF NOT EXISTS "footer_copyright_section_powered_by_text_link_copyright_section_powered_by_text_link_popup_idx" ON "footer" USING btree ("copyright_section_powered_by_text_link_popup_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_links" DROP CONSTRAINT "pages_hero_links_link_popup_id_popups_id_fk";
  
  ALTER TABLE "pages_blocks_content_columns" DROP CONSTRAINT "pages_blocks_content_columns_link_popup_id_popups_id_fk";
  
  ALTER TABLE "_pages_v_version_hero_links" DROP CONSTRAINT "_pages_v_version_hero_links_link_popup_id_popups_id_fk";
  
  ALTER TABLE "_pages_v_blocks_content_columns" DROP CONSTRAINT "_pages_v_blocks_content_columns_link_popup_id_popups_id_fk";
  
  ALTER TABLE "header_nav_items_sub_menu" DROP CONSTRAINT "header_nav_items_sub_menu_link_popup_id_popups_id_fk";
  
  ALTER TABLE "header_nav_items" DROP CONSTRAINT "header_nav_items_link_popup_id_popups_id_fk";
  
  ALTER TABLE "header_buttons_links" DROP CONSTRAINT "header_buttons_links_link_popup_id_popups_id_fk";
  
  ALTER TABLE "footer_navigation_links" DROP CONSTRAINT "footer_navigation_links_link_popup_id_popups_id_fk";
  
  ALTER TABLE "footer_legal_links" DROP CONSTRAINT "footer_legal_links_link_popup_id_popups_id_fk";
  
  ALTER TABLE "footer_social" DROP CONSTRAINT "footer_social_link_popup_id_popups_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_call_to_action_link_popup_id_popups_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_copyright_section_powered_by_text_link_popup_id_popups_id_fk";
  
  DROP INDEX IF EXISTS "pages_hero_links_link_link_popup_idx";
  DROP INDEX IF EXISTS "pages_blocks_content_columns_link_link_popup_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_links_link_link_popup_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_content_columns_link_link_popup_idx";
  DROP INDEX IF EXISTS "header_nav_items_sub_menu_link_link_popup_idx";
  DROP INDEX IF EXISTS "header_nav_items_link_link_popup_idx";
  DROP INDEX IF EXISTS "header_buttons_links_link_link_popup_idx";
  DROP INDEX IF EXISTS "footer_navigation_links_link_link_popup_idx";
  DROP INDEX IF EXISTS "footer_legal_links_link_link_popup_idx";
  DROP INDEX IF EXISTS "footer_social_link_link_popup_idx";
  DROP INDEX IF EXISTS "footer_call_to_action_link_call_to_action_link_popup_idx";
  DROP INDEX IF EXISTS "footer_copyright_section_powered_by_text_link_copyright_section_powered_by_text_link_popup_idx";
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_popup_id";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "link_popup_id";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_popup_id";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "link_popup_id";
  ALTER TABLE "header_nav_items_sub_menu" DROP COLUMN IF EXISTS "link_popup_id";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_popup_id";
  ALTER TABLE "header_buttons_links" DROP COLUMN IF EXISTS "link_popup_id";
  ALTER TABLE "footer_navigation_links" DROP COLUMN IF EXISTS "link_popup_id";
  ALTER TABLE "footer_legal_links" DROP COLUMN IF EXISTS "link_popup_id";
  ALTER TABLE "footer_social" DROP COLUMN IF EXISTS "link_popup_id";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "call_to_action_link_popup_id";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "copyright_section_powered_by_text_link_popup_id";
  ALTER TABLE "public"."pages_hero_links" ALTER COLUMN "link_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "public"."pages_hero_links" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_pages_hero_links_link_type" USING "link_type"::"public"."enum_pages_hero_links_link_type";
  ALTER TABLE "public"."pages_blocks_content_columns" ALTER COLUMN "link_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_type";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "public"."pages_blocks_content_columns" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_pages_blocks_content_columns_link_type" USING "link_type"::"public"."enum_pages_blocks_content_columns_link_type";
  ALTER TABLE "public"."_pages_v_version_hero_links" ALTER COLUMN "link_type" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "public"."_pages_v_version_hero_links" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__pages_v_version_hero_links_link_type" USING "link_type"::"public"."enum__pages_v_version_hero_links_link_type";
  ALTER TABLE "public"."_pages_v_blocks_content_columns" ALTER COLUMN "link_type" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_type";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "public"."_pages_v_blocks_content_columns" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_link_type" USING "link_type"::"public"."enum__pages_v_blocks_content_columns_link_type";
  ALTER TABLE "public"."header_nav_items_sub_menu" ALTER COLUMN "link_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_nav_items_sub_menu_link_type";
  CREATE TYPE "public"."enum_header_nav_items_sub_menu_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "public"."header_nav_items_sub_menu" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_header_nav_items_sub_menu_link_type" USING "link_type"::"public"."enum_header_nav_items_sub_menu_link_type";
  ALTER TABLE "public"."header_nav_items" ALTER COLUMN "link_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_nav_items_link_type";
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "public"."header_nav_items" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_header_nav_items_link_type" USING "link_type"::"public"."enum_header_nav_items_link_type";
  ALTER TABLE "public"."header_buttons_links" ALTER COLUMN "link_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_buttons_links_link_type";
  CREATE TYPE "public"."enum_header_buttons_links_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "public"."header_buttons_links" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_header_buttons_links_link_type" USING "link_type"::"public"."enum_header_buttons_links_link_type";
  ALTER TABLE "public"."footer_navigation_links" ALTER COLUMN "link_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_footer_navigation_links_link_type";
  CREATE TYPE "public"."enum_footer_navigation_links_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "public"."footer_navigation_links" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_footer_navigation_links_link_type" USING "link_type"::"public"."enum_footer_navigation_links_link_type";
  ALTER TABLE "public"."footer_legal_links" ALTER COLUMN "link_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_footer_legal_links_link_type";
  CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "public"."footer_legal_links" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_footer_legal_links_link_type" USING "link_type"::"public"."enum_footer_legal_links_link_type";
  ALTER TABLE "public"."footer_social" ALTER COLUMN "link_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_footer_social_link_type";
  CREATE TYPE "public"."enum_footer_social_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "public"."footer_social" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_footer_social_link_type" USING "link_type"::"public"."enum_footer_social_link_type";
  ALTER TABLE "public"."footer" ALTER COLUMN "call_to_action_link_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_footer_call_to_action_link_type";
  CREATE TYPE "public"."enum_footer_call_to_action_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "public"."footer" ALTER COLUMN "call_to_action_link_type" SET DATA TYPE "public"."enum_footer_call_to_action_link_type" USING "call_to_action_link_type"::"public"."enum_footer_call_to_action_link_type";
  ALTER TABLE "public"."footer" ALTER COLUMN "copyright_section_powered_by_text_link_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_footer_copyright_section_powered_by_text_link_type";
  CREATE TYPE "public"."enum_footer_copyright_section_powered_by_text_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "public"."footer" ALTER COLUMN "copyright_section_powered_by_text_link_type" SET DATA TYPE "public"."enum_footer_copyright_section_powered_by_text_link_type" USING "copyright_section_powered_by_text_link_type"::"public"."enum_footer_copyright_section_powered_by_text_link_type";`)
}
