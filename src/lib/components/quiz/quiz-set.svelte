<script lang="ts">
	import type { QuestionSet } from "$lib/shared";
	import PopupContainer from "../popup-container.svelte";
	import ProgressBar from "./progress-bar.svelte";
	import Question from "./question.svelte";

	export let quizName: string;
	export let questionSet: QuestionSet[];
	export let correctAnswers: boolean[] | null[];
	export let answerChoices: string[] | null[];
	export let isFinished: boolean;
	export let totalTime: number;
	export let correctAnswerCount: number;
	export let quitWindowOpen: boolean;
	export let hideAnswers: boolean;

	let questionNumber = 0;
	let previousQuestionNumber = 0;
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

<div class="mb-4 flex flex-col-reverse justify-between gap-2 sm:flex-row sm:items-center">
	<h1 class="text-xl font-semibold md:text-2xl">{quizName}</h1>
	<button
		on:click={() => (quitWindowOpen = true)}
		class="quiz-btn w-max border-2 border-red-400 px-4 py-1 text-red-400 sm:px-6 sm:py-2"
	>
		Quit
	</button>
</div>

<ProgressBar bind:correctAnswers {questionNumber} {hideAnswers} />

<Question
	{questionNumber}
	{previousQuestionNumber}
	questionPrompt={questionSet[questionNumber].prompt}
	answers={questionSet[questionNumber].answers}
	correct={questionSet[questionNumber].correctAnswer}
	bind:answerSelected
	bind:correctAnswers
	bind:answerChoices
	{hideAnswers}
>
	<div class="mt-4 flex flex-row-reverse justify-between" slot="buttons">
		{#if questionNumber === questionSet.length - 1}
			<button class="quiz-btn-contrast" on:click={calculateFinalResults}>Finish</button>
		{/if}
		{#if questionNumber < questionSet.length - 1}
			<button
				class="quiz-btn"
				on:click={() => {
					previousQuestionNumber = questionNumber;
					questionNumber++;
					answerSelected = false;
				}}>Next</button
			>
		{/if}
		{#if questionNumber > 0}
			<button
				class="quiz-btn"
				on:click={() => {
					previousQuestionNumber = questionNumber;
					questionNumber--;
					answerSelected = false;
				}}>Previous</button
			>
		{/if}
	</div>
</Question>

<PopupContainer bind:isOpen={quitWindowOpen}>
	<div>
		<p class="font-medium">Are you sure you want to quit?</p>
		<div class="mt-4 flex items-center justify-center gap-2">
			<a href="/" class="quiz-btn w-max bg-red-400 text-sm text-slate-50"> Yes, exit quiz </a>
			<button on:click={() => (quitWindowOpen = false)} class="quiz-btn w-max text-sm">
				No, Nevermind
			</button>
		</div>
	</div>
</PopupContainer>
