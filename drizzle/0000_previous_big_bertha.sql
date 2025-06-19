CREATE TABLE `hot_take_game` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`title` text NOT NULL,
	`voting_live_at` text,
	`completed_at` text
);
--> statement-breakpoint
CREATE TABLE `hot_take` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`hot_take` text NOT NULL,
	`full_name` text,
	`hot_take_game_id` integer NOT NULL,
	FOREIGN KEY (`hot_take_game_id`) REFERENCES `hot_take_game`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `vote` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`hot_take_id` integer NOT NULL,
	`hot_take_game_id` integer NOT NULL,
	`full_name_voter` text NOT NULL,
	`full_name_guess` text NOT NULL,
	FOREIGN KEY (`hot_take_id`) REFERENCES `hot_take`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`hot_take_game_id`) REFERENCES `hot_take_game`(`id`) ON UPDATE no action ON DELETE no action
);
