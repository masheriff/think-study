import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_study_in_insights_intake_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_header" boolean DEFAULT false,
  	"intake_name" varchar,
  	"application_deadline" varchar,
  	"classes_start" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_study_in_insights_expense_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_header" boolean DEFAULT false,
  	"category" varchar,
  	"monthly_average" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_study_in_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content_header_title" varchar DEFAULT 'Study Abroad Smarter:',
  	"content_header_subtitle" varchar DEFAULT 'The Insider Notes You Need Before You Pack!',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_study_in_insights_intake_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_header" boolean DEFAULT false,
  	"intake_name" varchar,
  	"application_deadline" varchar,
  	"classes_start" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_study_in_insights_expense_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_header" boolean DEFAULT false,
  	"category" varchar,
  	"monthly_average" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_study_in_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content_header_title" varchar DEFAULT 'Study Abroad Smarter:',
  	"content_header_subtitle" varchar DEFAULT 'The Insider Notes You Need Before You Pack!',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_in_insights_intake_rows" ADD CONSTRAINT "pages_blocks_study_in_insights_intake_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_study_in_insights"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_in_insights_expense_rows" ADD CONSTRAINT "pages_blocks_study_in_insights_expense_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_study_in_insights"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_in_insights" ADD CONSTRAINT "pages_blocks_study_in_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_in_insights_intake_rows" ADD CONSTRAINT "_pages_v_blocks_study_in_insights_intake_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_study_in_insights"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_in_insights_expense_rows" ADD CONSTRAINT "_pages_v_blocks_study_in_insights_expense_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_study_in_insights"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_in_insights" ADD CONSTRAINT "_pages_v_blocks_study_in_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_insights_intake_rows_order_idx" ON "pages_blocks_study_in_insights_intake_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_insights_intake_rows_parent_id_idx" ON "pages_blocks_study_in_insights_intake_rows" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_insights_expense_rows_order_idx" ON "pages_blocks_study_in_insights_expense_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_insights_expense_rows_parent_id_idx" ON "pages_blocks_study_in_insights_expense_rows" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_insights_order_idx" ON "pages_blocks_study_in_insights" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_insights_parent_id_idx" ON "pages_blocks_study_in_insights" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_insights_path_idx" ON "pages_blocks_study_in_insights" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_insights_intake_rows_order_idx" ON "_pages_v_blocks_study_in_insights_intake_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_insights_intake_rows_parent_id_idx" ON "_pages_v_blocks_study_in_insights_intake_rows" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_insights_expense_rows_order_idx" ON "_pages_v_blocks_study_in_insights_expense_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_insights_expense_rows_parent_id_idx" ON "_pages_v_blocks_study_in_insights_expense_rows" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_insights_order_idx" ON "_pages_v_blocks_study_in_insights" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_insights_parent_id_idx" ON "_pages_v_blocks_study_in_insights" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_insights_path_idx" ON "_pages_v_blocks_study_in_insights" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_study_in_insights_intake_rows" CASCADE;
  DROP TABLE "pages_blocks_study_in_insights_expense_rows" CASCADE;
  DROP TABLE "pages_blocks_study_in_insights" CASCADE;
  DROP TABLE "_pages_v_blocks_study_in_insights_intake_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_study_in_insights_expense_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_study_in_insights" CASCADE;`)
}
