import { db } from '@/db/drizzle';
import { todo, TodoInsert } from '@/db/schema';

export default defineEventHandler<{ body: TodoInsert }>(async (event) => {
	const { text } = await readBody(event);
	const [model] = await db.insert(todo).values({ text }).returning();
	return model;
});
