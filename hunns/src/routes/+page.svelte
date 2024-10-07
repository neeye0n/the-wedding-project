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
		<ParallaxLayer rate={0.1} class="!bg-transparent flex flex-col justify-center items-center">
			<div class="grid place-items-center w-10/12">
				<img class="m-0 w-[750px] mb-12" src="./banner.png" alt="Joemar And Sarrie" />
			</div>

			<div class="text-center" style="font-family: Avenir LT Std;">
				<h1 class="text-5xl font-bold tracking-widest">
					{uiStrings.HeaderLine1.toUpperCase()}
				</h1>
				<h2 class="text-xl pt-10 tracking-wider">{uiStrings.HeaderLine2.toUpperCase()}</h2>
			</div>
		</ParallaxLayer>

		<ParallaxLayer
			offset={1}
			rate={0}
			class="bg-secondary-200 flex flex-col justify-center items-center"
		>
			<div class="grid grid-cols-2 place-items-center h-2/5">
				<div class="card !bg-transparent w-4/5 h-4/5 text-right text-primary-500">
					<div class="card-header pr-0 pt-0 pb-5">
						<h2 class="text-2xl font-extrabold tracking-wider">THE BRIDE</h2>
						<p class="tracking-widest font-extralight text-xl">SARRIE JOY PEÑA</p>
					</div>
					<div class="p4">
						<p class="text-md tracking-wide">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper metus in
							tortor suscipit viverra. Nulla id turpis condimentum sem accumsan lacinia. Fusce non
							iaculis nulla. Sed hendrerit eleifend placerat. Curabitur vel cursus ex. Morbi in erat
							gravida risus pellentesque sollicitudin. Ut et lorem felis. Morbi risus tortor, cursus
							a finibus non, feugiat ut orci. In elementum nulla sed pharetra hendrerit. Donec
							vehicula volutpat nunc, quis imperdiet nibh dapibus id.
						</p>
					</div>
				</div>
				<div class="card !bg-transparent w-4/5 h-4/5 text-left text-primary-500">
					<div class="card-header pl-0 pt-0 pb-5">
						<h2 class="text-2xl font-extrabold tracking-wider">THE GROOM</h2>
						<p class="tracking-widest font-extralight text-xl">MARC JOEMAR ESTIGOY</p>
					</div>
					<div class="p4">
						<p class="text-md tracking-wide">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper metus in
							tortor suscipit viverra. Nulla id turpis condimentum sem accumsan lacinia. Fusce non
							iaculis nulla. Sed hendrerit eleifend placerat. Curabitur vel cursus ex. Morbi in erat
							gravida risus pellentesque sollicitudin. Ut et lorem felis. Morbi risus tortor, cursus
							a finibus non, feugiat ut orci. In elementum nulla sed pharetra hendrerit. Donec
							vehicula volutpat nunc, quis imperdiet nibh dapibus id. Donec vehicula volutpat nunc,
							quis imperdiet nibh dapibus id.
						</p>
					</div>
				</div>
			</div>
			<div class="grid place-items-center">
				<img class="h-[35px]" src="./heart.png" alt="Joemar And Sarrie" />
			</div>
			<div class="grid h-2/5 w-1/2 place-content-center justify-center">
				<div class="card !bg-transparent h-4/5 text-primary-500 text-center">
					<div class="card-header pb-5">
						<h2 class="text-2xl font-extrabold tracking-wider">OUR STORY</h2>
						<p class="tracking-widest font-extralight text-xl">JOEMAR + SARRIE</p>
					</div>
					<div class="p4">
						<p class="text-md tracking-wide">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper metus in
							tortor suscipit viverra. Nulla id turpis condimentum sem accumsan lacinia. Fusce non
							iaculis nulla. Sed hendrerit eleifend placerat. Curabitur vel cursus ex. Morbi in erat
							gravida risus pellentesque sollicitudin. Ut et lorem felis. Morbi risus tortor, cursus
							a finibus non, feugiat ut orci. In elementum nulla sed pharetra hendrerit. Donec
							vehicula volutpat nunc, quis imperdiet nibh dapibus id. Donec vehicula volutpat nunc,
							quis imperdiet nibh dapibus id.
						</p>
					</div>
				</div>
			</div>
		</ParallaxLayer>

		<ParallaxLayer offset={2} rate={0} class="bg-tertiary-900 flex justify-center items-center">
			<h1 class="text-6xl">EVENT INFO</h1>
		</ParallaxLayer>

		<ParallaxLayer offset={3} rate={0} class="bg-secondary-400 flex justify-center items-center">
			<h1 class="text-6xl">COUNTDOWN / REGISTRY / PDF TO INVITE</h1>
		</ParallaxLayer>

		<ParallaxLayer offset={4} rate={0} class="!bg-transparent flex justify-center items-center">
			<h1 class="text-6xl">LOCATION INFO / STAY</h1>
		</ParallaxLayer>
	</Parallax>
</main>
