<script lang="ts">
	import "../app.css";
	import QUESTION_LIST from "$lib/questions/sample";
	import QuestionSet from "$lib/components/question-set.svelte";

	const RANDOMIZED_ANSWER_LIST = QUESTION_LIST.map((question) => {
		const answers = [question.correctAnswer, ...question.incorrectAnswers].sort(
			() => Math.random() - 0.5
		);
		return { ...question, answers };
	});
</script>

<QuestionSet questionSet={RANDOMIZED_ANSWER_LIST} />
