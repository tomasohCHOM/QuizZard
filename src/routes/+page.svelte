<script lang="ts">
	import { getFlash } from "sveltekit-flash-message";
	import { page } from "$app/stores";
	import Icon from "@iconify/svelte";
	import type { PageData } from "./$types";
	import QuizCard from "$lib/components/home/quiz-card.svelte";
	import { beforeNavigate } from "$app/navigation";
	import { fly } from "svelte/transition";

	const flash = getFlash(page);

	beforeNavigate((navigation) => {
		if ($flash && navigation.from?.url.toString() != navigation.to?.url.toString()) {
			$flash = undefined;
		}
	});

	export let data: PageData;
	let animationStart = false;

	$: recentQuizzes = data.recentQuizzes;
	$: userQuizzes = data.userQuizzes;
	$: if ($flash) {
		setTimeout(() => {
			animationStart = true;
		}, 500);
	}
</script>

{#if $flash && animationStart}
	<div
		transition:fly={{ y: 10, duration: 75 }}
		class="fixed bottom-4 right-4 z-[9999] rounded-md bg-contrast_muted p-4"
	>
		{$flash.message}
		<button on:click={() => ($flash = undefined)}>
			<Icon class="inline-block" width={18} icon="mdi:close" />
		</button>
	</div>
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

		<a href="/my-quizzes/1" class="quiz-btn ml-auto">View My Quizzes</a>

		<a href="/create" class="quiz-btn-contrast flex items-center gap-1 rounded-md py-2 pl-2">
			<Icon class="inline-block" width={40} inline={true} icon="ic:baseline-plus" />
			<span class="align-middle">Create a Quiz!</span>
		</a>
	{/if}
</section>
