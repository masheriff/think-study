import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_study_in_notes" CASCADE;
  DROP TABLE "_pages_v_blocks_study_in_notes" CASCADE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_study_in_notes" ADD CONSTRAINT "pages_blocks_study_in_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_study_in_notes" ADD CONSTRAINT "_pages_v_blocks_study_in_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_notes_order_idx" ON "pages_blocks_study_in_notes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_notes_parent_id_idx" ON "pages_blocks_study_in_notes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_study_in_notes_path_idx" ON "pages_blocks_study_in_notes" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_notes_order_idx" ON "_pages_v_blocks_study_in_notes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_notes_parent_id_idx" ON "_pages_v_blocks_study_in_notes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_study_in_notes_path_idx" ON "_pages_v_blocks_study_in_notes" USING btree ("_path");`)
}
