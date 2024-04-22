<script>
	import GridAndDotBackground from '@/components/GridAndDotBackground/GridAndDotBackground.svelte';
	import Button from '@/components/button/button.svelte';
</script>

<GridAndDotBackground>
	<div class="relative h-screen w-screen rounded-md p-4">
		<div class="float-end">
			<Button href="/register">Get Started</Button>
		</div>

		<div class="flex h-[90vh] w-[90vw] flex-col items-center justify-center text-center">
			<div class="">
				<span>Superpowered </span>
				<h1 class="text-8xl font-extrabold">Laundry Droping</h1>
				<div class="mt-4">
					<p class="text-xl">
						Let your eyes feast on the stunning beauty of gradient colors.
					</p>
					<small class="mb-3">10x your productivity with AI. </small>
				</div>
			</div>
		</div>
	</div>
</GridAndDotBackground>
