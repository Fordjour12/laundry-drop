<script lang="ts">
	import * as Resizable from '@/components/resizable/index';
	import Nav from '../(component)/nav.svelte';
	import { menuRoutes } from '../config';

	export let defaultLayout = [265, 440, 655];
	export let defaultCollapsed: boolean | undefined = false;
	export let navCollapsedSize: number;

	let isCollapsed = defaultCollapsed;

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}

	function onCollapse() {
		isCollapsed = true;
		document.cookie = `PaneForge:collapsed=${true}`;
	}

	function onExpand() {
		isCollapsed = false;
		document.cookie = `PaneForge:collapsed=${false}`;
	}
</script>

<Resizable.PaneGroup
	{onLayoutChange}
	direction="horizontal"
	class="h-full max-h-[800px] items-stretch"
>
	<Resizable.Pane
		defaultSize={defaultLayout[0]}
		collapsedSize={navCollapsedSize}
		collapsible
		minSize={15}
		maxSize={20}
		{onCollapse}
		{onExpand}
	>
		<Nav isCollapsed={isCollapsed || false} routes={menuRoutes} />
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={defaultLayout[1]} minSize={30}>
		<slot />
	</Resizable.Pane>
</Resizable.PaneGroup>
