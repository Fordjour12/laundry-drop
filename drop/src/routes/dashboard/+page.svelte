<script lang="ts">
	import * as Card from '@/components/card';
	import { Progress } from '@/components/progress';
	import { Button } from '@/components/button';
	import { CurrencyDollar } from 'phosphor-svelte';
	import * as Breadcrumb from '@/components/breadcrumb/index.js';
</script>

<div class="px-5">
	<div class="my-3">
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link asChild let:attrs>
						<a href="/" {...attrs}>Home</a>
					</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link asChild let:attrs>
						<a href="/components" {...attrs}>Components</a>
					</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>

	<div class="flex w-full gap-4">
		<Card.Root class="sm:col-span-2">
			<Card.Header class="pb-3">
				<Card.Title>Your Orders</Card.Title>
				<Card.Description class="max-w-lg text-balance leading-relaxed">
					Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful
					Analysis.
				</Card.Description>
			</Card.Header>
			<Card.Footer>
				<Button>Create New Order</Button>
			</Card.Footer>
		</Card.Root>

		<Card.Root>
			<Card.Header class="pb-2">
				<Card.Description>This Week</Card.Description>
				<Card.Title class="text-4xl">$1329</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="text-xs text-muted-foreground">+25% from last week</div>
			</Card.Content>
			<Card.Footer>
				<Progress value={25} aria-label="25% increase" />
			</Card.Footer>
		</Card.Root>

		<Card.Root>
			<Card.Header class="pb-2">
				<Card.Description>This Month</Card.Description>
				<Card.Title class="text-3xl">$5,329</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="text-xs text-muted-foreground">+10% from last month</div>
			</Card.Content>
			<Card.Footer>
				<Progress value={12} aria-label="12% increase" />
			</Card.Footer>
		</Card.Root>

		<script lang="ts">
			import DollarSign from 'lucide-svelte/icons/dollar-sign';
			import * as Card from '$lib/registry/new-york/ui/card/index.js';
		</script>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
				<CurrencyDollar class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">$45,231.89</div>
				<p class="text-xs text-muted-foreground">+20.1% from last month</p>
			</Card.Content>
		</Card.Root>
	</div>
</div>
