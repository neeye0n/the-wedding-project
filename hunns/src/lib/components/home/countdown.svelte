<script lang="ts">
	import { DateTime, Duration } from 'luxon';
	import { onMount } from 'svelte';

	export let weddingDate: DateTime;

	let days: string;
	let hours: string;
	let minutes: string;
	let seconds: string;

	let diff: Duration;
	let remaining: string;

	onMount(() => {
		const interval = setInterval(() => {
			diff = weddingDate.diffNow();
			remaining = diff.toFormat(`d'd' h'h' m'm' ss's`);

			let dateStr = remaining.split(' ');
			days = removeChars(dateStr[0]);
			hours = removeChars(dateStr[1]);
			minutes = removeChars(dateStr[2]);
			seconds = removeChars(dateStr[3]);
		}, 1000);

		return () => clearInterval(interval);
	});

	function removeChars(str: string): string {
		return str.replace(/\D/g, '');
	}
</script>

<div
	class="flex flex-col items-center justify-center text-center relative font-didotHTF text-primary-50"
>
	<div class="text-7xl pb-8 pt-8">
		<h1>The Wedding Countdown</h1>
	</div>
	<div class="countdownContainer">
		<div class="singleCountdown">
			<h3>{days}</h3>
			<span>Days</span>
		</div>
		<div class="singleCountdown">
			<h3>{hours}</h3>
			<span>Hours</span>
		</div>
		<div class="singleCountdown">
			<h3>{minutes}</h3>
			<span>Minutes</span>
		</div>
		<div class="singleCountdown">
			<h3>{seconds}</h3>
			<span>Seconds</span>
		</div>
	</div>
</div>

<style>
	.singleCountdown {
		@apply pl-8 pr-8 text-center;
	}

	.countdownContainer {
		@apply flex justify-evenly text-5xl;
	}

	h3 {
		@apply font-semibold text-6xl;
	}

	span {
		@apply text-3xl;
	}

	@media (max-width: 992px) {
		h1 {
			@apply text-5xl;
		}

		.countdownContainer {
			@apply flex flex-col text-5xl;
		}

		.singleCountdown {
			@apply pb-8;
		}
	}
</style>
