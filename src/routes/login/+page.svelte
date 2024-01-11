<script lang="ts">
	import Icon from "@iconify/svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	$: ({ supabase } = data);
</script>

<svelte:head>
	<title>Login | QuizZard</title>
</svelte:head>

<section class="flex flex-col items-center">
	<h2 class="text-2xl font-semibold md:text-3xl">Login</h2>

	<form
		method="post"
		class="mt-8 flex w-[min(30rem,_90vw)] flex-col items-center justify-center gap-4 rounded-xl border-2 border-contrast p-6"
	>
		<button
			formaction="?/login&provider=github"
			class="flex w-full items-center justify-center gap-4 rounded-lg border-2 border-contrast py-2 transition group-data-[theme='light']:hover:opacity-85 group-data-[theme='dark']:hover:brightness-110"
		>
			<Icon class="inline-block" width={40} inline={true} icon="mdi:github" />
			<span class="align-middle font-medium">Sign in with GitHub</span>
		</button>
		<button
			formaction="?/login&provider=discord"
			class="flex w-full items-center justify-center gap-4 rounded-lg border-2 border-contrast py-2 transition group-data-[theme='light']:hover:opacity-85 group-data-[theme='dark']:hover:brightness-110"
		>
			<Icon class="inline-block" width={40} inline={true} icon="ic:baseline-discord" />
			<span class="align-middle font-medium">Sign in with Discord</span>
		</button>
	</form>
</section>
