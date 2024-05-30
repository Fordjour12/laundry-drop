<script lang="ts">
	import NavBar from './(component)/nav.svelte';
	import { routesConfig } from './routesConfig';
</script>


<div class="flex min-h-screen w-full flex-col bg-app-mixed-100">
	<aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-app-mixed-300 sm:flex">
		<NavBar />
	</aside>

	<slot />
</div>
