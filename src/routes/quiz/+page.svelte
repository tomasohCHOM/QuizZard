<script lang="ts">
	import QuizCard from "$lib/components/home/quiz-card.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	let quizzes = data.quizzes;
</script>

<section class="flex flex-col gap-6">
	<h2 class="text-xl font-medium md:text-3xl">Quizzes</h2>

	<a href="/" class="quiz-btn max-w-max"> Go Back Home </a>

	<div class="grid max-w-screen-2xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each quizzes as quiz}
			<QuizCard
				quizId={quiz.id}
				quizName={quiz.name}
				quizLength={quiz.question_set?.length}
				isQuizAuthor={data.session?.user.id === quiz.user_id}
			/>
		{/each}
	</div>
</section>
