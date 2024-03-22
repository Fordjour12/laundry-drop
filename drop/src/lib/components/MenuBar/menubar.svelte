<script lang="ts">
	import Button from '@/components/button/button.svelte';
	import type { MenuRoute } from './menu.config.ts';
	import { cn } from '$lib/utils';

	export let isCollapsed: boolean;
	export let routes: MenuRoute[];
</script>

<nav>
	{#each routes as route}
		{#if isCollapsed}
			<Button href="#" size="icon" class={cn('size-9')}>
				<svelte:component this={route.icon} class="size-4" aria-hidden="true" />
				<span class="sr-only">{route.name}</span>
			</Button>
			{route.name}
		{/if}
	{/each}
</nav>
