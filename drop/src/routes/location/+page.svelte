<!-- <script lang="ts">
	import Leaflet from '$lib/components/map/Leaflet.svelte';
	import Marker from '$lib/components/map/Marker.svelte';

	export let initialView: [number, number];
	// = [5.6037, -0.187];
	export let markerLocation: [number, number][];
	// = [[5.6037, -0.187]];

	// onMount(() => {
	function geoLocate() {
		function success(position: GeolocationPosition) {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;

			// status.textContent = '';
			// mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
			// mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
			initialView = [latitude, longitude];

			return initialView;
		}

		function error() {
			// status.textContent = 'Unable to retrieve your location';
			alert('Unable to retrieve your location');
		}

		if (!navigator.geolocation) {
			alert('Geolocation is not supported by your browser');
		} else {
			// status.textContent = 'Locating…';
			navigator.geolocation.getCurrentPosition(success, error);
		}
	}

	$: geoLocate();
	// });
</script>

<div class="h-screen w-full">
	<Leaflet view={initialView} zoom={13}>
		{#each markerLocation as location}
			<Marker latLng={location} width={30} height={30}>
				<svg viewBox="0 0 24 24" fill="none">
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						<path
							opacity="0.5"
							d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
							fill="#1C274C"
						></path>
						<path
							d="M7.25 6C7.25 5.58579 7.58579 5.25 8 5.25H16C16.4142 5.25 16.75 5.58579 16.75 6C16.75 6.41421 16.4142 6.75 16 6.75H8C7.58579 6.75 7.25 6.41421 7.25 6Z"
							fill="#1C274C"
						></path>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M17.7138 14.6485C17.7377 14.4356 17.75 14.2193 17.75 14C17.75 10.8244 15.1756 8.25 12 8.25C8.82436 8.25 6.25 10.8244 6.25 14C6.25 17.1756 8.82436 19.75 12 19.75C14.796 19.75 17.1259 17.7544 17.643 15.1098L17.7338 14.6622L17.7138 14.6485ZM8.11547 13.7919C8.00236 13.7191 7.88681 13.6452 7.77104 13.5744C7.98453 11.427 9.79642 9.75 12 9.75C14.3472 9.75 16.25 11.6528 16.25 14L16.25 14.0055C16.1169 13.9816 15.9793 13.9603 15.8461 13.9397L15.8305 13.9373C15.6688 13.9122 15.5091 13.8875 15.3451 13.858C14.6442 13.7317 14.0781 13.7828 13.5869 13.964C13.1303 14.1325 12.786 14.3997 12.5321 14.5969L12.5084 14.6153C12.233 14.8289 12.0529 14.9623 11.83 15.0445C11.6273 15.1193 11.3371 15.168 10.857 15.0814C10.1533 14.9546 9.52387 14.6552 8.9424 14.312C8.69352 14.1652 8.46278 14.0161 8.23511 13.8691L8.11547 13.7919Z"
							fill="#1C274C"
						></path>
					</g>
				</svg>
			</Marker>
		{/each}
	</Leaflet>
</div> -->

<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		function geoFindMe() {
			const status = document.querySelector('#status');
			const mapLink = document.querySelector('#map-link');

			mapLink.href = '';
			mapLink.textContent = '';

			function success(position) {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;

				status.textContent = '';
				mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
				mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
			}

			function error() {
				status.textContent = 'Unable to retrieve your location';
			}

			if (!navigator.geolocation) {
				status.textContent = 'Geolocation is not supported by your browser';
			} else {
				status.textContent = 'Locating…';
				navigator.geolocation.getCurrentPosition(success, error);
			}
		}
		document.querySelector('#find-me').addEventListener('click', geoFindMe);
	});
</script>

<button id="find-me">Show my location</button><br />
2
<p id="status"></p>
<a id="map-link" target="_blank"></a>
