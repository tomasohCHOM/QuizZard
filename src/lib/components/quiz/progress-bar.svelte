<script lang="ts">
	export let correctAnswers: boolean[] | null[];
	export let questionNumber: number;
	export let hideAnswers: boolean;
</script>

<div class="mb-8 flex h-6 gap-1 overflow-hidden">
	{#each correctAnswers as isCorrect, num}
		{#if isCorrect == null}
			<div
				class="flex-1 rounded-xl {num === questionNumber
					? 'bg-contrast_muted'
					: 'bg-secondary'} transition"
			/>
		{:else}
			<div
				class="flex-1 rounded-xl text-slate-50 {hideAnswers
					? 'bg-contrast'
					: isCorrect
						? 'bg-green-500'
						: 'bg-red-400'} transition"
			/>
		{/if}
	{/each}
</div>
