<template>
	<div class="flex h-screen flex-1 flex-col">
		<AppHeader />
		<main class="flex-grow p-4">
			<slot />
		</main>
		<AppFooter />
	</div>
</template>
