<script lang="ts">
	import type { QuestionSet } from "$lib/shared";
	import Icon from "@iconify/svelte";
	import ProgressRing from "./progress-ring.svelte";

	export let questionSet: QuestionSet[];
	export let correctAnswers: boolean[] | null[];
	export let answerChoices: string[] | null[];
	export let finalPercentage: number;
	export let correctAnswerCount: number;
	export let totalTime: number;
</script>

<h2 class="text-2xl font-semibold md:text-3xl">Results</h2>

<section class="mt-4 flex flex-col gap-8">
	<div
		class="flex min-w-max flex-col gap-4 self-start rounded-lg bg-secondary p-6 shadow-md md:flex-row md:gap-8 md:p-8"
	>
		<ProgressRing
			progress={correctAnswerCount / questionSet.length}
			bind:percentage={finalPercentage}
		/>
		<div>
			<h3 class="text-lg font-semibold md:text-xl">Number of Correct Answers:</h3>
			<p>{correctAnswerCount} out of {questionSet.length} correct</p>
			<h3 class="mt-4 text-lg font-semibold md:text-xl">Total Time:</h3>
			<p>{totalTime} seconds</p>
		</div>
	</div>

	<div class="flex flex-col gap-4 rounded-lg bg-secondary p-4 shadow-md">
		{#each questionSet as question, questionNum}
			<div class="flex flex-col gap-2">
				<div class="font-medium">
					{question.prompt}
					{#if correctAnswers[questionNum] == null}
						<span class="font-semibold">Not answered.</span>
					{:else if correctAnswers[questionNum]}
						<span class="font-semibold text-green-500">Correct!</span>
					{:else}
						<span class="font-semibold text-red-400">Incorrect!</span>
					{/if}
				</div>
				{#each question.answers as answer}
					<div class="rounded-md border-2 border-contrast p-2">
						{answer}
						{#if answer === question.correctAnswer}
							<span class="text-green-500">
								<Icon inline class="inline" icon="mdi:tick" />
							</span>
						{:else if !correctAnswers[questionNum] && answerChoices[questionNum] === answer}
							<span class="text-red-400">
								<Icon inline class="inline" icon="mdi:close" />
							</span>
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</section>

<div class="mt-8 flex flex-row justify-between">
	<a href="/" class="quiz-btn">Go Home</a>
</div>
