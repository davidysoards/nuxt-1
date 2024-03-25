import { eq } from 'drizzle-orm';
import { db } from '@/db/drizzle';
import { todo } from '@/db/schema';

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	if (!id) throw new Error('Missing id');
	const [model] = await db
		.delete(todo)
		.where(eq(todo.id, parseInt(id)))
		.returning();
	return model;
});
