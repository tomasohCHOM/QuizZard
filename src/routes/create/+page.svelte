<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";
	import QuizForm from "$lib/components/edit/quiz-form.svelte";
	import PopupContainer from "$lib/components/popup-container.svelte";

	export let form: ActionData;
	$: fails = form?.fails;
</script>

{#if form?.success}
	<PopupContainer isOpen={true}>
		<h3 class="text-center text-lg font-medium md:text-xl">Quiz has been created successfully!</h3>
		<div class="mt-4 flex items-center justify-center gap-4">
			<a href="/" class="quiz-btn p-3 text-sm hover:bg-secondary hover:text-contrast">
				Go Back Home
			</a>
			<a href="/quiz/{form?.quizId}" class="quiz-btn-contrast p-3 text-sm">Check it Out!</a>
		</div>
	</PopupContainer>
{/if}

<section class="flex flex-col gap-4">
	<h2 class="text-xl font-medium md:text-3xl">Create a New Quiz!</h2>

	{#if fails}
		<div class="flex gap-4">
			{#each fails as failure}
				<span class="md:text-md rounded-lg bg-red-400 p-2 text-sm font-semibold text-slate-50">
					{failure}
				</span>
			{/each}
		</div>
	{/if}

	<form method="post" class="flex flex-col gap-4" use:enhance>
		<QuizForm>
			<button class="quiz-btn-contrast" type="submit">Create Quiz</button>
		</QuizForm>
	</form>
</section>
