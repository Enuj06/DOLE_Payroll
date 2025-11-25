CREATE TABLE `settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL
);
--> statement-breakpoint
ALTER TABLE `advances` ADD `reason` text NOT NULL;