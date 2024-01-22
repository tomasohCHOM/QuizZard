<script lang="ts">
	export let quizId: number;
	export let quizName: string;
	export let quizLength: number;
</script>

<div>
	<a
		href="/quiz/{quizId}"
		class="block cursor-pointer rounded border-contrast bg-secondary p-4 font-medium shadow-md transition group-data-[theme='dark']:border-2 group-data-[theme='light']:hover:opacity-85 group-data-[theme='dark']:hover:brightness-110"
	>
		{quizName}
		{quizLength} questions
	</a>
</div>
