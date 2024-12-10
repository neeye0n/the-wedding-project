<script lang="ts">
	import { DateTime } from 'luxon';

	export let description: string;
	export let dateString: string;
	export let timeString: string;
	export let addressLine1: string;
	export let addressLine2: string;
	export let mapLink: string;

	function formatedDate(): string {
		const parsedDate = DateTime.fromISO(dateString);

		if (parsedDate.isValid) {
			return parsedDate.toFormat('cccc, MMMM dd, yyyy');
		}
		return '00 | 00 | 0000';
	}
</script>

<div class="flex flex-col items-center justify-center text-center relative font-didotHTF">
	<p class="bigtext">
		{description}
	</p>
	<div class="divider" />
	<p class="subtext">
		<span class="font-semibold">{formatedDate()} ~ {timeString} at {addressLine1}</span>
		<br />
		{addressLine2}
	</p>
	<p class="details">
		<a href={mapLink} target="_blank">Open in Maps</a>
	</p>
</div>

<style>
	p.bigtext {
		@apply text-7xl p-0 m-0;
	}

	div.divider {
		@apply w-1/4 border-b border-primary-900 mb-[2rem] mt-[5rem];
	}

	p.subtext {
		@apply text-2xl m-0;
	}

	p.details a,
	p.details a:visited,
	p.details a:any-link {
		@apply text-2xl text-secondary-400 underline;
	}

	@media (max-width: 992px) {
		p.bigtext {
			@apply text-5xl;
		}
		p.subtext {
			@apply text-xl;
		}
		p.details a,
		p.details a:visited,
		p.details a:any-link {
			@apply text-xl;
		}
	}

	@media (max-width: 768px) {
		p.bigtext {
			@apply text-4xl;
		}
		p.subtext {
			@apply text-lg;
		}
		p.details a,
		p.details a:visited,
		p.details a:any-link {
			@apply text-lg;
		}
	}
</style>
