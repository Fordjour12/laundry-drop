<script lang="ts">
	import type { LayoutData } from './$types';
	import Dashboard from './(component)/dashboard.svelte';
	export let data: LayoutData;
</script>

<Dashboard defaultCollapsed={data.collapsed} defaultLayout={data.layout} navCollapsedSize={4}>
	<slot />
</Dashboard>
