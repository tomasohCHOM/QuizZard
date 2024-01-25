<script lang="ts">
	import Icon from "@iconify/svelte";
	import type { PageData } from "./$types";
	import QuizCard from "$lib/components/quiz-card.svelte";

	export let data: PageData;

	let quizzes = data.quizzes;
</script>

<section class="flex flex-col gap-6">
	<h1 class="text-3xl font-semibold md:text-4xl">Home</h1>

	<h2 class="text-xl font-medium md:text-3xl">Recent Quizzes</h2>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
		{#each quizzes as quiz}
			<QuizCard quizId={quiz.id} quizName={quiz.name} quizLength={quiz.question_set?.length} />
		{/each}
	</div>

	<a
		href="/quiz"
		class="ml-auto w-max rounded-lg bg-contrast p-2 px-3 text-lg font-semibold text-primary transition hover:opacity-80"
	>
		View More
	</a>

	{#if data.session}
		<h2 class="text-x; font-medium md:text-3xl">Your Quizzes</h2>
		{#if quizzes.length === 0}
			<p>You have no quizzes created at this time.</p>
		{/if}
		<a
			href="/create"
			class="flex w-max items-center gap-1 rounded-md bg-secondary py-2 pr-4 transition group-data-[theme='dark']:border-2 group-data-[theme='light']:hover:opacity-85 group-data-[theme='dark']:hover:brightness-110"
		>
			<Icon class="inline-block" width={40} inline={true} icon="ic:baseline-plus" />
			<span class="align-middle font-medium">Create a Quiz!</span>
		</a>
	{/if}
</section>
