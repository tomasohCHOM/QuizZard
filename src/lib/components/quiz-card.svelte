<script lang="ts">
	export let quizId: number;
	export let quizName: string;
	export let quizLength: number;
</script>

<div>
	<a
		href="/quiz/{quizId}"
		class="flex cursor-pointer flex-col gap-6 rounded border-contrast bg-secondary p-4 font-medium shadow-md transition group-data-[theme='dark']:border-2 group-data-[theme='light']:hover:opacity-85 group-data-[theme='dark']:hover:brightness-110"
	>
		<span class="border-b-2 border-contrast py-2 font-semibold">
			{quizName}
		</span>
		<span>
			<span class="font-semibold">{quizLength}</span> questions
		</span>
	</a>
</div>
