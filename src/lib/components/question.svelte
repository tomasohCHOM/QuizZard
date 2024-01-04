<script lang="ts">
	import "../../app.css";

	export let questionNumber: number;
	export let questionPrompt: string;
	export let answers: string[];
	export let correct: string;
	export let answerSelected: boolean = false;
	export let correctAnswers: boolean[] | null[];
	export let answerChoices: string[] | null[];

	function answerClicked(answer: string) {
		answerSelected = true;
		correctAnswers[questionNumber] = answer === correct;
		answerChoices[questionNumber] = answer;
	}
</script>

<section>
	<div
		class="mb-8 flex flex-col items-center justify-center rounded-xl border-white bg-secondary p-8 text-contrast shadow-md group-data-[theme='dark']:border-2"
	>
		<h2 class="text-2xl font-semibold">Question #{questionNumber + 1}</h2>
		<p>{questionPrompt}</p>
	</div>

	<div class="grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 md:gap-8">
		{#each answers as answer}
			<button
				class="cursor-pointer rounded-xl p-4 font-semibold text-contrast shadow-md transition hover:opacity-80 group-data-[theme='dark']:border-2 {answerSelected
					? answer === correct
						? 'bg-green-500'
						: 'bg-red-400'
					: ''} {answerSelected ? 'text-slate-50' : 'bg-secondary'}"
				on:click={() => answerClicked(answer)}
			>
				{answer}
			</button>
		{/each}
	</div>

	<slot name="buttons" />
</section>
