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

	// Represents whether the user is done with the quiz or not
	let isFinished = false;

	function calculateFinalResults() {
		isFinished = true;
		correctAnswers.forEach((isCorrect) => {
			if (isCorrect) correctAnswerCount++;
		});
	}
</script>

<div class="p-10 md:p-20">
	{#if isFinished}
		<div class="flex gap-4 rounded-lg border-contrast p-4 group-data-[theme='dark']:border-2">
			<div class="h-36 w-36 rounded-[50%] bg-contrast" />
			<div>{correctAnswerCount} out of {questionSet.length} correct</div>
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
</div>
