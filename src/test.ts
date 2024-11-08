import { WildberriesService } from './services/wb.service';
import { GoogleSheetsService } from './services/sheets.service';
import { config } from './config';

async function test() {
  try {
    // Тест получения данных WB
    const wbService = new WildberriesService();
    const tariffs = await wbService.fetchBoxTariffs();
    console.log('Получены тарифы:', tariffs);

    // Тест сохранения в БД
    await wbService.saveTariffs(tariffs);
    console.log('Тарифы сохранены в БД');

    // Тест экспорта в Google Sheets
    const sheetsService = new GoogleSheetsService();
    for (const spreadsheetId of config.googleSheets.spreadsheetIds) {
      await sheetsService.exportToSheet(spreadsheetId);
      console.log(`Данные экспортированы в таблицу: ${spreadsheetId}`);
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

test(); 