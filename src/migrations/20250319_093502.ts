import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_university_slider_block_slides_order_idx" ON "pages_blocks_university_slider_block_slides" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_university_slider_block_slides_parent_id_idx" ON "pages_blocks_university_slider_block_slides" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_university_slider_block_slides_background_image_idx" ON "pages_blocks_university_slider_block_slides" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_university_slider_block_slides_university_image_idx" ON "pages_blocks_university_slider_block_slides" USING btree ("university_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_university_slider_block_order_idx" ON "pages_blocks_university_slider_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_university_slider_block_parent_id_idx" ON "pages_blocks_university_slider_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_university_slider_block_path_idx" ON "pages_blocks_university_slider_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_university_slider_block_slides_order_idx" ON "_pages_v_blocks_university_slider_block_slides" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_university_slider_block_slides_parent_id_idx" ON "_pages_v_blocks_university_slider_block_slides" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_university_slider_block_slides_background_image_idx" ON "_pages_v_blocks_university_slider_block_slides" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_university_slider_block_slides_university_image_idx" ON "_pages_v_blocks_university_slider_block_slides" USING btree ("university_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_university_slider_block_order_idx" ON "_pages_v_blocks_university_slider_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_university_slider_block_parent_id_idx" ON "_pages_v_blocks_university_slider_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_university_slider_block_path_idx" ON "_pages_v_blocks_university_slider_block" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_university_slider_block_slides" CASCADE;
  DROP TABLE "pages_blocks_university_slider_block" CASCADE;
  DROP TABLE "_pages_v_blocks_university_slider_block_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_university_slider_block" CASCADE;`)
}
