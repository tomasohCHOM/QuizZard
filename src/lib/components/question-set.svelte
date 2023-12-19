<script lang="ts">
	import type { QuestionSet } from "$lib/shared";
	import Question from "./question.svelte";

	export let questionSet: QuestionSet[];

	let questionNumber = 0;
	let answerSelected = false;
</script>

<Question
	{questionNumber}
	questionPrompt={questionSet[questionNumber].prompt}
	answers={questionSet[questionNumber].answers}
	correct={questionSet[questionNumber].correctAnswer}
	bind:answerSelected
>
	<div class="mt-4" slot="buttons">
		{#if questionNumber > 0}
			<button
				class="border-color-contrast text-color-contrast float-left rounded-lg border-2 px-6 py-3"
				on:click={() => {
					questionNumber--;
					answerSelected = false;
				}}>Previous</button
			>
		{/if}

		{#if questionNumber < questionSet.length - 1}
			<button
				class="border-color-contrast text-color-contrast float-right rounded-lg border-2 px-6 py-3"
				on:click={() => {
					questionNumber++;
					answerSelected = false;
				}}>Next</button
			>
		{/if}
	</div>
</Question>
