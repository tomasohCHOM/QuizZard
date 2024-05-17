<script lang="ts">
	import QuizCard from "$lib/components/quiz-card.svelte";
	import Icon from "@iconify/svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	let quizzes = data.quizzes;
	let pageNumber = data.pageNumber;
	let maxPages = Math.floor(data.numQuizzes / 8) + 1;
</script>

<svelte:head>
	<title>Quizzes | QuizZard</title>
</svelte:head>

<section class="flex flex-col gap-6">
	<h2 class="text-xl font-medium md:text-3xl">Quizzes</h2>

	<a href="/" class="quiz-btn max-w-max"> Go Back Home </a>

	<div class="grid max-w-screen-2xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each quizzes as quiz}
			<QuizCard
				quizId={quiz.id}
				quizName={quiz.name}
				quizLength={quiz.quiz_length}
				isQuizAuthor={data.session?.user.id === quiz.user_id}
			/>
		{/each}
	</div>

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
</section>
