<script lang="ts">
	import { Button } from '@/components/button';

	import { onMount } from 'svelte';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let words = [
		'Welcome to Laundry Drop!',
		'',
		"We're delighted to have you. Let's make laundry a breeze.",
		'',
		'To get started,',
		'',
		'Create an account or Sign in'
	];

	let animate = false;

	onMount(() => {
		animate = true;
	});
</script>

<div class="flex items-center justify-between overflow-hidden">
	<img src="/help-desk.jpeg" class=" h-screen w-[800px] object-cover" alt="help-desk lady" />

	<div class="grid place-content-center items-center overflow-hidden font-raleway text-2xl">
		{#each words as word, i}
			{#if animate}
				<div
					class="text-center"
					in:fly={{ y: 100, delay: 400 * i, duration: 500, easing: backOut }}
				>
					{#if word === 'Create an account or Sign in'}
						<span>
							<Button href="register">Create an account</Button> or <Button href="/login"
								>Sign in</Button
							>
						</span>
					{:else}
						<p class="text-center">
							{#if i === 0}
								<span class="text-4xl font-extrabold">{word}</span>
							{:else}
								{word}
							{/if}
						</p>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
</div>
