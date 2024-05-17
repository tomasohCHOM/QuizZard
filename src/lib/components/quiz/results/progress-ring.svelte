<script lang="ts">
	export let percentage: number;
	let ringOffset = 251.2 - (251.2 * percentage) / 100;
</script>

<svg class="relative h-32 w-32" viewBox="0 0 100 100">
	<circle
		cx="50"
		cy="50"
		r="40"
		fill="transparent"
		stroke-width="5"
		class="stroke-current text-gray-600"
	/>
	<circle
		cx="50"
		cy="50"
		r="40"
		fill="transparent"
		stroke-width="5"
		class="progress-ring-circle stroke-current text-green-500"
		style="--ring-offset: {ringOffset}"
	/>
	<text
		x="50"
		y="50"
		font-size="16"
		text-anchor="middle"
		alignment-baseline="middle"
		class="fill-contrast"
	>
		{percentage}%
	</text>
</svg>

<style>
	.progress-ring-circle {
		stroke-linecap: round;
		stroke-dasharray: 251.2;
		stroke-dashoffset: 251.2;
		transform: rotate(-90deg);
		transform-origin: 50% 50%;
		animation: progress 750ms ease forwards;
		animation-delay: 300ms;
	}

	@keyframes progress {
		from {
			stroke-dashoffset: 251.2;
		}
		to {
			stroke-dashoffset: var(--ring-offset);
		}
	}
</style>
