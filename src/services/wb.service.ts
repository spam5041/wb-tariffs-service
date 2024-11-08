import axios from 'axios';
import { BoxTariffResponse, WarehouseData } from '../types/wb';
import { db } from '../db/connection';
import { config } from '../config';

export class WildberriesService {
  private readonly API_URL = `${config.wildberries.baseUrl}/tariffs/box`;
  
  /**
   * Fetch current box tariffs from WB API
   */
  async fetchBoxTariffs(): Promise<WarehouseData[]> {
    try {
      const date = new Date().toISOString().split('T')[0];
      const response = await axios.get<BoxTariffResponse>(
        `${this.API_URL}?date=${date}`,
        {
          headers: {
            'Authorization': config.wildberries.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.response.data.warehouseList;
    } catch (error) {
      console.error('Error fetching WB tariffs:', error);
      throw error;
    }
  }

  /**
   * Save tariffs to database
   */
  async saveTariffs(tariffs: WarehouseData[]): Promise<void> {
    const date = new Date().toISOString().split('T')[0];

    const formattedTariffs = tariffs.map(tariff => ({
      date,
      warehouse_name: tariff.warehouseName,
      delivery_storage_cost: parseFloat(tariff.boxDeliveryAndStorageExpr.replace(',', '.')),
      delivery_base: parseFloat(tariff.boxDeliveryBase.replace(',', '.')),
      delivery_liter: parseFloat(tariff.boxDeliveryLiter.replace(',', '.')),
      storage_base: tariff.boxStorageBase === '-' ? 0 : parseFloat(tariff.boxStorageBase.replace(',', '.')),
      storage_liter: tariff.boxStorageLiter === '-' ? 0 : parseFloat(tariff.boxStorageLiter.replace(',', '.'))
    }));

    // Use UPSERT to update existing records
    await db('warehouse_tariffs')
      .insert(formattedTariffs)
      .onConflict(['date', 'warehouse_name'])
      .merge();
  }
} 