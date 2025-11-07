DROP TABLE `positions`;--> statement-breakpoint
ALTER TABLE `employees` ADD `position` text NOT NULL;--> statement-breakpoint
ALTER TABLE `employees` ADD `rate` real NOT NULL;