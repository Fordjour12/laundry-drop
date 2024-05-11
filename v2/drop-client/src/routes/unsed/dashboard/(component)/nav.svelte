<script lang="ts">
	import { cn } from '$lib/utils';
	import { Button } from '@/components/ui/button/index.js';
	import * as Card from '@/components/ui/card/index.js';
	import * as Tooltip from '@/components/ui/tooltip';
	import { ChevronRight } from 'svelte-radix';
	import type { Route } from '../config';

	export let isCollapsed: boolean;
	export let routes: Route[];
</script>

<div data-collapsed={isCollapsed} class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
	<div class="sticky flex h-[97vh] flex-col">
		<nav
			class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
		>
			{#each routes as route}
				{#if isCollapsed}
					<Tooltip.Root openDelay={0}>
						<Tooltip.Trigger asChild let:builder>
							<Button
								href={route.url}
								builders={[builder]}
								variant={route.variant}
								size="icon"
								class={cn(
									'size-9',
									route.variant === 'default' &&
										'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
								)}
							>
								<svelte:component this={route.icon} class="size-4" aria-hidden="true" />
								<span class="sr-only">{route.name}</span>
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content side="right" class="flex items-center gap-4">
							{route.name}
							{#if route.label}
								<span class="text-muted-foreground ml-auto">
									{route.label}
								</span>
							{/if}
						</Tooltip.Content>
					</Tooltip.Root>
				{:else}
					<Button
						href={route.url}
						variant={route.variant}
						size="sm"
						class={cn('justify-start', {
							'dark:bg-muted dark:hover:bg-muted dark:text-white dark:hover:text-white':
								route.variant === 'default'
						})}
					>
						<svelte:component this={route.icon} class="mr-2 size-4" aria-hidden="true" />
						{route.name}
						{#if route.label}
							<span
								class={cn('ml-auto', {
									'text-background dark:text-white': route.variant === 'default'
								})}
							>
								<p>{route.label}</p>
							</span>
						{/if}
					</Button>
				{/if}
			{/each}
		</nav>

		<div class="mt-auto px-2">
			{#if isCollapsed}
				<Button
					size="icon"
					class="dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted size-9 dark:hover:text-white"
				>
					<ChevronRight />
					<span class="sr-only">Collapse</span>
				</Button>
			{:else}
				<div>
					<Card.Root>
						<Card.Header class="p-2 pt-0 md:p-4">
							<Card.Title>Upgrade to Pro</Card.Title>
							<Card.Description>
								Unlock all features and get unlimited access to our support team.
							</Card.Description>
						</Card.Header>
						<Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
							<Button size="sm" class="w-full">Upgrade</Button>
						</Card.Content>
					</Card.Root>
				</div>
			{/if}
		</div>
	</div>
</div>
