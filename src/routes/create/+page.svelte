<script lang="ts">
	import { enhance } from "$app/forms";
	import Icon from "@iconify/svelte";
	import type { ActionData } from "./$types";

	export let form: ActionData;
	$: fails = form?.fails;

	let numQuestions = 1;
	$: numIncorrectAnswers = Array.from({ length: numQuestions }, () => 1);
</script>

{#if form?.success}
	<div class="floating z-20 flex flex-col gap-4 rounded-lg bg-primary shadow-lg">
		<h3 class="text-center text-xl font-medium md:text-2xl">
			Quiz has been submitted successfully! :)
		</h3>
		<div class="flex items-center justify-center gap-4">
			<a href="/" class="quiz-btn hover:bg-secondary hover:text-contrast">Go Back Home</a>
			<a href="/quiz/{form?.quizId}" class="quiz-btn-contrast">Check it Out!</a>
		</div>
	</div>

	<div class="fixed left-0 top-0 z-10 h-screen w-screen bg-white/15" />
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

	<form method="POST" class="flex flex-col gap-4" use:enhance>
		<div class="flex flex-col gap-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-2">
			<div>
				<label for="quiz-name">Name of the Quiz</label>
				<input
					name="quiz-name"
					type="text"
					placeholder="Name of the Quiz"
					class="w-[min(24rem,100%)] rounded-lg border-2 border-slate-300 bg-primary p-2 outline-none transition hover:brightness-110"
				/>
			</div>

			<h3 class="text-lg font-medium md:text-2xl">Quiz Questions</h3>

			{#each { length: numQuestions } as _, i}
				<div>
					<label for="question-prompt-{i}">Quiz Question #{i + 1}</label>
					<input
						name="question-prompt-{i}"
						type="text"
						placeholder="Question Prompt"
						class="w-[min(24rem,100%)] rounded-lg border-2 border-slate-300 bg-primary p-2 outline-none transition hover:brightness-110"
					/>

					<input
						name="correct-answer-{i}"
						type="text"
						placeholder="Correct Answer"
						class="w-[min(24rem,100%)] rounded-lg border-2 border-slate-300 bg-primary p-2 outline-none transition hover:brightness-110"
					/>

					<div class="flex max-w-screen-xl gap-2">
						{#each { length: numIncorrectAnswers[i] } as _, j}
							<input
								name="incorrect-answer-{i}-{j}"
								type="text"
								placeholder="Incorrect Answer #{j + 1}"
								class="w-[min(24rem,100%)] rounded-lg border-2 border-slate-300 bg-primary p-2 outline-none transition hover:brightness-110"
							/>
						{/each}
						<button
							class="rounded-lg border-2 border-slate-300 transition hover:bg-secondary"
							on:click={() => numIncorrectAnswers[i]++}
						>
							<Icon icon="mdi:plus" width={40} />
						</button>

						{#if numIncorrectAnswers[i] > 1}
							<button
								class="rounded-lg border-2 border-slate-300 transition hover:bg-secondary"
								on:click={() => numIncorrectAnswers[i]--}
							>
								<Icon icon="mdi:minus" width={40} />
							</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<button
			class="quiz-btn w-max px-4 py-2 hover:bg-secondary hover:text-contrast"
			on:click|preventDefault={() => numQuestions++}
		>
			Add One More
		</button>

		<button class="quiz-btn-contrast" type="submit">Submit Quiz</button>
	</form>
</section>

<style>
	.floating {
		max-width: 40rem;
		padding: 1.5rem 2rem;
		position: fixed;
		left: 50%;
		top: 55%;
		transform: translate(-50%, -50%);
		transition: all 0.125s ease-in;
	}

	/* .floating.active {
		top: 50%;
	} */
</style>
