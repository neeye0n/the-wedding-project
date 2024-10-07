<script lang="ts">
	import { Parallax, ParallaxLayer } from 'svelte-parallax';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let texts = data.messages;
	let parallax;
	let disabled = false;
	let fancy = 'fancy'.split('');
</script>

<meta name="viewport" content="width=device-width, initial-scale=0.6" />
<main>
	<Parallax sections={5} bind:this={parallax} {disabled}>
		<ParallaxLayer rate={0.1} class="!bg-transparent flex flex-col justify-center items-center">
			<div class="grid place-items-center w-10/12">
				<img class="m-0 w-[750px] mb-12" src="./banner.png" alt="Joemar And Sarrie" />
			</div>

			<div class="text-center" style="font-family: Avenir LT Std;">
				<h1 class="text-5xl font-bold tracking-widest">
					{texts.Heading.Line1.toUpperCase()}
				</h1>
				<h2 class="text-xl pt-10 tracking-wider">{texts.Heading.Line2.toUpperCase()}</h2>
			</div>
		</ParallaxLayer>

		<ParallaxLayer
			offset={1}
			rate={0}
			class="bg-secondary-200 flex flex-col justify-center items-center"
			style="font-family: Avenir LT Std;"
		>
			<div class="flex justify-between h-2/5">
				<div
					class="card flex flex-col justify-center !bg-transparent w-4/5 h-full text-right text-primary-500 text-ellipsis overflow-hidden p-7 pl-5 pb-0"
				>
					<div class="card-header pr-0 pt-0 pb-5">
						<h2 class="text-2xl font-extrabold tracking-wider pb-1">
							{texts.Bride.Title.toUpperCase()}
						</h2>
						<p class="tracking-widest font-extralight text-xl">
							{texts.Bride.FullName.toUpperCase()}
						</p>
					</div>
					<div class="p4">
						<p class="text-md tracking-wide">
							{texts.Bride.Story}
						</p>
					</div>
				</div>
				<div
					class="card flex flex-col justify-center !bg-transparent w-4/5 h-full text-left text-primary-500 text-ellipsis overflow-hidden p-7 pr-5 pb-0"
				>
					<div class="card-header pl-0 pt-0 pb-5">
						<h2 class="text-2xl font-extrabold tracking-wider pb-1">
							{texts.Groom.Title.toUpperCase()}
						</h2>
						<p class="tracking-widest font-extralight text-xl">
							{texts.Groom.FullName.toUpperCase()}
						</p>
					</div>
					<div class="p4">
						<p class="text-md tracking-wide">
							{texts.Groom.Story}
						</p>
					</div>
				</div>
			</div>
			<div class="grid place-items-center">
				<img class="h-[35px]" src="./heart.png" alt="heart" />
			</div>
			<div class="grid h-2/5 w-1/2 place-content-center justify-center">
				<div
					class="card !bg-transparent h-full text-primary-500 text-center text-ellipsis overflow-hidden pb-0"
				>
					<div class="card-header pb-5">
						<h2 class="text-2xl font-extrabold tracking-wider pb-1">
							{texts.Couple.Title.toUpperCase()}
						</h2>
						<p class="tracking-widest font-extralight text-xl">
							{texts.Couple.Heading.toUpperCase()}
						</p>
					</div>
					<div class="p4">
						<p class="text-md tracking-wide">
							{texts.Couple.Story}
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
