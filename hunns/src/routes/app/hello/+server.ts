import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { StatusCodes } from 'http-status-codes';

export const GET: RequestHandler = async () => {
	return json({ message: 'Hello from the otherside!' }, { status: StatusCodes.OK });
};
