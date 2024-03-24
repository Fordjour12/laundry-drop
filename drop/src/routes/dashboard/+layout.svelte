<script lang="ts">
	import type { LayoutData } from './$types';
	import DaBoard from './(component)/daboard.svelte';

	export let data: LayoutData;
</script>

<DaBoard defaultCollapsed={data.collapsed} defaultLayout={data.layout} navCollapsedSize={4} />
