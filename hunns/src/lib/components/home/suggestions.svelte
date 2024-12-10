<script lang="ts">
</script>

<div
	class="flex flex-col items-center justify-center text-center relative font-didotHTF text-secondary-900"
>
	<p class="bigtext">
		The days before and after the wedding, we will stay in the resort.
		<br />
		If you decide to purchase a room through the resort, let them know that you are with the Estigoy/Peña
		clan so you can get a
		<span class="underline font-semibold">discount!</span>
	</p>
	<div class="divider" />
	<p class="subtext details">
		The Zen Villas Resort is offering special rates for the wedding week. Check their <a
			href="https://www.facebook.com/thezenvillasresort"
			target="_blank">Facebook page</a
		>
		and <a href="https://www.thezenvillasresort.com/en/" target="_blank">site</a> for more info.
	</p>
</div>

<style>
	p.bigtext {
		@apply text-5xl p-0 m-0 leading-snug;
	}

	div.divider {
		@apply w-1/4 border-b border-primary-900 mb-[2rem] mt-[5rem];
	}

	p.subtext {
		@apply text-xl m-0;
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
