<script lang="ts">
	import "../app.css";
	import Navbar from "$lib/components/home/navbar.svelte";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	onMount(async () => {
		localStorage.getItem("theme") === "dark" &&
			document.documentElement.setAttribute("data-theme", "dark");
	});
</script>

<Navbar bind:data />

<main class="px-10 py-8">
	<slot />
</main>

<footer class="px-10 py-8 text-sm">
	Developed with 🔥 by Chom <span class="font-semibold">@ 2024</span>
</footer>
