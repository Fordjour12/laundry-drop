<script lang="ts">
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import { onDestroy, onMount, setContext } from 'svelte';

	let map: L.Map | undefined;
	let mapElement: HTMLDivElement;

	export let bounds: L.LatLngBoundsExpression | undefined = undefined;
	export let view: L.LatLngExpression | undefined = undefined;
	export let zoom: number | undefined = undefined;

	onMount(() => {
		if (!bounds && (!view || !zoom)) {
			throw new Error('You must provide either `bounds` or `view` and `zoom`');
		}

		map = L.map(mapElement);

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});

	setContext('map', {
		getMap: () => map
	});

	$: if (map && bounds) {
		map.fitBounds(bounds);
	} else if (map && view && zoom) {
		map.setView(view, zoom);
	}
</script>

<div class="h-full w-full" bind:this={mapElement}>
	{#if map}
		<slot />
	{/if}
</div>
