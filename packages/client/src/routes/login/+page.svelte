<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="h-screen w-screen bg-[url('/bgImage.jpg')] bg-cover p-4">
	<div class="flex h-full w-[450px] flex-col justify-center rounded-xl bg-neutral-800 px-6">
		<div class="flex flex-col items-start px-6 py-4">
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
				Log In
			</h1>
			<p class="leading-7 text-white [&:not(:first-child)]:mt-6">
				Enter your details to sign in to your Laundry Service
			</p>
		</div>

		{#if form?.message}
			<p class="px-6 pb-2 text-sm leading-4 text-red-600 [&:not(:first-child)]:mt-6">
				{form?.message}
			</p>
		{/if}

		<form class="px-6" method="post" action="?/login">
			<div class="pb-3">
				<Label for="Company" class="text-white">Email</Label>
				<Input
					name="email"
					id="email"
					type="email"
					placeholder="AcmeLnd@laundry.com"
					class="mt-2"
				/>
			</div>
			<div class="pb-4">
				<Label for="Company" class="text-white">Password</Label>
				<Input name="password" id="pasword" type="password" placeholder="********" class="mt-2" />
			</div>

			<small class="flex justify-end pb-2">
				<a href="/reset" class="flex font-bold text-white">Forgot Password?</a>
			</small>

			<Button class="w-full font-bold" type="submit">Login</Button>
		</form>
		<small class="pt-4 text-center text-white"
			>Don't have an account <Button
				href="/signup"
				variant="link"
				class="text-[#afc0b0] underline underline-offset-4">Create Account</Button
			></small
		>
	</div>
</div>
