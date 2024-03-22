<script lang="ts">
	import * as Resizable from '@/components/resizable/index.js';

	export let defaultCollasped = false;

	let isCollapsed = defaultCollasped;

	function onCollapse() {
		isCollapsed = true;
		document.cookie = `PaneForge:Layout=${true}`;
	}

	function onExpand() {
		isCollapsed = false;
		document.cookie = `PaneForge:Layout=${false}`;
	}
</script>

<Resizable.PaneGroup direction="horizontal" class="min-h-screen min-w-full rounded-lg border">
	<Resizable.Pane defaultSize={15}>
		<div>navigation bar</div>
	</Resizable.Pane>

	<Resizable.Handle withHandle />

	<Resizable.Pane defaultSize={85}>
		<slot />
	</Resizable.Pane>
</Resizable.PaneGroup>
