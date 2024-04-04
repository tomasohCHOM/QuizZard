<script lang="ts">
	export let isOpen: boolean = false;
	function toggleContainer() {
		isOpen = !isOpen;
	}
</script>

<div
	class:active={isOpen}
	class="floating z-20 flex flex-col gap-4 rounded-lg bg-secondary shadow-lg"
>
	<slot />
</div>

<div
	class:hidden={!isOpen}
	class="fixed left-0 top-0 z-10 h-screen w-screen bg-white/15"
	on:click={toggleContainer}
	on:keydown={toggleContainer}
	role="button"
	aria-pressed="false"
	tabindex="0"
/>

<style>
	.floating {
		display: none;
		width: min(35rem, 80vw);
		padding: 1.5rem 2rem;
		position: fixed;
		left: 50%;
		top: 55%;
		transform: translate(-50%, -50%);
		transition: all 0.125s ease-in;
	}

	.floating.active {
		top: 50%;
		display: block;
	}
</style>
