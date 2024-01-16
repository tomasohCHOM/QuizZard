<script lang="ts">
	import QuizSet from "$lib/components/quiz-set.svelte";
	import Icon from "@iconify/svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	let quizzes: QuizSet = data.quizzes;
</script>

<section class="flex flex-col gap-6">
	<h1 class="text-3xl font-semibold md:text-4xl">Home</h1>

	<h2 class="text-xl font-medium md:text-3xl">Recent Quizzes</h2>

	{#each quizzes as quiz}
		<a
			href="/quiz"
			class="block w-64 cursor-pointer rounded border-contrast bg-secondary p-4 font-medium shadow-md transition group-data-[theme='dark']:border-2 group-data-[theme='light']:hover:opacity-85 group-data-[theme='dark']:hover:brightness-110"
		>
			{quiz.name}
		</a>
	{/each}

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
