import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DateTime } from 'luxon';
import { Rsvp } from 'src/models/rsvp';
import { GsheetsService } from 'src/services/gsheet/gsheet.service';

@Injectable()
export class InvitesService {
  private readonly worksSheetId: string;
  private readonly workSheetName: string;
  private readonly dataRange: string;
  private readonly responseFlagColumn: string;
  private readonly responseDateTimeColumn: string;

  constructor(private readonly gsheetService: GsheetsService) {
    // Ensure environment variables are set
    this.worksSheetId = process.env.WORKSHEET_ID ?? '';
    this.workSheetName = process.env.WORKSHEET_NAME ?? '';
    this.dataRange = process.env.DATA_RANGE ?? '';
    this.responseFlagColumn = process.env.RESPONSE_FLAG_COLUMN ?? '';
    this.responseDateTimeColumn = process.env.RESPONSE_DATE_COLUMN ?? '';

    if (!this.worksSheetId || !this.workSheetName || !this.dataRange) {
      throw new BadRequestException('Google Sheet configuration is missing.');
    }
  }

  // Fetch and return all invite data, filtering out empty rows and invalid invites
  async listInvites(): Promise<Rsvp[]> {
    const sheetRange = `${this.workSheetName}${this.dataRange}`; // e.g., Sheet1!A2:X
    const rows = await this.gsheetService.getSheetData(
      this.worksSheetId,
      sheetRange,
    );

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
      throw new NotFoundException(`Invite with ID ${id} not found.`);
    }

    return invite;
  }

  async updateRsvp(id: string): Promise<boolean> {
    const invite = await this.getInviteById(id);

    // Define the range for the RSVP update (e.g., Sheet1!E2:F2)
    const updatingRange = `${this.workSheetName}${this.responseFlagColumn}${invite.RowNumber}:${this.responseDateTimeColumn}${invite.RowNumber}`;
    const updateResult = await this.gsheetService.modifySheet(
      this.worksSheetId,
      updatingRange,
      ['true', DateTime.utc().toISO()],
    );

    return updateResult;
  }
}
