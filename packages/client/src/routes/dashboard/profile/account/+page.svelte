<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import AccountForm from '../(components)/account-form.svelte';
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Account</h3>
		<p class="text-sm text-muted-foreground">
			Update your account settings. Set your preferred language and timezone.
		</p>
	</div>
	<Separator />
	<AccountForm />
	<!-- <AccountForm data={data.form} /> -->
</div>
