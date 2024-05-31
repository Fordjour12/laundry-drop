<script>
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '@/components/ui/sonner/index';
	import '../app.pcss';
</script>

<ModeWatcher />
<Toaster />
<slot></slot>
