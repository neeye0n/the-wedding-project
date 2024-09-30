import type { RequestHandler } from './$types';
import { InvitesService } from '$lib/index';
import { json } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;
	const inviteService = new InvitesService();

	const result = await inviteService.getInviteById(id);
	return json(result, { status: StatusCodes.OK });
};

export const PUT: RequestHandler = async ({ params, request }) => {
	const { id } = params; // Get the user ID from the route param
	const body = await request.json(); // Get the body data
	const inviteService = new InvitesService();

	const result = await inviteService.updateRsvp(id, body.occupiedSeats);

	if (!result) {
		console.log(`Unable to update RSVP for ${id}`);
		return json(
			{ errorMessage: `Unable to update RSVP for ${id}.` },
			{ status: StatusCodes.BAD_REQUEST }
		);
	}

	// Respond with the updated user
	return json(
		{
			message: 'RSVP updated successfully',
			inviteId: id
		},
		{ status: StatusCodes.OK }
	);
};
