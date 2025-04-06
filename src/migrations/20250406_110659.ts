import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_map_block_branch_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"address" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_university_slider_block_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"university_image_id" integer,
  	"title" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_university_slider_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_contact_us_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"form_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_map_block_branch_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"address" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_university_slider_block_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"university_image_id" integer,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_university_slider_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_us_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"form_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_faq_block" ADD COLUMN "bottom_image_id" integer;
  ALTER TABLE "_pages_v_blocks_faq_block" ADD COLUMN "bottom_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_map_block_branch_offices" ADD CONSTRAINT "pages_blocks_map_block_branch_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_map_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_university_slider_block_slides" ADD CONSTRAINT "pages_blocks_university_slider_block_slides_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_university_slider_block_slides" ADD CONSTRAINT "pages_blocks_university_slider_block_slides_university_image_id_media_id_fk" FOREIGN KEY ("university_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_university_slider_block_slides" ADD CONSTRAINT "pages_blocks_university_slider_block_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_university_slider_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_university_slider_block" ADD CONSTRAINT "pages_blocks_university_slider_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_contact_us_block" ADD CONSTRAINT "pages_blocks_contact_us_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_contact_us_block" ADD CONSTRAINT "pages_blocks_contact_us_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_map_block_branch_offices" ADD CONSTRAINT "_pages_v_blocks_map_block_branch_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_map_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_university_slider_block_slides" ADD CONSTRAINT "_pages_v_blocks_university_slider_block_slides_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_university_slider_block_slides" ADD CONSTRAINT "_pages_v_blocks_university_slider_block_slides_university_image_id_media_id_fk" FOREIGN KEY ("university_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_university_slider_block_slides" ADD CONSTRAINT "_pages_v_blocks_university_slider_block_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_university_slider_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_university_slider_block" ADD CONSTRAINT "_pages_v_blocks_university_slider_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_contact_us_block" ADD CONSTRAINT "_pages_v_blocks_contact_us_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_contact_us_block" ADD CONSTRAINT "_pages_v_blocks_contact_us_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_map_block_branch_offices_order_idx" ON "pages_blocks_map_block_branch_offices" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_map_block_branch_offices_parent_id_idx" ON "pages_blocks_map_block_branch_offices" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_university_slider_block_slides_order_idx" ON "pages_blocks_university_slider_block_slides" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_university_slider_block_slides_parent_id_idx" ON "pages_blocks_university_slider_block_slides" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_university_slider_block_slides_background_image_idx" ON "pages_blocks_university_slider_block_slides" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_university_slider_block_slides_university_image_idx" ON "pages_blocks_university_slider_block_slides" USING btree ("university_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_university_slider_block_order_idx" ON "pages_blocks_university_slider_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_university_slider_block_parent_id_idx" ON "pages_blocks_university_slider_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_university_slider_block_path_idx" ON "pages_blocks_university_slider_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_us_block_order_idx" ON "pages_blocks_contact_us_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_us_block_parent_id_idx" ON "pages_blocks_contact_us_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_us_block_path_idx" ON "pages_blocks_contact_us_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_us_block_form_idx" ON "pages_blocks_contact_us_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_map_block_branch_offices_order_idx" ON "_pages_v_blocks_map_block_branch_offices" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_map_block_branch_offices_parent_id_idx" ON "_pages_v_blocks_map_block_branch_offices" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_university_slider_block_slides_order_idx" ON "_pages_v_blocks_university_slider_block_slides" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_university_slider_block_slides_parent_id_idx" ON "_pages_v_blocks_university_slider_block_slides" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_university_slider_block_slides_background_image_idx" ON "_pages_v_blocks_university_slider_block_slides" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_university_slider_block_slides_university_image_idx" ON "_pages_v_blocks_university_slider_block_slides" USING btree ("university_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_university_slider_block_order_idx" ON "_pages_v_blocks_university_slider_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_university_slider_block_parent_id_idx" ON "_pages_v_blocks_university_slider_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_university_slider_block_path_idx" ON "_pages_v_blocks_university_slider_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_us_block_order_idx" ON "_pages_v_blocks_contact_us_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_us_block_parent_id_idx" ON "_pages_v_blocks_contact_us_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_us_block_path_idx" ON "_pages_v_blocks_contact_us_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_us_block_form_idx" ON "_pages_v_blocks_contact_us_block" USING btree ("form_id");
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
   ALTER TABLE "pages_blocks_map_block_branch_offices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_university_slider_block_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_university_slider_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_us_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_map_block_branch_offices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_university_slider_block_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_university_slider_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_us_block" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_map_block_branch_offices" CASCADE;
  DROP TABLE "pages_blocks_university_slider_block_slides" CASCADE;
  DROP TABLE "pages_blocks_university_slider_block" CASCADE;
  DROP TABLE "pages_blocks_contact_us_block" CASCADE;
  DROP TABLE "_pages_v_blocks_map_block_branch_offices" CASCADE;
  DROP TABLE "_pages_v_blocks_university_slider_block_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_university_slider_block" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_block" CASCADE;
  ALTER TABLE "pages_blocks_faq_block" DROP CONSTRAINT "pages_blocks_faq_block_bottom_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_faq_block" DROP CONSTRAINT "_pages_v_blocks_faq_block_bottom_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_faq_block_bottom_image_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_faq_block_bottom_image_idx";
  ALTER TABLE "pages_blocks_faq_block" DROP COLUMN IF EXISTS "bottom_image_id";
  ALTER TABLE "_pages_v_blocks_faq_block" DROP COLUMN IF EXISTS "bottom_image_id";`)
}
