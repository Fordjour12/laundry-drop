<script lang="ts">
	export let showFade: boolean = true;
</script>

<div
	class="relative flex h-screen flex-col items-center justify-center
  bg-white bg-grid-black/[0.2] dark:bg-neutral-800 dark:bg-grid-white/[0.2]"
>
	<!-- Radial gradient for the container to give a faded look -->

	{#if showFade}
		<div
			class="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-neutral-950"
		></div>
	{/if}
	<slot />
</div>
