<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
</script>

<div class="h-screen w-screen bg-[url('/bgImage.jpg')] bg-cover p-4">
	<div class="flex h-full w-[450px] flex-col justify-center rounded-xl bg-neutral-800 px-6">
		<div class="flex flex-col items-start px-6 py-5">
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
				Log In
			</h1>
			<p class="leading-7 text-white [&:not(:first-child)]:mt-6">
				Enter your details to sign in to your Laundry Service
			</p>
		</div>
		<form class="px-6" method="post">
			<div class="pb-3">
				<Label for="Company" class="text-white">Email</Label>
				<Input name="name" id="name" type="text" placeholder="AcmeLnd@laundry.com" class="mt-2" />
			</div>
			<div class="pb-4">
				<Label for="Company" class="text-white">Password</Label>
				<Input name="name" id="name" type="text" placeholder="********" class="mt-2" />
			</div>

			<small class="flex justify-end pb-2">
				<a href="/reset" class="flex font-bold text-white">Forgot Password?</a>
			</small>

			<Button class="w-full font-bold">Login</Button>
		</form>
	</div>
</div>
