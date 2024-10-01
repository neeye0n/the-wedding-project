import { google, sheets_v4 } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import { WORKSHEET_KEY, KEY_SCOPES } from '$env/static/private';

export class GSheetsService {
	private readonly sheetsApi: sheets_v4.Sheets;
	constructor() {
		const auth = new GoogleAuth({
			credentials: JSON.parse(WORKSHEET_KEY),
			scopes: [KEY_SCOPES]
		});

		// Create a new instance of the Google Sheets API
		this.sheetsApi = google.sheets({ version: 'v4', auth });
	}

	async getSheetData(spreadsheetId: string, range: string): Promise<string[][]> {
		try {
			const response = await this.sheetsApi.spreadsheets.values.get({
				spreadsheetId,
				range
			});
			return response.data.values || [];
		} catch (error: any) {
			console.error('Error reading Google Sheet:', error);
			return [];
		}
	}

	async modifySheet(
		spreadsheetId: string,
		updatingRange: string,
		newValues: string[]
	): Promise<boolean> {
		try {
			const request = {
				spreadsheetId: spreadsheetId,
				range: updatingRange, // For example, 'Sheet1!A1:B1'
				valueInputOption: 'USER_ENTERED', // Can be 'USER_ENTERED' or 'RAW'
				requestBody: {
					values: [newValues] // Pass the two values as a 2D array, e.g., [['Value1', 'Value2']]
				}
			};

			const response = await this.sheetsApi.spreadsheets.values.update(request);
			console.log('Cells updated successfully: ', response.data.updatedRange);
			return true;
		} catch (error: any) {
			console.error(`Error updating cells: ${updatingRange} `, error);
			return false;
		}
	}
}
