<script lang="ts">
	import Icon from "@iconify/svelte";

	export let quizId: number | string;
	export let quizName: string;
	export let quizLength: number;
	export let isQuizAuthor: boolean = false;
</script>

<div>
	<a
		href="/quiz/{quizId}"
		class="theme-opacity flex h-full cursor-pointer flex-col gap-6 rounded border-contrast bg-secondary p-4 font-medium shadow-md transition"
	>
		<span class="border-b-2 border-contrast py-2 font-semibold">
			{quizName}
		</span>
		<span class="flex items-center justify-between">
			<span class="font-semibold">{quizLength} questions</span>
			{#if isQuizAuthor}
				<a href="/edit/{quizId}">
					<Icon icon="mdi:dots-vertical" />
				</a>
			{/if}
		</span>
	</a>
</div>
