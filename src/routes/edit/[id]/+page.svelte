<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";
	import QuizEdit from "$lib/components/edit/quiz-edit.svelte";
	import type { PageData } from "./$types";
	import PopupContainer from "$lib/components/popup-container.svelte";

	export let form: ActionData;
	export let data: PageData;

	$: quizId = data.quizId;
	$: quiz = data.quiz;
	$: fails = form?.fails;
</script>

{#if form?.success}
	<PopupContainer>
		<h3 class="text-center text-xl font-medium md:text-2xl">Quiz has been updated successfully!</h3>
		<div class="flex items-center justify-center gap-4">
			<a href="/" class="quiz-btn hover:bg-secondary hover:text-contrast">Go Back Home</a>
			<a href="/quiz/{form?.quizId}" class="quiz-btn-contrast">Check it Out!</a>
		</div>
	</PopupContainer>
{/if}

<section class="flex flex-col gap-4">
	<h2 class="text-xl font-medium md:text-3xl">Edit an Existing Quiz</h2>

	{#if fails}
		<div class="flex gap-4">
			{#each fails as failure}
				<span class="md:text-md rounded-lg bg-red-400 p-2 text-sm font-semibold text-slate-50">
					{failure}
				</span>
			{/each}
		</div>
	{/if}

	<form method="POST" class="flex flex-col gap-4" use:enhance>
		<QuizEdit bind:quiz>
			<button
				formaction="?/delete/{quizId}"
				slot="delete-btn"
				class="quiz-btn w-max border-2 border-red-400 text-red-400"
			>
				Delete Quiz
			</button>
		</QuizEdit>
	</form>
</section>
