<script lang="ts">
	import type { QuestionSet } from "$lib/shared";
	import ProgressBar from "./progress-bar.svelte";
	import Question from "./question.svelte";

	export let questionSet: QuestionSet[];

	let questionNumber = 0;
	let answerSelected = false;
	let correctAnswers: boolean[] | null[] = new Array(questionSet.length).fill(null);
</script>

<div>
	<Question
		{questionNumber}
		questionPrompt={questionSet[questionNumber].prompt}
		answers={questionSet[questionNumber].answers}
		correct={questionSet[questionNumber].correctAnswer}
		bind:answerSelected
		bind:correctAnswers
	>
		<div class="mt-4" slot="buttons">
			{#if questionNumber > 0}
				<button
					class="border-contrast text-contrast hover:bg-secondary float-left rounded-lg border-2 px-6 py-3 font-semibold transition"
					on:click={() => {
						questionNumber--;
						answerSelected = false;
					}}>Previous</button
				>
			{/if}

			{#if questionNumber < questionSet.length - 1}
				<button
					class="border-contrast text-contrast hover:bg-secondary float-right rounded-lg border-2 px-6 py-3 font-semibold transition"
					on:click={() => {
						questionNumber++;
						answerSelected = false;
					}}>Next</button
				>
			{/if}
		</div>
	</Question>

	<ProgressBar bind:correctAnswers />
</div>
