import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_world_student_block_items" CASCADE;
  DROP TABLE "pages_blocks_world_student_block" CASCADE;
  DROP TABLE "_pages_v_blocks_world_student_block_items" CASCADE;
  DROP TABLE "_pages_v_blocks_world_student_block" CASCADE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_world_student_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"z_index" numeric DEFAULT 10,
  	"top" numeric,
  	"bottom" numeric,
  	"right" numeric,
  	"left" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_world_student_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"title" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_world_student_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"z_index" numeric DEFAULT 10,
  	"top" numeric,
  	"bottom" numeric,
  	"right" numeric,
  	"left" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_world_student_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"title" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_world_student_block_items" ADD CONSTRAINT "pages_blocks_world_student_block_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_world_student_block_items" ADD CONSTRAINT "pages_blocks_world_student_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_world_student_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_world_student_block" ADD CONSTRAINT "pages_blocks_world_student_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_world_student_block" ADD CONSTRAINT "pages_blocks_world_student_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_world_student_block_items" ADD CONSTRAINT "_pages_v_blocks_world_student_block_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_world_student_block_items" ADD CONSTRAINT "_pages_v_blocks_world_student_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_world_student_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_world_student_block" ADD CONSTRAINT "_pages_v_blocks_world_student_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_world_student_block" ADD CONSTRAINT "_pages_v_blocks_world_student_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_student_block_items_order_idx" ON "pages_blocks_world_student_block_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_student_block_items_parent_id_idx" ON "pages_blocks_world_student_block_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_student_block_items_image_idx" ON "pages_blocks_world_student_block_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_student_block_order_idx" ON "pages_blocks_world_student_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_student_block_parent_id_idx" ON "pages_blocks_world_student_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_student_block_path_idx" ON "pages_blocks_world_student_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_student_block_background_image_idx" ON "pages_blocks_world_student_block" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_student_block_items_order_idx" ON "_pages_v_blocks_world_student_block_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_student_block_items_parent_id_idx" ON "_pages_v_blocks_world_student_block_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_student_block_items_image_idx" ON "_pages_v_blocks_world_student_block_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_student_block_order_idx" ON "_pages_v_blocks_world_student_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_student_block_parent_id_idx" ON "_pages_v_blocks_world_student_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_student_block_path_idx" ON "_pages_v_blocks_world_student_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_student_block_background_image_idx" ON "_pages_v_blocks_world_student_block" USING btree ("background_image_id");`)
}
