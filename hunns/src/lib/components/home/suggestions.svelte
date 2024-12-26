<script lang="ts">
	export let groomLastName: string;
	export let brideLastName: string;
	export let facebookPage: string;
	export let websiteLink: string;
</script>

<div
	class="flex flex-col items-center justify-center text-center relative font-cormorantG text-secondary-900"
>
	<h1 class="text-8xl font-extrabold pb-8">%</h1>
	<p class="bigtext">
		We will be staying at the resort the days before and after the wedding.
		<br />
		If you choose to book a room, be sure to mention you're with the
		<span class="font-semibold">{groomLastName}/{brideLastName}</span> clan to receive a discount!
	</p>
	<div class="divider" />
	<p class="subtext details">
		The Zen Villas Resort is offering special rates for the wedding week.
		<br />
		Check their
		<a href={facebookPage} target="_blank"
			><i class="opacity-30 fa fa-facebook pr-1 text-primary-900" />Facebook</a
		>
		page and
		<a href={websiteLink} target="_blank"
			><i class="opacity-30 fa fa-chrome pr-1 text-primary-900" />Website</a
		> for more info.
	</p>

	<div class="header"></div>
</div>

<style>
	p.bigtext {
		@apply text-6xl p-0 m-0 leading-tight;
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
		@apply text-xl text-secondary-600 underline;
	}

	@media (max-width: 992px) {
		p.bigtext {
			@apply text-4xl;
		}
	}

	@media (max-width: 576px) {
		h1 {
			@apply text-6xl;
		}
		p.bigtext {
			@apply text-xl;
		}
		p.subtext {
			@apply text-sm;
		}
		p.details a,
		p.details a:visited,
		p.details a:any-link {
			@apply text-sm;
		}
	}
</style>
