import { Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';

@Injectable()
export class GsheetsService {
  private sheetsApi: sheets_v4.Sheets;

  constructor() {
    // Load the service account key JSON file
    const serviceAccountPath = process.env.WORKSHEET_KEY;

    // Configure a auth client
    const auth = new google.auth.GoogleAuth({
      keyFile: serviceAccountPath, // Use your service account JSON file
      scopes: [process.env.KEY_SCOPES],
    });

    // Create a new instance of the Google Sheets API
    this.sheetsApi = google.sheets({ version: 'v4', auth });
  }

  async getSheetData(
    spreadsheetId: string,
    range: string,
  ): Promise<string[][]> {
    try {
      const response = await this.sheetsApi.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      return response.data.values || [];
    } catch (error) {
      console.error('Error reading Google Sheet:', error.errors);
      return [];
    }
  }

  async modifySheet(
    spreadsheetId: string,
    range: string,
    newValue: string[],
  ): Promise<boolean> {
    try {
      const request = {
        spreadsheetId,
        range, // For example, 'Sheet1!A1:B1'
        valueInputOption: 'USER_ENTERED', // Can be 'USER_ENTERED' or 'RAW'
        requestBody: {
          values: [newValue], // Pass the two values as a 2D array, e.g., [['Value1', 'Value2']]
        },
      };

      const response = await this.sheetsApi.spreadsheets.values.update(request);
      console.log('Cells updated successfully: ', response.data.updatedRange);
      return true;
    } catch (error) {
      console.error(`Error updating cells: ${range} `, error.errors);
      return false;
    }
  }
}
