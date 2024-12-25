<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import type { RsvpRequestBody } from '../../../models/rsvpRequestBody';
	import type { PageServerData } from './$types';

	const toastStore = getToastStore();

	export let data: PageServerData;
	let { rsvp, messages, groom, bride } = data;
	let { ToastMessages, UiMessages } = messages;

	function getRequestedSeats(): number {
		return rsvp.HasResponded ? rsvp.RequestedSeats : rsvp.AllocatedSeats;
	}
	let requestedSeats: number = getRequestedSeats();

	function getMembers(): string[] {
		return rsvp.Members.slice(0, rsvp.AllocatedSeats);
	}

	function isInputsValid(): boolean {
		if (requestedSeats > rsvp.AllocatedSeats || requestedSeats <= 0) {
			return false;
		}

		if (requestedSeats % 1 !== 0) {
			return false;
		}
		return true;
	}

	// PUT Function to update RSVP
	async function handleRsvp(isAttending: boolean) {
		const validationResult = isInputsValid();
		if (!validationResult) {
			toastInputValidations();
			return;
		}

		try {
			const reqBody: RsvpRequestBody = {
				IsAttending: isAttending,
				RequestedSeats: requestedSeats
			};
			const response = await fetch(`/app/invites/${rsvp.InviteId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(reqBody)
			});

			if (!response.ok) {
				const t: ToastSettings = {
					message: ToastMessages.ApiError,
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
				return;
			}
			goto(`/rsvp/${rsvp.InviteId}/confirm`);
		} catch (err) {
			console.log(err);
		}
	}

	function handleInput() {
		const validationResult = isInputsValid();
		if (validationResult) return;

		toastInputValidations();
	}

	function handleKeyDown(event: any) {
		const value = event.target.value;
		// Allow only positive whole numbers
		if (!/^\d*$/.test(value)) {
			// Remove non-digit characters
			event.target.value = value.replace(/\D/g, '');
		}
		requestedSeats = event.target.value;
	}

	function toastInputValidations() {
		if (requestedSeats > rsvp.AllocatedSeats) {
			const t: ToastSettings = {
				message: ToastMessages.MaxSeatsError.replace(
					'{reservedSeats}',
					rsvp.AllocatedSeats.toString()
				),
				background: 'variant-filled-warning'
			};
			toastStore.trigger(t);
			requestedSeats = rsvp.AllocatedSeats;
			return;
		}

		if (requestedSeats <= 0) {
			const t: ToastSettings = {
				message: ToastMessages.MinSeatsError,
				background: 'variant-filled-warning'
			};
			toastStore.trigger(t);
			requestedSeats = rsvp.AllocatedSeats;
			return;
		}

		if (requestedSeats % 1 !== 0) {
			const t: ToastSettings = {
				message: ToastMessages.SeatsNumberError,
				background: 'variant-filled-warning'
			};
			toastStore.trigger(t);
			requestedSeats = rsvp.AllocatedSeats;
			return;
		}
	}

	const date = new Date(UiMessages.WeddingDate);
	const formattedDateParts = [
		(date.getMonth() + 1).toString().padStart(2, '0'),
		date.getDate().toString().padStart(2, '0'),
		date.getFullYear().toString().slice(-2)
	];
</script>

<title>{groom.NickName} & {bride.NickName} | RSVP</title>
<meta name="viewport" content="width=device-width, initial-scale=0.9" />

<main>
	<div class="flex items-center justify-center min-h-screen font-avenir">
		<div class="card w-96 variant-filled block card-hover pb-4 m-2 pl-3 pr-3 pt-4">
			<div class="card-header border-b-[2px] border-primary-900 pb-5">
				<h2 class="text-center text-6xl font-black font-didotHTF italic">
					{UiMessages.Header}
				</h2>
				<p class="class text-center text-xs pb-5">
					{UiMessages.HeaderMessageLine1}
				</p>
				<p class="class text-center text-sm font-black pt-1">
					{UiMessages.HeaderMessageLine2.replace(
						'{allocatedSeats}',
						rsvp.AllocatedSeats.toString()
					)}
				</p>
				{#if rsvp.HasResponded && rsvp.RequestedSeats > 0}
					<p class="class text-center text-sm font-black">
						{UiMessages.HeaderMessageLine3.replace(
							'{reservedSeats}',
							rsvp.RequestedSeats.toString()
						)}
					</p>
				{/if}
			</div>

			<div class="p-4 text-md text-center">
				<ul>
					{#each getMembers() as member}
						<li class="font-bold">{member}</li>
					{/each}
				</ul>
			</div>
			<div class="justify-center pb-1 text-sm text-center">
				<p>
					{#if rsvp.HasResponded}
						{UiMessages.BodyMessage.replace('{verb}', 'requested')}
					{:else}
						{UiMessages.BodyMessage.replace('{verb}', 'reserved')}
					{/if}
				</p>
				<label for="attendeeCount">
					<span class="inline-block align-text-middle mt-1 mb-1 font-black">
						{#if rsvp.HasResponded}
							{UiMessages.ReservedSeatsLabel.replace('{verb}', 'Requested')}
						{:else}
							{UiMessages.ReservedSeatsLabel.replace('{verb}', 'Reserved')}
						{/if}
					</span>
				</label>
				<input
					class="input variant-filled text-right text-sm w-1/5"
					type="number"
					id="attendeeCount"
					min="1"
					max={rsvp.AllocatedSeats}
					step="1"
					inputmode="numeric"
					pattern="\d*"
					bind:value={requestedSeats}
					on:blur={handleInput}
					on:keypress={handleKeyDown}
				/>
			</div>
			<div class="flex justify-center mt-4 pb-1">
				<div class="flex space-x-4">
					<button
						type="button"
						class="btn-lg variant-filled-primary"
						on:click={() => handleRsvp(true)}>{UiMessages.AcceptInvitationButton}</button
					>
					<button class="btn-lg variant-ringed-primary" on:click={() => handleRsvp(false)}
						>{UiMessages.RefuseIvitationButton}</button
					>
				</div>
			</div>
			<div class="date card-footer flex justify-between w-full mt-4 p-1 font-belganAesthetic">
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
		</div>
	</div>
</main>
