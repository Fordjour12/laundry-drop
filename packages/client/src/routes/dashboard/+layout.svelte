<script lang="ts">
	import Menu from '$lib/components/sv-component/menu.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: console.log(data.company?.name);
</script>

<main class="flex min-h-screen w-full">
	<Menu cmpName={String(data.company?.name)} />
	<slot />
</main>
