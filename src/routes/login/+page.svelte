<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
	$: ({ supabase } = data);
</script>

<h2>Login</h2>

<svelte:head>
	<title>Login | QuizZard</title>
</svelte:head>

<form method="post">
	<button formaction="?/login&provider=github">Github</button>
	<button formaction="?/login&provider=discord">Discord</button>
</form>
