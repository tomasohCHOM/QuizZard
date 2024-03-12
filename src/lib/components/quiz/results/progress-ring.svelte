<script lang="ts">
	export let progress: number;
	export let percentage: number;

	const angle = 360 * progress;
	const background = `radial-gradient(transparent 50%, transparent 51%),
    conic-gradient(transparent 0deg ${angle}deg, gainsboro ${angle}deg 360deg),
    conic-gradient(#3beb00 0deg, #3beb00);`;

	$: cssVarStyles = `--background:${background}`;
</script>

<div
	class="progress-circle flex items-center justify-center border-contrast font-semibold text-[#133172] shadow-md md:text-lg"
	style={cssVarStyles}
>
	{percentage}%
</div>

<style>
	.progress-circle {
		background: var(--background);
		border-radius: 50%;
		width: 120px;
		height: 120px;
		transition: all 500ms ease-in;
		will-change: transform;
	}
</style>
