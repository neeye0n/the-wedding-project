import type { RequestHandler } from './$types';
import { InvitesService } from '$lib/index';
import { json } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

export const GET: RequestHandler = async () => {
	try {
		const inviteService = new InvitesService();
		const result = await inviteService.listInvites();
		return json(result, { status: StatusCodes.OK });
	} catch {
		return json(
			{ errorMessage: 'Unable Get Invite List' },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		);
	}
};
