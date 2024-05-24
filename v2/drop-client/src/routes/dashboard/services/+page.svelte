<script lang="ts">
	import * as Breadcrumb from '@/components/ui/breadcrumb/index.js';
	import * as DropdownMenu from '@/components/ui/dropdown-menu/index.js';
	import * as Card from '@/components/ui/card/index.js';
	import { Button } from '@/components/ui/button/index.js';
	import { Search } from 'lucide-svelte';
	import Input from '@/components/ui/input/input.svelte';

	let services = [
		{
			id: 1,
			name: 'Dry Cleaning',
			description: 'Professional dry cleaning for all types of fabrics.',
			price: '$10 per item',
			image: '/images/dry-cleaning.jpg'
		},
		{
			id: 2,
			name: 'Laundry Service',
			description: 'Wash, dry, and fold services.',
			price: '$15 per load',
			image: '/images/laundry-service.jpg'
		},
		{
			id: 3,
			name: 'Dry Cleaning',
			description: 'Professional dry cleaning for all types of fabrics.',
			price: '$10 per item',
			image: '/images/dry-cleaning.jpg'
		},
		{
			id: 4,
			name: 'Laundry Service',
			description: 'Wash, dry, and fold services.',
			price: '$15 per load',
			image: '/images/laundry-service.jpg'
		},
		{
			id: 5,
			name: 'Dry Cleaning',
			description: 'Professional dry cleaning for all types of fabrics.',
			price: '$10 per item',
			image: '/images/dry-cleaning.jpg'
		},
		{
			id: 6,
			name: 'Laundry Service',
			description: 'Wash, dry, and fold services.',
			price: '$15 per load',
			image: '/images/laundry-service.jpg'
		}
		// Add more services here
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
	<h1>Services</h1>

	<main>
		<h1 class="mb-8 text-center text-3xl font-bold">Our Services</h1>

		<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
			<Card.Root class="sm:col-span-2">
				<Card.Header class="pb-3">
					<Card.Title>New Services</Card.Title>
					<Card.Description class="max-w-lg text-balance leading-relaxed">
						Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful
						Analysis.
					</Card.Description>
				</Card.Header>
				<Card.Footer>
					<Button>Create New Services</Button>
				</Card.Footer>
			</Card.Root>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each services as service}
				<div class="rounded-lg bg-accent p-6 shadow-md">
					<img
						src={service.image}
						alt={service.name}
						class="mb-4 h-48 w-full rounded-md object-cover"
					/>
					<h2 class="mb-2 text-xl font-semibold">{service.name}</h2>
					<p class="mb-4 text-gray-700">{service.description}</p>
					<p class="mb-4 font-bold text-gray-900">{service.price}</p>
					<button class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						>Book Now</button
					>
				</div>
			{/each}
		</div>

		<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
			{#each services as service}
				<Card.Root class="sm:col-span-2">
					<Card.Header class="pb-3">
						<img
							src={service.image}
							alt={service.name}
							class="mb-4 h-48 w-full rounded-md object-cover"
						/>

						<Card.Title>{service.name}</Card.Title>
						<Card.Description class="max-w-lg text-balance leading-relaxed">
							<span class="flex">{service.price}</span>
							{service.description}
						</Card.Description>
					</Card.Header>
					<Card.Footer>
						<Button>Create New Services</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</main>
</div>
