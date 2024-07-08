<script lang="ts">
	import type { QuestionSet } from "$lib/shared";
	import Icon from "@iconify/svelte";
	import ProgressRing from "./progress-ring.svelte";
	import { fly } from "svelte/transition";

	export let quizName: string;
	export let questionSet: QuestionSet[];
	export let correctAnswers: boolean[] | null[];
	export let answerChoices: string[] | null[];
	export let finalPercentage: number;
	export let correctAnswerCount: number;
	export let totalTime: number;
	export let quizId: string;

	let questionNumber: number = 0;
	let previousQuestionNumber: number = 0;
	$: question = questionSet[questionNumber];
</script>

<h1 class="text-xl font-semibold md:text-2xl">Results for {quizName}</h1>

<section class="mt-4 flex flex-col gap-8">
	<div
		class="flex min-w-max flex-col gap-4 self-start rounded-lg bg-secondary p-6 shadow-md md:flex-row md:gap-8 md:p-8"
	>
		<ProgressRing bind:percentage={finalPercentage} />
		<div>
			<h3 class="text-lg font-semibold md:text-xl">Number of Correct Answers:</h3>
			<p>{correctAnswerCount} out of {questionSet.length} correct</p>
			<h3 class="mt-4 text-lg font-semibold md:text-xl">Total Time:</h3>
			<p>{totalTime} seconds</p>
		</div>
	</div>

	{#key questionNumber}
		<div
			in:fly={{
				x: questionNumber > previousQuestionNumber ? 40 : -40,
				duration: 250
			}}
			class="flex flex-col gap-4"
		>
			<div class="rounded-lg bg-contrast_muted p-8 text-center font-medium">
				<span class="font-semibold">Question #{questionNumber + 1}:</span>
				{question.prompt}
				{#if correctAnswers[questionNumber] == null}
					<span class="font-semibold">Not answered.</span>
				{:else if correctAnswers[questionNumber]}
					<span class="font-semibold text-green-500">Correct!</span>
				{:else}
					<span class="font-semibold text-red-400">Incorrect!</span>
				{/if}
			</div>
			<div class="grid grid-cols-1 gap-2 rounded-md sm:grid-cols-2">
				{#each question.answers as answer}
					<div
						class="flex items-center justify-center rounded-lg bg-secondary p-4 text-center font-medium"
					>
						{answer}
						{#if answer === question.correctAnswer}
							<span class="ml-2 text-green-500">
								<Icon inline class="inline" icon="mdi:tick" />
							</span>
						{:else if !correctAnswers[questionNumber] && answerChoices[questionNumber] === answer}
							<span class="ml-2 text-red-400">
								<Icon inline class="inline" icon="mdi:close" />
							</span>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/key}

	<div class="flex items-center justify-between">
		<button
			class="quiz-btn mr-auto max-w-min p-0 {questionNumber > 0 ? '' : 'invisible'}"
			on:click|preventDefault={() => {
				previousQuestionNumber = questionNumber;
				questionNumber--;
			}}
		>
			<Icon icon="ci:chevron-left-md" width={40} />
		</button>
		<span class="mx-auto text-sm">{questionNumber + 1}/{questionSet.length}</span>
		<button
			class="quiz-btn ml-auto max-w-min p-0 {questionNumber < questionSet.length - 1
				? ''
				: 'invisible'}"
			on:click|preventDefault={() => {
				previousQuestionNumber = questionNumber;
				questionNumber++;
			}}
		>
			<Icon icon="ci:chevron-right-md" width={40} />
		</button>
	</div>
</section>

<div class="mt-8 flex flex-row justify-between">
	<a href="/" class="quiz-btn">Go Back Home</a>
	<a data-sveltekit-reload href="/quiz/{quizId}" class="quiz-btn-contrast">Play Again</a>
</div>
