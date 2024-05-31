<script lang="ts">
	import { Separator } from '@/components/ui/separator/index.js';
	import type { PageData } from './$types.js';
	import AccountForm from './account-form.svelte';

	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Account</h3>
		<p class="text-sm text-muted-foreground">
			Update your account settings. Set your preferred language and timezone.
		</p>
	</div>
	<Separator />
	<AccountForm data={data.form} />
</div>
