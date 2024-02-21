<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { registerFormSchema, type RegisterFormSchema } from './schema';

	export let data: SuperValidated<Infer<RegisterFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(registerFormSchema)
	});

	const { form: formData, enhance, message } = form;
</script>

<form method="POST" action="?/register" use:enhance class="px-6 text-white">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.name}
				type="text"
				placeholder="Acme Laundry Services"
			/>
		</Form.Control>
		<!-- <Form.Description>Company display name.</Form.Description> -->
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Company Email</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.email}
				type="email"
				placeholder="AcmeLnd@laundry.com"
			/>
		</Form.Control>
		<Form.Description>Company email</Form.Description>
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
			>Must contain at least 8 characters with 1 capital, number and symbol
		</Form.FormDescription>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="w-full font-bold">Create Account</Form.Button>
</form>
