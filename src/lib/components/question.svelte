<script lang="ts">
	import "../../app.css";

	const question = "Find the square root of 16";

	interface Answer {
		answer: String;
		correct: boolean;
	}

	const answers = [
		{ answer: "this is an answer", correct: true },
		{ answer: "this is an answer", correct: false },
		{ answer: "this is an answer", correct: false },
		{ answer: "this is an answer", correct: false }
	];

	let answerSelected: boolean = false;

	function answerClicked() {
		answerSelected = true;
	}
</script>

<section class="p-10 md:p-20">
	<div
		class="mb-8 flex flex-col items-center justify-center rounded-xl border-2 border-slate-700 p-8"
	>
		<h2 class="text-2xl">Question #{1}</h2>
		<p>{question}</p>
	</div>

	<div class="grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 md:gap-8">
		{#each answers as answer}
			<button
				class="cursor-pointer rounded-xl border-2 border-slate-700 p-4 transition hover:opacity-80 {answerSelected
					? answer.correct
						? 'bg-green-700'
						: 'bg-red-700'
					: ''} {answerSelected ? 'border-none text-slate-50' : ''}"
				on:click={answerClicked}
			>
				{answer.answer}
			</button>
		{/each}
	</div>
</section>
