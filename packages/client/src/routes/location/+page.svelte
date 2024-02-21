<script>
	import { onMount } from 'svelte';

	onMount(() => {
		function geoFindMe() {
			const status = document.querySelector('#status');
			const mapLink = document.querySelector('#map-link');

			// @ts-ignore
			mapLink.href = '';
			// @ts-ignore
			mapLink.textContent = '';

			// @ts-ignore
			function success(position) {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;

				// @ts-ignore
				status.textContent = '';
				// @ts-ignore
				mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
				// @ts-ignore
				mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
			}

			function error() {
				// @ts-ignore
				status.textContent = 'Unable to retrieve your location';
			}

			if (!navigator.geolocation) {
				// @ts-ignore
				status.textContent = 'Geolocation is not supported by your browser';
			} else {
				// @ts-ignore
				status.textContent = 'Locating…';
				navigator.geolocation.getCurrentPosition(success, error);
			}

		}

		// @ts-ignore
		document.querySelector('#find-me').addEventListener('click', geoFindMe);
	});
</script>

<main>
	<h1>Location</h1>
	<p>This is the location page.</p>

	<button id="find-me">Show my location</button><br />
	<p id="status"></p>
	<a id="map-link" target="_blank"></a>
</main>
