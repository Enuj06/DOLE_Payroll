CREATE TABLE `attendances` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`am_in` text,
	`am_out` text,
	`pm_in` text,
	`pm_out` text,
	`ot_in` text,
	`ot_out` text,
	`employee_id` integer NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
