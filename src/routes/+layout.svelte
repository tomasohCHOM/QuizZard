<script lang="ts">
	import "../app.css";
	import Navbar from "$lib/components/navbar.svelte";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	import { fly } from "svelte/transition";
	import Background from "$lib/components/background.svelte";
	import Spinner from "$lib/components/spinner.svelte";

	export let data: PageData;

	let ready = false;
	onMount(async () => {
		ready = true;
		localStorage.getItem("theme") === "dark" &&
			document.documentElement.setAttribute("data-theme", "dark");
	});
</script>

<Navbar bind:data />

<Background />

<main class="mt-16 px-10 py-8">
	{#if ready}
		<div in:fly={{ y: 40, duration: 300, delay: 150 }}>
			{#key data.url}
				<div in:fly={{ y: 40, duration: 300, delay: 150 }}>
					<slot />
				</div>
			{/key}
		</div>
	{:else}
		<div class="grid items-center justify-center">
			<Spinner large={true} />
		</div>
	{/if}
</main>

<footer class="px-10 text-sm">
	Developed with 🔥 by Chom <span class="font-semibold">@ 2024</span>
</footer>
