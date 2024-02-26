<script lang="ts">
	import L from 'leaflet';
	import { getContext, onDestroy, onMount, setContext } from 'svelte';

	export let height: number;
	export let width: number;
	export let latLng: L.LatLngExpression;

	let marker: L.Marker | undefined;
	let markerElement: HTMLDivElement;

	const { getMap }: { getMap: () => L.Map | undefined } = getContext('map');
	const map = getMap();

	// layer is a context that is used to get the marker
	setContext('layer', {
		getLayer: () => marker
	});

	onMount(() => {
		if (map) {
			let icon = L.divIcon({
				className: 'marker-icon',
				iconSize: L.point(width, height),
				html: markerElement
			});
			marker = L.marker(latLng, { icon }).addTo(map);
		}
	});

	onDestroy(() => {
		marker?.remove();
		marker = undefined;
	});
</script>

<div bind:this={markerElement}>
	{#if marker}
		<slot />
	{/if}
</div>
