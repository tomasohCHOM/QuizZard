<script lang="ts">
	export let percentage: number;
</script>

<svg class="relative h-32 w-32" viewBox="0 0 100 100">
	<circle
		class="stroke-current text-gray-400"
		stroke-width="5"
		cx="50"
		cy="50"
		r="40"
		fill="transparent"
	/>
	<circle
		class="progress-ring__circle stroke-current text-green-500"
		stroke-width="5"
		stroke-linecap="round"
		cx="50"
		cy="50"
		r="40"
		fill="transparent"
		stroke-dasharray="251.2"
		stroke-dashoffset="calc(251.2 - (251.2 * {percentage}) / 100)"
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
	.progress-ring__circle {
		transition: stroke-dashoffset 0.35s;
		transform: rotate(-90deg);
		transform-origin: 50% 50%;
	}
</style>
