<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "@iconify/svelte";

	let currentTheme: string;

	onMount(() => {
		const savedTheme = document.documentElement.getAttribute("data-theme");
		if (savedTheme) {
			currentTheme = savedTheme;
			return;
		}
		const preferenceIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const theme = preferenceIsDark ? "dark" : "light";
		setTheme(theme);
	});

	function setTheme(theme: string): void {
		const period = 60 * 60 * 24 * 365;
		document.cookie = `theme=${theme}; max-age=${period}; path=/`;
		document.documentElement.setAttribute("data-theme", theme);
		currentTheme = theme;
	}

	function toggleTheme(): void {
		const theme = currentTheme === "light" ? "dark" : "light";
		setTheme(theme);
	}
</script>

<nav class="flex items-center justify-between p-4 shadow-md group-data-[theme='dark']:border-b-2">
	<a href="/">
		<span class="cursor-pointer text-xl font-bold">QuizZard</span>
	</a>
	<div class="flex items-center justify-center gap-2">
		<a href="https://github.com/tomasohCHOM/QuizZard" class="flex items-center">
			<Icon icon="mdi:github" width={40} inline={true} />
		</a>

		<button class="flex items-center" on:click={toggleTheme}>
			<Icon icon="fluent:dark-theme-20-filled" width={40} inline={true} />
		</button>

		<a href="/login" class="flex items-center">
			<button class="rounded-full border-2 border-contrast px-3 py-2 font-medium">Log In</button>
		</a>
	</div>
</nav>
