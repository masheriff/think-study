import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_world_items_block_items_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stack_image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_world_items_block_items_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"stack_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "countries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"code" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_world_items_block_items" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_rels" ADD COLUMN "countries_id" integer;
  ALTER TABLE "_pages_v_blocks_world_items_block_items" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "countries_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "countries_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_world_items_block_items_stack" ADD CONSTRAINT "pages_blocks_world_items_block_items_stack_stack_image_id_media_id_fk" FOREIGN KEY ("stack_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_world_items_block_items_stack" ADD CONSTRAINT "pages_blocks_world_items_block_items_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_world_items_block_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_world_items_block_items_stack" ADD CONSTRAINT "_pages_v_blocks_world_items_block_items_stack_stack_image_id_media_id_fk" FOREIGN KEY ("stack_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_world_items_block_items_stack" ADD CONSTRAINT "_pages_v_blocks_world_items_block_items_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_world_items_block_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_items_block_items_stack_order_idx" ON "pages_blocks_world_items_block_items_stack" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_items_block_items_stack_parent_id_idx" ON "pages_blocks_world_items_block_items_stack" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_items_block_items_stack_stack_image_idx" ON "pages_blocks_world_items_block_items_stack" USING btree ("stack_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_items_block_items_stack_order_idx" ON "_pages_v_blocks_world_items_block_items_stack" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_items_block_items_stack_parent_id_idx" ON "_pages_v_blocks_world_items_block_items_stack" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_items_block_items_stack_stack_image_idx" ON "_pages_v_blocks_world_items_block_items_stack" USING btree ("stack_image_id");
  CREATE INDEX IF NOT EXISTS "countries_updated_at_idx" ON "countries" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "countries_created_at_idx" ON "countries" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_countries_id_idx" ON "pages_rels" USING btree ("countries_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_countries_id_idx" ON "_pages_v_rels" USING btree ("countries_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_countries_id_idx" ON "payload_locked_documents_rels" USING btree ("countries_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_world_items_block_items_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_world_items_block_items_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "countries" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_world_items_block_items_stack" CASCADE;
  DROP TABLE "_pages_v_blocks_world_items_block_items_stack" CASCADE;
  DROP TABLE "countries" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_countries_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_countries_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_countries_fk";
  
  DROP INDEX IF EXISTS "pages_rels_countries_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_countries_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_countries_id_idx";
  ALTER TABLE "pages_blocks_world_items_block_items" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "countries_id";
  ALTER TABLE "_pages_v_blocks_world_items_block_items" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "countries_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "countries_id";`)
}
