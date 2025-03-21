import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_pages_blocks_study_abroad_block_cards_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_study_abroad_block_background_color" AS ENUM('blue', 'white');
  CREATE TYPE "public"."enum_pages_blocks_ielts_packages_packages_package_color" AS ENUM('green', 'yellow');
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum__pages_v_blocks_study_abroad_block_cards_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_study_abroad_block_background_color" AS ENUM('blue', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_ielts_packages_packages_package_color" AS ENUM('green', 'yellow');
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_header_nav_items_sub_menu_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_buttons_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_buttons_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_footer_services_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_about_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_help_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_legal_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_social_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_appointment_block_left_content_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_appointment_block_right_schedule_slots" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_appointment_block_right_universities" (
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
  	"left_content_title" varchar,
  	"left_content_sub_title" varchar,
  	"left_content_highlight_text" varchar,
  	"left_content_extra_text" varchar,
  	"left_content_button_text" varchar,
  	"left_content_button_url" varchar,
  	"right_schedule_from_date" timestamp(3) with time zone,
  	"right_schedule_to_date" timestamp(3) with time zone,
  	"right_schedule_day" varchar,
  	"right_uni_heading" varchar DEFAULT 'Participating Universities',
  	"bottom_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_admission_block_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_admission_block_courses" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_admission_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar DEFAULT '1995',
  	"day" varchar DEFAULT 'Today',
  	"current_description" varchar DEFAULT 'Leaders in domestic + global admissions',
  	"current_year" varchar DEFAULT '2025',
  	"ambitions" varchar DEFAULT 'We understand your ambitions like they’re our own.',
  	"description" varchar DEFAULT 'Established for domestic admissions',
  	"success_rate" varchar DEFAULT 'Unlock Your Global Future – 98% Success Rate in International Admissions!',
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
  	"description" varchar,
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_call_to_action_block_offices_phone_numbers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_call_to_action_block_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_call_to_action_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"call_text" varchar DEFAULT 'Call or WhatsApp',
  	"student_image_id" integer,
  	"logo_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_universities_block_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_universities_block_universities_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_universities_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"main_heading" varchar,
  	"sub_heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_study_abroad_block_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"course_description" varchar,
  	"description" varchar,
  	"button_text" varchar DEFAULT 'Get Course List',
  	"button_link" varchar,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_study_abroad_block_cards_image_position" DEFAULT 'right'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_study_abroad_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"description" varchar,
  	"title_content" varchar,
  	"title_description" varchar,
  	"background_color" "enum_pages_blocks_study_abroad_block_background_color",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ielts_block_study_modes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ielts_block_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ielts_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Master English. Ace IELTS.',
  	"subtitle" varchar DEFAULT 'Prep Smarter, Score Higher.',
  	"description" varchar,
  	"ielts_text" varchar DEFAULT 'IELTS',
  	"ielts_image_id" integer,
  	"learning_type_title" varchar DEFAULT 'Hybrid Learning',
  	"learning_type_subtitle" varchar DEFAULT 'Classroom Or Online (Seamlessly Combined)',
  	"cta_button_text" varchar DEFAULT 'Join The Classes',
  	"cta_button_href" varchar DEFAULT '/join',
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_get_started_block_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_get_started_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Let''''s make it happen!',
  	"title" varchar DEFAULT 'Start your journey today!',
  	"footer_text" varchar DEFAULT 'And so much more to make your journey hassle-free!',
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_map_block_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"address" varchar,
  	"map_iframe" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_map_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Visit Us',
  	"block_name" varchar
  );
  
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_service_block_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_service_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"backgroundimage_id" integer,
  	"main_heading" varchar DEFAULT 'Here''''s What We Do & Why We''''re the Right Choice for You',
  	"description" varchar DEFAULT 'Getting into your dream university isn''''t just about meeting requirements — it''''s about finding the right fit for your ambitions and future goals.',
  	"sub_description" varchar DEFAULT 'At Think Study, we provide end-to-end guidance, helping students navigate everything from choosing the right course to securing admissions with confidence.',
  	"button_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_block_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'FAQs',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_career_block_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_career_block_b_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar DEFAULT 'Schedule Counseling'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_career_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"world_map_image_id" integer,
  	"main_heading" varchar DEFAULT 'Career-Focused Counseling',
  	"main_subheading" varchar DEFAULT 'help you choose the best study abroad programs for long-term career success.',
  	"secondary_heading" varchar DEFAULT 'Strong Visa Success Rate',
  	"secondary_subheading" varchar DEFAULT 'Expert support in preparing documentation, SOPs, and interview training',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_whyus_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_connect_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"main_heading" varchar DEFAULT 'Your future is having global skills — lets make studying abroad happen!',
  	"connect_text" varchar DEFAULT 'connect with our team today!',
  	"button_text" varchar DEFAULT 'Schedule Counseling',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_study_in_course" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Study in the',
  	"country" varchar DEFAULT 'USA',
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_study_in_checklist_check_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_study_in_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Your Essential Checklist!',
  	"subtitle" varchar DEFAULT 'Reasons to Study in America',
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_benefits_in_study" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"benefits_description" varchar DEFAULT 'Studying in the USA gives international students a chance to experience top-quality education in a welcoming and diverse environment. American universities are famous for their high teaching standards, modern facilities, and a wide selection of courses and degrees. Students gain practical knowledge, improve their English skills, and learn how to adapt to different cultures. The USA also offers excellent career prospects and strong student support services. With its vibrant campus life and numerous opportunities, studying in America is an attractive choice for students around the world.',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_study_in_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Study Abroad Smarter:',
  	"subtitle" varchar DEFAULT 'The Insider Notes You Need Before You Pack!',
  	"intakeheader_intake" varchar DEFAULT 'Intake',
  	"intakeheader_application" varchar DEFAULT 'Application Deadline',
  	"intakeheader_classesstart" varchar DEFAULT 'Classes Start Usually',
  	"in_taketable_header_fall_intake" varchar DEFAULT 'Fall Intake',
  	"in_taketable_header_springintake" varchar DEFAULT 'Spring Intake',
  	"in_taketable_header_summerintake" varchar DEFAULT 'Summer Intake',
  	"intake_table_fall_intake_application_deadline" varchar DEFAULT 'December To March',
  	"intake_table_fall_intake_classes_start" varchar DEFAULT 'August to September',
  	"intake_table_spring_intake_application_deadline" varchar DEFAULT 'July To November',
  	"intake_table_spring_intake_classes_start" varchar DEFAULT 'January to February',
  	"intake_table_summer_intake_application_deadline" varchar DEFAULT 'January To March',
  	"intake_table_summer_intake_classes_start" varchar DEFAULT 'May or June',
  	"righttableheader_livingexpenses" varchar DEFAULT 'Living Expenses',
  	"righttableheader_average" varchar DEFAULT 'Monthly Average Expenses (in USD)',
  	"righttableheader_dollar" varchar DEFAULT 'in USD',
  	"living_table_stay" varchar DEFAULT 'Stay',
  	"living_table_foodbudget" varchar DEFAULT 'Food Budget',
  	"living_table_localtransport" varchar DEFAULT 'Local Transport',
  	"living_table_phonebills" varchar DEFAULT 'Phone Bills',
  	"living_table_movingaround" varchar DEFAULT 'Moving Around',
  	"expenses_table_stay_monthly_average" varchar DEFAULT 'Around 1000 on sharing',
  	"expenses_table_food_budget_monthly_average" varchar DEFAULT 'we can make in 500',
  	"expenses_table_local_transport_monthly_average" varchar DEFAULT '200 will be a good budget',
  	"expenses_table_phone_bills_monthly_average" varchar DEFAULT '75 is the average budget',
  	"expenses_table_moving_around_monthly_average" varchar DEFAULT '250-300 but depends',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_study_in_application_right_content_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"service_text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_study_in_application" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"main_title" varchar DEFAULT 'From Application to Admission - We''''ve Got You!',
  	"sub_title" varchar DEFAULT 'Think. Study. Succeed. - We Make Your Global Education Dream a Reality!',
  	"left_content_headline" varchar DEFAULT 'Studying abroad can be complex, but we make it effortless.',
  	"left_content_highlight" varchar DEFAULT 'Our expert mentors',
  	"left_content_subheadline" varchar DEFAULT 'guide you every step of the way.',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ielts_enroll" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_prefix" varchar DEFAULT 'Clear',
  	"title_emphasis" varchar DEFAULT 'IELTS',
  	"title_suffix" varchar DEFAULT 'with Confidence',
  	"button_text" varchar DEFAULT 'Enroll Now!',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ielts_prep_icon_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ielts_prep" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"normal_heading" varchar,
  	"highlighted_heading" varchar,
  	"normal_description" varchar,
  	"content_card" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ielts_features_features_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature_text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ielts_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"student_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ielts_packages_packages_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ielts_packages_packages_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"include_item" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ielts_packages_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"option_label" varchar,
  	"package_title" varchar,
  	"includes_heading" varchar DEFAULT 'Includes:',
  	"price" numeric,
  	"package_color" "enum_pages_blocks_ielts_packages_packages_package_color"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ielts_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"main_heading" varchar,
  	"higlighted_heading" varchar,
  	"description" varchar,
  	"currency_label" varchar DEFAULT 'INR',
  	"enroll_button_text" varchar DEFAULT 'Enroll Now',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ielts_roadmap_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step_number" numeric,
  	"icon_id" integer,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ielts_roadmap" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact',
  	"hero_heading_content" varchar,
  	"hero_description_content" varchar,
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_appointment_block_left_content_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_appointment_block_right_schedule_slots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_appointment_block_right_universities" (
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
  	"left_content_title" varchar,
  	"left_content_sub_title" varchar,
  	"left_content_highlight_text" varchar,
  	"left_content_extra_text" varchar,
  	"left_content_button_text" varchar,
  	"left_content_button_url" varchar,
  	"right_schedule_from_date" timestamp(3) with time zone,
  	"right_schedule_to_date" timestamp(3) with time zone,
  	"right_schedule_day" varchar,
  	"right_uni_heading" varchar DEFAULT 'Participating Universities',
  	"bottom_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_admission_block_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_admission_block_courses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_admission_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar DEFAULT '1995',
  	"day" varchar DEFAULT 'Today',
  	"current_description" varchar DEFAULT 'Leaders in domestic + global admissions',
  	"current_year" varchar DEFAULT '2025',
  	"ambitions" varchar DEFAULT 'We understand your ambitions like they’re our own.',
  	"description" varchar DEFAULT 'Established for domestic admissions',
  	"success_rate" varchar DEFAULT 'Unlock Your Global Future – 98% Success Rate in International Admissions!',
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
  	"description" varchar,
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
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_call_to_action_block_offices_phone_numbers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_call_to_action_block_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_call_to_action_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"call_text" varchar DEFAULT 'Call or WhatsApp',
  	"student_image_id" integer,
  	"logo_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_universities_block_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_universities_block_universities_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_universities_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"main_heading" varchar,
  	"sub_heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_study_abroad_block_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"course_description" varchar,
  	"description" varchar,
  	"button_text" varchar DEFAULT 'Get Course List',
  	"button_link" varchar,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_study_abroad_block_cards_image_position" DEFAULT 'right',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_study_abroad_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"description" varchar,
  	"title_content" varchar,
  	"title_description" varchar,
  	"background_color" "enum__pages_v_blocks_study_abroad_block_background_color",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ielts_block_study_modes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ielts_block_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ielts_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Master English. Ace IELTS.',
  	"subtitle" varchar DEFAULT 'Prep Smarter, Score Higher.',
  	"description" varchar,
  	"ielts_text" varchar DEFAULT 'IELTS',
  	"ielts_image_id" integer,
  	"learning_type_title" varchar DEFAULT 'Hybrid Learning',
  	"learning_type_subtitle" varchar DEFAULT 'Classroom Or Online (Seamlessly Combined)',
  	"cta_button_text" varchar DEFAULT 'Join The Classes',
  	"cta_button_href" varchar DEFAULT '/join',
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_get_started_block_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_get_started_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Let''''s make it happen!',
  	"title" varchar DEFAULT 'Start your journey today!',
  	"footer_text" varchar DEFAULT 'And so much more to make your journey hassle-free!',
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_map_block_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"address" varchar,
  	"map_iframe" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_map_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Visit Us',
  	"_uuid" varchar,
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
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_service_block_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_service_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"backgroundimage_id" integer,
  	"main_heading" varchar DEFAULT 'Here''''s What We Do & Why We''''re the Right Choice for You',
  	"description" varchar DEFAULT 'Getting into your dream university isn''''t just about meeting requirements — it''''s about finding the right fit for your ambitions and future goals.',
  	"sub_description" varchar DEFAULT 'At Think Study, we provide end-to-end guidance, helping students navigate everything from choosing the right course to securing admissions with confidence.',
  	"button_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_block_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'FAQs',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_career_block_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_career_block_b_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar DEFAULT 'Schedule Counseling',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_career_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"world_map_image_id" integer,
  	"main_heading" varchar DEFAULT 'Career-Focused Counseling',
  	"main_subheading" varchar DEFAULT 'help you choose the best study abroad programs for long-term career success.',
  	"secondary_heading" varchar DEFAULT 'Strong Visa Success Rate',
  	"secondary_subheading" varchar DEFAULT 'Expert support in preparing documentation, SOPs, and interview training',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_whyus_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_connect_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"main_heading" varchar DEFAULT 'Your future is having global skills — lets make studying abroad happen!',
  	"connect_text" varchar DEFAULT 'connect with our team today!',
  	"button_text" varchar DEFAULT 'Schedule Counseling',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_study_in_course" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Study in the',
  	"country" varchar DEFAULT 'USA',
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_study_in_checklist_check_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_study_in_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Your Essential Checklist!',
  	"subtitle" varchar DEFAULT 'Reasons to Study in America',
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_benefits_in_study" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"benefits_description" varchar DEFAULT 'Studying in the USA gives international students a chance to experience top-quality education in a welcoming and diverse environment. American universities are famous for their high teaching standards, modern facilities, and a wide selection of courses and degrees. Students gain practical knowledge, improve their English skills, and learn how to adapt to different cultures. The USA also offers excellent career prospects and strong student support services. With its vibrant campus life and numerous opportunities, studying in America is an attractive choice for students around the world.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_study_in_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Study Abroad Smarter:',
  	"subtitle" varchar DEFAULT 'The Insider Notes You Need Before You Pack!',
  	"intakeheader_intake" varchar DEFAULT 'Intake',
  	"intakeheader_application" varchar DEFAULT 'Application Deadline',
  	"intakeheader_classesstart" varchar DEFAULT 'Classes Start Usually',
  	"in_taketable_header_fall_intake" varchar DEFAULT 'Fall Intake',
  	"in_taketable_header_springintake" varchar DEFAULT 'Spring Intake',
  	"in_taketable_header_summerintake" varchar DEFAULT 'Summer Intake',
  	"intake_table_fall_intake_application_deadline" varchar DEFAULT 'December To March',
  	"intake_table_fall_intake_classes_start" varchar DEFAULT 'August to September',
  	"intake_table_spring_intake_application_deadline" varchar DEFAULT 'July To November',
  	"intake_table_spring_intake_classes_start" varchar DEFAULT 'January to February',
  	"intake_table_summer_intake_application_deadline" varchar DEFAULT 'January To March',
  	"intake_table_summer_intake_classes_start" varchar DEFAULT 'May or June',
  	"righttableheader_livingexpenses" varchar DEFAULT 'Living Expenses',
  	"righttableheader_average" varchar DEFAULT 'Monthly Average Expenses (in USD)',
  	"righttableheader_dollar" varchar DEFAULT 'in USD',
  	"living_table_stay" varchar DEFAULT 'Stay',
  	"living_table_foodbudget" varchar DEFAULT 'Food Budget',
  	"living_table_localtransport" varchar DEFAULT 'Local Transport',
  	"living_table_phonebills" varchar DEFAULT 'Phone Bills',
  	"living_table_movingaround" varchar DEFAULT 'Moving Around',
  	"expenses_table_stay_monthly_average" varchar DEFAULT 'Around 1000 on sharing',
  	"expenses_table_food_budget_monthly_average" varchar DEFAULT 'we can make in 500',
  	"expenses_table_local_transport_monthly_average" varchar DEFAULT '200 will be a good budget',
  	"expenses_table_phone_bills_monthly_average" varchar DEFAULT '75 is the average budget',
  	"expenses_table_moving_around_monthly_average" varchar DEFAULT '250-300 but depends',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_study_in_application_right_content_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"service_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_study_in_application" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"main_title" varchar DEFAULT 'From Application to Admission - We''''ve Got You!',
  	"sub_title" varchar DEFAULT 'Think. Study. Succeed. - We Make Your Global Education Dream a Reality!',
  	"left_content_headline" varchar DEFAULT 'Studying abroad can be complex, but we make it effortless.',
  	"left_content_highlight" varchar DEFAULT 'Our expert mentors',
  	"left_content_subheadline" varchar DEFAULT 'guide you every step of the way.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ielts_enroll" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_prefix" varchar DEFAULT 'Clear',
  	"title_emphasis" varchar DEFAULT 'IELTS',
  	"title_suffix" varchar DEFAULT 'with Confidence',
  	"button_text" varchar DEFAULT 'Enroll Now!',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ielts_prep_icon_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ielts_prep" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"normal_heading" varchar,
  	"highlighted_heading" varchar,
  	"normal_description" varchar,
  	"content_card" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ielts_features_features_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ielts_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"student_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ielts_packages_packages_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ielts_packages_packages_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"include_item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ielts_packages_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"option_label" varchar,
  	"package_title" varchar,
  	"includes_heading" varchar DEFAULT 'Includes:',
  	"price" numeric,
  	"package_color" "enum__pages_v_blocks_ielts_packages_packages_package_color",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ielts_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"main_heading" varchar,
  	"higlighted_heading" varchar,
  	"description" varchar,
  	"currency_label" varchar DEFAULT 'INR',
  	"enroll_button_text" varchar DEFAULT 'Enroll Now',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ielts_roadmap_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"step_number" numeric,
  	"icon_id" integer,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ielts_roadmap" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_heading_content" varchar,
  	"version_hero_description_content" varchar,
  	"version_hero_rich_text" jsonb,
  	"version_hero_media_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"title" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"users_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer,
  	"payload_jobs_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_sub_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_sub_menu_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header_buttons_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_buttons_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_header_buttons_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
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
  
  CREATE TABLE IF NOT EXISTS "footer_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_social_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" varchar,
  	"copyright" varchar DEFAULT '© 2024 Your Company Name. All rights reserved.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_appointment_block_left_content_paragraphs" ADD CONSTRAINT "pages_blocks_appointment_block_left_content_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_appointment_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_appointment_block_right_schedule_slots" ADD CONSTRAINT "pages_blocks_appointment_block_right_schedule_slots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_appointment_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_appointment_block_right_universities" ADD CONSTRAINT "pages_blocks_appointment_block_right_universities_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_appointment_block_right_universities" ADD CONSTRAINT "pages_blocks_appointment_block_right_universities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_appointment_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_appointment_block" ADD CONSTRAINT "pages_blocks_appointment_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_admission_block_statistics" ADD CONSTRAINT "pages_blocks_admission_block_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_admission_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_admission_block_courses" ADD CONSTRAINT "pages_blocks_admission_block_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_admission_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_admission_block" ADD CONSTRAINT "pages_blocks_admission_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "pages_blocks_call_to_action_block_offices_phone_numbers" ADD CONSTRAINT "pages_blocks_call_to_action_block_offices_phone_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_call_to_action_block_offices"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_action_block_offices" ADD CONSTRAINT "pages_blocks_call_to_action_block_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_call_to_action_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_action_block" ADD CONSTRAINT "pages_blocks_call_to_action_block_student_image_id_media_id_fk" FOREIGN KEY ("student_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_action_block" ADD CONSTRAINT "pages_blocks_call_to_action_block_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_action_block" ADD CONSTRAINT "pages_blocks_call_to_action_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_universities_block_stats" ADD CONSTRAINT "pages_blocks_universities_block_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_universities_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_universities_block_universities_images" ADD CONSTRAINT "pages_blocks_universities_block_universities_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_universities_block_universities_images" ADD CONSTRAINT "pages_blocks_universities_block_universities_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_universities_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_universities_block" ADD CONSTRAINT "pages_blocks_universities_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_abroad_block_cards" ADD CONSTRAINT "pages_blocks_study_abroad_block_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_abroad_block_cards" ADD CONSTRAINT "pages_blocks_study_abroad_block_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_study_abroad_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_abroad_block" ADD CONSTRAINT "pages_blocks_study_abroad_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_block_study_modes" ADD CONSTRAINT "pages_blocks_ielts_block_study_modes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ielts_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_block_features" ADD CONSTRAINT "pages_blocks_ielts_block_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ielts_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_block" ADD CONSTRAINT "pages_blocks_ielts_block_ielts_image_id_media_id_fk" FOREIGN KEY ("ielts_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_block" ADD CONSTRAINT "pages_blocks_ielts_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_block" ADD CONSTRAINT "pages_blocks_ielts_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_get_started_block_features" ADD CONSTRAINT "pages_blocks_get_started_block_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_get_started_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_get_started_block" ADD CONSTRAINT "pages_blocks_get_started_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_get_started_block" ADD CONSTRAINT "pages_blocks_get_started_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_map_block_offices" ADD CONSTRAINT "pages_blocks_map_block_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_map_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_map_block" ADD CONSTRAINT "pages_blocks_map_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
   ALTER TABLE "pages_blocks_service_block_services" ADD CONSTRAINT "pages_blocks_service_block_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_service_block" ADD CONSTRAINT "pages_blocks_service_block_backgroundimage_id_media_id_fk" FOREIGN KEY ("backgroundimage_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_service_block" ADD CONSTRAINT "pages_blocks_service_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_faq_block_faqs" ADD CONSTRAINT "pages_blocks_faq_block_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_faq_block" ADD CONSTRAINT "pages_blocks_faq_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_career_block_statistics" ADD CONSTRAINT "pages_blocks_career_block_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_career_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_career_block_b_text" ADD CONSTRAINT "pages_blocks_career_block_b_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_career_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_career_block" ADD CONSTRAINT "pages_blocks_career_block_world_map_image_id_media_id_fk" FOREIGN KEY ("world_map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_career_block" ADD CONSTRAINT "pages_blocks_career_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_whyus_media_block" ADD CONSTRAINT "pages_blocks_whyus_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_whyus_media_block" ADD CONSTRAINT "pages_blocks_whyus_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_connect_block" ADD CONSTRAINT "pages_blocks_connect_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_in_course" ADD CONSTRAINT "pages_blocks_study_in_course_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_in_course" ADD CONSTRAINT "pages_blocks_study_in_course_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_in_checklist_check_items" ADD CONSTRAINT "pages_blocks_study_in_checklist_check_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_study_in_checklist"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_in_checklist" ADD CONSTRAINT "pages_blocks_study_in_checklist_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_in_checklist" ADD CONSTRAINT "pages_blocks_study_in_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_benefits_in_study" ADD CONSTRAINT "pages_blocks_benefits_in_study_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_benefits_in_study" ADD CONSTRAINT "pages_blocks_benefits_in_study_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_in_notes" ADD CONSTRAINT "pages_blocks_study_in_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_in_application_right_content_services" ADD CONSTRAINT "pages_blocks_study_in_application_right_content_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_study_in_application"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_in_application" ADD CONSTRAINT "pages_blocks_study_in_application_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_enroll" ADD CONSTRAINT "pages_blocks_ielts_enroll_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_prep_icon_cards" ADD CONSTRAINT "pages_blocks_ielts_prep_icon_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_prep_icon_cards" ADD CONSTRAINT "pages_blocks_ielts_prep_icon_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ielts_prep"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_prep" ADD CONSTRAINT "pages_blocks_ielts_prep_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_prep" ADD CONSTRAINT "pages_blocks_ielts_prep_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_features_features_list" ADD CONSTRAINT "pages_blocks_ielts_features_features_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ielts_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_features" ADD CONSTRAINT "pages_blocks_ielts_features_student_image_id_media_id_fk" FOREIGN KEY ("student_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_features" ADD CONSTRAINT "pages_blocks_ielts_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_packages_packages_details" ADD CONSTRAINT "pages_blocks_ielts_packages_packages_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ielts_packages_packages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_packages_packages_includes" ADD CONSTRAINT "pages_blocks_ielts_packages_packages_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ielts_packages_packages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_packages_packages" ADD CONSTRAINT "pages_blocks_ielts_packages_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ielts_packages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_packages" ADD CONSTRAINT "pages_blocks_ielts_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_roadmap_steps" ADD CONSTRAINT "pages_blocks_ielts_roadmap_steps_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_roadmap_steps" ADD CONSTRAINT "pages_blocks_ielts_roadmap_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ielts_roadmap"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ielts_roadmap" ADD CONSTRAINT "pages_blocks_ielts_roadmap_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_appointment_block_left_content_paragraphs" ADD CONSTRAINT "_pages_v_blocks_appointment_block_left_content_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_appointment_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_appointment_block_right_schedule_slots" ADD CONSTRAINT "_pages_v_blocks_appointment_block_right_schedule_slots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_appointment_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_appointment_block_right_universities" ADD CONSTRAINT "_pages_v_blocks_appointment_block_right_universities_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_appointment_block_right_universities" ADD CONSTRAINT "_pages_v_blocks_appointment_block_right_universities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_appointment_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_appointment_block" ADD CONSTRAINT "_pages_v_blocks_appointment_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_admission_block_statistics" ADD CONSTRAINT "_pages_v_blocks_admission_block_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_admission_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_admission_block_courses" ADD CONSTRAINT "_pages_v_blocks_admission_block_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_admission_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_admission_block" ADD CONSTRAINT "_pages_v_blocks_admission_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "_pages_v_blocks_call_to_action_block_offices_phone_numbers" ADD CONSTRAINT "_pages_v_blocks_call_to_action_block_offices_phone_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_call_to_action_block_offices"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_action_block_offices" ADD CONSTRAINT "_pages_v_blocks_call_to_action_block_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_call_to_action_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_action_block" ADD CONSTRAINT "_pages_v_blocks_call_to_action_block_student_image_id_media_id_fk" FOREIGN KEY ("student_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_action_block" ADD CONSTRAINT "_pages_v_blocks_call_to_action_block_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_action_block" ADD CONSTRAINT "_pages_v_blocks_call_to_action_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_universities_block_stats" ADD CONSTRAINT "_pages_v_blocks_universities_block_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_universities_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_universities_block_universities_images" ADD CONSTRAINT "_pages_v_blocks_universities_block_universities_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_universities_block_universities_images" ADD CONSTRAINT "_pages_v_blocks_universities_block_universities_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_universities_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_universities_block" ADD CONSTRAINT "_pages_v_blocks_universities_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_abroad_block_cards" ADD CONSTRAINT "_pages_v_blocks_study_abroad_block_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_abroad_block_cards" ADD CONSTRAINT "_pages_v_blocks_study_abroad_block_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_study_abroad_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_abroad_block" ADD CONSTRAINT "_pages_v_blocks_study_abroad_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_block_study_modes" ADD CONSTRAINT "_pages_v_blocks_ielts_block_study_modes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ielts_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_block_features" ADD CONSTRAINT "_pages_v_blocks_ielts_block_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ielts_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_block" ADD CONSTRAINT "_pages_v_blocks_ielts_block_ielts_image_id_media_id_fk" FOREIGN KEY ("ielts_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_block" ADD CONSTRAINT "_pages_v_blocks_ielts_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_block" ADD CONSTRAINT "_pages_v_blocks_ielts_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_get_started_block_features" ADD CONSTRAINT "_pages_v_blocks_get_started_block_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_get_started_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_get_started_block" ADD CONSTRAINT "_pages_v_blocks_get_started_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_get_started_block" ADD CONSTRAINT "_pages_v_blocks_get_started_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_map_block_offices" ADD CONSTRAINT "_pages_v_blocks_map_block_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_map_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_map_block" ADD CONSTRAINT "_pages_v_blocks_map_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
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
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_service_block_services" ADD CONSTRAINT "_pages_v_blocks_service_block_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_service_block" ADD CONSTRAINT "_pages_v_blocks_service_block_backgroundimage_id_media_id_fk" FOREIGN KEY ("backgroundimage_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_service_block" ADD CONSTRAINT "_pages_v_blocks_service_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_faq_block_faqs" ADD CONSTRAINT "_pages_v_blocks_faq_block_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_faq_block" ADD CONSTRAINT "_pages_v_blocks_faq_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_career_block_statistics" ADD CONSTRAINT "_pages_v_blocks_career_block_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_career_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_career_block_b_text" ADD CONSTRAINT "_pages_v_blocks_career_block_b_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_career_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_career_block" ADD CONSTRAINT "_pages_v_blocks_career_block_world_map_image_id_media_id_fk" FOREIGN KEY ("world_map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_career_block" ADD CONSTRAINT "_pages_v_blocks_career_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_whyus_media_block" ADD CONSTRAINT "_pages_v_blocks_whyus_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_whyus_media_block" ADD CONSTRAINT "_pages_v_blocks_whyus_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_connect_block" ADD CONSTRAINT "_pages_v_blocks_connect_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_in_course" ADD CONSTRAINT "_pages_v_blocks_study_in_course_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_in_course" ADD CONSTRAINT "_pages_v_blocks_study_in_course_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_in_checklist_check_items" ADD CONSTRAINT "_pages_v_blocks_study_in_checklist_check_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_study_in_checklist"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_in_checklist" ADD CONSTRAINT "_pages_v_blocks_study_in_checklist_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_in_checklist" ADD CONSTRAINT "_pages_v_blocks_study_in_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_benefits_in_study" ADD CONSTRAINT "_pages_v_blocks_benefits_in_study_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_benefits_in_study" ADD CONSTRAINT "_pages_v_blocks_benefits_in_study_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_in_notes" ADD CONSTRAINT "_pages_v_blocks_study_in_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_in_application_right_content_services" ADD CONSTRAINT "_pages_v_blocks_study_in_application_right_content_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_study_in_application"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_in_application" ADD CONSTRAINT "_pages_v_blocks_study_in_application_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_enroll" ADD CONSTRAINT "_pages_v_blocks_ielts_enroll_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_prep_icon_cards" ADD CONSTRAINT "_pages_v_blocks_ielts_prep_icon_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_prep_icon_cards" ADD CONSTRAINT "_pages_v_blocks_ielts_prep_icon_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ielts_prep"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_prep" ADD CONSTRAINT "_pages_v_blocks_ielts_prep_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_prep" ADD CONSTRAINT "_pages_v_blocks_ielts_prep_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_features_features_list" ADD CONSTRAINT "_pages_v_blocks_ielts_features_features_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ielts_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_features" ADD CONSTRAINT "_pages_v_blocks_ielts_features_student_image_id_media_id_fk" FOREIGN KEY ("student_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_features" ADD CONSTRAINT "_pages_v_blocks_ielts_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_packages_packages_details" ADD CONSTRAINT "_pages_v_blocks_ielts_packages_packages_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ielts_packages_packages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_packages_packages_includes" ADD CONSTRAINT "_pages_v_blocks_ielts_packages_packages_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ielts_packages_packages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_packages_packages" ADD CONSTRAINT "_pages_v_blocks_ielts_packages_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ielts_packages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_packages" ADD CONSTRAINT "_pages_v_blocks_ielts_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_roadmap_steps" ADD CONSTRAINT "_pages_v_blocks_ielts_roadmap_steps_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_roadmap_steps" ADD CONSTRAINT "_pages_v_blocks_ielts_roadmap_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ielts_roadmap"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ielts_roadmap" ADD CONSTRAINT "_pages_v_blocks_ielts_roadmap_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_sub_menu" ADD CONSTRAINT "header_nav_items_sub_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_buttons_links" ADD CONSTRAINT "header_buttons_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
  
  DO $$ BEGIN
   ALTER TABLE "footer_social" ADD CONSTRAINT "footer_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_order_idx" ON "pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_parent_id_idx" ON "pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_archive_order_idx" ON "pages_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_archive_parent_id_idx" ON "pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_archive_path_idx" ON "pages_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_left_content_paragraphs_order_idx" ON "pages_blocks_appointment_block_left_content_paragraphs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_left_content_paragraphs_parent_id_idx" ON "pages_blocks_appointment_block_left_content_paragraphs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_right_schedule_slots_order_idx" ON "pages_blocks_appointment_block_right_schedule_slots" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_right_schedule_slots_parent_id_idx" ON "pages_blocks_appointment_block_right_schedule_slots" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_right_universities_order_idx" ON "pages_blocks_appointment_block_right_universities" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_right_universities_parent_id_idx" ON "pages_blocks_appointment_block_right_universities" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_right_universities_img_idx" ON "pages_blocks_appointment_block_right_universities" USING btree ("img_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_order_idx" ON "pages_blocks_appointment_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_parent_id_idx" ON "pages_blocks_appointment_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_appointment_block_path_idx" ON "pages_blocks_appointment_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_admission_block_statistics_order_idx" ON "pages_blocks_admission_block_statistics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_admission_block_statistics_parent_id_idx" ON "pages_blocks_admission_block_statistics" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_admission_block_courses_order_idx" ON "pages_blocks_admission_block_courses" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_admission_block_courses_parent_id_idx" ON "pages_blocks_admission_block_courses" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_admission_block_order_idx" ON "pages_blocks_admission_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_admission_block_parent_id_idx" ON "pages_blocks_admission_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_admission_block_path_idx" ON "pages_blocks_admission_block" USING btree ("_path");
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
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_block_offices_phone_numbers_order_idx" ON "pages_blocks_call_to_action_block_offices_phone_numbers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_block_offices_phone_numbers_parent_id_idx" ON "pages_blocks_call_to_action_block_offices_phone_numbers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_block_offices_order_idx" ON "pages_blocks_call_to_action_block_offices" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_block_offices_parent_id_idx" ON "pages_blocks_call_to_action_block_offices" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_block_order_idx" ON "pages_blocks_call_to_action_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_block_parent_id_idx" ON "pages_blocks_call_to_action_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_block_path_idx" ON "pages_blocks_call_to_action_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_block_student_image_idx" ON "pages_blocks_call_to_action_block" USING btree ("student_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_block_logo_image_idx" ON "pages_blocks_call_to_action_block" USING btree ("logo_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_block_stats_order_idx" ON "pages_blocks_universities_block_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_block_stats_parent_id_idx" ON "pages_blocks_universities_block_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_block_universities_images_order_idx" ON "pages_blocks_universities_block_universities_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_block_universities_images_parent_id_idx" ON "pages_blocks_universities_block_universities_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_block_universities_images_image_idx" ON "pages_blocks_universities_block_universities_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_block_order_idx" ON "pages_blocks_universities_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_block_parent_id_idx" ON "pages_blocks_universities_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_universities_block_path_idx" ON "pages_blocks_universities_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_abroad_block_cards_order_idx" ON "pages_blocks_study_abroad_block_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_abroad_block_cards_parent_id_idx" ON "pages_blocks_study_abroad_block_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_abroad_block_cards_image_idx" ON "pages_blocks_study_abroad_block_cards" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_abroad_block_order_idx" ON "pages_blocks_study_abroad_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_abroad_block_parent_id_idx" ON "pages_blocks_study_abroad_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_abroad_block_path_idx" ON "pages_blocks_study_abroad_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_block_study_modes_order_idx" ON "pages_blocks_ielts_block_study_modes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_block_study_modes_parent_id_idx" ON "pages_blocks_ielts_block_study_modes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_block_features_order_idx" ON "pages_blocks_ielts_block_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_block_features_parent_id_idx" ON "pages_blocks_ielts_block_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_block_order_idx" ON "pages_blocks_ielts_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_block_parent_id_idx" ON "pages_blocks_ielts_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_block_path_idx" ON "pages_blocks_ielts_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_block_ielts_image_idx" ON "pages_blocks_ielts_block" USING btree ("ielts_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_block_image_idx" ON "pages_blocks_ielts_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_get_started_block_features_order_idx" ON "pages_blocks_get_started_block_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_get_started_block_features_parent_id_idx" ON "pages_blocks_get_started_block_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_get_started_block_order_idx" ON "pages_blocks_get_started_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_get_started_block_parent_id_idx" ON "pages_blocks_get_started_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_get_started_block_path_idx" ON "pages_blocks_get_started_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_get_started_block_image_idx" ON "pages_blocks_get_started_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_map_block_offices_order_idx" ON "pages_blocks_map_block_offices" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_map_block_offices_parent_id_idx" ON "pages_blocks_map_block_offices" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_map_block_order_idx" ON "pages_blocks_map_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_map_block_parent_id_idx" ON "pages_blocks_map_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_map_block_path_idx" ON "pages_blocks_map_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_student_block_items_order_idx" ON "pages_blocks_world_student_block_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_student_block_items_parent_id_idx" ON "pages_blocks_world_student_block_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_student_block_items_image_idx" ON "pages_blocks_world_student_block_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_student_block_order_idx" ON "pages_blocks_world_student_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_student_block_parent_id_idx" ON "pages_blocks_world_student_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_student_block_path_idx" ON "pages_blocks_world_student_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_world_student_block_background_image_idx" ON "pages_blocks_world_student_block" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_block_services_order_idx" ON "pages_blocks_service_block_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_block_services_parent_id_idx" ON "pages_blocks_service_block_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_block_order_idx" ON "pages_blocks_service_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_block_parent_id_idx" ON "pages_blocks_service_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_block_path_idx" ON "pages_blocks_service_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_service_block_backgroundimage_idx" ON "pages_blocks_service_block" USING btree ("backgroundimage_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_block_faqs_order_idx" ON "pages_blocks_faq_block_faqs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_block_faqs_parent_id_idx" ON "pages_blocks_faq_block_faqs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_block_order_idx" ON "pages_blocks_faq_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_block_parent_id_idx" ON "pages_blocks_faq_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_block_path_idx" ON "pages_blocks_faq_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_career_block_statistics_order_idx" ON "pages_blocks_career_block_statistics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_career_block_statistics_parent_id_idx" ON "pages_blocks_career_block_statistics" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_career_block_b_text_order_idx" ON "pages_blocks_career_block_b_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_career_block_b_text_parent_id_idx" ON "pages_blocks_career_block_b_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_career_block_order_idx" ON "pages_blocks_career_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_career_block_parent_id_idx" ON "pages_blocks_career_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_career_block_path_idx" ON "pages_blocks_career_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_career_block_world_map_image_idx" ON "pages_blocks_career_block" USING btree ("world_map_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_whyus_media_block_order_idx" ON "pages_blocks_whyus_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_whyus_media_block_parent_id_idx" ON "pages_blocks_whyus_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_whyus_media_block_path_idx" ON "pages_blocks_whyus_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_whyus_media_block_media_idx" ON "pages_blocks_whyus_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_connect_block_order_idx" ON "pages_blocks_connect_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_connect_block_parent_id_idx" ON "pages_blocks_connect_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_connect_block_path_idx" ON "pages_blocks_connect_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_course_order_idx" ON "pages_blocks_study_in_course" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_course_parent_id_idx" ON "pages_blocks_study_in_course" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_course_path_idx" ON "pages_blocks_study_in_course" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_course_image_idx" ON "pages_blocks_study_in_course" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_checklist_check_items_order_idx" ON "pages_blocks_study_in_checklist_check_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_checklist_check_items_parent_id_idx" ON "pages_blocks_study_in_checklist_check_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_checklist_order_idx" ON "pages_blocks_study_in_checklist" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_checklist_parent_id_idx" ON "pages_blocks_study_in_checklist" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_checklist_path_idx" ON "pages_blocks_study_in_checklist" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_checklist_image_idx" ON "pages_blocks_study_in_checklist" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_benefits_in_study_order_idx" ON "pages_blocks_benefits_in_study" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_benefits_in_study_parent_id_idx" ON "pages_blocks_benefits_in_study" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_benefits_in_study_path_idx" ON "pages_blocks_benefits_in_study" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_benefits_in_study_background_image_idx" ON "pages_blocks_benefits_in_study" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_notes_order_idx" ON "pages_blocks_study_in_notes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_notes_parent_id_idx" ON "pages_blocks_study_in_notes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_notes_path_idx" ON "pages_blocks_study_in_notes" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_application_right_content_services_order_idx" ON "pages_blocks_study_in_application_right_content_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_application_right_content_services_parent_id_idx" ON "pages_blocks_study_in_application_right_content_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_application_order_idx" ON "pages_blocks_study_in_application" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_application_parent_id_idx" ON "pages_blocks_study_in_application" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_application_path_idx" ON "pages_blocks_study_in_application" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_enroll_order_idx" ON "pages_blocks_ielts_enroll" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_enroll_parent_id_idx" ON "pages_blocks_ielts_enroll" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_enroll_path_idx" ON "pages_blocks_ielts_enroll" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_prep_icon_cards_order_idx" ON "pages_blocks_ielts_prep_icon_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_prep_icon_cards_parent_id_idx" ON "pages_blocks_ielts_prep_icon_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_prep_icon_cards_icon_idx" ON "pages_blocks_ielts_prep_icon_cards" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_prep_order_idx" ON "pages_blocks_ielts_prep" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_prep_parent_id_idx" ON "pages_blocks_ielts_prep" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_prep_path_idx" ON "pages_blocks_ielts_prep" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_prep_background_image_idx" ON "pages_blocks_ielts_prep" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_features_features_list_order_idx" ON "pages_blocks_ielts_features_features_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_features_features_list_parent_id_idx" ON "pages_blocks_ielts_features_features_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_features_order_idx" ON "pages_blocks_ielts_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_features_parent_id_idx" ON "pages_blocks_ielts_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_features_path_idx" ON "pages_blocks_ielts_features" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_features_student_image_idx" ON "pages_blocks_ielts_features" USING btree ("student_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_packages_packages_details_order_idx" ON "pages_blocks_ielts_packages_packages_details" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_packages_packages_details_parent_id_idx" ON "pages_blocks_ielts_packages_packages_details" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_packages_packages_includes_order_idx" ON "pages_blocks_ielts_packages_packages_includes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_packages_packages_includes_parent_id_idx" ON "pages_blocks_ielts_packages_packages_includes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_packages_packages_order_idx" ON "pages_blocks_ielts_packages_packages" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_packages_packages_parent_id_idx" ON "pages_blocks_ielts_packages_packages" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_packages_order_idx" ON "pages_blocks_ielts_packages" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_packages_parent_id_idx" ON "pages_blocks_ielts_packages" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_packages_path_idx" ON "pages_blocks_ielts_packages" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_roadmap_steps_order_idx" ON "pages_blocks_ielts_roadmap_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_roadmap_steps_parent_id_idx" ON "pages_blocks_ielts_roadmap_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_roadmap_steps_icon_idx" ON "pages_blocks_ielts_roadmap_steps" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_roadmap_order_idx" ON "pages_blocks_ielts_roadmap" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_roadmap_parent_id_idx" ON "pages_blocks_ielts_roadmap" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ielts_roadmap_path_idx" ON "pages_blocks_ielts_roadmap" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX IF NOT EXISTS "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_order_idx" ON "_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_parent_id_idx" ON "_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_archive_order_idx" ON "_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_archive_parent_id_idx" ON "_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_archive_path_idx" ON "_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_left_content_paragraphs_order_idx" ON "_pages_v_blocks_appointment_block_left_content_paragraphs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_left_content_paragraphs_parent_id_idx" ON "_pages_v_blocks_appointment_block_left_content_paragraphs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_right_schedule_slots_order_idx" ON "_pages_v_blocks_appointment_block_right_schedule_slots" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_right_schedule_slots_parent_id_idx" ON "_pages_v_blocks_appointment_block_right_schedule_slots" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_right_universities_order_idx" ON "_pages_v_blocks_appointment_block_right_universities" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_right_universities_parent_id_idx" ON "_pages_v_blocks_appointment_block_right_universities" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_right_universities_img_idx" ON "_pages_v_blocks_appointment_block_right_universities" USING btree ("img_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_order_idx" ON "_pages_v_blocks_appointment_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_parent_id_idx" ON "_pages_v_blocks_appointment_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_appointment_block_path_idx" ON "_pages_v_blocks_appointment_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_admission_block_statistics_order_idx" ON "_pages_v_blocks_admission_block_statistics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_admission_block_statistics_parent_id_idx" ON "_pages_v_blocks_admission_block_statistics" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_admission_block_courses_order_idx" ON "_pages_v_blocks_admission_block_courses" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_admission_block_courses_parent_id_idx" ON "_pages_v_blocks_admission_block_courses" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_admission_block_order_idx" ON "_pages_v_blocks_admission_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_admission_block_parent_id_idx" ON "_pages_v_blocks_admission_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_admission_block_path_idx" ON "_pages_v_blocks_admission_block" USING btree ("_path");
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
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_block_offices_phone_numbers_order_idx" ON "_pages_v_blocks_call_to_action_block_offices_phone_numbers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_block_offices_phone_numbers_parent_id_idx" ON "_pages_v_blocks_call_to_action_block_offices_phone_numbers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_block_offices_order_idx" ON "_pages_v_blocks_call_to_action_block_offices" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_block_offices_parent_id_idx" ON "_pages_v_blocks_call_to_action_block_offices" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_block_order_idx" ON "_pages_v_blocks_call_to_action_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_block_parent_id_idx" ON "_pages_v_blocks_call_to_action_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_block_path_idx" ON "_pages_v_blocks_call_to_action_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_block_student_image_idx" ON "_pages_v_blocks_call_to_action_block" USING btree ("student_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_block_logo_image_idx" ON "_pages_v_blocks_call_to_action_block" USING btree ("logo_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_block_stats_order_idx" ON "_pages_v_blocks_universities_block_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_block_stats_parent_id_idx" ON "_pages_v_blocks_universities_block_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_block_universities_images_order_idx" ON "_pages_v_blocks_universities_block_universities_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_block_universities_images_parent_id_idx" ON "_pages_v_blocks_universities_block_universities_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_block_universities_images_image_idx" ON "_pages_v_blocks_universities_block_universities_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_block_order_idx" ON "_pages_v_blocks_universities_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_block_parent_id_idx" ON "_pages_v_blocks_universities_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_universities_block_path_idx" ON "_pages_v_blocks_universities_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_abroad_block_cards_order_idx" ON "_pages_v_blocks_study_abroad_block_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_abroad_block_cards_parent_id_idx" ON "_pages_v_blocks_study_abroad_block_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_abroad_block_cards_image_idx" ON "_pages_v_blocks_study_abroad_block_cards" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_abroad_block_order_idx" ON "_pages_v_blocks_study_abroad_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_abroad_block_parent_id_idx" ON "_pages_v_blocks_study_abroad_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_abroad_block_path_idx" ON "_pages_v_blocks_study_abroad_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_block_study_modes_order_idx" ON "_pages_v_blocks_ielts_block_study_modes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_block_study_modes_parent_id_idx" ON "_pages_v_blocks_ielts_block_study_modes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_block_features_order_idx" ON "_pages_v_blocks_ielts_block_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_block_features_parent_id_idx" ON "_pages_v_blocks_ielts_block_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_block_order_idx" ON "_pages_v_blocks_ielts_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_block_parent_id_idx" ON "_pages_v_blocks_ielts_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_block_path_idx" ON "_pages_v_blocks_ielts_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_block_ielts_image_idx" ON "_pages_v_blocks_ielts_block" USING btree ("ielts_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_block_image_idx" ON "_pages_v_blocks_ielts_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_get_started_block_features_order_idx" ON "_pages_v_blocks_get_started_block_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_get_started_block_features_parent_id_idx" ON "_pages_v_blocks_get_started_block_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_get_started_block_order_idx" ON "_pages_v_blocks_get_started_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_get_started_block_parent_id_idx" ON "_pages_v_blocks_get_started_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_get_started_block_path_idx" ON "_pages_v_blocks_get_started_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_get_started_block_image_idx" ON "_pages_v_blocks_get_started_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_map_block_offices_order_idx" ON "_pages_v_blocks_map_block_offices" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_map_block_offices_parent_id_idx" ON "_pages_v_blocks_map_block_offices" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_map_block_order_idx" ON "_pages_v_blocks_map_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_map_block_parent_id_idx" ON "_pages_v_blocks_map_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_map_block_path_idx" ON "_pages_v_blocks_map_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_student_block_items_order_idx" ON "_pages_v_blocks_world_student_block_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_student_block_items_parent_id_idx" ON "_pages_v_blocks_world_student_block_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_student_block_items_image_idx" ON "_pages_v_blocks_world_student_block_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_student_block_order_idx" ON "_pages_v_blocks_world_student_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_student_block_parent_id_idx" ON "_pages_v_blocks_world_student_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_student_block_path_idx" ON "_pages_v_blocks_world_student_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_world_student_block_background_image_idx" ON "_pages_v_blocks_world_student_block" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_block_services_order_idx" ON "_pages_v_blocks_service_block_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_block_services_parent_id_idx" ON "_pages_v_blocks_service_block_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_block_order_idx" ON "_pages_v_blocks_service_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_block_parent_id_idx" ON "_pages_v_blocks_service_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_block_path_idx" ON "_pages_v_blocks_service_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_service_block_backgroundimage_idx" ON "_pages_v_blocks_service_block" USING btree ("backgroundimage_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_block_faqs_order_idx" ON "_pages_v_blocks_faq_block_faqs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_block_faqs_parent_id_idx" ON "_pages_v_blocks_faq_block_faqs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_block_order_idx" ON "_pages_v_blocks_faq_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_block_parent_id_idx" ON "_pages_v_blocks_faq_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_block_path_idx" ON "_pages_v_blocks_faq_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_career_block_statistics_order_idx" ON "_pages_v_blocks_career_block_statistics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_career_block_statistics_parent_id_idx" ON "_pages_v_blocks_career_block_statistics" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_career_block_b_text_order_idx" ON "_pages_v_blocks_career_block_b_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_career_block_b_text_parent_id_idx" ON "_pages_v_blocks_career_block_b_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_career_block_order_idx" ON "_pages_v_blocks_career_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_career_block_parent_id_idx" ON "_pages_v_blocks_career_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_career_block_path_idx" ON "_pages_v_blocks_career_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_career_block_world_map_image_idx" ON "_pages_v_blocks_career_block" USING btree ("world_map_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_whyus_media_block_order_idx" ON "_pages_v_blocks_whyus_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_whyus_media_block_parent_id_idx" ON "_pages_v_blocks_whyus_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_whyus_media_block_path_idx" ON "_pages_v_blocks_whyus_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_whyus_media_block_media_idx" ON "_pages_v_blocks_whyus_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_connect_block_order_idx" ON "_pages_v_blocks_connect_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_connect_block_parent_id_idx" ON "_pages_v_blocks_connect_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_connect_block_path_idx" ON "_pages_v_blocks_connect_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_course_order_idx" ON "_pages_v_blocks_study_in_course" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_course_parent_id_idx" ON "_pages_v_blocks_study_in_course" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_course_path_idx" ON "_pages_v_blocks_study_in_course" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_course_image_idx" ON "_pages_v_blocks_study_in_course" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_checklist_check_items_order_idx" ON "_pages_v_blocks_study_in_checklist_check_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_checklist_check_items_parent_id_idx" ON "_pages_v_blocks_study_in_checklist_check_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_checklist_order_idx" ON "_pages_v_blocks_study_in_checklist" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_checklist_parent_id_idx" ON "_pages_v_blocks_study_in_checklist" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_checklist_path_idx" ON "_pages_v_blocks_study_in_checklist" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_checklist_image_idx" ON "_pages_v_blocks_study_in_checklist" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_benefits_in_study_order_idx" ON "_pages_v_blocks_benefits_in_study" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_benefits_in_study_parent_id_idx" ON "_pages_v_blocks_benefits_in_study" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_benefits_in_study_path_idx" ON "_pages_v_blocks_benefits_in_study" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_benefits_in_study_background_image_idx" ON "_pages_v_blocks_benefits_in_study" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_notes_order_idx" ON "_pages_v_blocks_study_in_notes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_notes_parent_id_idx" ON "_pages_v_blocks_study_in_notes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_notes_path_idx" ON "_pages_v_blocks_study_in_notes" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_application_right_content_services_order_idx" ON "_pages_v_blocks_study_in_application_right_content_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_application_right_content_services_parent_id_idx" ON "_pages_v_blocks_study_in_application_right_content_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_application_order_idx" ON "_pages_v_blocks_study_in_application" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_application_parent_id_idx" ON "_pages_v_blocks_study_in_application" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_application_path_idx" ON "_pages_v_blocks_study_in_application" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_enroll_order_idx" ON "_pages_v_blocks_ielts_enroll" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_enroll_parent_id_idx" ON "_pages_v_blocks_ielts_enroll" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_enroll_path_idx" ON "_pages_v_blocks_ielts_enroll" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_prep_icon_cards_order_idx" ON "_pages_v_blocks_ielts_prep_icon_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_prep_icon_cards_parent_id_idx" ON "_pages_v_blocks_ielts_prep_icon_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_prep_icon_cards_icon_idx" ON "_pages_v_blocks_ielts_prep_icon_cards" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_prep_order_idx" ON "_pages_v_blocks_ielts_prep" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_prep_parent_id_idx" ON "_pages_v_blocks_ielts_prep" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_prep_path_idx" ON "_pages_v_blocks_ielts_prep" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_prep_background_image_idx" ON "_pages_v_blocks_ielts_prep" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_features_features_list_order_idx" ON "_pages_v_blocks_ielts_features_features_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_features_features_list_parent_id_idx" ON "_pages_v_blocks_ielts_features_features_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_features_order_idx" ON "_pages_v_blocks_ielts_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_features_parent_id_idx" ON "_pages_v_blocks_ielts_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_features_path_idx" ON "_pages_v_blocks_ielts_features" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_features_student_image_idx" ON "_pages_v_blocks_ielts_features" USING btree ("student_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_packages_packages_details_order_idx" ON "_pages_v_blocks_ielts_packages_packages_details" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_packages_packages_details_parent_id_idx" ON "_pages_v_blocks_ielts_packages_packages_details" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_packages_packages_includes_order_idx" ON "_pages_v_blocks_ielts_packages_packages_includes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_packages_packages_includes_parent_id_idx" ON "_pages_v_blocks_ielts_packages_packages_includes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_packages_packages_order_idx" ON "_pages_v_blocks_ielts_packages_packages" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_packages_packages_parent_id_idx" ON "_pages_v_blocks_ielts_packages_packages" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_packages_order_idx" ON "_pages_v_blocks_ielts_packages" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_packages_parent_id_idx" ON "_pages_v_blocks_ielts_packages" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_packages_path_idx" ON "_pages_v_blocks_ielts_packages" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_roadmap_steps_order_idx" ON "_pages_v_blocks_ielts_roadmap_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_roadmap_steps_parent_id_idx" ON "_pages_v_blocks_ielts_roadmap_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_roadmap_steps_icon_idx" ON "_pages_v_blocks_ielts_roadmap_steps" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_roadmap_order_idx" ON "_pages_v_blocks_ielts_roadmap" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_roadmap_parent_id_idx" ON "_pages_v_blocks_ielts_roadmap" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ielts_roadmap_path_idx" ON "_pages_v_blocks_ielts_roadmap" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX IF NOT EXISTS "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX IF NOT EXISTS "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX IF NOT EXISTS "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX IF NOT EXISTS "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX IF NOT EXISTS "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX IF NOT EXISTS "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX IF NOT EXISTS "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX IF NOT EXISTS "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "header_nav_items_sub_menu_order_idx" ON "header_nav_items_sub_menu" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_sub_menu_parent_id_idx" ON "header_nav_items_sub_menu" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_buttons_links_order_idx" ON "header_buttons_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_buttons_links_parent_id_idx" ON "header_buttons_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "footer_services_order_idx" ON "footer_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_services_parent_id_idx" ON "footer_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_about_order_idx" ON "footer_about" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_about_parent_id_idx" ON "footer_about" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_help_order_idx" ON "footer_help" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_help_parent_id_idx" ON "footer_help" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_legal_order_idx" ON "footer_legal" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_legal_parent_id_idx" ON "footer_legal" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_social_order_idx" ON "footer_social" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_social_parent_id_idx" ON "footer_social" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "pages_blocks_content_columns" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_archive" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages_blocks_appointment_block_left_content_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_appointment_block_right_schedule_slots" CASCADE;
  DROP TABLE "pages_blocks_appointment_block_right_universities" CASCADE;
  DROP TABLE "pages_blocks_appointment_block" CASCADE;
  DROP TABLE "pages_blocks_admission_block_statistics" CASCADE;
  DROP TABLE "pages_blocks_admission_block_courses" CASCADE;
  DROP TABLE "pages_blocks_admission_block" CASCADE;
  DROP TABLE "pages_blocks_testimonials_block_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials_block" CASCADE;
  DROP TABLE "pages_blocks_counseling_block_cards_countries" CASCADE;
  DROP TABLE "pages_blocks_counseling_block_cards" CASCADE;
  DROP TABLE "pages_blocks_counseling_block" CASCADE;
  DROP TABLE "pages_blocks_call_to_action_block_offices_phone_numbers" CASCADE;
  DROP TABLE "pages_blocks_call_to_action_block_offices" CASCADE;
  DROP TABLE "pages_blocks_call_to_action_block" CASCADE;
  DROP TABLE "pages_blocks_universities_block_stats" CASCADE;
  DROP TABLE "pages_blocks_universities_block_universities_images" CASCADE;
  DROP TABLE "pages_blocks_universities_block" CASCADE;
  DROP TABLE "pages_blocks_study_abroad_block_cards" CASCADE;
  DROP TABLE "pages_blocks_study_abroad_block" CASCADE;
  DROP TABLE "pages_blocks_ielts_block_study_modes" CASCADE;
  DROP TABLE "pages_blocks_ielts_block_features" CASCADE;
  DROP TABLE "pages_blocks_ielts_block" CASCADE;
  DROP TABLE "pages_blocks_get_started_block_features" CASCADE;
  DROP TABLE "pages_blocks_get_started_block" CASCADE;
  DROP TABLE "pages_blocks_map_block_offices" CASCADE;
  DROP TABLE "pages_blocks_map_block" CASCADE;
  DROP TABLE "pages_blocks_world_student_block_items" CASCADE;
  DROP TABLE "pages_blocks_world_student_block" CASCADE;
  DROP TABLE "pages_blocks_service_block_services" CASCADE;
  DROP TABLE "pages_blocks_service_block" CASCADE;
  DROP TABLE "pages_blocks_faq_block_faqs" CASCADE;
  DROP TABLE "pages_blocks_faq_block" CASCADE;
  DROP TABLE "pages_blocks_career_block_statistics" CASCADE;
  DROP TABLE "pages_blocks_career_block_b_text" CASCADE;
  DROP TABLE "pages_blocks_career_block" CASCADE;
  DROP TABLE "pages_blocks_whyus_media_block" CASCADE;
  DROP TABLE "pages_blocks_connect_block" CASCADE;
  DROP TABLE "pages_blocks_study_in_course" CASCADE;
  DROP TABLE "pages_blocks_study_in_checklist_check_items" CASCADE;
  DROP TABLE "pages_blocks_study_in_checklist" CASCADE;
  DROP TABLE "pages_blocks_benefits_in_study" CASCADE;
  DROP TABLE "pages_blocks_study_in_notes" CASCADE;
  DROP TABLE "pages_blocks_study_in_application_right_content_services" CASCADE;
  DROP TABLE "pages_blocks_study_in_application" CASCADE;
  DROP TABLE "pages_blocks_ielts_enroll" CASCADE;
  DROP TABLE "pages_blocks_ielts_prep_icon_cards" CASCADE;
  DROP TABLE "pages_blocks_ielts_prep" CASCADE;
  DROP TABLE "pages_blocks_ielts_features_features_list" CASCADE;
  DROP TABLE "pages_blocks_ielts_features" CASCADE;
  DROP TABLE "pages_blocks_ielts_packages_packages_details" CASCADE;
  DROP TABLE "pages_blocks_ielts_packages_packages_includes" CASCADE;
  DROP TABLE "pages_blocks_ielts_packages_packages" CASCADE;
  DROP TABLE "pages_blocks_ielts_packages" CASCADE;
  DROP TABLE "pages_blocks_ielts_roadmap_steps" CASCADE;
  DROP TABLE "pages_blocks_ielts_roadmap" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_appointment_block_left_content_paragraphs" CASCADE;
  DROP TABLE "_pages_v_blocks_appointment_block_right_schedule_slots" CASCADE;
  DROP TABLE "_pages_v_blocks_appointment_block_right_universities" CASCADE;
  DROP TABLE "_pages_v_blocks_appointment_block" CASCADE;
  DROP TABLE "_pages_v_blocks_admission_block_statistics" CASCADE;
  DROP TABLE "_pages_v_blocks_admission_block_courses" CASCADE;
  DROP TABLE "_pages_v_blocks_admission_block" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_block_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_block" CASCADE;
  DROP TABLE "_pages_v_blocks_counseling_block_cards_countries" CASCADE;
  DROP TABLE "_pages_v_blocks_counseling_block_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_counseling_block" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action_block_offices_phone_numbers" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action_block_offices" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action_block" CASCADE;
  DROP TABLE "_pages_v_blocks_universities_block_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_universities_block_universities_images" CASCADE;
  DROP TABLE "_pages_v_blocks_universities_block" CASCADE;
  DROP TABLE "_pages_v_blocks_study_abroad_block_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_study_abroad_block" CASCADE;
  DROP TABLE "_pages_v_blocks_ielts_block_study_modes" CASCADE;
  DROP TABLE "_pages_v_blocks_ielts_block_features" CASCADE;
  DROP TABLE "_pages_v_blocks_ielts_block" CASCADE;
  DROP TABLE "_pages_v_blocks_get_started_block_features" CASCADE;
  DROP TABLE "_pages_v_blocks_get_started_block" CASCADE;
  DROP TABLE "_pages_v_blocks_map_block_offices" CASCADE;
  DROP TABLE "_pages_v_blocks_map_block" CASCADE;
  DROP TABLE "_pages_v_blocks_world_student_block_items" CASCADE;
  DROP TABLE "_pages_v_blocks_world_student_block" CASCADE;
  DROP TABLE "_pages_v_blocks_service_block_services" CASCADE;
  DROP TABLE "_pages_v_blocks_service_block" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_block_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_block" CASCADE;
  DROP TABLE "_pages_v_blocks_career_block_statistics" CASCADE;
  DROP TABLE "_pages_v_blocks_career_block_b_text" CASCADE;
  DROP TABLE "_pages_v_blocks_career_block" CASCADE;
  DROP TABLE "_pages_v_blocks_whyus_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_connect_block" CASCADE;
  DROP TABLE "_pages_v_blocks_study_in_course" CASCADE;
  DROP TABLE "_pages_v_blocks_study_in_checklist_check_items" CASCADE;
  DROP TABLE "_pages_v_blocks_study_in_checklist" CASCADE;
  DROP TABLE "_pages_v_blocks_benefits_in_study" CASCADE;
  DROP TABLE "_pages_v_blocks_study_in_notes" CASCADE;
  DROP TABLE "_pages_v_blocks_study_in_application_right_content_services" CASCADE;
  DROP TABLE "_pages_v_blocks_study_in_application" CASCADE;
  DROP TABLE "_pages_v_blocks_ielts_enroll" CASCADE;
  DROP TABLE "_pages_v_blocks_ielts_prep_icon_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_ielts_prep" CASCADE;
  DROP TABLE "_pages_v_blocks_ielts_features_features_list" CASCADE;
  DROP TABLE "_pages_v_blocks_ielts_features" CASCADE;
  DROP TABLE "_pages_v_blocks_ielts_packages_packages_details" CASCADE;
  DROP TABLE "_pages_v_blocks_ielts_packages_packages_includes" CASCADE;
  DROP TABLE "_pages_v_blocks_ielts_packages_packages" CASCADE;
  DROP TABLE "_pages_v_blocks_ielts_packages" CASCADE;
  DROP TABLE "_pages_v_blocks_ielts_roadmap_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_ielts_roadmap" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_sub_menu" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_buttons_links" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_services" CASCADE;
  DROP TABLE "footer_about" CASCADE;
  DROP TABLE "footer_help" CASCADE;
  DROP TABLE "footer_legal" CASCADE;
  DROP TABLE "footer_social" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  DROP TYPE "public"."enum_pages_blocks_study_abroad_block_cards_image_position";
  DROP TYPE "public"."enum_pages_blocks_study_abroad_block_background_color";
  DROP TYPE "public"."enum_pages_blocks_ielts_packages_packages_package_color";
  DROP TYPE "public"."enum_pages_hero_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__pages_v_blocks_study_abroad_block_cards_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_study_abroad_block_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_ielts_packages_packages_package_color";
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_header_nav_items_sub_menu_link_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_buttons_links_link_type";
  DROP TYPE "public"."enum_header_buttons_links_link_appearance";
  DROP TYPE "public"."enum_footer_services_link_type";
  DROP TYPE "public"."enum_footer_about_link_type";
  DROP TYPE "public"."enum_footer_help_link_type";
  DROP TYPE "public"."enum_footer_legal_link_type";
  DROP TYPE "public"."enum_footer_social_link_type";`)
}
