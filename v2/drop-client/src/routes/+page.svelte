<script lang="ts">
	import GridAndDotBackground from '@/components/ui/GridAndDotBackground/GridAndDotBackground.svelte';
	import { Button } from '@/components/ui/button';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<GridAndDotBackground>
	<div class="relative h-screen w-screen rounded-md p-4">
		<div class="float-end">
			{#if data.validSession}
				<div>
					<Button href="/dashboard" class="">Get Dashboard</Button>
				</div>
			{:else}
				<div>
					<Button href="/register">Get Started</Button>
				</div>
			{/if}
		</div>
		<div class="flex h-[90vh] w-[90vw] flex-col items-center justify-center text-center">
			<small class="uppercase">SuperPowered</small>
		</div>
	</div>
</GridAndDotBackground>
