<script lang="ts">
	import * as Form from '@/components/ui/form';
	import { Input } from '@/components/ui/input/index';
	import { Label } from '@/components/ui/label/index';
	import { Textarea } from '@/components/ui/textarea/index';
	import { fileProxy, superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { serviceFormSchema, type ServiceFormSchema } from './schema';

	export let data: SuperValidated<Infer<ServiceFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(serviceFormSchema)
	});

	const { form: formData, enhance } = form;
	const file = fileProxy(form, 'image');
</script>

<form method="POST" use:enhance enctype="multipart/form-data">
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
			<input
				{...attrs}
				type="file"
				name="image"
				bind:files={$file}
				accept="image/**"
				autocomplete="off"
				class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
				class=" appearance-none "
			/>
		</Form.Control>
		<Form.Description>This displays the price of the service.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full font-bold">Create Service</Form.Button>
</form>
