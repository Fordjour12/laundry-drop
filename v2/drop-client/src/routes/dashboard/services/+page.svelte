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

	<main class="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
		<div class="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
			<!--	<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
				<Card.Root class="sm:col-span-3">
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
					-->

			<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
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
							<Button>Book Now</Button>
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		</div>
	</main>
</div>
