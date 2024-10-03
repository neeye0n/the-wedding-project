<script lang="ts">
	import { Parallax, ParallaxLayer } from 'svelte-parallax';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let uiStrings = data.messages.UiMessage;
	let parallax;
	let disabled = false;
	let fancy = 'fancy'.split('');
</script>

<main>
	<Parallax sections={2} bind:this={parallax} {disabled}>
		<ParallaxLayer rate={0.7} class="!bg-transparent flex justify-center items-center">
			<h1 class="text-5xl text-center" style="font-family: Belgan Aesthetic;">
				{uiStrings.Header}
			</h1>
		</ParallaxLayer>
		<ParallaxLayer
			offset={1}
			rate={0.5}
			class="bg-secondary-100 flex justify-center items-center border"
		>
			<h1 class="text-6xl">INFO</h1>
		</ParallaxLayer>
	</Parallax>
</main>
