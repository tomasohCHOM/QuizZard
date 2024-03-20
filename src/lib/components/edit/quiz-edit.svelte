<script lang="ts">
	import type { QuestionSet } from "$lib/shared";
	import Icon from "@iconify/svelte";

	type QuestionSetType = {
		name: string;
		question_set: QuestionSet[];
	};

	export let quiz: QuestionSetType = {
		name: "",
		question_set: []
	};

	export let numIncorrectAnswers = [1];

	const updateNumQuestions = () => {
		numIncorrectAnswers = [...numIncorrectAnswers, 1];
	};
</script>

<div class="flex flex-col gap-4 md:gap-6 [&>div]:flex [&>div]:flex-col [&>div]:gap-2">
	<div>
		<label for="quiz-name">Name of the Quiz</label>
		<input
			name="quiz-name"
			type="text"
			value={quiz.name}
			placeholder="Name of the Quiz"
			class="theme-opacity w-[min(30rem,100%)] rounded-xl bg-secondary p-2 shadow-sm outline-none transition"
		/>
	</div>

	<h3 class="text-lg font-medium md:text-2xl">Quiz Questions</h3>

	{#each numIncorrectAnswers as _, i}
		<div>
			<label for="question-prompt-{i}">Quiz Question #{i + 1}</label>
			<input
				name="question-prompt-{i}"
				type="text"
				value={quiz.question_set[i].prompt}
				placeholder="Question Prompt"
				class="theme-opacity w-[min(30rem,100%)] rounded-xl bg-secondary p-2 shadow-sm outline-none transition"
			/>

			<input
				name="correct-answer-{i}"
				type="text"
				placeholder="Correct Answer"
				class="theme-opacity w-[min(30rem,100%)] rounded-xl bg-secondary p-2 shadow-sm outline-none transition"
			/>

			<div class="mt-6 grid max-w-screen-xl grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
				{#each { length: numIncorrectAnswers[i] } as _, j}
					<input
						name="incorrect-answer-{i}-{j}"
						type="text"
						placeholder="Incorrect Answer #{j + 1}"
						class="theme-opacity rounded-xl bg-secondary p-2 outline-none transition"
					/>
				{/each}
			</div>

			<div class="flex gap-2">
				<button
					class="quiz-btn max-w-min p-0"
					on:click|preventDefault={() => numIncorrectAnswers[i]++}
				>
					<Icon icon="mdi:plus" width={40} />
				</button>

				{#if numIncorrectAnswers[i] > 1}
					<button
						class="quiz-btn max-w-min p-0"
						on:click|preventDefault={() => numIncorrectAnswers[i]--}
					>
						<Icon icon="mdi:minus" width={40} />
					</button>
				{/if}
			</div>
		</div>
	{/each}
</div>

<div class="mt-2 flex gap-2">
	<button
		class="quiz-btn w-max px-4 py-2 hover:bg-secondary hover:text-contrast"
		on:click|preventDefault={updateNumQuestions}
	>
		Add One More
	</button>
	<slot name="delete-btn" />
</div>

<button class="quiz-btn-contrast" type="submit">Submit Quiz</button>
