<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";
	import QuizForm from "$lib/components/edit/quiz-form.svelte";

	export let form: ActionData;
	$: fails = form?.fails;
</script>

<svelte:head>
	<title>Create a Quiz | QuizZard</title>
</svelte:head>

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
