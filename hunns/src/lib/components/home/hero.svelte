<script lang="ts">
	import '../../../styles/animationStyles.css';
	import Banner from '$lib/images/banner.png';
	import { DateTime } from 'luxon';

	export let weddingDate: DateTime;

	let formattedDate = (): string => {
		if (weddingDate.isValid) {
			return weddingDate.toFormat('MM | dd | yyyy');
		}
		return '00 | 00 | 0000';
	};
</script>

<div class="focus-in dur-1 text-secondary-50">
	<img src={Banner} alt="Joemar & Sarrie" />
	<p class="font-belganAesthetic text-4xl mt-16">{formattedDate()}</p>
</div>

<style>
	@media (max-width: 576px) {
		p {
			@apply text-2xl;
		}
	}
</style>
