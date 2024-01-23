<script lang="ts">
	import QuizCard from "$lib/components/quiz-card.svelte";
	import type { PageData } from "../$types";

	export let data: PageData;

	let quizzes = data.quizzes;
</script>

<section class="flex flex-col gap-6">
	<h2 class="text-xl font-medium md:text-3xl">Quizzes</h2>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
		{#each quizzes as quiz}
			<QuizCard quizId={quiz.id} quizName={quiz.name} quizLength={quiz.question_set?.length} />
		{/each}
	</div>
</section>
