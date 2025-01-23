<script lang="ts">
	import { fly } from "svelte/transition";
	import "../../../app.css";

	export let questionNumber: number;
	export let previousQuestionNumber: number;
	export let questionPrompt: string;
	export let answers: string[];
	export let correct: string;
	export let answerSelected: boolean = false;
	export let correctAnswers: boolean[] | null[];
	export let answerChoices: string[] | null[];
	export let hideAnswers: boolean;

	function answerClicked(answer: string) {
		answerSelected = true;
		if (answerChoices[questionNumber]) return;
		correctAnswers[questionNumber] = answer === correct;
		answerChoices[questionNumber] = answer;
	}
</script>

<section>
	{#key questionNumber}
		<div
			in:fly={{
				x: questionNumber > previousQuestionNumber ? 40 : -40,
				duration: 250
			}}
		>
			<div
				class="mb-4 flex flex-col items-center justify-center rounded-xl bg-contrast_muted px-4 py-8 text-contrast shadow-md"
			>
				<h2 class="text-2xl font-semibold">Question #{questionNumber + 1}</h2>
				<p class="text-center">{questionPrompt}</p>
			</div>

			<div class="grid grid-cols-1 items-center justify-center gap-2 sm:grid-cols-2">
				{#each answers as answer}
					<button
						class="theme-opacity h-20 cursor-pointer rounded-xl p-4 font-semibold text-contrast shadow-md transition md:h-24
            {answerChoices[questionNumber]
							? answer === correct
								? 'bg-green-500'
								: 'bg-red-400'
							: ''} {answerChoices[questionNumber]
							? 'pointer-events-none text-slate-50'
							: 'bg-secondary'}"
						on:click={() => answerClicked(answer)}
					>
						{answer}
					</button>
				{/each}
			</div>
		</div>
	{/key}

	<slot name="buttons" />
</section>
