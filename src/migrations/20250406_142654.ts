import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_popups_trigger" AS ENUM('pageLoad', 'exitIntent', 'buttonClick', 'timeDelay');
  CREATE TYPE "public"."enum_popups_frequency" AS ENUM('everyVisit', 'oncePerSession', 'once24Hours', 'once7Days', 'onceEver');
  CREATE TYPE "public"."enum_popups_appearance_width" AS ENUM('small', 'medium', 'large', 'fullScreen');
  CREATE TYPE "public"."enum_popups_appearance_position" AS ENUM('center', 'top', 'bottom');
  CREATE TYPE "public"."enum_popups_appearance_animation" AS ENUM('fade', 'slideUp', 'slideDown', 'zoomIn');
  CREATE TYPE "public"."enum_popups_appearance_background_color" AS ENUM('green', 'blue', 'white');
  CREATE TYPE "public"."enum_popups_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__popups_v_version_trigger" AS ENUM('pageLoad', 'exitIntent', 'buttonClick', 'timeDelay');
  CREATE TYPE "public"."enum__popups_v_version_frequency" AS ENUM('everyVisit', 'oncePerSession', 'once24Hours', 'once7Days', 'onceEver');
  CREATE TYPE "public"."enum__popups_v_version_appearance_width" AS ENUM('small', 'medium', 'large', 'fullScreen');
  CREATE TYPE "public"."enum__popups_v_version_appearance_position" AS ENUM('center', 'top', 'bottom');
  CREATE TYPE "public"."enum__popups_v_version_appearance_animation" AS ENUM('fade', 'slideUp', 'slideDown', 'zoomIn');
  CREATE TYPE "public"."enum__popups_v_version_appearance_background_color" AS ENUM('green', 'blue', 'white');
  CREATE TYPE "public"."enum__popups_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "popups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"active" boolean DEFAULT true,
  	"published_at" timestamp(3) with time zone,
  	"media_id" integer,
  	"content" jsonb,
  	"include_form" boolean DEFAULT false,
  	"form_id" integer,
  	"trigger" "enum_popups_trigger" DEFAULT 'pageLoad',
  	"delay" numeric DEFAULT 5,
  	"frequency" "enum_popups_frequency" DEFAULT 'oncePerSession',
  	"appearance_width" "enum_popups_appearance_width" DEFAULT 'medium',
  	"appearance_position" "enum_popups_appearance_position" DEFAULT 'center',
  	"appearance_show_close_button" boolean DEFAULT true,
  	"appearance_close_on_background_click" boolean DEFAULT true,
  	"appearance_animation" "enum_popups_appearance_animation" DEFAULT 'fade',
  	"appearance_background_color" "enum_popups_appearance_background_color" DEFAULT 'green',
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_popups_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "popups_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_popups_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_active" boolean DEFAULT true,
  	"version_published_at" timestamp(3) with time zone,
  	"version_media_id" integer,
  	"version_content" jsonb,
  	"version_include_form" boolean DEFAULT false,
  	"version_form_id" integer,
  	"version_trigger" "enum__popups_v_version_trigger" DEFAULT 'pageLoad',
  	"version_delay" numeric DEFAULT 5,
  	"version_frequency" "enum__popups_v_version_frequency" DEFAULT 'oncePerSession',
  	"version_appearance_width" "enum__popups_v_version_appearance_width" DEFAULT 'medium',
  	"version_appearance_position" "enum__popups_v_version_appearance_position" DEFAULT 'center',
  	"version_appearance_show_close_button" boolean DEFAULT true,
  	"version_appearance_close_on_background_click" boolean DEFAULT true,
  	"version_appearance_animation" "enum__popups_v_version_appearance_animation" DEFAULT 'fade',
  	"version_appearance_background_color" "enum__popups_v_version_appearance_background_color" DEFAULT 'green',
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__popups_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_popups_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "popups_id" integer;
  DO $$ BEGIN
   ALTER TABLE "popups" ADD CONSTRAINT "popups_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "popups" ADD CONSTRAINT "popups_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "popups_rels" ADD CONSTRAINT "popups_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."popups"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "popups_rels" ADD CONSTRAINT "popups_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_popups_v" ADD CONSTRAINT "_popups_v_parent_id_popups_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."popups"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_popups_v" ADD CONSTRAINT "_popups_v_version_media_id_media_id_fk" FOREIGN KEY ("version_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_popups_v" ADD CONSTRAINT "_popups_v_version_form_id_forms_id_fk" FOREIGN KEY ("version_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_popups_v_rels" ADD CONSTRAINT "_popups_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_popups_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_popups_v_rels" ADD CONSTRAINT "_popups_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "popups_media_idx" ON "popups" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "popups_form_idx" ON "popups" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "popups_slug_idx" ON "popups" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "popups_updated_at_idx" ON "popups" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "popups_created_at_idx" ON "popups" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "popups__status_idx" ON "popups" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "popups_rels_order_idx" ON "popups_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "popups_rels_parent_idx" ON "popups_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "popups_rels_path_idx" ON "popups_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "popups_rels_pages_id_idx" ON "popups_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "_popups_v_parent_idx" ON "_popups_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_popups_v_version_version_media_idx" ON "_popups_v" USING btree ("version_media_id");
  CREATE INDEX IF NOT EXISTS "_popups_v_version_version_form_idx" ON "_popups_v" USING btree ("version_form_id");
  CREATE INDEX IF NOT EXISTS "_popups_v_version_version_slug_idx" ON "_popups_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_popups_v_version_version_updated_at_idx" ON "_popups_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_popups_v_version_version_created_at_idx" ON "_popups_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_popups_v_version_version__status_idx" ON "_popups_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_popups_v_created_at_idx" ON "_popups_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_popups_v_updated_at_idx" ON "_popups_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_popups_v_latest_idx" ON "_popups_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_popups_v_autosave_idx" ON "_popups_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_popups_v_rels_order_idx" ON "_popups_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_popups_v_rels_parent_idx" ON "_popups_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_popups_v_rels_path_idx" ON "_popups_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_popups_v_rels_pages_id_idx" ON "_popups_v_rels" USING btree ("pages_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_popups_fk" FOREIGN KEY ("popups_id") REFERENCES "public"."popups"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_popups_id_idx" ON "payload_locked_documents_rels" USING btree ("popups_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "popups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "popups_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_popups_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_popups_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "popups" CASCADE;
  DROP TABLE "popups_rels" CASCADE;
  DROP TABLE "_popups_v" CASCADE;
  DROP TABLE "_popups_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_popups_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_popups_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "popups_id";
  DROP TYPE "public"."enum_popups_trigger";
  DROP TYPE "public"."enum_popups_frequency";
  DROP TYPE "public"."enum_popups_appearance_width";
  DROP TYPE "public"."enum_popups_appearance_position";
  DROP TYPE "public"."enum_popups_appearance_animation";
  DROP TYPE "public"."enum_popups_appearance_background_color";
  DROP TYPE "public"."enum_popups_status";
  DROP TYPE "public"."enum__popups_v_version_trigger";
  DROP TYPE "public"."enum__popups_v_version_frequency";
  DROP TYPE "public"."enum__popups_v_version_appearance_width";
  DROP TYPE "public"."enum__popups_v_version_appearance_position";
  DROP TYPE "public"."enum__popups_v_version_appearance_animation";
  DROP TYPE "public"."enum__popups_v_version_appearance_background_color";
  DROP TYPE "public"."enum__popups_v_version_status";`)
}
