DROP TABLE `advances`;--> statement-breakpoint
DROP TABLE `attendances`;--> statement-breakpoint
DROP TABLE `claims`;--> statement-breakpoint
DROP TABLE `schedules`;--> statement-breakpoint
DROP TABLE `settings`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_employees` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`employee_id` text NOT NULL,
	`last_name` text NOT NULL,
	`first_name` text NOT NULL,
	`middle_initial` text NOT NULL,
	`position` text NOT NULL,
	`rate` real NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_employees`("id", "employee_id", "last_name", "first_name", "middle_initial", "position", "rate") SELECT "id", "employee_id", "last_name", "first_name", "middle_initial", "position", "rate" FROM `employees`;--> statement-breakpoint
DROP TABLE `employees`;--> statement-breakpoint
ALTER TABLE `__new_employees` RENAME TO `employees`;--> statement-breakpoint
PRAGMA foreign_keys=ON;