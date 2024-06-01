<script lang="ts">
	import type { PageData } from './$types';
	import LoginForm from './login-form.svelte';
	export let data: PageData;

	import { Button } from '@/components/ui/button';
</script>

<!--bg-[url('/bgImage.jpg')]-->
<div class="h-screen w-screen bg-cover p-4">
	<div class="flex h-full w-[450px] flex-col justify-center rounded-xl bg-neutral-800 px-6">
		<div class="flex flex-col items-start px-6 py-4">
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
				Log In
			</h1>
			<p class="leading-7 text-white [&:not(:first-child)]:mt-6">
				Enter your details to sign in to your Laundry Service
			</p>
		</div>

		<LoginForm data={data.form} />

		<small class="pt-4 text-center text-white"
			>Don't have an account <Button
				href="/register"
				variant="link"
				class="text-[#afc0b0] underline underline-offset-4">Create Account</Button
			></small
		>
	</div>
</div>
