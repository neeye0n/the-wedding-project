<script lang="ts">
	import { DateTime } from 'luxon';

	export let weddingPlace: string;
	export let weddingDateTime: DateTime;
	export let addressLine1: string;
	export let addressLine2: string;
	export let mapLink: string;
	export let calendarInvite: string;

	let weddingDate = (): string => {
		if (weddingDateTime.isValid) {
			return weddingDateTime.toFormat('cccc, MMMM dd, yyyy');
		}

		return '00 | 00 | 0000';
	};

	let timeString = (): string => {
		if (weddingDateTime.isValid) {
			return weddingDateTime.toFormat('hh:mm a');
		}

		return '00:00';
	};
</script>

<div class="flex flex-col items-center justify-center text-center relative font-cormorantG">
	<p class="bigtext">
		The wedding will take place at a tranquil resort on the outskirts of {weddingPlace}.
	</p>
	<div class="divider" />
	<p class="subtext">
		We invite you to celebrate with us in this serene location!
		<br />
		<span class="font-semibold">{weddingDate()} ~ {timeString()} at {addressLine1}</span>
		<br />
		{addressLine2}
	</p>
	<p class="details font-avenir pt-4 leading-loose">
		<a href={mapLink} target="_blank">
			<i class="opacity-60 fa fa-map-marker pr-2 text-secondary-900" />Open in Maps</a
		>
		<br />
		<a href={calendarInvite} target="_blank"
			><i class="opacity-60 fa fa-calendar-plus-o pr-2 text-secondary-900" />Add to Calendar</a
		>
	</p>
</div>

<style>
	p.bigtext {
		@apply text-7xl p-0 m-0 leading-snug;
	}

	div.divider {
		@apply w-1/4 border-b border-primary-900 mb-[2rem] mt-[5rem];
	}

	p.subtext {
		@apply text-2xl m-0 leading-relaxed;
	}

	p.details a,
	p.details a:visited,
	p.details a:any-link {
		@apply text-base text-secondary-400 underline;
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
			@apply text-sm;
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
			@apply text-sm;
		}
	}
</style>
