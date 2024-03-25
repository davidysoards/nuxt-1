<script setup lang="ts">
const emit = defineEmits<{
	add: [text: string];
}>();

const input = ref('');

function handleAdd() {
	if (input.value === '') return;

	emit('add', input.value);
	input.value = '';
}
</script>

<template>
	<div class="mt-2 flex w-full gap-1">
		<input
			v-model.trim="input"
			type="text"
			class="w-full rounded border border-gray-200 px-2 py-1 outline-none"
		/>
		<button
			class="flex h-9 w-14 items-center justify-center rounded bg-green-600 px-2 py-1 text-green-50"
			@click="handleAdd"
		>
			Add
		</button>
	</div>
</template>
