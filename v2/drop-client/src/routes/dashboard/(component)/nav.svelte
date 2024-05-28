<script lang="ts">
	import * as Tooltip from '@/components/ui/tooltip/index.js';
	import { Package2Icon, SettingsIcon } from 'lucide-svelte';
	import { routesConfig } from '../routesConfig';

	import { page } from '$app/stores';

	let routeId = $state($page.route.id);

	$effect(() => {
		console.log(routeId);
	});
</script>

<nav class="flex flex-col items-center gap-4 px-2 py-4">
	<a
		href="/"
		class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
	>
		<Package2Icon class="h-4 w-4 transition-all group-hover:scale-110" />
		<span class="sr-only">Acme Inc</span>
	</a>

	{#each routesConfig as route}
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<a
					href={route.path}
					class={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
					onclick={() => (routeId = route.path)}
					class:bg-accent={routeId === route.path}
					use:builder.action
					{...builder}
				>
					<svelte:component this={route.icon} class="h-5 w-5" />
					<span class="sr-only">{route.name}</span>
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">{route.name}</Tooltip.Content>
		</Tooltip.Root>
	{/each}
</nav>

<nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<a
				href="/dashboard/settings"
				class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<SettingsIcon class="h-5 w-5" />
				<span class="sr-only">Settings</span>
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content side="right">Settings</Tooltip.Content>
	</Tooltip.Root>
</nav>
