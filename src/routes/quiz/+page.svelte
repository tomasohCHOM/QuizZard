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
</script>


<div class="p-10 md:p-20">
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
					>Finish</button
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
</div>
