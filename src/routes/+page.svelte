<script lang="ts">
	import Icon from "@iconify/svelte";
	import type { PageData } from "./$types";
	import QuizCard from "$lib/components/quiz-card.svelte";

	export let data: PageData;

	let recentQuizzes = data.recentQuizzes;
	let userQuizzes = data.userQuizzes;
</script>

<section class="flex flex-col gap-6">
	<h1 class="text-3xl font-semibold md:text-4xl">Home</h1>

	<h2 class="text-xl font-medium md:text-3xl">Recent Quizzes</h2>

	<div class="grid max-w-screen-2xl grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
		{#each recentQuizzes as quiz}
			<QuizCard quizId={quiz.id} quizName={quiz.name} quizLength={quiz.question_set?.length} />
		{/each}
	</div>

	<a href="/quiz" class="quiz-btn ml-auto">View More</a>

	{#if data.session}
		<h2 class="text-xl font-medium md:text-3xl">Your Quizzes</h2>
		{#if userQuizzes.length === 0}
			<p>You have no recentQuizzes created at this time.</p>
		{:else}
			<div class="grid max-w-screen-2xl grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
				{#each userQuizzes as quiz}
					<QuizCard quizId={quiz.id} quizName={quiz.name} quizLength={quiz.question_set?.length} />
				{/each}
			</div>
		{/if}
		<a href="/create" class="quiz-btn-contrast flex items-center gap-1 rounded-md py-2 pl-2">
			<Icon class="inline-block" width={40} inline={true} icon="ic:baseline-plus" />
			<span class="align-middle">Create a Quiz!</span>
		</a>
	{/if}
</section>
