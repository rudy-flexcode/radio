<script lang="ts">
	import { stations, type Station } from '$lib/stations';
	import logo from '$lib/assets/logo-kreol-tech.png';

	let audio = $state<HTMLAudioElement | null>(null);
	let currentId = $state<string | null>(null);
	let isPlaying = $state(false);
	let isBuffering = $state(false);
	let errorMessage = $state('');

	const currentStation = $derived(() =>
		stations.find((station) => station.id === currentId)
	);

	const selectStation = async (station: Station) => {
		if (!station.stream) {
			errorMessage = 'Ajoute le lien du flux pour cette radio dans stations.ts.';
			return;
		}

		if (!audio) {
			errorMessage = 'Le lecteur audio n est pas pret.';
			return;
		}

		errorMessage = '';

		if (currentId === station.id) {
			if (audio.paused) {
				await audio.play();
			} else {
				audio.pause();
			}
			return;
		}

		currentId = station.id;
		isBuffering = true;
		try {
			const streamUrl = station.proxy
				? `/api/stream?url=${encodeURIComponent(station.stream)}`
				: station.stream;

			audio.src = streamUrl;
			await audio.play();
		} catch (error) {
			errorMessage = 'Lecture impossible. Verifie le lien du flux.';
		} finally {
			isBuffering = false;
		}
	};

	const stopPlayback = () => {
		if (!audio) return;
		audio.pause();
		audio.currentTime = 0;
		isPlaying = false;
		currentId = null;
	};

	const handlePlaying = () => {
		isPlaying = true;
		isBuffering = false;
	};

	const handlePause = () => {
		isPlaying = false;
	};

	const handleWaiting = () => {
		isBuffering = true;
	};

	const handleError = () => {
		isBuffering = false;
		errorMessage = 'La radio ne repond pas pour le moment.';
	};
</script>

<svelte:head>
	<title>Radio Reunion</title>
</svelte:head>

<main class="page">
	<header class="hero">
		<img class="logo" src={logo} alt="Kreol Tech" />
		<h1>Radio de La Reunion</h1>
	</header>

	<section class="player">
		<div class="status">
			<p class="label">En cours</p>
			<p class="value">
				{#if currentStation}
					{currentStation.name}
				{:else}
					Aucune radio selectionnee
				{/if}
			</p>
			{#if isBuffering}
				<p class="hint">Chargement du flux...</p>
			{:else if isPlaying}
				<p class="hint">Lecture en cours</p>
			{:else}
				<p class="hint">Appuie sur une station pour demarrer</p>
			{/if}
		</div>
		<div class="controls">
			<button class="ghost" type="button" on:click={stopPlayback} disabled={!currentId}>
				Stop
			</button>
		</div>
	</section>

	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}

	<section class="stations">
		{#each stations as station}
			<button
				class="station"
				style={`--accent: ${station.accent}`}
				type="button"
				on:click={() => selectStation(station)}
				aria-pressed={currentId === station.id}
			>
				<span class="badge">{station.short}</span>
				<span class="name">{station.name}</span>
				<span class="desc">{station.description}</span>
			</button>
		{/each}
	</section>

	<audio
		bind:this={audio}
		preload="none"
		on:playing={handlePlaying}
		on:pause={handlePause}
		on:waiting={handleWaiting}
		on:error={handleError}
	/>
</main>
