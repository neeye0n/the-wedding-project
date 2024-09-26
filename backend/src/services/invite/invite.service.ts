import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { Rsvp } from 'src/models/rsvp';
import { GsheetsService } from 'src/services/gsheet/gsheet.service';

@Injectable()
export class InvitesService {
  private worksSheetId = '';
  private workSheetName = '';
  private dataRange = '';
  private responseFlagColumn = '';
  private responseDateTimeColumn = '';

  constructor(private readonly gsheetService: GsheetsService) {
    this.worksSheetId = process.env.WORKSHEET_ID;
    this.workSheetName = process.env.WORKSHEET_NAME;
    this.dataRange = process.env.DATA_RANGE;
    this.responseFlagColumn = process.env.RESPONSE_FLAG_COLUMN;
    this.responseDateTimeColumn = process.env.RESPONSE_DATE_COLUMN;
  }

  async listInvites(): Promise<Rsvp[]> {
    let rows = await this.gsheetService.getSheetData(
      this.worksSheetId,
      `${this.workSheetName}${this.dataRange}`, // e.g. Sheet1!A2:X
    );

    // Remove Empty Rows
    rows = rows.filter((innerArray) => innerArray.length > 0);
    if (!rows || rows.length === 0) {
      return [];
    }

    // Map to Rsvp Objects and remove invalid Invites
    const data = rows
      .map((row, index) => new Rsvp(row, index + 2))
      .filter((item) => item.InviteName);
    return data || [];
  }

  async getByInviteId(id: string): Promise<Rsvp> {
    const invites = await this.listInvites();
    const invite = invites.find((rsvp) => rsvp.InviteId === id);
    return invite;
  }

  async updateRsvp(id: string): Promise<boolean> {
    const rsvp = await this.getByInviteId(id);
    if (!rsvp) return false;

    const updatingRange = `${this.workSheetName}${this.responseFlagColumn}${rsvp.RowNumber}:${this.responseDateTimeColumn}${rsvp.RowNumber}`;
    const updateResult = await this.gsheetService.modifySheet(
      this.worksSheetId,
      updatingRange,
      ['true', DateTime.utc().toISO()],
    );
    return updateResult;
  }
}
