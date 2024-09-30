import {
	WORKSHEET_ID,
	WORKSHEET_NAME,
	DATA_RANGE,
	RESPONSE_FLAG_COLUMN,
	RESPONSE_DATE_COLUMN
} from '$env/static/private';

import { GSheetsService } from '$lib/index';
import { DateTime } from 'luxon';
import { Rsvp } from '../../models/rsvp';

export class InvitesService {
	private readonly worksSheetId: string;
	private readonly workSheetName: string;
	private readonly dataRange: string;
	private readonly responseFlagColumn: string;
	private readonly responseDateTimeColumn: string;
	private gsheetsService: GSheetsService;

	constructor() {
		this.gsheetsService = new GSheetsService();
		this.worksSheetId = WORKSHEET_ID ?? '';
		this.workSheetName = WORKSHEET_NAME ?? '';
		this.dataRange = DATA_RANGE ?? '';
		this.responseFlagColumn = RESPONSE_FLAG_COLUMN ?? '';
		this.responseDateTimeColumn = RESPONSE_DATE_COLUMN ?? '';

		if (!this.worksSheetId || !this.workSheetName || !this.dataRange) {
			throw new Error('Google Sheet configuration is missing.');
		}
	}

	// Fetch and return all invite data, filtering out empty rows and invalid invites
	async listInvites(): Promise<Rsvp[]> {
		const sheetRange = `${this.workSheetName}${this.dataRange}`; // e.g., Sheet1!A2:X
		const rows = await this.gsheetsService.getSheetData(this.worksSheetId, sheetRange);

		// Filter out empty rows and map to Rsvp objects
		return rows
			.filter((row) => row.length > 0)
			.map((row, index) => new Rsvp(row, index + 2))
			.filter((rsvp) => !!rsvp.InviteName); // Only valid invites
	}

	// Retrieve a specific invite by ID
	async getInviteById(id: string): Promise<Rsvp> {
		const invites = await this.listInvites();
		const invite = invites.find((rsvp) => rsvp.InviteId === id);

		if (!invite) {
			throw new Error(`Invite with ID ${id} not found.`);
		}

		return invite;
	}

	async updateRsvp(id: string, occupiedSeat: number): Promise<boolean> {
		const invite = await this.getInviteById(id);

		if (occupiedSeat > invite.ReservedSeats || occupiedSeat === 0) {
			console.log(
				`Invalid seats. Reserved Seats: ${invite.ReservedSeats} Occupying Seats: ${occupiedSeat} `
			);
			return false;
		}

		// Define the range for the RSVP update (e.g., Sheet1!E2:F2)
		const updatingRange = `${this.workSheetName}${this.responseFlagColumn}${invite.RowNumber}:${this.responseDateTimeColumn}${invite.RowNumber}`;
		const updateResult = await this.gsheetsService.modifySheet(this.worksSheetId, updatingRange, [
			occupiedSeat.toString(),
			'true',
			DateTime.utc().toISO()
		]);

		return updateResult;
	}
}
