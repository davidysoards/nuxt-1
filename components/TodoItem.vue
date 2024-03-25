<script setup lang="ts">
import type { TodoInsert } from '~/db/schema';

const props = defineProps<{
	todo: TodoInsert;
}>();

const emit = defineEmits<{
	'update:text': [text: string];
	'update:done': [done: boolean];
	delete: [id: number];
}>();

const isEditing = ref(false);
const innerText = ref(props.todo.text);

function handleSave() {
	emit('update:text', innerText.value);
	isEditing.value = false;
}
function handleCancel() {
	innerText.value = props.todo.text;
	isEditing.value = false;
}

function handleDelete() {
	if (confirm('Are you sure you want to delete this todo?')) {
		emit('delete', props.todo.id!);
	}
}
</script>

<template>
	<div class="flex items-center gap-2 rounded-lg border border-solid border-gray-200 p-4">
		<input
			:checked="props.todo.done"
			type="checkbox"
			class="h-4 w-4 rounded-sm text-blue-200"
			@change="emit('update:done', !props.todo.done)"
		/>

		<input
			v-model="innerText"
			type="text"
			:readOnly="!isEditing"
			:class="[
				props.todo.done && 'line-through',
				'w-full rounded border border-gray-200 px-2 py-1 outline-none read-only:border-transparent',
			]"
		/>

		<div class="ml-auto flex gap-1">
			<button
				v-if="isEditing"
				class="w-14 rounded bg-green-600 px-2 py-1 text-green-50"
				@click="handleSave"
			>
				Save
			</button>
			<button
				v-else
				class="w-14 rounded bg-blue-400 px-2 py-1 text-blue-50"
				@click="isEditing = true"
			>
				Edit
			</button>

			<button
				v-if="isEditing"
				className="bg-red-400 w-16 text-red-50 rounded px-2 py-1"
				@click="handleCancel"
			>
				Cancel
			</button>
			<button v-else class="w-16 rounded bg-red-400 px-2 py-1 text-red-50" @click="handleDelete">
				Delete
			</button>
		</div>
	</div>
</template>
