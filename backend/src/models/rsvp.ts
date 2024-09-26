import { DateTime } from 'luxon';

export class Rsvp {
  RowNumber: number;
  InviteName: string;
  Members: string[];
  Seats: number;
  InviteId: string;
  HasResponded: boolean;
  RespondedOn: DateTime;

  constructor(row: string[], index: number) {
    this.RowNumber = index;
    this.InviteName = row[0];
    this.Members = row[1]
      .split(',')
      .map((name) => name.trim())
      .filter((name) => name);
    this.Seats = this.parseStringToNumber(row[2]);
    this.InviteId = row[3];
    this.HasResponded = this.parseStringToBoolean(row[4]);
    this.RespondedOn = DateTime.fromISO(row[5], { zone: 'utc' });
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
