<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import type { PageData } from './$types';
	import SettingsForm from './settings/settings-form.svelte';
	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Profile</h3>
		<p class="text-muted-foreground text-sm">This is how others will see you on the site.</p>
	</div>
	<Separator />
	<SettingsForm data={data.form} />
</div>
