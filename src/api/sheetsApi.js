const { google } = require('googleapis');
const { SPREADSHEET_ID } = require('../config/config');

class SheetsAPI {
  constructor(auth) {
    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async appendRows(sheetName, rows) {
    try {
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A:E`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: rows
        },
      });
      return response.data;
    } catch ( err ) {
      console.error('Ошибка при добавлении строк:', err);
      throw err;
    }
  }

  async formatSheet(sheetName) {
    try {
      const sheetId = await this.getSheetId(sheetName);

      const requests = [
        {
          repeatCell: {
            range: {
              sheetId,
              startRowIndex: 1,
              startColumnIndex: 2,
              endColumnIndex: 3,
            },
            cell: {
              userEnteredFormat: {
                numberFormat: {
                  type: 'DATE',
                  pattern: 'dd-MM-yyyy'
                }
              }
            },
            fields: 'userEnteredFormat.numberFormat'
          }
        },
        {
          repeatCell: {
            range: {
              sheetId,
              startRowIndex: 1,
              startColumnIndex: 3,
              endColumnIndex: 4,
            },
            cell: {
              userEnteredFormat: {
                numberFormat: {
                  type: 'NUMBER',
                  pattern: '#,##0.00####'
                }
              }
            },
            fields: 'userEnteredFormat.numberFormat'
          }
        }
      ];

      await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        resource: { requests }
      });
    } catch ( err ) {
      console.error('Ошибка при форматировании листа:', err);
      throw err;
    }
  }

  async getSheetId(sheetName) {
    try {
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID
      });
      const sheet = response.data.sheets.find(s => s.properties.title === sheetName);
      if ( !sheet ) {
        throw new Error(`Лист "${sheetName}" не найден`);
      }
      return sheet.properties.sheetId;
    } catch ( err ) {
      console.error('Ошибка при получении ID листа:', err);
      throw err;
    }
  }
}

module.exports = SheetsAPI;
