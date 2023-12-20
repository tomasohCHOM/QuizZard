<script lang="ts">
	export let questionSetSize: number;
</script>

<div class="z-10 mx-10 flex h-4 overflow-hidden rounded-lg border-2 border-color-contrast md:mx-20">
	{#each Array.from(Array(questionSetSize)) as _}
		<div class="flex-1 {Math.random() > 0.5 ? 'bg-red-400' : 'bg-green-500'}" />
	{/each}
</div>
