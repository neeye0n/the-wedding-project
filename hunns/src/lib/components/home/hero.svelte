<script lang="ts">
	import '../../../styles/animationStyles.css';
	import { DateTime } from 'luxon';

	export let groom: string;
	export let bride: string;
	export let dateString: string;

	function formatedDate(): string {
		const parsedDate = DateTime.fromISO(dateString);

		if (parsedDate.isValid) {
			return parsedDate.toFormat('MM | dd | yyyy');
		}
		return '00 | 00 | 0000';
	}
</script>

<div class="focus-in dur-1 text-secondary-50">
	<h1 class="font-amalfiCoast text-[5rem] leading-4 text-center tracking-wider">
		{groom} & {bride}
	</h1>
	<p class="font-belganAesthetic text-3xl mt-16">{formatedDate()}</p>
</div>

<style>
	@media (max-width: 1200px) {
		h1 {
			@apply text-[4rem];
		}
	}

	@media (max-width: 992px) {
		h1 {
			@apply text-4xl;
		}
	}

	@media (max-width: 768px) {
		h1 {
			@apply text-4xl;
		}
	}

	@media (max-width: 576px) {
		h1 {
			@apply text-3xl;
		}
	}
</style>
