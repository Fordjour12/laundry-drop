<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	{#if data}
		<h1>Welcome, {data.company?.name}</h1>
	{/if}
	<form action="/logout" method="post">
		<Button type="submit" class="w-full">Log Out</Button>
	</form>
</main>
