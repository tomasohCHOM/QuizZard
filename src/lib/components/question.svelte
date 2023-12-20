<script lang="ts">
	import "../../app.css";

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
		class="bg-secondary text-contrast mb-8 flex flex-col items-center justify-center rounded-xl border-white p-8 shadow-md data-[theme=dark]:border-2"
	>
		<h2 class="text-2xl font-semibold">Question #{questionNumber + 1}</h2>
		<p>{questionPrompt}</p>
	</div>

	<div class="grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 md:gap-8">
		{#each answers as answer}
			<button
				class="text-contrast bg-secondary cursor-pointer rounded-xl p-4 font-semibold shadow-md transition hover:bg-opacity-90 {answerSelected
					? answer === correct
						? 'bg-green-500 hover:opacity-90'
						: 'bg-red-400 hover:opacity-90'
					: ''} {answerSelected ? 'text-slate-50' : ''}"
				on:click={() => answerClicked(answer)}
			>
				{answer}
			</button>
		{/each}
	</div>

	<slot name="buttons" />
</section>
