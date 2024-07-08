<script lang="ts">
	import QuizCard from "$lib/components/quiz-card.svelte";
	import Icon from "@iconify/svelte";
	import type { ActionData, PageData } from "./$types";
	import { enhance } from "$app/forms";
	import Spinner from "$lib/components/spinner.svelte";

	export let data: PageData;
	export let form: ActionData;

	let formLoading = false;

	let quizzes = data.quizzes;
	let pageNumber = data.pageNumber;
	let maxPages = Math.floor(data.numQuizzes / 8) + 1;
</script>

<svelte:head>
	<title>Quizzes | QuizZard</title>
</svelte:head>

<section class="mx-auto flex max-w-screen-2xl flex-col gap-6">
	<h1 class="text-xl font-medium md:text-3xl">Quizzes</h1>

	<form
		action="?/search"
		method="post"
		class="flex gap-2"
		use:enhance={() => {
			formLoading = true;
			return async ({ update }) => {
				await update();
				formLoading = false;
			};
		}}
	>
		<input
			name="quiz-search-bar"
			type="text"
			placeholder="Search for a Quiz..."
			class="theme-opacity w-[min(30rem,_100%)] rounded-xl bg-secondary p-2 outline-none transition"
		/>
		<button type="submit" class="quiz-btn flex items-center justify-center p-2">
			<Icon icon="mdi:search" width={24} />
		</button>
		{#if form}
			<button formaction="?/reset" class="rounded-xl border-2 border-secondary p-2"> Reset </button>
		{/if}
	</form>

	{#if !formLoading && form && form.fail}
		<span class="md:text-md w-max rounded-lg bg-red-400 p-2 text-sm font-semibold text-slate-50">
			{form.fail}
		</span>
	{/if}

	{#if formLoading}
		<div class="grid items-center justify-center">
			<Spinner large={true} />
		</div>
	{:else}
		<div class="grid max-w-screen-2xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			{#if !form || !form.searchResults}
				{#each quizzes as quiz}
					<QuizCard
						quizId={quiz.id}
						quizName={quiz.name}
						quizLength={quiz.quiz_length}
						isQuizAuthor={data.session?.user.id === quiz.user_id}
					/>
				{/each}
			{:else if form.searchResults.length === 0}
				<p class="text-lg font-medium">No quizzes have been found</p>
			{:else}
				{#each form.searchResults as quiz}
					<QuizCard
						quizId={quiz.id}
						quizName={quiz.name}
						quizLength={quiz.quiz_length}
						isQuizAuthor={data.session?.user.id === quiz.user_id}
					/>
				{/each}
			{/if}
		</div>
	{/if}

	{#if !formLoading && !form}
		<div class="flex items-center justify-center gap-4">
			<a href="/quizzes/{pageNumber - 1}" class="quiz-btn p-0 {pageNumber > 1 ? '' : 'invisible'}">
				<Icon icon="ci:chevron-left-md" width={40} />
			</a>
			<span>{pageNumber} / {maxPages}</span>
			<a
				href="/quizzes/{pageNumber + 1}"
				class="quiz-btn p-0 {pageNumber < maxPages ? '' : 'invisible'}"
			>
				<Icon icon="ci:chevron-right-md" width={40} />
			</a>
		</div>
	{/if}
</section>
