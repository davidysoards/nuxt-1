<script setup lang="ts">
import type { TodoInsert } from '~/db/schema';

const { data: todoItems } = await useFetch<Required<TodoInsert>[]>('/api/todos');

async function createTodo(text: string) {
	try {
		const newTodo = await $fetch(`/api/todos/`, {
			method: 'POST',
			body: { text },
		});
		todoItems.value?.push(newTodo);
	} catch (err) {
		console.log(err);
	}
}
async function updateTodo(todo: TodoInsert) {
	try {
		const updatedTodo = await $fetch(`/api/todos/${todo.id}`, {
			method: 'PUT',
			body: todo,
		});
		todoItems.value =
			todoItems.value?.map((item) => (item.id === todo.id ? updatedTodo : item)) ?? [];
	} catch (err) {
		console.log(err);
	}
}
async function deleteTodo(id: number) {
	try {
		await $fetch(`/api/todos/${id}`, {
			method: 'DELETE',
		});
		todoItems.value = todoItems.value?.filter((item) => item.id !== id) ?? [];
	} catch (err) {
		console.log(err);
	}
}
</script>
]
<template>
	<div>
		<h1 class="mb-4 text-3xl font-bold">Todos</h1>
		<div className="w-full flex flex-col mt-8 gap-2">
			<TodoItem
				v-for="todo in todoItems"
				:key="todo.id"
				:todo="todo"
				@update:done="updateTodo({ ...todo, done: $event })"
				@update:text="updateTodo({ ...todo, text: $event })"
				@delete="deleteTodo($event)"
			/>
		</div>
		<AddTodo @add="createTodo" />
	</div>
</template>
