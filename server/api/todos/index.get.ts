import { asc } from 'drizzle-orm';
import { db } from '@/db/drizzle';
import { todo } from '@/db/schema';

export default defineEventHandler(async () => {
	const data = await db.select().from(todo).orderBy(asc(todo.id));
	return data;
});
