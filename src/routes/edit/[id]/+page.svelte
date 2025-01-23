<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";
	import QuizForm from "$lib/components/edit/quiz-form.svelte";
	import type { PageData } from "./$types";
	import PopupContainer from "$lib/components/popup-container.svelte";
	import Spinner from "$lib/components/spinner.svelte";

	export let form: ActionData;
	export let data: PageData;

	let formLoading = false;
	let saveChangesClicked = false;
	let deleteClicked = false;

	let isDeleteOpen = false;
	$: quiz = data.quiz;
	$: fails = form?.fails;
	$: if (!formLoading) {
		saveChangesClicked = false;
		deleteClicked = false;
	}
</script>

<svelte:head>
	<title>Edit a Quiz | {quiz.name} | QuizZard</title>
</svelte:head>

<section class="flex flex-col gap-4">
	<h1 class="text-xl font-medium md:text-3xl">Edit an Existing Quiz</h1>

	<form
		method="post"
		action="?/edit"
		class="flex flex-col gap-4"
		use:enhance={() => {
			formLoading = true;
			return async ({ update }) => {
				await update();
				formLoading = false;
			};
		}}
	>
		<QuizForm bind:quiz>
			<button
				disabled={formLoading}
				class="quiz-btn-contrast"
				on:click={() => (saveChangesClicked = true)}
				type="submit"
			>
				{#if saveChangesClicked}
					<Spinner isContrast={true} />
					<span class="ml-2">Loading...</span>
				{:else}
					Save Changes
				{/if}
			</button>
			<button
				disabled={formLoading}
				on:click|preventDefault={() => (isDeleteOpen = true)}
				class="quiz-btn w-max border-2 border-red-400 text-red-400"
			>
				{#if deleteClicked}
					<Spinner isContrast={true} />
					<span class="ml-2">Loading...</span>
				{:else}
					Delete Quiz
				{/if}
			</button>
		</QuizForm>
	</form>

	{#if fails}
		<div class="flex gap-4">
			{#each fails as failure}
				<span class="md:text-md rounded-lg bg-red-400 p-2 text-sm font-semibold text-slate-50">
					{failure}
				</span>
			{/each}
		</div>
	{/if}
</section>

<PopupContainer bind:isOpen={isDeleteOpen}>
	<form
		method="post"
		action="?/delete"
		use:enhance={() => {
			formLoading = true;
			return async ({ update }) => {
				await update();
				formLoading = false;
			};
		}}
	>
		<p class="font-medium">Are you sure you want to delete this quiz?</p>
		<div class="mt-4 flex items-center justify-center gap-2">
			<button
				type="submit"
				on:click={() => ((deleteClicked = true), (isDeleteOpen = false))}
				class="quiz-btn w-max bg-red-400 text-sm text-slate-50"
			>
				Yes, Delete
			</button>
			<button on:click|preventDefault={() => (isDeleteOpen = false)} class="quiz-btn w-max text-sm">
				No, Nevermind
			</button>
		</div>
	</form>
</PopupContainer>
