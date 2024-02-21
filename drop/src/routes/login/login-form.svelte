<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginFormSchema, type LoginFormSchema } from './schema';

	export let data: SuperValidated<Infer<LoginFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(loginFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="px-6 text-white">
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input {...attrs} bind:value={$formData.email} placeholder="AcmeLnd@laundry.com" />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.password}
				type="password"
				placeholder="*************"
			/>
		</Form.Control>
		<Form.FormDescription
			>Must contain at least 8 characters with one capital, number and symbol
		</Form.FormDescription>
		<Form.FieldErrors />
	</Form.Field>

	<!-- forgot Password -->
	<small class="flex justify-end pb-2">
		<a href="/reset" class="flex font-bold text-white">Forgot Password?</a>
	</small>

	<Form.Button class="w-full font-bold">Log In</Form.Button>
</form>
