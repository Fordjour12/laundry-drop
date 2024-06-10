<script lang="ts">
	import * as Form from '@/components/ui/form';
	import { Input } from '@/components/ui/input/index';
	import { Label } from '@/components/ui/label/index';
	import { Textarea } from '@/components/ui/textarea/index';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { serviceFormSchema, type ServiceFormSchema } from './schema';

	export let data: SuperValidated<Infer<ServiceFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(serviceFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Label for="name" class="text-right">Name</Label>
			<Input
				{...attrs}
				bind:value={$formData.name}
				placeholder="Service name here"
				autocomplete="off"
			/>
		</Form.Control>
		<Form.Description>This displays the name of the service.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Label for="description" class="text-right">Description</Label>
			<Textarea
				{...attrs}
				bind:value={$formData.description}
				placeholder="Service description here"
				autocomplete="off"
			/>
		</Form.Control>
		<Form.Description>This displays the description of the service.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="image">
		<Form.Control let:attrs>
			<Label for="image" class="text-right">Image</Label>
			<Input
				{...attrs}
				type="file"
				accept="image/**"
				bind:value={$formData.image}
				autocomplete="off"
			/>
		</Form.Control>
		<Form.Description>This displays the image of the service.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="price">
		<Form.Control let:attrs>
			<Label for="price" class="text-right">Price</Label>
			<Input
				{...attrs}
				bind:value={$formData.price}
				placeholder="Service price here"
				autocomplete="off"
				type="number"
				min="0"
				class="appearance-none"
			/>
		</Form.Control>
		<Form.Description>This displays the price of the service.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full font-bold">Create Service</Form.Button>
</form>

<style globalThis>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
		appearance: none;
	}
</style>
