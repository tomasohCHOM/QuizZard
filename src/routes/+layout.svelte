<script>
	import "../app.css";
	import Navbar from "$lib/components/navbar.svelte";
	import { onMount } from "svelte";

	onMount(async () => {
		localStorage.getItem("theme") === "dark" &&
			document.documentElement.setAttribute("data-theme", "dark");
	});
</script>

<Navbar />

<main class="p-10">
	<slot />
</main>
