<script lang="ts">
	import type { PageServerData } from "./$types";
	import QuizEnd from "$lib/components/quiz/results/quiz-end.svelte";
	import QuizSet from "$lib/components/quiz/quiz-set.svelte";
	import type { QuestionSet } from "$lib/shared";

	export let data: PageServerData;

	let questionSet: QuestionSet[] = data.questionSet.map((question) => {
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

<section class="mx-auto max-w-4xl md:p-6">
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
			bind:questionSet
			bind:correctAnswers
			bind:answerChoices
			bind:isFinished
			bind:correctAnswerCount
			bind:totalTime
		/>
	{/if}
</section>
