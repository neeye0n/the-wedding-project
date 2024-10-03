import type { PageServerLoad } from './$types';
import homeMessages from '../lib/messages/homeMessages.json';

export const load = (async () => {
	return {
		messages: homeMessages
	};
}) satisfies PageServerLoad;
