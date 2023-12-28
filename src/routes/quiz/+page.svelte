<script lang="ts">
	import "../../app.css";
	import type { QuestionSet } from "$lib/shared";
	import QUESTION_LIST from "$lib/questions/sample";
	import Question from "$lib/components/question.svelte";
	import ProgressBar from "$lib/components/progress-bar.svelte";

	const questionSet: QuestionSet[] = QUESTION_LIST.map((question) => {
		const answers = [question.correctAnswer, ...question.incorrectAnswers].sort(
			() => Math.random() - 0.5
		);
		return { ...question, answers };
	});

	let questionNumber = 0;
	let answerSelected = false;
	let correctAnswers: boolean[] | null[] = new Array(questionSet.length).fill(null);
	let correctAnswerCount = 0;

	let startTime = performance.now();
	let endTime: number | null;
	let totalTime: number = 0;

	// Represents whether the user is done with the quiz or not
	let isFinished = false;
	$: finalPercentage = 100 * (correctAnswerCount / questionSet.length);

	function calculateFinalResults() {
		isFinished = true;
		endTime = performance.now();
		console.log(startTime, endTime);
		totalTime = Math.round((endTime - startTime) / 1000);

		correctAnswers.forEach((isCorrect) => {
			if (isCorrect) correctAnswerCount++;
		});
	}
</script>

<section class="p-10 md:p-20">
	{#if isFinished}
		<h2 class="text-2xl font-semibold md:text-3xl">Results</h2>
		<div
			class="mt-4 flex max-w-max flex-col gap-4 rounded-lg border-contrast bg-secondary p-6 shadow-md group-data-[theme='dark']:border-2 md:flex-row md:gap-8 md:p-8"
		>
			<div
				class="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-2 border-contrast bg-contrast"
			>
				<div
					class="z-10 flex h-32 w-32 items-center justify-center rounded-full border-2 border-contrast bg-secondary text-xl font-semibold"
				>
					{finalPercentage}%
				</div>
			</div>
			<div>
				<h3 class="text-lg font-semibold md:text-xl">Number of Correct Answers:</h3>
				<p>{correctAnswerCount} out of {questionSet.length} correct</p>
				<h3 class="mt-4 text-lg font-semibold md:text-xl">Total Time:</h3>
				<p>{totalTime} seconds</p>
			</div>
		</div>

		<div class="mt-8 flex flex-row justify-between">
			<a
				href="/"
				class="rounded-lg border-2 border-contrast px-6 py-3 font-semibold text-contrast transition hover:bg-secondary"
				>Go Home</a
			>
		</div>
	{:else}
		<Question
			{questionNumber}
			questionPrompt={questionSet[questionNumber].prompt}
			answers={questionSet[questionNumber].answers}
			correct={questionSet[questionNumber].correctAnswer}
			bind:answerSelected
			bind:correctAnswers
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
			</div></Question
		>

		<ProgressBar bind:correctAnswers />
	{/if}
</section>
