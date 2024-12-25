<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let { isAttending, messages, groom, bride } = data;

	const date = new Date(data.weddingDate);
	const formattedDateParts = [
		(date.getMonth() + 1).toString().padStart(2, '0'),
		date.getDate().toString().padStart(2, '0'),
		date.getFullYear().toString().slice(-2)
	];
</script>

<title>{groom.NickName} & {bride.NickName} | RSVP</title>

<main>
	<div class="flex items-center justify-center min-h-screen font-avenir">
		<div class="card w-96 p-8 !bg-transparent">
			<div class="card-header flex justify-between w-full" style="font-family: Belgan Aesthetic;">
				{#each formattedDateParts as part, index}
					<div
						class="flex-1 text-center text-5xl {index === 0 || index === 1
							? 'border-r-[2px] border-soft-900'
							: ''}"
					>
						{part}
					</div>
				{/each}
			</div>
			<div class="card-footer p-4 text-md text-center">
				{#if isAttending}
					<p class="class text-center text-sm">{messages.AcceptedLine1}</p>
					<p class="class text-center text-sm">{messages.AcceptedLine2}</p>
				{:else}
					<p class="class text-center text-sm">{messages.RefusedLine1}</p>
				{/if}
			</div>
		</div>
	</div>
</main>
