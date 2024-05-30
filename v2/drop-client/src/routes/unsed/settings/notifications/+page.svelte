<script lang="ts">
	import { Separator } from '@/components/ui/separator/index.js';
	import type { PageData } from './$types.js';
	import NotificationsForm from './notifications-form.svelte';

	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Notifications</h3>
		<p class="text-sm text-muted-foreground">Configure how you receive notifications.</p>
	</div>
	<Separator />
	<NotificationsForm data={data.form} />
</div>
