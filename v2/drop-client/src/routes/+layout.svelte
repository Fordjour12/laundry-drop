<script>
	import ModeToggler from '@/components/ui/modeToggler/mode-toggler.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
</script>

<ModeWatcher />
<!-- <ModeToggler /> -->

<slot></slot>
