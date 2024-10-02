import { Rsvp } from '../../../../models/rsvp';
import rsvpPageMessages from '../../../../lib/messages/rsvpMessages.json';
import { error, redirect } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import { RSVP_ISOPEN } from '$env/static/private';

export const load = async (serverLoadEvent) => {
	let rsvp = {} as Rsvp;
	const { fetch, params } = serverLoadEvent;
	const { id } = params;
	const { ErrorMessages, ConfirmationMessages } = rsvpPageMessages;

	if (RSVP_ISOPEN !== 'true') {
		error(StatusCodes.FORBIDDEN, {
			message: ErrorMessages.Closed.join('||')
		});
	}

	try {
		const response = await fetch(`/app/invites/${id}`);
		rsvp = await response.json().then((data) => data as Rsvp);
	} catch (err) {
		error(StatusCodes.INTERNAL_SERVER_ERROR, {
			message: ErrorMessages.InvalidInviteLink.join('||')
		});
	}

	if (Object.keys(rsvp).length <= 0 || rsvp === null || rsvp === undefined) {
		error(StatusCodes.NOT_FOUND, {
			message: ErrorMessages.InvalidInviteLink.join('||')
		});
	}

	if (!rsvp.HasResponded) {
		throw redirect(StatusCodes.SEE_OTHER, `/rsvp/${id}`);
	}

	const attending = rsvp.IsAttending && rsvp.HasResponded;

	return {
		isAttending: attending,
		weddingDate: rsvpPageMessages.UiMessages.WeddingDate,
		messages: ConfirmationMessages
	};
};
