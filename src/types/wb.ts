/**
 * Types for Wildberries API
 */

/**
 * @typedef {Object} BoxTariffResponse
 * @property {Object} response - API response
 * @property {Object} response.data - Response data
 * @property {string} response.data.dtNextBox - Next tariff change date
 * @property {string} response.data.dtTillMax - Tariff expiration date
 * @property {WarehouseData[]} response.data.warehouseList - List of warehouses with tariffs
 */

/**
 * @typedef {Object} WarehouseData
 * @property {string} warehouseName - Warehouse name
 * @property {string} boxDeliveryAndStorageExpr - Delivery and storage cost
 * @property {string} boxDeliveryBase - Base delivery cost
 * @property {string} boxDeliveryLiter - Per liter delivery cost
 * @property {string} boxStorageBase - Base storage cost
 * @property {string} boxStorageLiter - Per liter storage cost
 */

export type BoxTariffResponse = {
  response: {
    data: {
      dtNextBox: string;
      dtTillMax: string;
      warehouseList: WarehouseData[];
    };
  };
};

export type WarehouseData = {
  warehouseName: string;
  boxDeliveryAndStorageExpr: string;
  boxDeliveryBase: string;
  boxDeliveryLiter: string;
  boxStorageBase: string;
  boxStorageLiter: string;
}; 