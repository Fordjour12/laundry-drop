<script lang="ts">
	import { Separator } from '@/components/ui/separator/index.js';
	import SidebarNav from './(components)/sidebar-nav.svelte';

	const sidebarNavItems = [
		{
			title: 'Profile',
			href: '/dashboard/settings'
		},
		{
			title: 'Account',
			href: '/dashboard/settings/account'
		},
		{
			title: 'Appearance',
			href: '/dashboard/settings/appearance'
		},
		{
			title: 'Notifications',
			href: '/dashboard/settings/notifications'
		},
		{
			title: 'Display',
			href: '/examples/forms/display'
		},
		{
			title: 'Security',
			href: '/dashboard/settings/security'
		},
		{
			title: 'Integrations',
			href: '/dashboard/settings/integrations'
		},
		{
			title: 'Support',
			href: '/dashboard/settings/support'
		},
		{
			title: 'Organizations',
			href: '/dashboard/settings/organizations'
		},
		{
			title: 'Advanced',
			href: '/dashboard/settings/advanced'
		},
		{
			title: 'Billing',
			href: '/dashboard/settings/billing'
		}
	];
</script>

<!-- <div class="md:hidden"> -->
<!-- <enhanced:img src={FormsLight} alt="Forms" class="block dark:hidden" /> -->
<!-- <enhanced:img src={FormsDark} alt="Forms" class="hidden dark:block" /> -->
<!-- </div> -->
<div class="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
	<div class="hidden space-y-6 p-10 pb-16 md:block">
		<div class="space-y-0.5">
			<h2 class="text-2xl font-bold tracking-tight">Settings</h2>
			<p class="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
		</div>
		<Separator class="my-6" />
		<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
			<aside class="-mx-4 lg:w-1/5">
				<SidebarNav items={sidebarNavItems} />
			</aside>
			<div class="flex-1 lg:max-w-2xl">
				<slot />
			</div>
		</div>
	</div>
</div>
