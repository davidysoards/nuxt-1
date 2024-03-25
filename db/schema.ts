import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const todo = sqliteTable('todo', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	text: text('text').notNull(),
	done: integer('done', { mode: 'boolean' }).default(false).notNull(),
});

export type TodoInsert = typeof todo.$inferInsert;
