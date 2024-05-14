<script lang="ts">
	import type { PageServerData } from "./$types";
	import QuizEnd from "$lib/components/quiz/results/quiz-end.svelte";
	import QuizSet from "$lib/components/quiz/quiz-set.svelte";
	import type { QuestionSet } from "$lib/shared";
	import { fly } from "svelte/transition";

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
	$: finalPercentage = Number((100 * (correctAnswerCount / questionSet.length)).toFixed(2));
</script>

<section class="mx-auto max-w-4xl md:p-6">
	{#if isFinished}
		<div in:fly={{ y: 40, duration: 300, delay: 150 }}>
			<QuizEnd
				quizId={data.quizId}
				quizName={data.quizName}
				{questionSet}
				{correctAnswers}
				{answerChoices}
				{finalPercentage}
				{correctAnswerCount}
				{totalTime}
			/>
		</div>
	{:else}
		<QuizSet
			quizName={data.quizName}
			bind:questionSet
			bind:correctAnswers
			bind:answerChoices
			bind:isFinished
			bind:correctAnswerCount
			bind:totalTime
		/>
	{/if}
</section>
