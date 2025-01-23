<script lang="ts">
	import type { QuestionSchemaType } from "$lib/shared";
	import Icon from "@iconify/svelte";

	export let quiz: QuestionSchemaType = {
		name: "",
		question_set: [{ prompt: "", correctAnswer: "", incorrectAnswers: [""] }]
	};

	// Used to create/update the quiz
	let questionSet = quiz.question_set;

	const insertNewQuestion = (idx: number) => {
		questionSet.splice(idx + 1, 0, { prompt: "", correctAnswer: "", incorrectAnswers: [""] });
		questionSet = questionSet;
	};
	const removeQuestion = (idx: number) => {
		questionSet.splice(idx, 1);
		questionSet = questionSet;
	};

	const addIncorrectAnswer = (idx: number) => {
		questionSet[idx].incorrectAnswers.push("");
		questionSet = questionSet;
	};
	const removeIncorrectAnswer = (idx: number) => {
		questionSet[idx].incorrectAnswers.pop();
		questionSet = questionSet;
	};
</script>

<div class="flex flex-col gap-4 md:gap-6 [&>div]:flex [&>div]:flex-col [&>div]:gap-2">
	<div>
		<label for="quiz-name">Name of the Quiz</label>
		<input
			name="quiz-name"
			id="quiz-name"
			type="text"
			value={quiz.name}
			placeholder="Name of the Quiz"
			class="theme-opacity w-[min(30rem,100%)] rounded-xl bg-secondary p-2 shadow-sm outline-none transition"
		/>
	</div>

	<h3 class="text-lg font-medium md:text-2xl">Quiz Questions</h3>

	{#each questionSet as question, i}
		<div>
			<label for="question-prompt-{i}">Quiz Question #{i + 1}</label>
			<input
				name="question-prompt-{i}"
				id="question-prompt-{i}"
				type="text"
				bind:value={question.prompt}
				placeholder="Question Prompt"
				class="theme-opacity w-[min(30rem,100%)] rounded-xl bg-secondary p-2 shadow-sm outline-none transition"
			/>

			<input
				name="correct-answer-{i}"
				id="correct-answer-{i}"
				type="text"
				value={question.correctAnswer ?? ""}
				placeholder="Correct Answer"
				class="theme-opacity w-[min(30rem,100%)] rounded-xl bg-secondary p-2 shadow-sm outline-none transition"
			/>

			<div class="mt-6 grid max-w-screen-xl grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
				{#each question.incorrectAnswers as incorrectAnswer, j}
					<input
						name="incorrect-answer-{i}-{j}"
						id="incorrect-answer-{i}-{j}"
						type="text"
						value={incorrectAnswer ?? ""}
						placeholder="Incorrect Answer #{j + 1}"
						class="theme-opacity rounded-xl bg-secondary p-2 outline-none transition"
					/>
				{/each}
			</div>

			<div class="flex gap-2">
				<button
					class="quiz-btn max-w-min p-0"
					on:click|preventDefault={() => addIncorrectAnswer(i)}
				>
					<Icon icon="mdi:plus" width={40} />
				</button>

				{#if question.incorrectAnswers.length > 1}
					<button
						class="quiz-btn max-w-min p-0"
						on:click|preventDefault={() => removeIncorrectAnswer(i)}
					>
						<Icon icon="mdi:minus" width={40} />
					</button>
				{/if}
				<button
					class="quiz-btn max-w-max p-0 px-4"
					on:click|preventDefault={() => {
						insertNewQuestion(i);
					}}
				>
					Add Question
				</button>
				<button
					class="quiz-btn max-w-max border-2 border-red-400 p-0 px-4 text-red-400"
					on:click|preventDefault={() => {
						removeQuestion(i);
					}}
				>
					Delete Question
				</button>
			</div>
		</div>
	{/each}
</div>

<div class="mt-4 flex gap-2">
	<slot />
</div>
