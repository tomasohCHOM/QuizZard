<script lang="ts">
	import type { QuestionSet } from "$lib/shared";

	export let questionSet: QuestionSet[];
	export let finalPercentage: number;
	export let correctAnswerCount: number;
	export let totalTime: number;
</script>

<h2 class="text-2xl font-semibold md:text-3xl">Results</h2>
<div
	class="mt-4 flex max-w-max flex-col gap-4 rounded-lg border-contrast bg-secondary p-6 shadow-md group-data-[theme='dark']:border-2 md:flex-row md:gap-8 md:p-8"
>
	<div
		class="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-2 border-contrast bg-contrast"
	>
		<div
			class="z-10 flex h-32 w-32 items-center justify-center rounded-full border-2 border-contrast bg-secondary text-xl font-semibold"
		>
			{finalPercentage}%
		</div>
	</div>
	<div>
		<h3 class="text-lg font-semibold md:text-xl">Number of Correct Answers:</h3>
		<p>{correctAnswerCount} out of {questionSet.length} correct</p>
		<h3 class="mt-4 text-lg font-semibold md:text-xl">Total Time:</h3>
		<p>{totalTime} seconds</p>
	</div>
</div>

<div class="mt-8 flex flex-row justify-between">
	<a
		href="/"
		class="rounded-lg border-2 border-contrast px-6 py-3 font-semibold text-contrast transition hover:bg-secondary"
		>Go Home</a
	>
</div>
