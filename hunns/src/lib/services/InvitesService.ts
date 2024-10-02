import {
	WORKSHEET_ID,
	WORKSHEET_NAME,
	DATA_RANGE,
	UPDATING_RANGE_START,
	UPDATING_RANGE_END
} from '$env/static/private';

import { GSheetsService } from '$lib/services/GSheetsService';
import { DateTime } from 'luxon';
import { Rsvp } from '../../models/rsvp';

export class InvitesService {
	private readonly worksSheetId: string;
	private readonly workSheetName: string;
	private readonly dataRange: string;
	private readonly updatingRangeStart: string;
	private readonly updatingRangeEnd: string;
	private readonly gsheetsService: GSheetsService;

	constructor() {
		this.gsheetsService = new GSheetsService();
		this.worksSheetId = WORKSHEET_ID ?? '';
		this.workSheetName = WORKSHEET_NAME ?? '';
		this.dataRange = DATA_RANGE ?? '';
		this.updatingRangeStart = UPDATING_RANGE_START ?? '';
		this.updatingRangeEnd = UPDATING_RANGE_END ?? '';

		if (!this.worksSheetId || !this.workSheetName || !this.dataRange) {
			throw new Error('Google Sheet configuration is missing.');
		}
	}

	// Fetch and return all invite data, filtering out empty rows and invalid invites
	async listInvites(): Promise<Rsvp[]> {
		const sheetRange = `${this.workSheetName}${this.dataRange}`; // e.g., Sheet1!A2:X
		const rows = await this.gsheetsService.getSheetData(this.worksSheetId, sheetRange);
		// Filter out empty rows and map to Rsvp objects
		try {
			return rows.map((row, index) => new Rsvp(row, index + 2)).filter((rsvp) => !!rsvp.InviteName); // Only valid invites
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	// Retrieve a specific invite by ID
	async getInviteById(id: string): Promise<Rsvp> {
		try {
			const invites = await this.listInvites();
			const invite = invites.find((rsvp) => rsvp.InviteId === id);

			if (!invite) {
				console.log(`Invite with ID ${id} not found.`);
				return {} as Rsvp;
			}

			return invite;
		} catch (error) {
			console.log('Unexpected Error Occurred', error);
			throw new Error(`Error on trying to get invite data for ${id}`);
		}
	}

	async updateRsvp(id: string, requestedSeats: number, isAttending: boolean): Promise<boolean> {
		const invite = await this.getInviteById(id);
		if (Object.keys(invite).length <= 0 || invite === null || invite === undefined) {
			return false;
		}

		if (requestedSeats > invite.AllocatedSeats || requestedSeats === 0) {
			console.log(
				`Invalid seats. Reserved Seats: ${invite.AllocatedSeats} Requested Seats: ${requestedSeats}`
			);
			return false;
		}

		if (!isAttending) requestedSeats = 0;
		// Define the range for the RSVP update (e.g., Sheet1!E2:F2)

		try {
			const updatingRange = `${this.workSheetName}${this.updatingRangeStart}${invite.RowNumber}:${this.updatingRangeEnd}${invite.RowNumber}`;
			const updateResult = await this.gsheetsService.modifySheet(this.worksSheetId, updatingRange, [
				requestedSeats.toString(),
				isAttending.toString(),
				DateTime.utc().toISO()
			]);

			return updateResult;
		} catch (error) {
			console.log('Unexpected Error Occurred', error);
			throw new Error(`Error on trying to update invite data for ${id}`);
		}
	}
}
