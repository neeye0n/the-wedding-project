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
</script>

<!-- Template for RSVP page -->
<main>
	<div class="postcard">
		<h2>RSVP</h2>

		{#if errorMessage}
			<p class="error">{errorMessage}</p>
		{:else if data.HasResponded}
			<h2>
				Your response has already been recorded last {showReadableDate()}
			</h2>
			<p>Contact the couple if it was a mistake or you want to change your response</p>
		{:else if data}
			<h2>Invitation for {data.InviteName}</h2>
			<p>Are you attending?</p>
			<label for="attendeeCount">Number of Attendees:</label>
			<input
				type="number"
				id="attendeeCount"
				min="1"
				max={data.AllocatedSeats}
				bind:value={requestedSeats}
			/>
			<button on:click={() => handleRsvp(true)}>Accept</button>
			<button on:click={() => handleRsvp(false)}>Not Attending</button>
		{:else}
			<p>Loading...</p>
		{/if}
	</div>
</main>

<style>
	.postcard {
		max-width: 400px;
		margin: 20px auto;
		padding: 20px;
		background-color: #e2ebc9;
		border-radius: 0.5rem;
		/* text-align: center; */
		font-family: Arial, sans-serif;
	}

	.postcard h2 {
		margin-bottom: 20px;
		font-size: 24px;
		color: #333;
	}

	.postcard .form-group {
		margin-bottom: 15px;
	}

	.postcard input[type='text'],
	.postcard input[type='email'] {
		width: 100%;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.postcard button {
		width: 45%;
		padding: 10px;
		margin: 10px;
		border: none;
		border-radius: 5px;
		background-color: #007bff;
		color: white;
		cursor: pointer;
		font-size: 16px;
	}

	.postcard button:disabled {
		background-color: #ccc;
	}

	@media (min-width: 768px) {
		.postcard {
			width: 400px;
		}
	}
</style>
