<script lang="ts">
	import type { QuestionSet } from "$lib/shared";
	import type { PageServerData } from "./$types";

	export let data: PageServerData;

	let questionSet: QuestionSet[] = data.questionSet;
</script>

{#each questionSet as question}
	Hello?
{/each}
