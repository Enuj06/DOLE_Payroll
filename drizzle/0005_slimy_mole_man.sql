CREATE TABLE `schedules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`am_in` text NOT NULL,
	`am_out` text NOT NULL,
	`pm_in` text NOT NULL,
	`pm_out` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `employees` ADD `schedule_id` integer REFERENCES schedules(id);