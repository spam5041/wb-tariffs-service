import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create table for storing tariffs
  await knex.schema.createTable('warehouse_tariffs', (table) => {
    table.increments('id').primary();
    table.date('date').notNullable(); // Date of tariff
    table.string('warehouse_name').notNullable(); // Warehouse name
    table.decimal('delivery_storage_cost', 10, 2); // Delivery and storage cost
    table.decimal('delivery_base', 10, 2); // Base delivery cost
    table.decimal('delivery_liter', 10, 2); // Per liter delivery cost
    table.decimal('storage_base', 10, 2); // Base storage cost  
    table.decimal('storage_liter', 10, 2); // Per liter storage cost
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    // Create unique composite index
    table.unique(['date', 'warehouse_name']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('warehouse_tariffs');
} 