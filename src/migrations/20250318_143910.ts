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
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_map_block_branch_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"address" varchar,
  	"_uuid" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_map_block_branch_offices" ADD CONSTRAINT "pages_blocks_map_block_branch_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_map_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_map_block_branch_offices" ADD CONSTRAINT "_pages_v_blocks_map_block_branch_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_map_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_map_block_branch_offices_order_idx" ON "pages_blocks_map_block_branch_offices" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_map_block_branch_offices_parent_id_idx" ON "pages_blocks_map_block_branch_offices" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_map_block_branch_offices_order_idx" ON "_pages_v_blocks_map_block_branch_offices" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_map_block_branch_offices_parent_id_idx" ON "_pages_v_blocks_map_block_branch_offices" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_map_block_branch_offices" CASCADE;
  DROP TABLE "_pages_v_blocks_map_block_branch_offices" CASCADE;`)
}
