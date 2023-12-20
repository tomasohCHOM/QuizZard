<script lang="ts">
	import "../../app.css";
	import ProgressBar from "./progress-bar.svelte";

	export let questionNumber: number;
	export let questionPrompt: string;
	export let answers: string[];
	export let correct: string;
	export let answerSelected: boolean = false;
	export let correctAnswers: boolean[] | null[];

	function answerClicked(answer: string) {
		answerSelected = true;
		correctAnswers[questionNumber] = answer === correct;
	}
</script>

<section class="p-10 md:p-20">
	<div
		class="mb-8 flex flex-col items-center justify-center rounded-xl border-2 border-color-contrast p-8 text-color-contrast"
	>
		<h2 class="text-2xl font-semibold">Question #{questionNumber + 1}</h2>
		<p>{questionPrompt}</p>
	</div>

	<div class="grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 md:gap-8">
		{#each answers as answer}
			<button
				class="cursor-pointer rounded-xl border-2 border-color-contrast p-4 font-semibold text-color-contrast transition hover:bg-color-secondary {answerSelected
					? answer === correct
						? 'bg-green-500 hover:bg-green-500/90'
						: 'bg-red-400 hover:bg-red-400/90'
					: ''} {answerSelected ? 'border-color-secondary text-slate-50' : ''}"
				on:click={() => answerClicked(answer)}
			>
				{answer}
			</button>
		{/each}
	</div>

	<slot name="buttons" />
</section>
