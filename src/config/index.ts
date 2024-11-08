import dotenv from 'dotenv';

dotenv.config();

export const config = {
  wildberries: {
    apiKey: process.env.WB_API_KEY || '',
    baseUrl: 'https://common-api.wildberries.ru/api/v1'
  },
  googleSheets: {
    spreadsheetIds: process.env.GOOGLE_SHEET_IDS?.split(',') || [],
    credentialsPath: process.env.GOOGLE_CREDENTIALS_PATH || 'credentials.json'
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'wb_tariffs',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres'
  }
}; 