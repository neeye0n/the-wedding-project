<script lang="ts">
	import '../styles/animationStyles.css';
	import type { PageServerData } from './$types';
	import { DateTime } from 'luxon';
	import Hero from '$lib/components/home/hero.svelte';
	import Location from '$lib/components/home/location.svelte';
	import Suggestions from '$lib/components/home/suggestions.svelte';
	import FAQ from '$lib/components/home/faq.svelte';
	import Gifts from '$lib/components/home/gifts.svelte';
	import Countdown from '$lib/components/home/countdown.svelte';

	export let data: PageServerData;
	let texts = data.messages;

	let weddingDate = (): DateTime => {
		return DateTime.fromMillis(parseInt(texts.WeddingDateInMs));
	};
</script>

<title>{texts.Groom.NickName} & {texts.Bride.NickName} | The Wedding</title>

<!-- Back to top button -->
<!-- <div class="fixed bottom-8 right-8 z-40">
	<a href="#" class="h-[80px] rounded-[100px] transition-all shadow-sm">
		<i class="fa fa-2x fa-chevron-up" />
	</a>
</div> -->

<main class="m-0">
	<section id="hero" class="hero">
		<Hero weddingDate={weddingDate()} />
		<a href="#welcome" class="absolute bottom-8 focus-in dur-2 text-primary-200">
			<i class="opacity-30 fa fa-2x fa-chevron-down" />
		</a>
	</section>

	<section id="welcome" class="standard variant-filled">
		<Location
			weddingDateTime={weddingDate()}
			weddingPlace={texts.Location.Place}
			addressLine1={texts.Location.AddressLine1}
			addressLine2={texts.Location.AddressLine2}
			mapLink={texts.Links.WeddingPlaceGMaps}
		/>
		<a href="#suggestions" class="absolute bottom-8 focus-in dur-2 text-tertiary-900">
			<i class="opacity-30 fa fa-2x fa-chevron-down" />
		</a>
	</section>

	<section id="suggestions" class="standard variant-filled-tertiary">
		<Suggestions
			groomLastName={texts.Groom.LastName}
			brideLastName={texts.Bride.LastName}
			facebookPage={texts.Links.WeddingPlaceFbPage}
			websiteLink={texts.Links.WeddingPlaceWebSite}
		/>
		<a href="#faq" class="absolute bottom-8 focus-in dur-2 text-primary-900">
			<i class="opacity-30 fa fa-2x fa-chevron-down" />
		</a>
	</section>

	<section id="faq" class="standard variant-filled">
		<FAQ invitationLink={texts.Links.InvitationPdf} questions={texts.FAQ.Questions} />
		<a href="#gifts" class="absolute bottom-8 focus-in dur-2 text-primary-900">
			<i class="opacity-30 fa fa-2x fa-chevron-down" />
		</a>
	</section>

	<section id="gifts" class="standard variant-filled-tertiary">
		<Gifts />
		<a href="#countdown" class="absolute bottom-8 focus-in dur-2">
			<i class="opacity-30 fa fa-2x fa-chevron-down" />
		</a>
	</section>

	<section id="countdown">
		<Countdown weddingDate={weddingDate()} />
		<a href="#hero" class="absolute bottom-8 focus-in dur-2">
			<i class="opacity-30 fa fa-2x fa-chevron-up" />
		</a>
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
