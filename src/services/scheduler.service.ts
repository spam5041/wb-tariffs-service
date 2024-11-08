import cron from 'node-cron';
import { WildberriesService } from './wb.service';
import { GoogleSheetsService } from './sheets.service';
import { config } from '../config';
import { logger } from '../utils/logger';

export class SchedulerService {
  private readonly wbService: WildberriesService;
  private readonly sheetsService: GoogleSheetsService;

  constructor() {
    this.wbService = new WildberriesService();
    this.sheetsService = new GoogleSheetsService();
  }

  /**
   * Запускает все запланированные задачи
   */
  public startScheduledTasks(): void {
    // Получение данных каждый час
    cron.schedule('0 * * * *', async () => {
      try {
        logger.info('Starting WB tariffs fetch task');
        const tariffs = await this.wbService.fetchBoxTariffs();
        await this.wbService.saveTariffs(tariffs);
        logger.info('WB tariffs fetch task completed successfully');
      } catch (error) {
        logger.error('Error in WB tariffs fetch task:', error);
      }
    });

    // Экспорт в Google Sheets каждые 2 часа
    cron.schedule('0 */2 * * *', async () => {
      try {
        logger.info('Starting Google Sheets export task');
        for (const spreadsheetId of config.googleSheets.spreadsheetIds) {
          await this.sheetsService.exportToSheet(spreadsheetId);
          logger.info(`Exported data to spreadsheet: ${spreadsheetId}`);
        }
        logger.info('Google Sheets export task completed successfully');
      } catch (error) {
        logger.error('Error in Google Sheets export task:', error);
      }
    });
  }
} 