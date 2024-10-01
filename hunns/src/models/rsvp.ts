import { DateTime } from 'luxon';

export class Rsvp {
	RowNumber: number;
	InviteId: string;
	InviteName: string;
	Members: string[];
	AllocatedSeats: number;
	RequestedSeats: number;
	IsAttending: boolean;
	HasResponded: boolean;
	RespondedOn: DateTime;

	constructor(row: string[], index: number) {
		this.RowNumber = index;
		this.InviteId = row[0] || '';
		this.InviteName = row[1] || '';
		this.Members = (row[2] || '')
			.split(',')
			.map((name) => name.trim())
			.filter((name) => name);

		this.AllocatedSeats = this.parseStringToNumber(row[3] || '');
		this.RequestedSeats = this.parseStringToNumber(row[4] || '');
		this.IsAttending = this.parseStringToBoolean(row[5] || '');
		this.IsAttending = this.parseStringToBoolean(row[5] || '');
		this.HasResponded = !row[6] ? false : true;
		this.RespondedOn = DateTime.fromISO(row[6] || '', { zone: 'utc' });
	}

	private parseStringToBoolean(value: string): boolean {
		if (value === undefined) {
			return false;
		}

		const parsedValue = value.toLowerCase();
		return parsedValue === 'true' || parsedValue === '1';
	}

	private parseStringToNumber(value: string): number {
		const parsedValue = Number(value);
		return isNaN(parsedValue) ? 0 : parsedValue;
	}
}
