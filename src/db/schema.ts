import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { eq, sql } from 'drizzle-orm';
import { db } from 'hottake/db/index';

export const hotTakeGameTable = sqliteTable('hot_take_game', {
  id: integer('id').primaryKey(),
  created_at: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  title: text('title').notNull(),
  voting_live_at: text('voting_live_at'),
  completed_at: text('completed_at'),
});

export const hotTakeTable = sqliteTable('hot_take', {
  id: integer('id').primaryKey(),
  created_at: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  hot_take: text('hot_take').notNull(),
  full_name: text('full_name').notNull(),
  hot_take_game_id: integer('hot_take_game_id')
    .references(() => hotTakeGameTable.id)
    .notNull(),
});

export const voteTable = sqliteTable('vote', {
  id: integer('id').primaryKey(),
  created_at: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  hot_take_id: integer('hot_take_id')
    .references(() => hotTakeTable.id)
    .notNull(),
  hot_take_game_id: integer('hot_take_game_id')
    .references(() => hotTakeGameTable.id)
    .notNull(),
  full_name_voter: text('full_name_voter').notNull(),
  full_name_guess: text('full_name_guess').notNull(),
});

export async function getHotTakes(game_id: number) {
  return db
    .select()
    .from(hotTakeTable)
    .where(eq(hotTakeTable.hot_take_game_id, game_id));
}

export async function getVotes(game_id: number) {
  return db
    .select()
    .from(voteTable)
    .where(eq(voteTable.hot_take_game_id, game_id));
}
