import { eq } from 'drizzle-orm';
import { db } from '@/db/drizzle';
import { todo, TodoInsert } from '@/db/schema';

export default defineEventHandler<{ body: TodoInsert }>(async (event) => {
	const id = getRouterParam(event, 'id');
	if (!id) throw new Error('Missing id');
	const { text, done } = await readBody(event);
	const [model] = await db
		.update(todo)
		.set({ text, done })
		.where(eq(todo.id, parseInt(id)))
		.returning();
	return model;
});
