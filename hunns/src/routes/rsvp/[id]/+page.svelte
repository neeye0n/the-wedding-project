<script lang="ts">
	import { DateTime } from 'luxon';
	import type { RsvpRequestBody } from '../../../models/rsvpRequestBody';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	export let errorMessage: string | null = null;

	let requestedSeats = data.AllocatedSeats;

	function showReadableDate(): string {
		const formattedDate = DateTime.fromISO(data.RespondedOn.toString() || '').toLocaleString({
			weekday: 'short',
			month: 'short',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		});
		return formattedDate;
	}

	function getMembers(): string[] {
		return data.Members;
	}

	// PUT Function
	async function handleRsvp(isAttending: boolean) {
		try {
			const reqBody: RsvpRequestBody = {
				IsAttending: isAttending,
				RequestedSeats: requestedSeats
			};
			const response = await fetch(`/app/invites/${data.InviteId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(reqBody)
			});
			if (!response.ok) {
				throw new Error('Failed to update RSVP');
			}
			// Optionally navigate or show a success message
			alert('RSVP updated successfully!');
		} catch (err) {
			console.log(err);
		}
	}

	const date = new Date('2025-02-26');
	const formattedDateParts = [
		(date.getMonth() + 1).toString().padStart(2, '0'),
		date.getDate().toString().padStart(2, '0'),
		date.getFullYear().toString().slice(-2)
	];
</script>

<main>
	<div class="flex items-center justify-center min-h-screen" style="font-family: Avenir;">
		<div class="card w-96 p-8 variant-filled block card card-hover p-4">
			<div class="card-header border-b-[2px] border-primary-900">
				<h3 class="text-center text-5xl pb-5" style="font-family: Didot;">You're invited</h3>
				<p class="class text-center text-sm pb-5" style="font-family: Avenir;">
					WE WOULD BE DELIGHTED TO HAVE YOU AS OUR GUEST ON OUR SPECIAL DAY!
				</p>
			</div>

			{#if errorMessage}
				<p class="error">{errorMessage}</p>
			{:else if data.HasResponded}
				<h2>
					Your response has already been recorded last {showReadableDate()}
				</h2>
				<p>Contact the couple if it was a mistake or you want to change your response</p>
			{:else if data}
				<div class="p-4 text-md text-center" style="font-family: Avenir;">
					<ul>
						{#each getMembers() as member}
							<li class="font-bold">{member}</li>
						{/each}
					</ul>
				</div>
				<!-- <label for="attendeeCount">Number of Attendees:</label>
				<input
					type="number"
					id="attendeeCount"
					min="1"
					max={data.AllocatedSeats}
					bind:value={requestedSeats}
				/> -->
				<div class="flex justify-center mt-4 pb-1">
					<div class="flex space-x-4">
						<button class="btn-lg variant-filled-primary" on:click={() => handleRsvp(true)}
							>ACCEPT</button
						>
						<button class="btn-lg variant-ringed-primary" on:click={() => handleRsvp(false)}
							>DECLINE</button
						>
					</div>
				</div>
				<div
					class="date card-footer flex justify-between w-full mt-4 p-1"
					style="font-family: Belgant;"
				>
					{#each formattedDateParts as part, index}
						<div
							class="flex-1 text-center text-5xl {index === 0 || index === 1
								? 'border-r-[2px] border-primary-900'
								: ''}"
						>
							{part}
						</div>
					{/each}
				</div>
			{:else}
				<p>Loading...</p>
			{/if}
		</div>
	</div>
</main>
