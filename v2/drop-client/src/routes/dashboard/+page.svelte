<script lang="ts">
	import { Badge } from '@/components/ui/badge/index.js';
	import * as Breadcrumb from '@/components/ui/breadcrumb/index.js';
	import { Button } from '@/components/ui/button/index.js';
	import * as Card from '@/components/ui/card/index.js';
	import * as DropdownMenu from '@/components/ui/dropdown-menu/index.js';
	import { Progress } from '@/components/ui/progress/index.js';
	import * as Table from '@/components/ui/table/index.js';
	import * as Tabs from '@/components/ui/tabs/index.js';
	import { File, ListFilter } from 'lucide-svelte';
</script>

<div class="px-2">
	<div class="py-2">
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
	</div>

	<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
		<Card.Root
			class="sm:col-span-2"
			data-x-chunk-name="dashboard-05-chunk-0"
			data-x-chunk-description="A card for an orders dashboard with a description and a button to create a new order."
		>
			<Card.Header class="pb-3">
				<Card.Title>Your Orders</Card.Title>
				<Card.Description class="max-w-lg text-balance leading-relaxed">
					Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.
				</Card.Description>
			</Card.Header>
			<Card.Footer>
				<Button>Create New Order</Button>
			</Card.Footer>
		</Card.Root>
		<Card.Root
			data-x-chunk-name="dashboard-05-chunk-1"
			data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
		>
			<Card.Header class="pb-2">
				<Card.Description>This Week</Card.Description>
				<Card.Title class="text-4xl">$1329</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="text-muted-foreground text-xs">+25% from last week</div>
			</Card.Content>
			<Card.Footer>
				<Progress value={25} aria-label="25% increase" />
			</Card.Footer>
		</Card.Root>
		<Card.Root
			data-x-chunk-name="dashboard-05-chunk-2"
			data-x-chunk-description="A stats card showing this month's total sales in USD, the percentage difference from last month, and a progress bar."
		>
			<Card.Header class="pb-2">
				<Card.Description>This Month</Card.Description>
				<Card.Title class="text-3xl">$5,329</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="text-muted-foreground text-xs">+10% from last month</div>
			</Card.Content>
			<Card.Footer>
				<Progress value={12} aria-label="12% increase" />
			</Card.Footer>
		</Card.Root>
	</div>

	<div>
		<div class="my-3">
			<Tabs.Root value="week">
				<div class="flex items-center">
					<Tabs.List>
						<Tabs.Trigger value="week">Week</Tabs.Trigger>
						<Tabs.Trigger value="month">Month</Tabs.Trigger>
						<Tabs.Trigger value="year">Year</Tabs.Trigger>
					</Tabs.List>
					<div class="ml-auto flex items-center gap-2">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button variant="outline" size="sm" class="h-7 gap-1 text-sm" builders={[builder]}>
									<ListFilter class="h-3.5 w-3.5" />
									<span class="sr-only sm:not-sr-only">Filter</span>
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Label>Filter by</DropdownMenu.Label>
								<DropdownMenu.Separator />
								<DropdownMenu.CheckboxItem checked>Fulfilled</DropdownMenu.CheckboxItem>
								<DropdownMenu.CheckboxItem>Declined</DropdownMenu.CheckboxItem>
								<DropdownMenu.CheckboxItem>Refunded</DropdownMenu.CheckboxItem>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
						<Button size="sm" variant="outline" class="h-7 gap-1 text-sm">
							<File class="h-3.5 w-3.5" />
							<span class="sr-only sm:not-sr-only">Export</span>
						</Button>
					</div>
				</div>
			</Tabs.Root>
		</div>

		<Card.Root>
			<Card.Header class="px-7">
				<Card.Title>Orders</Card.Title>
				<Card.Description>Recent orders from your store.</Card.Description>
			</Card.Header>
			<Card.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Customer</Table.Head>
							<Table.Head class="hidden sm:table-cell">Type</Table.Head>
							<Table.Head class="hidden sm:table-cell">Status</Table.Head>
							<Table.Head class="hidden md:table-cell">Date</Table.Head>
							<Table.Head class="text-right">Amount</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row class="bg-accent">
							<Table.Cell>
								<div class="font-medium">Liam Johnson</div>
								<div class="text-muted-foreground hidden text-sm md:inline">liam@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">Sale</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">
								<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-23</Table.Cell>
							<Table.Cell class="text-right">$250.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Olivia Smith</div>
								<div class="text-muted-foreground hidden text-sm md:inline">olivia@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">Refund</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">
								<Badge class="text-xs" variant="outline">Declined</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-24</Table.Cell>
							<Table.Cell class="text-right">$150.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Liam Johnson</div>
								<div class="text-muted-foreground hidden text-sm md:inline">liam@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">Sale</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">
								<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-23</Table.Cell>
							<Table.Cell class="text-right">$250.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Noah Williams</div>
								<div class="text-muted-foreground hidden text-sm md:inline">noah@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">Subscription</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">
								<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-25</Table.Cell>
							<Table.Cell class="text-right">$350.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Emma Brown</div>
								<div class="text-muted-foreground hidden text-sm md:inline">emma@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">Subscription</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">
								<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-26</Table.Cell>
							<Table.Cell class="text-right">$450.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Liam Johnson</div>
								<div class="text-muted-foreground hidden text-sm md:inline">liam@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">Sale</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">
								<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-23</Table.Cell>
							<Table.Cell class="text-right">$250.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Olivia Smith</div>
								<div class="text-muted-foreground hidden text-sm md:inline">olivia@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">Refund</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">
								<Badge class="text-xs" variant="outline">Declined</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-24</Table.Cell>
							<Table.Cell class="text-right">$150.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Emma Brown</div>
								<div class="text-muted-foreground hidden text-sm md:inline">emma@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">Sale</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">
								<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-26</Table.Cell>
							<Table.Cell class="text-right">$450.00</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
	</div>
</div>
