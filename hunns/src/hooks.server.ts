// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		preload: ({ type }) => {
			return type === 'font' || type === 'js' || type === 'css';
		}
	});

	// If the status is 404, redirect the user to the homepage
	if (response.status === 404) {
		// Instead of just redirecting, we give them a little push home
		return new Response(null, {
			status: 302,
			headers: { Location: '/' }
		});
	}

	return response;
};
