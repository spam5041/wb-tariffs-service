import { google } from 'googleapis';
import { db } from '../db/connection';
import { logger } from '../utils/logger';
import { config } from '../config';

export class GoogleSheetsService {
  private readonly auth;
  private readonly sheets;
  
  constructor() {
    this.auth = new google.auth.GoogleAuth({
      keyFile: config.googleSheets.credentialsPath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    
    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }

  /**
   * Check and create headers in the sheet if they don't exist
   */
  private async ensureHeaders(spreadsheetId: string): Promise<void> {
    try {
      const headers = [
        'Дата',
        'Склад',
        'Коэффициент доставки и хранения',
        'Базовая стоимость доставки',
        'Стоимость доставки за литр',
        'Базовая стоимость хранения',
        'Стоимость хранения за литр'
      ];

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'stocks_coefs!A1:G1'
      });

      if (!response.data.values) {
        await this.sheets.spreadsheets.values.update({
          spreadsheetId,
          range: 'stocks_coefs!A1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers]
          }
        });
      }
    } catch (error) {
      logger.error('Error ensuring headers:', error);
      throw error;
    }
  }

  /**
   * Export data to Google Sheet
   */
  async exportToSheet(spreadsheetId: string): Promise<void> {
    try {
      logger.info(`Starting export to spreadsheet: ${spreadsheetId}`);
      
      await this.ensureHeaders(spreadsheetId);

      const data = await db('warehouse_tariffs')
        .orderBy('delivery_storage_cost', 'asc')
        .select();

      const values = data.map(row => [
        row.date,
        row.warehouse_name,
        row.delivery_storage_cost,
        row.delivery_base,
        row.delivery_liter,
        row.storage_base,
        row.storage_liter
      ]);

      await this.sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'stocks_coefs!A2',
        valueInputOption: 'RAW',
        requestBody: {
          values
        }
      });

      logger.info(`Successfully exported data to spreadsheet: ${spreadsheetId}`);
    } catch (error) {
      logger.error('Error exporting to Google Sheets:', error);
      throw error;
    }
  }
} 