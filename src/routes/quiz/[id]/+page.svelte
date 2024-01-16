<script lang="ts">
	import type { QuestionSet } from "$lib/shared";
	import type { PageServerData } from "./$types";
	import QuizEnd from "$lib/components/quiz-end.svelte";
	import QuizSet from "$lib/components/quiz-set.svelte";

	export let data: PageServerData;

	let questionSet: QuestionSet[] = data;

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
