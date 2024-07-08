<script lang="ts">
	import type { PageData } from "../../routes/$types";
	import { onMount } from "svelte";
	import Icon from "@iconify/svelte";
	import Login from "./login.svelte";

	export let data: PageData;
	let currentTheme: string;
	let isSidebarOpen = false;
	let isLoginOpen = false;

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

<nav class="fixed flex w-full items-center justify-between bg-secondary p-4 shadow-sm">
	<div class="flex items-center justify-center gap-4">
		<a href="/">
			<span class="cursor-pointer text-xl font-bold">QuizZard</span>
		</a>
	</div>

	<button
		class="cursor-pointer text-contrast md:hidden"
		on:click={() => (isSidebarOpen = !isSidebarOpen)}
		on:blur={() => (isSidebarOpen = false)}
	>
		<Icon icon="mdi:menu" width={40} />
	</button>

	<!-- NAVBAR IN DESKTOP VIEW -->
	<div class="hidden items-center justify-center gap-2 md:flex">
		<a href="/quizzes/1" class="quiz-btn p-2">Explore</a>

		{#if data.session}
			<a href="/my-quizzes/1" class="quiz-btn p-2">My Quizzes</a>
		{/if}

		<button class="quiz-btn p-2" on:click={toggleTheme}> Switch Theme </button>

		{#if data.session}
			<form action="/logout" method="post" class="flex items-center">
				<button type="submit" class="rounded-full border-2 border-contrast px-3 py-2 font-medium">
					Log Out
				</button>
			</form>
		{:else}
			<button
				on:click={() => (isLoginOpen = true)}
				class="quiz-btn-contrast rounded-full px-4 py-2"
			>
				Log in
			</button>
		{/if}
	</div>

	<!-- SIDEBAR FOR MOBILE VIEW -->
	<div
		class="fixed right-8 top-20 flex w-[10rem] flex-col justify-center gap-4
    rounded-lg bg-secondary p-3 pl-4 shadow-md transition-transform md:hidden
    {isSidebarOpen ? 'scale-100' : 'scale-0'}"
	>
		<a href="/quizzes/1" class="font-medium">Explore</a>

		{#if data.session}
			<a href="/my-quizzes/1" class="font-medium">My Quizzes</a>
		{/if}

		<button class="text-start font-medium" on:click={toggleTheme}> Switch Theme </button>

		{#if data.session}
			<form action="/logout" method="post" class="flex items-center">
				<button type="submit" class="rounded-full border-2 border-contrast px-3 py-2 font-medium">
					Log Out
				</button>
			</form>
		{:else}
			<button
				on:click={() => (isLoginOpen = true)}
				class="quiz-btn-contrast rounded-full px-4 py-2"
			>
				Log in
			</button>
		{/if}
	</div>
</nav>

<Login bind:isLoginOpen />
