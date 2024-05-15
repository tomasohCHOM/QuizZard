<script lang="ts">
	import { initFlash } from "sveltekit-flash-message/client";
	import { page } from "$app/stores";
	import Icon from "@iconify/svelte";
	import type { PageData } from "./$types";
	import QuizCard from "$lib/components/home/quiz-card.svelte";

	const flash = initFlash(page);

	export let data: PageData;

	$: recentQuizzes = data.recentQuizzes;
	$: userQuizzes = data.userQuizzes;
	$: console.log($flash);
</script>

{#if $flash}
	<div class="absolute bottom-4 right-4 rounded-lg bg-secondary px-4 py-2">Some message</div>
{/if}

<section class="flex flex-col gap-6">
	<h1 class="text-3xl font-semibold md:text-4xl">Home</h1>

	<h2 class="text-xl font-medium md:text-3xl">Recent Quizzes</h2>

	<div class="grid max-w-screen-2xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each recentQuizzes as quiz}
			<QuizCard
				quizId={quiz.id}
				quizName={quiz.name}
				quizLength={quiz.quiz_length}
				isQuizAuthor={data.session?.user.id === quiz.user_id}
			/>
		{/each}
	</div>

	<a href="/quizzes/1" class="quiz-btn ml-auto">View More</a>

	{#if data.session}
		<h2 class="text-xl font-medium md:text-3xl">Your Quizzes</h2>
		{#if userQuizzes.length === 0}
			<p>You have no recent quizzes created at this time.</p>
		{:else}
			<div class="grid max-w-screen-2xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{#each userQuizzes as quiz}
					<QuizCard
						quizId={quiz.id}
						quizName={quiz.name}
						quizLength={quiz.quiz_length}
						isQuizAuthor={data.session?.user.id === quiz.user_id}
					/>
				{/each}
			</div>
		{/if}
		<a href="/create" class="quiz-btn-contrast flex items-center gap-1 rounded-md py-2 pl-2">
			<Icon class="inline-block" width={40} inline={true} icon="ic:baseline-plus" />
			<span class="align-middle">Create a Quiz!</span>
		</a>
	{/if}
</section>
