<script lang="ts">
	import { cn } from '$lib/utils';
	import * as Resizable from '@/components/resizable/index.js';

	export let defaultLayout = [265, 835];
	export let defaultCollasped = false;

	let isCollapsed = defaultCollasped;

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:Layout=${JSON.stringify(sizes)}`;
	}

	function onCollapse() {
		isCollapsed = true;
		document.cookie = `PaneForge:Layout=${true}`;
	}

	function onExpand() {
		isCollapsed = false;
		document.cookie = `PaneForge:Layout=${false}`;
	}
</script>

<Resizable.PaneGroup
	direction="horizontal"
	{onLayoutChange}
	class="min-h-screen min-w-full rounded-lg border"
>
	<Resizable.Pane
		defaultSize={defaultLayout[0]}
		{onCollapse}
		{onExpand}
		minSize={15}
		maxSize={20}
	>
		<div
			class={cn(
				'flex h-[52px] items-center justify-center',
				isCollapsed ? 'h-[52px]' : 'px-2'
			)}
		>
			header
		</div>
	</Resizable.Pane>

	<Resizable.Handle withHandle />

	<Resizable.Pane defaultSize={defaultLayout[1]}>
		<slot />
	</Resizable.Pane>
</Resizable.PaneGroup>
