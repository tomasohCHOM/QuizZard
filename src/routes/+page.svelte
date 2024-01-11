<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

{#if data.session}
	Im logged in
	{data.quizzes}
{/if}
<section class="flex flex-col gap-8">
	<h2 class="text-2xl font-semibold md:text-3xl">Home</h2>

	<div>
		<a
			class="rounded border-contrast bg-secondary p-4 shadow-md transition group-data-[theme='dark']:border-2 group-data-[theme='light']:hover:opacity-85 group-data-[theme='dark']:hover:brightness-110"
			href="/quiz"
		>
			Go to Quiz!
		</a>
	</div>
</section>
