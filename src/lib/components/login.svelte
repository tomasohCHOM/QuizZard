<script lang="ts">
	import Icon from "@iconify/svelte";
	import PopupContainer from "./popup-container.svelte";
	export let isLoginOpen = false;
</script>

<PopupContainer bind:isOpen={isLoginOpen} isSmall={true}>
	<h2 class="text-center text-2xl font-semibold md:text-3xl">Login</h2>

	<form method="post" class="mt-8 flex flex-col items-center gap-4 rounded-xl">
		<button
			type="submit"
			formaction="/login/?/login&provider=github"
			class="theme-opacity flex w-full items-center justify-center gap-4 rounded-lg border-2 border-contrast py-2 transition"
		>
			<Icon class="inline-block" width={40} inline={true} icon="mdi:github" />
			<span class="align-middle font-medium">Sign in with GitHub</span>
		</button>
		<button
			type="submit"
			formaction="/login/?/login&provider=discord"
			class="flex w-full items-center justify-center gap-4 rounded-lg border-2 border-contrast py-2 transition group-data-[theme='light']:hover:opacity-85 group-data-[theme='dark']:hover:brightness-110"
		>
			<Icon class="inline-block" width={40} inline={true} icon="ic:baseline-discord" />
			<span class="align-middle font-medium">Sign in with Discord</span>
		</button>
	</form>
</PopupContainer>
