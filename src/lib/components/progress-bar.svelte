<script lang="ts">
	export let correctAnswers: boolean[] | null[];
</script>

<div class="z-10 mx-10 flex h-4 overflow-hidden rounded-lg border-2 border-color-contrast md:mx-20">
	{#each correctAnswers as isCorrect}
		{#if isCorrect == null}
			<div class="flex-1" />
		{:else}
			<div class="flex-1 {isCorrect ? 'bg-green-500' : 'bg-red-400'} transition" />
		{/if}
	{/each}
</div>
