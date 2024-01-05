<script lang="ts">
	import "../../app.css";
	import type { QuestionSet } from "$lib/shared";
	import QUESTION_LIST from "$lib/questions/sample";
	import QuizEnd from "$lib/components/quiz-end.svelte";
	import QuizSet from "$lib/components/quiz-set.svelte";

	const questionSet: QuestionSet[] = QUESTION_LIST.map((question) => {
		const answers = [question.correctAnswer, ...question.incorrectAnswers].sort(
			() => Math.random() - 0.5
		);
		return { ...question, answers };
	});

	let correctAnswers: boolean[] | null[] = new Array(questionSet.length).fill(null);
	let answerChoices: string[] | null[] = new Array(questionSet.length).fill(null);
	let correctAnswerCount = 0;

	let totalTime: number = 0;

	// Represents whether the user is done with the quiz or not
	let isFinished = false;
	$: finalPercentage = 100 * (correctAnswerCount / questionSet.length);
</script>

<section class="md:p-10">
	{#if isFinished}
		<QuizEnd
			{questionSet}
			{correctAnswers}
			{answerChoices}
			{finalPercentage}
			{correctAnswerCount}
			{totalTime}
		/>
	{:else}
		<QuizSet
			{questionSet}
			bind:correctAnswers
			bind:answerChoices
			bind:isFinished
			bind:correctAnswerCount
			bind:totalTime
		/>
	{/if}
</section>
