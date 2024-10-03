<script lang="ts">
	// import { getToastStore } from '@skeletonlabs/skeleton';
	// import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
	// const toastStore = getToastStore();

	// function ping() {
	// 	const t: ToastSettings = {
	// 		message: 'yo welcome, this site is still in construction. come back later.'
	// 	};
	// 	toastStore.trigger(t);
	// }
	import { Parallax, ParallaxLayer } from 'svelte-parallax';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let uiStrings = data.messages.UiMessage;
	let parallax;
	let disabled = false;
	let fancy = 'fancy'.split('');
</script>

<!-- <div class="container h-full mx-auto flex justify-center items-center text-center">
	<div class="space-y-5">
		<h1 class="h1">Let's get cracking bones!</h1>
		<button class="btn btn-lg variant-filled" on:click={ping}>Test Button</button>
	</div>
</div> -->

<Parallax sections={2} bind:this={parallax} {disabled}>
	<ParallaxLayer rate={0.7} class="!bg-transparent flex justify-center items-center">
		<h1 class="text-6xl" style="font-family: Avenir LT Std;">{uiStrings.Header}</h1>
	</ParallaxLayer>
	<ParallaxLayer
		offset={1}
		rate={0.2}
		class="bg-secondary-100 flex justify-center items-center border"
	>
		<h1 class="text-6xl">INFO</h1>
	</ParallaxLayer>
</Parallax>
