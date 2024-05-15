<script lang="ts">
	const figureProperties = [
		{
			x: "right-[18%]",
			y: "bottom-[5%]",
			size: "h-24 w-24 rounded-[50%] md:h-32 md:w-32",
			rotation: ""
		},
		{
			x: "left-[3%]",
			y: "top-[53%]",
			size: "h-24 w-24 rounded-[50%] md:h-32 md:w-32",
			rotation: ""
		},
		{
			x: "left-[20%]",
			y: "bottom-[10%]",
			size: "h-16 w-16 rounded-lg md:h-24 md:w-24",
			rotation: "-rotate-[25deg]"
		},
		{
			x: "right-[5%]",
			y: "bottom-[70%] md:bottom-[20%]",
			size: "h-16 w-16 rounded-lg md:h-24 md:w-24",
			rotation: "rotate-12"
		}
	];
</script>

<div class="fixed -z-50 h-full w-full">
	{#each figureProperties as figureProperty}
		<div
			class="absolute bg-secondary group-data-[theme='dark']:opacity-60 group-data-[theme='light']:opacity-85 {figureProperty.x} {figureProperty.y} {figureProperty.size} {figureProperty.rotation}"
		/>
	{/each}
</div>
