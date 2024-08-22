<script lang="ts">
	import { getFlash } from "sveltekit-flash-message";
	import { page } from "$app/stores";
	import Icon from "@iconify/svelte";
	import type { PageData } from "./$types";
	import QuizCard from "$lib/components/quiz-card.svelte";
	import { beforeNavigate, invalidateAll } from "$app/navigation";
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";

	export let data: PageData;

	onMount(() => {
		const { data: authStateChangeData } = data.supabase.auth.onAuthStateChange((_, session) => {
			if (session) invalidateAll();
		});
		return () => authStateChangeData.subscription.unsubscribe();
	});

	const flash = getFlash(page);
	beforeNavigate((navigation) => {
		if ($flash && navigation.from?.url.toString() != navigation.to?.url.toString()) {
			$flash = undefined;
		}
	});

	let playAnimation = false;

	$: recentQuizzes = data.recentQuizzes;
	$: userQuizzes = data.userQuizzes;

	// Deteremines delay and how long the toast notification is on for
	$: if ($flash) {
		setTimeout(() => {
			playAnimation = true;
			setTimeout(() => {
				playAnimation = false;
			}, 5000);
		}, 500);
	}
</script>

<svelte:head>
	<title>QuizZard</title>
</svelte:head>

{#if $flash && playAnimation}
	<div
		transition:fly={{ y: 10, duration: 75 }}
		class="fixed bottom-12 left-8 z-[9999] rounded-md bg-contrast_muted p-3"
	>
		<span>
			{#if $flash.type === "success"}
				<Icon
					inline
					icon="mdi:tick"
					class="inline rounded-[50%] border-2 border-green-500 text-green-500"
				/>
			{:else}
				<Icon
					inline
					icon="mdi:close"
					class="inline rounded-[50%] border-2 border-red-400 text-red-400"
				/>
			{/if}
		</span>
		<span>{$flash.message}</span>
		<button on:click={() => ($flash = undefined)}>
			<Icon class="ml-2 inline" width={18} icon="mdi:close" />
		</button>
	</div>
{/if}

<section class="mx-auto flex max-w-screen-2xl flex-col gap-6">
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
