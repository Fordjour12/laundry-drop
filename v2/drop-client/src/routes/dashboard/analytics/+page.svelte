<script lang="ts">
	import * as Breadcrumb from '@/components/ui/breadcrumb/index.js';
	import * as Card from '@/components/ui/card/index.js';
	import { Progress } from '@/components/ui/progress/index.js';
	import { Button } from '@/components/ui/button/index.js';
	import * as DropdownMenu from '@/components/ui/dropdown-menu/index.js';
	import Input from '@/components/ui/input/input.svelte';
	import { Search } from 'lucide-svelte';

	// Mock data for demonstration
	let keyMetrics = {
		totalOrders: 1200,
		totalRevenue: 15000,
		averageOrderValue: 25,
		customerSatisfaction: 4.5
	};

	let revenueData = [
		{ month: 'Jan', revenue: 1200 },
		{ month: 'Feb', revenue: 1400 }
		// Add more data
	];

	let orderStatusData = [
		{ status: 'Received', count: 300 },
		{ status: 'In Progress', count: 200 },
		{ status: 'Completed', count: 700 }
	];
</script>

<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
	<header
		class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
	>
		<Breadcrumb.Root class="hidden md:flex">
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="##">Dashboard</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href="##">Orders</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page>Recent Orders</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
		<div class="relative ml-auto flex-1 md:grow-0">
			<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				type="search"
				placeholder="Search..."
				class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
			/>
		</div>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					variant="outline"
					size="icon"
					class="overflow-hidden rounded-full"
					builders={[builder]}
				>
					<img
						src="/images/placeholder-user.jpg"
						width={36}
						height={36}
						alt="Avatar"
						class="overflow-hidden rounded-full"
					/>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>My Account</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Settings</DropdownMenu.Item>
				<DropdownMenu.Item>Support</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Logout</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</header>

	<main class="min-h-screen p-8">
		<h1 class="mb-8 text-center text-3xl font-bold">Analytics Dashboard</h1>

		<!-- Key Metrics Section -->
		<section class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-lg bg-app-mixed-300 p-6 text-center shadow-md">
				<h2 class="mb-2 text-2xl font-semibold">Total Orders</h2>
				<p class="text-4xl font-bold">{keyMetrics.totalOrders}</p>
			</div>
			<div class="rounded-lg bg-app-mixed-300 p-6 text-center shadow-md">
				<h2 class="mb-2 text-2xl font-semibold">Total Revenue</h2>
				<p class="text-4xl font-bold">${keyMetrics.totalRevenue}</p>
			</div>
			<div class="rounded-lg bg-app-mixed-300 p-6 text-center shadow-md">
				<h2 class="mb-2 text-2xl font-semibold">Avg Order Value</h2>
				<p class="text-4xl font-bold">${keyMetrics.averageOrderValue}</p>
			</div>
			<div class="rounded-lg bg-app-mixed-300 p-6 text-center shadow-md">
				<h2 class="mb-2 text-2xl font-semibold">Customer Satisfaction</h2>
				<p class="text-4xl font-bold">{keyMetrics.customerSatisfaction}★</p>
			</div>
		</section>

		<div class="grid md:gap-8 lg:grid-cols-2">
			<!-- Revenue Graph Section -->
			<section class="mb-8 rounded-lg bg-app-mixed-300 p-6 shadow-md">
				<h2 class="mb-4 text-2xl font-semibold">Revenue Over Time</h2>
				<!-- Placeholder for chart -->
				<div class="h-64 bg-blend-darken">[Revenue Chart Here]</div>
			</section>

			<!-- Order Status Section -->
			<section class="mb-8 rounded-lg bg-app-mixed-300 p-6 shadow-md">
				<h2 class="mb-4 text-2xl font-semibold">Order Status</h2>
				<!-- Placeholder for chart -->
				<div class="h-64 bg-blend-darken">[Order Status Chart Here]</div>
			</section>
		</div>
	</main>

	<!--
	<main class="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
			<Card.Root class="sm:col-span-2">
				<Card.Header class="pb-2">
					<Card.Description>This year</Card.Description>
					<Card.Title class="text-3xl">$1329</Card.Title>
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
					<Card.Description>This Week</Card.Description>
					<Card.Title class="text-3xl">$1329</Card.Title>
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
		</div> 
	</main>
	-->
</div>
