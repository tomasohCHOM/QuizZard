<script lang="ts">
	let numQuestions = 1;
</script>

<section class="flex flex-col gap-4">
	<h2 class="text-xl font-medium md:text-3xl">Create a New Quiz!</h2>

	<form method="POST" class="flex flex-col gap-4">
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
						{#each { length: 3 } as _, j}
							<input
								name="incorrect-answer-{i}-{j}"
								type="text"
								placeholder="Incorrect Answer #{j + 1}"
								class="w-[min(24rem,100%)] rounded-lg border-2 border-slate-300 bg-primary p-2 outline-none transition hover:brightness-110"
							/>
						{/each}
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
