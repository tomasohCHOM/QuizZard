<script lang="ts">
	import type { QuestionSet } from "$lib/shared";
	import Question from "./question.svelte";

	export let questionSet: QuestionSet[];
</script>

{#each questionSet as question, i}
	<Question
		questionNumber={i + 1}
		questionPrompt={question.prompt}
		answers={question.answers}
		correct={question.correctAnswer}
	/>
{/each}
