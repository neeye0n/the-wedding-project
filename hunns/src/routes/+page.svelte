<script lang="ts">
	import '../styles/animationStyles.css';
	import type { PageServerData } from './$types';
	import Hero from '$lib/components/home/hero.svelte';
	import Location from '$lib/components/home/location.svelte';
	import Suggestions from '$lib/components/home/suggestions.svelte';
	export let data: PageServerData;
	let texts = data.messages;
</script>

<main class="m-0">
	<section class="hero">
		<Hero groom={texts.Hero.Groom} bride={texts.Hero.Bride} dateString={texts.Hero.WeddingDate} />
		<a href="#welcome" class="absolute bottom-8 focus-in dur-2 text-primary-200">
			<i class="opacity-30 fa fa-2x fa-chevron-down" />
		</a>
	</section>

	<section id="welcome" class="standard variant-filled">
		<Location
			description={texts.Location.Description}
			dateString={texts.Hero.WeddingDate}
			timeString={texts.Location.Time}
			addressLine1={texts.Location.AddressLine1}
			addressLine2={texts.Location.AddressLine2}
			mapLink={texts.Location.MapLink}
		/>
		<a href="#suggestions" class="absolute bottom-8 focus-in dur-2 text-tertiary-900">
			<i class="opacity-30 fa fa-2x fa-chevron-down" />
		</a>
	</section>

	<section id="suggestions" class="standard variant-filled-tertiary">
		<Suggestions />
		<a href="#suggestions" class="absolute bottom-8 focus-in dur-2 text-primary-900">
			<i class="opacity-30 fa fa-2x fa-chevron-down" />
		</a>
	</section>

	<section id="#invites" class="standard">
		<div><h1>INVITE LINK HERE</h1></div>
	</section>

	<!-- TODO: -->
	<!-- Gift Registry  -->
	<!-- Prenup photos Maybe? -->
</main>

<style>
	section {
		@apply flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[100vh];
	}

	section.standard {
		@apply p-[12rem];
	}

	@media (max-width: 992px) {
		section.standard {
			@apply p-[8rem];
		}
	}

	@media (max-width: 768px) {
		section.standard {
			@apply p-[5rem];
		}
	}

	@media (max-width: 576px) {
		a {
			@apply hidden;
		}
	}
</style>
