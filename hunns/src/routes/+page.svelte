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
	<Parallax sections={5} bind:this={parallax} {disabled}>
		<ParallaxLayer rate={0.7} class="!bg-transparent flex flex-col justify-center items-center">
			<div class="grid place-items-center w-10/12">
				<img class="m-0 w-[750px] mb-12" src="./banner.png" alt="Joemar And Sarrie" />
			</div>

			<div class="text-center" style="font-family: Avenir LT Std;">
				<h1 class="text-5xl font-bold tracking-widest">
					{uiStrings.Header}
				</h1>
				<h2 class="text-xl pt-10 tracking-wider">FEBRUARY 26, 2025 IN LIPA BATANGAS</h2>
			</div>
		</ParallaxLayer>

		<ParallaxLayer offset={1} rate={0} class="bg-secondary-200 flex justify-center items-center">
			<h1 class="text-6xl text-">COUPLE INFO</h1>
		</ParallaxLayer>

		<ParallaxLayer offset={2} rate={0} class="bg-tertiary-900 flex justify-center items-center">
			<h1 class="text-6xl">EVENT INFO</h1>
		</ParallaxLayer>

		<ParallaxLayer offset={3} rate={0} class="bg-secondary-400 flex justify-center items-center">
			<h1 class="text-6xl">COUNTDOWN / REGISTRY / PDF TO INVITE</h1>
		</ParallaxLayer>

		<ParallaxLayer offset={4} rate={0.2} class="!bg-transparent flex justify-center items-center">
			<h1 class="text-6xl">LOCATION INFO / STAY</h1>
		</ParallaxLayer>
	</Parallax>
</main>
