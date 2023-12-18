<script lang="ts">
	import "../../app.css";

	const question = "Find the square root of 16";

	const answers = [
		"this is an answer",
		"this is an answer",
		"this is an answer",
		"this is an answer"
	];
</script>

<section class="p-10 md:p-20">
	<div
		class="mb-8 flex flex-col items-center justify-center rounded-xl border-2 border-slate-700 p-8"
	>
		<h2 class="text-2xl">Question #{1}</h2>
		<p>{question}</p>
	</div>

	<div class="grid grid-cols-1 items-center justify-center gap-4 md:gap-8 sm:grid-cols-2">
		{#each answers as answer}
			<div class="cursor-pointer rounded-xl border-2 border-slate-700 p-4">{answer}</div>
		{/each}
	</div>
</section>
