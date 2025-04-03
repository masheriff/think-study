import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_navigation_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_call_to_action_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_copyright_section_powered_by_text_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "footer_navigation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_navigation_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_legal_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_contact_info_phone_numbers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "footer_contact_info_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"label" varchar
  );
  
  DROP TABLE "footer_services" CASCADE;
  DROP TABLE "footer_about" CASCADE;
  DROP TABLE "footer_help" CASCADE;
  DROP TABLE "footer_legal" CASCADE;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "placeholder" varchar;
  ALTER TABLE "footer" ADD COLUMN "call_to_action_title" varchar DEFAULT 'Currently studying?' NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "call_to_action_description" varchar DEFAULT 'Become a mentor and help students.' NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "call_to_action_link_type" "enum_footer_call_to_action_link_type" DEFAULT 'reference';
  ALTER TABLE "footer" ADD COLUMN "call_to_action_link_new_tab" boolean;
  ALTER TABLE "footer" ADD COLUMN "call_to_action_link_url" varchar;
  ALTER TABLE "footer" ADD COLUMN "call_to_action_link_label" varchar NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "copyright_section_copyright_text" varchar DEFAULT '© {year} Think Study. All rights reserved.';
  ALTER TABLE "footer" ADD COLUMN "copyright_section_show_powered_by" boolean DEFAULT true;
  ALTER TABLE "footer" ADD COLUMN "copyright_section_powered_by_text_text" varchar DEFAULT 'Powered by:';
  ALTER TABLE "footer" ADD COLUMN "copyright_section_powered_by_text_link_type" "enum_footer_copyright_section_powered_by_text_link_type" DEFAULT 'reference';
  ALTER TABLE "footer" ADD COLUMN "copyright_section_powered_by_text_link_new_tab" boolean;
  ALTER TABLE "footer" ADD COLUMN "copyright_section_powered_by_text_link_url" varchar;
  ALTER TABLE "footer" ADD COLUMN "copyright_section_powered_by_text_link_label" varchar;
  DO $$ BEGIN
   ALTER TABLE "footer_navigation_links" ADD CONSTRAINT "footer_navigation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_contact_info_phone_numbers" ADD CONSTRAINT "footer_contact_info_phone_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_contact_info_emails" ADD CONSTRAINT "footer_contact_info_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "footer_navigation_links_order_idx" ON "footer_navigation_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_navigation_links_parent_id_idx" ON "footer_navigation_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_contact_info_phone_numbers_order_idx" ON "footer_contact_info_phone_numbers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_contact_info_phone_numbers_parent_id_idx" ON "footer_contact_info_phone_numbers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_contact_info_emails_order_idx" ON "footer_contact_info_emails" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_contact_info_emails_parent_id_idx" ON "footer_contact_info_emails" USING btree ("_parent_id");
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "copyright";
  DROP TYPE "public"."enum_footer_services_link_type";
  DROP TYPE "public"."enum_footer_about_link_type";
  DROP TYPE "public"."enum_footer_help_link_type";
  DROP TYPE "public"."enum_footer_legal_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_services_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_about_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_help_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_legal_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "footer_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_services_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_about_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_help" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_help_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_legal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_legal_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  DROP TABLE "footer_navigation_links" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer_contact_info_phone_numbers" CASCADE;
  DROP TABLE "footer_contact_info_emails" CASCADE;
  ALTER TABLE "footer" ADD COLUMN "description" varchar;
  ALTER TABLE "footer" ADD COLUMN "copyright" varchar DEFAULT '© 2024 Your Company Name. All rights reserved.' NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "footer_services" ADD CONSTRAINT "footer_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_about" ADD CONSTRAINT "footer_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_help" ADD CONSTRAINT "footer_help_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_legal" ADD CONSTRAINT "footer_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "footer_services_order_idx" ON "footer_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_services_parent_id_idx" ON "footer_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_about_order_idx" ON "footer_about" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_about_parent_id_idx" ON "footer_about" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_help_order_idx" ON "footer_help" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_help_parent_id_idx" ON "footer_help" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_legal_order_idx" ON "footer_legal" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_legal_parent_id_idx" ON "footer_legal" USING btree ("_parent_id");
  ALTER TABLE "forms_blocks_select" DROP COLUMN IF EXISTS "placeholder";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "call_to_action_title";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "call_to_action_description";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "call_to_action_link_type";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "call_to_action_link_new_tab";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "call_to_action_link_url";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "call_to_action_link_label";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "copyright_section_copyright_text";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "copyright_section_show_powered_by";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "copyright_section_powered_by_text_text";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "copyright_section_powered_by_text_link_type";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "copyright_section_powered_by_text_link_new_tab";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "copyright_section_powered_by_text_link_url";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "copyright_section_powered_by_text_link_label";
  DROP TYPE "public"."enum_footer_navigation_links_link_type";
  DROP TYPE "public"."enum_footer_legal_links_link_type";
  DROP TYPE "public"."enum_footer_call_to_action_link_type";
  DROP TYPE "public"."enum_footer_copyright_section_powered_by_text_link_type";`)
}
