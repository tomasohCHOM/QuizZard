<script lang="ts">
	export let correctAnswers: boolean[] | null[];
</script>

<div
	class="z-10 mx-10 flex h-6 overflow-hidden rounded-xl bg-secondary group-data-[theme='dark']:border-2 md:mx-20"
>
	{#each correctAnswers as isCorrect, num}
		{#if isCorrect == null}
			<div class="flex flex-1 items-center justify-center">
				{num + 1}
			</div>
		{:else}
			<div
				class="flex flex-1 items-center justify-center text-slate-50 {isCorrect
					? 'bg-green-500'
					: 'bg-red-400'} transition"
			>
				{num + 1}
			</div>
		{/if}
	{/each}
</div>
