<script lang="ts">
	import bpiQr from '$lib/images/bpi-qr.png';
	import bpiLogo from '$lib/images/bpi-logo.svg';

	import gcashQr from '$lib/images/gcash-qr.png';
	import gcashLogo from '$lib/images/gcash-logo.svg';

	import bdoQr from '$lib/images/bdo-qr.png';
	import bdoLogo from '$lib/images/bdo-logo.svg';
</script>

<div
	class="flex flex-col items-center justify-center text-center relative font-didotHTF text-secondary-900"
>
	<p class="bigtext">
		While your presence is all we ask for, if you wish to gift us something, you can contribute to
		our new home or our honeymoon.
		<br />
		Click on any of the images below to find convenient ways to contribute using QR codes.
	</p>
	<div class="divider" />
	<div class="bankLogos">
		<a href={gcashQr} download target="_blank"><img src={gcashLogo} class="h-20" alt="GCash" /></a>
		<a href={bpiQr} download target="_blank"><img src={bpiLogo} class="h-40" alt="BPI" /></a>
		<a href={bdoQr} download target="_blank"><img src={bdoLogo} class="h-20" alt="BDO" /></a>
	</div>
</div>

<style>
	p.bigtext {
		@apply text-5xl p-0 m-0 leading-snug;
	}

	div.divider {
		@apply w-1/4 border-b border-primary-900 mb-[2rem] mt-[5rem];
	}

	.bankLogos {
		display: ruby;
	}

	div.bankLogos img {
		@apply m-auto pl-4 pr-4 grayscale hover:grayscale-0 transition duration-300;
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

		.bankLogos {
			@apply flex flex-col;
		}
	}
</style>
