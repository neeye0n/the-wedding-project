import { Rsvp } from '../../../models/rsvp';

export const load = async (serverLoadEvent) => {
	const { fetch, params } = serverLoadEvent;
	const { id } = params;
	const response = await fetch(`/app/invites/${id}`);
	const rsvp = await response.json().then((data) => data as Rsvp);
	return rsvp;
};
