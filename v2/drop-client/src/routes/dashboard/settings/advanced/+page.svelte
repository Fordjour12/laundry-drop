<script lang="ts">
	import { Button } from '@/components/ui/button/index';
	import { Input } from '@/components/ui/input/index';
	import { Label } from '@/components/ui/label/index';

	//TODO:load placeholder from the sessions or store something
</script>

<div>
	<h2 class="pb-3 text-xl">Account Deletions</h2>
	<Label for="email">Your email address</Label>
	<Input placeholder="testing@testing.com" />

	<div class="flex justify-end py-3">
		<Button variant="destructive">Delete Account</Button>
	</div>
</div>
