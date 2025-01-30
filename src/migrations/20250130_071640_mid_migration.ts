import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_appointment_block_right_content_info_imgs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"img_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_appointment_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_content_rich_text" jsonb,
  	"left_content_paragraph1" varchar,
  	"left_content_paragraph2" varchar,
  	"left_content_paragraph3" varchar,
  	"left_content_button_text" varchar,
  	"left_content_button_url" varchar,
  	"right_content_schedule_date" timestamp(3) with time zone,
  	"right_content_schedule_day" varchar,
  	"right_content_schedule_time_slot1" varchar,
  	"right_content_schedule_time_slot2" varchar,
  	"right_content_info_text" varchar,
  	"bottom_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_testimonials_block_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"review" varchar,
  	"name" varchar,
  	"course" varchar,
  	"university_image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_testimonials_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_counseling_block_cards_countries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_counseling_block_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"course_name" varchar,
  	"card_image_id" integer,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_counseling_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"button_text" varchar,
  	"button_url" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_universities_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_universities_university_groups_universities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"university_image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_universities_university_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_universities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"main_heading" varchar,
  	"sub_heading" varchar,
  	"description" varchar,
  	"header_university_id" integer,
  	"footer_university_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_appointment_block_right_content_info_imgs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"img_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_appointment_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_content_rich_text" jsonb,
  	"left_content_paragraph1" varchar,
  	"left_content_paragraph2" varchar,
  	"left_content_paragraph3" varchar,
  	"left_content_button_text" varchar,
  	"left_content_button_url" varchar,
  	"right_content_schedule_date" timestamp(3) with time zone,
  	"right_content_schedule_day" varchar,
  	"right_content_schedule_time_slot1" varchar,
  	"right_content_schedule_time_slot2" varchar,
  	"right_content_info_text" varchar,
  	"bottom_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonials_block_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"review" varchar,
  	"name" varchar,
  	"course" varchar,
  	"university_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonials_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_counseling_block_cards_countries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_counseling_block_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"course_name" varchar,
  	"card_image_id" integer,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_counseling_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"button_text" varchar,
  	"button_url" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_universities_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_universities_university_groups_universities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"university_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_universities_university_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_universities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"main_heading" varchar,
  	"sub_heading" varchar,
  	"description" varchar,
  	"header_university_id" integer,
  	"footer_university_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "pages_blocks_book_appointment_schedule_slots" CASCADE;
  DROP TABLE "pages_blocks_book_appointment_schedule" CASCADE;
  DROP TABLE "pages_blocks_book_appointment_info_media" CASCADE;
  DROP TABLE "pages_blocks_book_appointment" CASCADE;
  DROP TABLE "_pages_v_blocks_book_appointment_schedule_slots" CASCADE;
  DROP TABLE "_pages_v_blocks_book_appointment_schedule" CASCADE;
  DROP TABLE "_pages_v_blocks_book_appointment_info_media" CASCADE;
  DROP TABLE "_pages_v_blocks_book_appointment" CASCADE;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_appointment_block_right_content_info_imgs" ADD CONSTRAINT "pages_blocks_appointment_block_right_content_info_imgs_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_appointment_block_right_content_info_imgs" ADD CONSTRAINT "pages_blocks_appointment_block_right_content_info_imgs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_appointment_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_appointment_block" ADD CONSTRAINT "pages_blocks_appointment_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_testimonials_block_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_block_testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_testimonials_block_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_block_testimonials_university_image_id_media_id_fk" FOREIGN KEY ("university_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_testimonials_block_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_block_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_testimonials_block" ADD CONSTRAINT "pages_blocks_testimonials_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_counseling_block_cards_countries" ADD CONSTRAINT "pages_blocks_counseling_block_cards_countries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_counseling_block_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_counseling_block_cards" ADD CONSTRAINT "pages_blocks_counseling_block_cards_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_counseling_block_cards" ADD CONSTRAINT "pages_blocks_counseling_block_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_counseling_block_cards" ADD CONSTRAINT "pages_blocks_counseling_block_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_counseling_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_counseling_block" ADD CONSTRAINT "pages_blocks_counseling_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_counseling_block" ADD CONSTRAINT "pages_blocks_counseling_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_universities_statistics" ADD CONSTRAINT "pages_blocks_universities_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_universities"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_universities_university_groups_universities" ADD CONSTRAINT "pages_blocks_universities_university_groups_universities_university_image_id_media_id_fk" FOREIGN KEY ("university_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_universities_university_groups_universities" ADD CONSTRAINT "pages_blocks_universities_university_groups_universities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_universities_university_groups"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_universities_university_groups" ADD CONSTRAINT "pages_blocks_universities_university_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_universities"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_universities" ADD CONSTRAINT "pages_blocks_universities_header_university_id_media_id_fk" FOREIGN KEY ("header_university_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_universities" ADD CONSTRAINT "pages_blocks_universities_footer_university_id_media_id_fk" FOREIGN KEY ("footer_university_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_universities" ADD CONSTRAINT "pages_blocks_universities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_appointment_block_right_content_info_imgs" ADD CONSTRAINT "_pages_v_blocks_appointment_block_right_content_info_imgs_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_appointment_block_right_content_info_imgs" ADD CONSTRAINT "_pages_v_blocks_appointment_block_right_content_info_imgs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_appointment_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_appointment_block" ADD CONSTRAINT "_pages_v_blocks_appointment_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_testimonials_block_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_block_testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_testimonials_block_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_block_testimonials_university_image_id_media_id_fk" FOREIGN KEY ("university_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_testimonials_block_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_block_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_testimonials_block" ADD CONSTRAINT "_pages_v_blocks_testimonials_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_counseling_block_cards_countries" ADD CONSTRAINT "_pages_v_blocks_counseling_block_cards_countries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_counseling_block_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_counseling_block_cards" ADD CONSTRAINT "_pages_v_blocks_counseling_block_cards_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_counseling_block_cards" ADD CONSTRAINT "_pages_v_blocks_counseling_block_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_counseling_block_cards" ADD CONSTRAINT "_pages_v_blocks_counseling_block_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_counseling_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_counseling_block" ADD CONSTRAINT "_pages_v_blocks_counseling_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_counseling_block" ADD CONSTRAINT "_pages_v_blocks_counseling_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_universities_statistics" ADD CONSTRAINT "_pages_v_blocks_universities_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_universities"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_universities_university_groups_universities" ADD CONSTRAINT "_pages_v_blocks_universities_university_groups_universities_university_image_id_media_id_fk" FOREIGN KEY ("university_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_universities_university_groups_universities" ADD CONSTRAINT "_pages_v_blocks_universities_university_groups_universities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_universities_university_groups"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_universities_university_groups" ADD CONSTRAINT "_pages_v_blocks_universities_university_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_universities"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_universities" ADD CONSTRAINT "_pages_v_blocks_universities_header_university_id_media_id_fk" FOREIGN KEY ("header_university_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_universities" ADD CONSTRAINT "_pages_v_blocks_universities_footer_university_id_media_id_fk" FOREIGN KEY ("footer_university_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_universities" ADD CONSTRAINT "_pages_v_blocks_universities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_right_content_info_imgs_order_idx" ON "pages_blocks_appointment_block_right_content_info_imgs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_right_content_info_imgs_parent_id_idx" ON "pages_blocks_appointment_block_right_content_info_imgs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_right_content_info_imgs_img_idx" ON "pages_blocks_appointment_block_right_content_info_imgs" USING btree ("img_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_order_idx" ON "pages_blocks_appointment_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_parent_id_idx" ON "pages_blocks_appointment_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_path_idx" ON "pages_blocks_appointment_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_block_testimonials_order_idx" ON "pages_blocks_testimonials_block_testimonials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_block_testimonials_parent_id_idx" ON "pages_blocks_testimonials_block_testimonials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_block_testimonials_image_idx" ON "pages_blocks_testimonials_block_testimonials" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_block_testimonials_university_image_idx" ON "pages_blocks_testimonials_block_testimonials" USING btree ("university_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_block_order_idx" ON "pages_blocks_testimonials_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_block_parent_id_idx" ON "pages_blocks_testimonials_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_block_path_idx" ON "pages_blocks_testimonials_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_counseling_block_cards_countries_order_idx" ON "pages_blocks_counseling_block_cards_countries" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_counseling_block_cards_countries_parent_id_idx" ON "pages_blocks_counseling_block_cards_countries" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_counseling_block_cards_order_idx" ON "pages_blocks_counseling_block_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_counseling_block_cards_parent_id_idx" ON "pages_blocks_counseling_block_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_counseling_block_cards_card_image_idx" ON "pages_blocks_counseling_block_cards" USING btree ("card_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_counseling_block_cards_icon_idx" ON "pages_blocks_counseling_block_cards" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_counseling_block_order_idx" ON "pages_blocks_counseling_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_counseling_block_parent_id_idx" ON "pages_blocks_counseling_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_counseling_block_path_idx" ON "pages_blocks_counseling_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_counseling_block_background_image_idx" ON "pages_blocks_counseling_block" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_statistics_order_idx" ON "pages_blocks_universities_statistics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_statistics_parent_id_idx" ON "pages_blocks_universities_statistics" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_university_groups_universities_order_idx" ON "pages_blocks_universities_university_groups_universities" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_university_groups_universities_parent_id_idx" ON "pages_blocks_universities_university_groups_universities" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_university_groups_universities_university_image_idx" ON "pages_blocks_universities_university_groups_universities" USING btree ("university_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_university_groups_order_idx" ON "pages_blocks_universities_university_groups" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_university_groups_parent_id_idx" ON "pages_blocks_universities_university_groups" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_order_idx" ON "pages_blocks_universities" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_parent_id_idx" ON "pages_blocks_universities" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_path_idx" ON "pages_blocks_universities" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_header_university_idx" ON "pages_blocks_universities" USING btree ("header_university_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_footer_university_idx" ON "pages_blocks_universities" USING btree ("footer_university_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_right_content_info_imgs_order_idx" ON "_pages_v_blocks_appointment_block_right_content_info_imgs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_right_content_info_imgs_parent_id_idx" ON "_pages_v_blocks_appointment_block_right_content_info_imgs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_right_content_info_imgs_img_idx" ON "_pages_v_blocks_appointment_block_right_content_info_imgs" USING btree ("img_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_order_idx" ON "_pages_v_blocks_appointment_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_parent_id_idx" ON "_pages_v_blocks_appointment_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_path_idx" ON "_pages_v_blocks_appointment_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_block_testimonials_order_idx" ON "_pages_v_blocks_testimonials_block_testimonials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_block_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials_block_testimonials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_block_testimonials_image_idx" ON "_pages_v_blocks_testimonials_block_testimonials" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_block_testimonials_university_image_idx" ON "_pages_v_blocks_testimonials_block_testimonials" USING btree ("university_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_block_order_idx" ON "_pages_v_blocks_testimonials_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_block_parent_id_idx" ON "_pages_v_blocks_testimonials_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_block_path_idx" ON "_pages_v_blocks_testimonials_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_counseling_block_cards_countries_order_idx" ON "_pages_v_blocks_counseling_block_cards_countries" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_counseling_block_cards_countries_parent_id_idx" ON "_pages_v_blocks_counseling_block_cards_countries" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_counseling_block_cards_order_idx" ON "_pages_v_blocks_counseling_block_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_counseling_block_cards_parent_id_idx" ON "_pages_v_blocks_counseling_block_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_counseling_block_cards_card_image_idx" ON "_pages_v_blocks_counseling_block_cards" USING btree ("card_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_counseling_block_cards_icon_idx" ON "_pages_v_blocks_counseling_block_cards" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_counseling_block_order_idx" ON "_pages_v_blocks_counseling_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_counseling_block_parent_id_idx" ON "_pages_v_blocks_counseling_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_counseling_block_path_idx" ON "_pages_v_blocks_counseling_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_counseling_block_background_image_idx" ON "_pages_v_blocks_counseling_block" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_statistics_order_idx" ON "_pages_v_blocks_universities_statistics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_statistics_parent_id_idx" ON "_pages_v_blocks_universities_statistics" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_university_groups_universities_order_idx" ON "_pages_v_blocks_universities_university_groups_universities" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_university_groups_universities_parent_id_idx" ON "_pages_v_blocks_universities_university_groups_universities" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_university_groups_universities_university_image_idx" ON "_pages_v_blocks_universities_university_groups_universities" USING btree ("university_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_university_groups_order_idx" ON "_pages_v_blocks_universities_university_groups" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_university_groups_parent_id_idx" ON "_pages_v_blocks_universities_university_groups" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_order_idx" ON "_pages_v_blocks_universities" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_parent_id_idx" ON "_pages_v_blocks_universities" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_path_idx" ON "_pages_v_blocks_universities" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_header_university_idx" ON "_pages_v_blocks_universities" USING btree ("header_university_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_footer_university_idx" ON "_pages_v_blocks_universities" USING btree ("footer_university_id");
  DROP TYPE "public"."enum_pages_blocks_book_appointment_schedule_day";
  DROP TYPE "public"."enum__pages_v_blocks_book_appointment_schedule_day";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_book_appointment_schedule_day" AS ENUM('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
  CREATE TYPE "public"."enum__pages_v_blocks_book_appointment_schedule_day" AS ENUM('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
  CREATE TABLE IF NOT EXISTS "pages_blocks_book_appointment_schedule_slots" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"start" varchar,
  	"end" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_book_appointment_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_pages_blocks_book_appointment_schedule_day"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_book_appointment_info_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"img_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_book_appointment" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"main_content_text" jsonb,
  	"main_content_btn_text" jsonb,
  	"main_content_btn_url" varchar,
  	"info_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_book_appointment_schedule_slots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"start" varchar,
  	"end" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_book_appointment_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"day" "enum__pages_v_blocks_book_appointment_schedule_day",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_book_appointment_info_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"img_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_book_appointment" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"main_content_text" jsonb,
  	"main_content_btn_text" jsonb,
  	"main_content_btn_url" varchar,
  	"info_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "pages_blocks_appointment_block_right_content_info_imgs" CASCADE;
  DROP TABLE "pages_blocks_appointment_block" CASCADE;
  DROP TABLE "pages_blocks_testimonials_block_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials_block" CASCADE;
  DROP TABLE "pages_blocks_counseling_block_cards_countries" CASCADE;
  DROP TABLE "pages_blocks_counseling_block_cards" CASCADE;
  DROP TABLE "pages_blocks_counseling_block" CASCADE;
  DROP TABLE "pages_blocks_universities_statistics" CASCADE;
  DROP TABLE "pages_blocks_universities_university_groups_universities" CASCADE;
  DROP TABLE "pages_blocks_universities_university_groups" CASCADE;
  DROP TABLE "pages_blocks_universities" CASCADE;
  DROP TABLE "_pages_v_blocks_appointment_block_right_content_info_imgs" CASCADE;
  DROP TABLE "_pages_v_blocks_appointment_block" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_block_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_block" CASCADE;
  DROP TABLE "_pages_v_blocks_counseling_block_cards_countries" CASCADE;
  DROP TABLE "_pages_v_blocks_counseling_block_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_counseling_block" CASCADE;
  DROP TABLE "_pages_v_blocks_universities_statistics" CASCADE;
  DROP TABLE "_pages_v_blocks_universities_university_groups_universities" CASCADE;
  DROP TABLE "_pages_v_blocks_universities_university_groups" CASCADE;
  DROP TABLE "_pages_v_blocks_universities" CASCADE;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_book_appointment_schedule_slots" ADD CONSTRAINT "pages_blocks_book_appointment_schedule_slots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_book_appointment_schedule"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_book_appointment_schedule" ADD CONSTRAINT "pages_blocks_book_appointment_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_book_appointment"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_book_appointment_info_media" ADD CONSTRAINT "pages_blocks_book_appointment_info_media_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_book_appointment_info_media" ADD CONSTRAINT "pages_blocks_book_appointment_info_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_book_appointment"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_book_appointment" ADD CONSTRAINT "pages_blocks_book_appointment_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_book_appointment_schedule_slots" ADD CONSTRAINT "_pages_v_blocks_book_appointment_schedule_slots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_book_appointment_schedule"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_book_appointment_schedule" ADD CONSTRAINT "_pages_v_blocks_book_appointment_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_book_appointment"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_book_appointment_info_media" ADD CONSTRAINT "_pages_v_blocks_book_appointment_info_media_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_book_appointment_info_media" ADD CONSTRAINT "_pages_v_blocks_book_appointment_info_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_book_appointment"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_book_appointment" ADD CONSTRAINT "_pages_v_blocks_book_appointment_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_book_appointment_schedule_slots_order_idx" ON "pages_blocks_book_appointment_schedule_slots" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_book_appointment_schedule_slots_parent_id_idx" ON "pages_blocks_book_appointment_schedule_slots" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_book_appointment_schedule_order_idx" ON "pages_blocks_book_appointment_schedule" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_book_appointment_schedule_parent_id_idx" ON "pages_blocks_book_appointment_schedule" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_book_appointment_info_media_order_idx" ON "pages_blocks_book_appointment_info_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_book_appointment_info_media_parent_id_idx" ON "pages_blocks_book_appointment_info_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_book_appointment_info_media_img_idx" ON "pages_blocks_book_appointment_info_media" USING btree ("img_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_book_appointment_order_idx" ON "pages_blocks_book_appointment" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_book_appointment_parent_id_idx" ON "pages_blocks_book_appointment" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_book_appointment_path_idx" ON "pages_blocks_book_appointment" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_book_appointment_schedule_slots_order_idx" ON "_pages_v_blocks_book_appointment_schedule_slots" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_book_appointment_schedule_slots_parent_id_idx" ON "_pages_v_blocks_book_appointment_schedule_slots" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_book_appointment_schedule_order_idx" ON "_pages_v_blocks_book_appointment_schedule" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_book_appointment_schedule_parent_id_idx" ON "_pages_v_blocks_book_appointment_schedule" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_book_appointment_info_media_order_idx" ON "_pages_v_blocks_book_appointment_info_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_book_appointment_info_media_parent_id_idx" ON "_pages_v_blocks_book_appointment_info_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_book_appointment_info_media_img_idx" ON "_pages_v_blocks_book_appointment_info_media" USING btree ("img_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_book_appointment_order_idx" ON "_pages_v_blocks_book_appointment" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_book_appointment_parent_id_idx" ON "_pages_v_blocks_book_appointment" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_book_appointment_path_idx" ON "_pages_v_blocks_book_appointment" USING btree ("_path");`)
}
