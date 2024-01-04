<script lang="ts">
	import type { QuestionSet } from "$lib/shared";
	import ProgressBar from "./progress-bar.svelte";
	import Question from "./question.svelte";

	export let questionSet: QuestionSet[];
	export let correctAnswers: boolean[] | null[];
	export let answerChoices: string[] | null[];
	export let isFinished: boolean;
	export let totalTime: number;
	export let correctAnswerCount: number;

	let questionNumber = 0;
	let answerSelected = false;

	let startTime = performance.now();
	let endTime: number | null;

	function calculateFinalResults() {
		isFinished = true;
		endTime = performance.now();
		totalTime = Math.round((endTime - startTime) / 1000);

		correctAnswers.forEach((isCorrect) => {
			if (isCorrect) correctAnswerCount++;
		});
	}
</script>

<Question
	{questionNumber}
	questionPrompt={questionSet[questionNumber].prompt}
	answers={questionSet[questionNumber].answers}
	correct={questionSet[questionNumber].correctAnswer}
	bind:answerSelected
	bind:correctAnswers
	bind:answerChoices
>
	<div class="mt-4 flex flex-row-reverse justify-between" slot="buttons">
		{#if questionNumber === questionSet.length - 1}
			<button
				class="rounded-lg border-2 border-contrast px-6 py-3 font-semibold text-contrast transition hover:bg-secondary"
				on:click={calculateFinalResults}>Finish</button
			>
		{/if}
		{#if questionNumber < questionSet.length - 1}
			<button
				class="rounded-lg border-2 border-contrast px-6 py-3 font-semibold text-contrast transition hover:bg-secondary"
				on:click={() => {
					questionNumber++;
					answerSelected = false;
				}}>Next</button
			>
		{/if}
		{#if questionNumber > 0}
			<button
				class="rounded-lg border-2 border-contrast px-6 py-3 font-semibold text-contrast transition hover:bg-secondary"
				on:click={() => {
					questionNumber--;
					answerSelected = false;
				}}>Previous</button
			>
		{/if}
	</div>
</Question>

<ProgressBar bind:correctAnswers />
