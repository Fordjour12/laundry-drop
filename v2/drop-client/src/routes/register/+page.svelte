<script lang="ts">
	import type { PageData } from './$types';
	import RegisterForm from './register-form.svelte';
	export let data: PageData;
</script>

<div class="h-screen w-screen bg-[url('/bgImage.jpg')] bg-cover p-4">
	<div class="flex h-full w-[450px] flex-col justify-center rounded-xl bg-neutral-800 px-6">
		<div class="flex flex-col items-start px-6 py-3">
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight text-white lg:text-4xl">
				Sign Up
			</h1>
			<p class="leading-7 text-white [&:not(:first-child)]:mt-6">
				Create New Account for your Laundry Service
			</p>
		</div>

		<RegisterForm data={data.form} />

		<small class="leading-7 text-white [&:not(:first-child)]:mt-6">
			By signing up, you agree to our <a href="/terms" class="font-bold">Terms of Use</a> and
			<a href="/policy" class="font-bold">Privacy Policy</a>
		</small>
	</div>
</div>
