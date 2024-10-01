import type { RequestHandler } from './$types';
import { InvitesService } from '$lib/services/InvitesService';
import { json } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import type { RsvpRequestBody } from '../../../../models/rsvpRequestBody';

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;
	const inviteService = new InvitesService();

	const result = await inviteService.getInviteById(id);
	return json(result, { status: StatusCodes.OK });
};

export const PUT: RequestHandler = async ({ params, request }) => {
	const { id } = params; // Get the user ID from the route param
	const data = await request.json(); // Get the body data
	const inviteService = new InvitesService();

	console.log(data);
	const req: RsvpRequestBody = {
		RequestedSeats: data.RequestedSeats,
		IsAttending: data.IsAttending
	};

	const result = await inviteService.updateRsvp(id, req.RequestedSeats, req.IsAttending);

	if (!result) {
		console.log(`Unable to update RSVP for ${id}`);
		return json(
			{ errorMessage: `Unable to update RSVP for ${id}.` },
			{ status: StatusCodes.BAD_REQUEST }
		);
	}

	return json(
		{
			message: 'RSVP updated successfully',
			inviteId: id
		},
		{ status: StatusCodes.OK }
	);
};
