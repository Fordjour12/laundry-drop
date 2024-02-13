<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import NotificationsForm from '../(components)/notifications-form.svelte';
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Notifications</h3>
		<p class="text-sm text-muted-foreground">Configure how you receive notifications.</p>
	</div>
	<Separator />
	<NotificationsForm />
	<!-- <NotificationsForm data={data.form} /> -->
</div>
