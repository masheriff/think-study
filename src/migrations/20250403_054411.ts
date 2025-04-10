import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Step 1: Drop all existing tables and relations
  await db.execute(sql`
    DROP TABLE IF EXISTS "footer_services" CASCADE;
    DROP TABLE IF EXISTS "footer_about" CASCADE;
    DROP TABLE IF EXISTS "footer_help" CASCADE;
    DROP TABLE IF EXISTS "footer_legal" CASCADE;
    DROP TABLE IF EXISTS "footer_rels" CASCADE;
    DROP TABLE IF EXISTS "footer" CASCADE;
  `);

  // Step 2: Create enum types
  await db.execute(sql`
    CREATE TYPE "public"."enum_footer_navigation_links_link_type" AS ENUM('reference', 'custom');
    CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM('reference', 'custom');
    CREATE TYPE "public"."enum_footer_call_to_action_link_type" AS ENUM('reference', 'custom');
    CREATE TYPE "public"."enum_footer_copyright_section_powered_by_text_link_type" AS ENUM('reference', 'custom');
  `);

  // Step 3: Create the footer table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "footer" (
      "id" serial PRIMARY KEY,
      "call_to_action_title" varchar DEFAULT 'Currently studying?' NOT NULL,
      "call_to_action_description" varchar DEFAULT 'Become a mentor and help students.' NOT NULL,
      "call_to_action_link_type" "enum_footer_call_to_action_link_type" DEFAULT 'reference',
      "call_to_action_link_new_tab" boolean,
      "call_to_action_link_url" varchar,
      "call_to_action_link_label" varchar DEFAULT 'Apply Now' NOT NULL,
      "copyright_section_copyright_text" varchar DEFAULT '© {year} Think Study. All rights reserved.',
      "copyright_section_show_powered_by" boolean DEFAULT true,
      "copyright_section_powered_by_text_text" varchar DEFAULT 'Powered by:',
      "copyright_section_powered_by_text_link_type" "enum_footer_copyright_section_powered_by_text_link_type" DEFAULT 'reference',
      "copyright_section_powered_by_text_link_new_tab" boolean,
      "copyright_section_powered_by_text_link_url" varchar,
      "copyright_section_powered_by_text_link_label" varchar,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    );
  `);

  // Step 4: Create a default record in the footer table
  await db.execute(sql`
    INSERT INTO "footer" (id, call_to_action_title, call_to_action_description, call_to_action_link_label) 
    VALUES (1, 'Currently studying?', 'Become a mentor and help students.', 'Apply Now')
    ON CONFLICT (id) DO NOTHING;
  `);

  // Step 5: Create related tables
  await db.execute(sql`
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
  `);

  // Step 6: Add placeholder column to forms_blocks_select if it exists
  try {
    await db.execute(sql`
      ALTER TABLE "forms_blocks_select" ADD COLUMN IF NOT EXISTS "placeholder" varchar;
    `);
  } catch (error) {
    // Ignore errors if table doesn't exist
  }

  // Step 7: Create foreign key constraints
  await db.execute(sql`
    ALTER TABLE "footer_navigation_links" 
    ADD CONSTRAINT "footer_navigation_links_parent_id_fk" 
    FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") 
    ON DELETE cascade ON UPDATE no action;
  `);

  await db.execute(sql`
    ALTER TABLE "footer_legal_links" 
    ADD CONSTRAINT "footer_legal_links_parent_id_fk" 
    FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") 
    ON DELETE cascade ON UPDATE no action;
  `);

  await db.execute(sql`
    ALTER TABLE "footer_contact_info_phone_numbers" 
    ADD CONSTRAINT "footer_contact_info_phone_numbers_parent_id_fk" 
    FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") 
    ON DELETE cascade ON UPDATE no action;
  `);

  await db.execute(sql`
    ALTER TABLE "footer_contact_info_emails" 
    ADD CONSTRAINT "footer_contact_info_emails_parent_id_fk" 
    FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") 
    ON DELETE cascade ON UPDATE no action;
  `);

  // Step 8: Create indexes
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "footer_navigation_links_order_idx" ON "footer_navigation_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footer_navigation_links_parent_id_idx" ON "footer_navigation_links" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "footer_contact_info_phone_numbers_order_idx" ON "footer_contact_info_phone_numbers" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footer_contact_info_phone_numbers_parent_id_idx" ON "footer_contact_info_phone_numbers" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "footer_contact_info_emails_order_idx" ON "footer_contact_info_emails" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footer_contact_info_emails_parent_id_idx" ON "footer_contact_info_emails" USING btree ("_parent_id");
  `);

  // Step 9: Drop old enum types if they exist
  try {
    await db.execute(sql`
      DROP TYPE IF EXISTS "public"."enum_footer_services_link_type";
      DROP TYPE IF EXISTS "public"."enum_footer_about_link_type";
      DROP TYPE IF EXISTS "public"."enum_footer_help_link_type";
      DROP TYPE IF EXISTS "public"."enum_footer_legal_link_type";
    `);
  } catch (error) {
    // Ignore errors if types don't exist
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Step 1: Recreate old enum types
  await db.execute(sql`
    CREATE TYPE "public"."enum_footer_services_link_type" AS ENUM('reference', 'custom');
    CREATE TYPE "public"."enum_footer_about_link_type" AS ENUM('reference', 'custom');
    CREATE TYPE "public"."enum_footer_help_link_type" AS ENUM('reference', 'custom');
    CREATE TYPE "public"."enum_footer_legal_link_type" AS ENUM('reference', 'custom');
  `);

  // Step 2: Drop new tables
  await db.execute(sql`
    DROP TABLE IF EXISTS "footer_navigation_links" CASCADE;
    DROP TABLE IF EXISTS "footer_legal_links" CASCADE;
    DROP TABLE IF EXISTS "footer_contact_info_phone_numbers" CASCADE;
    DROP TABLE IF EXISTS "footer_contact_info_emails" CASCADE;
    DROP TABLE IF EXISTS "footer" CASCADE;
  `);

  // Step 3: Recreate the original footer table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "footer" (
      "id" serial PRIMARY KEY,
      "description" varchar,
      "copyright" varchar DEFAULT '© 2024 Your Company Name. All rights reserved.' NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    );
  `);

  // Step 4: Recreate original related tables
  await db.execute(sql`
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
  `);

  // Step 5: Remove placeholder column from forms_blocks_select if it exists
  try {
    await db.execute(sql`
      ALTER TABLE "forms_blocks_select" DROP COLUMN IF EXISTS "placeholder";
    `);
  } catch (error) {
    // Ignore errors if table doesn't exist
  }

  // Step 6: Set up original foreign key constraints
  await db.execute(sql`
    ALTER TABLE "footer_services" 
    ADD CONSTRAINT "footer_services_parent_id_fk" 
    FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") 
    ON DELETE cascade ON UPDATE no action;
  `);

  await db.execute(sql`
    ALTER TABLE "footer_about" 
    ADD CONSTRAINT "footer_about_parent_id_fk" 
    FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") 
    ON DELETE cascade ON UPDATE no action;
  `);

  await db.execute(sql`
    ALTER TABLE "footer_help" 
    ADD CONSTRAINT "footer_help_parent_id_fk" 
    FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") 
    ON DELETE cascade ON UPDATE no action;
  `);

  await db.execute(sql`
    ALTER TABLE "footer_legal" 
    ADD CONSTRAINT "footer_legal_parent_id_fk" 
    FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") 
    ON DELETE cascade ON UPDATE no action;
  `);

  // Step 7: Create original indexes
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "footer_services_order_idx" ON "footer_services" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footer_services_parent_id_idx" ON "footer_services" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "footer_about_order_idx" ON "footer_about" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footer_about_parent_id_idx" ON "footer_about" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "footer_help_order_idx" ON "footer_help" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footer_help_parent_id_idx" ON "footer_help" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "footer_legal_order_idx" ON "footer_legal" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footer_legal_parent_id_idx" ON "footer_legal" USING btree ("_parent_id");
  `);

  // Step 8: Drop new enum types
  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."enum_footer_navigation_links_link_type";
    DROP TYPE IF EXISTS "public"."enum_footer_legal_links_link_type";
    DROP TYPE IF EXISTS "public"."enum_footer_call_to_action_link_type";
    DROP TYPE IF EXISTS "public"."enum_footer_copyright_section_powered_by_text_link_type";
  `);
}