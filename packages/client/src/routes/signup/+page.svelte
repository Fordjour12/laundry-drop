<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="h-screen w-screen bg-[url('/bgImage.jpg')] bg-cover p-4">
	<!-- h-full must be removed also center the container  -->
	<!-- try add some transitions to make it smooth -->
	<div class="flex h-full w-[450px] flex-col justify-center rounded-xl bg-neutral-800 px-6">
		<div class="flex flex-col items-start px-6 py-3">
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
				Sign Up
			</h1>
			<p class="leading-7 text-white [&:not(:first-child)]:mt-6">
				Create New Account for your Laundry Service
			</p>
		</div>

		{#if form?.success}
			<p class="px-6 pb-2 text-sm leading-4 text-green-600 [&:not(:first-child)]:mt-6">
				Account created successfully, {form.data.name}
			</p>
			<Button class="w-full gap-4" href="/login">
				<svg viewBox="0 0 24 24" class="w-7" fill="none" xmlns="http://www.w3.org/2000/svg"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9.44661 15.3975C9.11385 15.1508 8.64413 15.2206 8.39747 15.5534C8.15082 15.8862 8.22062 16.3559 8.55339 16.6025C9.5258 17.3233 10.715 17.75 12 17.75C13.285 17.75 14.4742 17.3233 15.4466 16.6025C15.7794 16.3559 15.8492 15.8862 15.6025 15.5534C15.3559 15.2206 14.8862 15.1508 14.5534 15.3975C13.825 15.9373 12.9459 16.25 12 16.25C11.0541 16.25 10.175 15.9373 9.44661 15.3975Z"
							fill="#ffffff"
						></path>
					</g></svg
				>
				<p class="font-bold">Go Home</p>
			</Button>
		{:else}
			<form class="px-6" action="?/register" method="post">
				<div class="pb-3">
					<Label for="Company" class="text-white">Company Name</Label>
					<Input
						name="name"
						id="name"
						type="text"
						placeholder="Acme Laundry Services"
						class="mt-2"
					/>
				</div>
				<div class="pb-3">
					<Label for="Company Email" class="text-white">Email</Label>
					<Input
						name="email"
						id="email"
						type="email"
						placeholder="AcmeLnd@laundry.com"
						class="mt-2"
					/>
				</div>
				<div class="pb-3">
					<Label for="Password" class="text-white">Password</Label>
					<Input
						name="password"
						id="password"
						type="password"
						placeholder="********"
						class="mt-2"
					/>
					<small class="text-gray-300">
						much be at least 8 characters with 1 symbol, capital letter
					</small>
				</div>

				<Button class="w-full" type="submit">Create Account</Button>
			</form>
			<small class="leading-7 text-white [&:not(:first-child)]:mt-6">
				By signing up, you agree to our <a href="/terms" class="font-bold">Terms of Use</a> and
				<a href="/policy" class="font-bold">Privacy Policy</a>
			</small>
		{/if}
	</div>
</div>
