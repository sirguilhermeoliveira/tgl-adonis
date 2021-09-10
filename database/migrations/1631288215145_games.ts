import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Games extends BaseSchema {
  protected tableName = "games";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("type").unique().notNullable();
      table.string("description").notNullable();
      table.integer("range").notNullable();
      table.decimal("price").notNullable();
      table.integer("max_number").notNullable();
      table.string("color").notNullable();
      table.integer("min_cart_value").notNullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
