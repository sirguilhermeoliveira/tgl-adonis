import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Admins extends BaseSchema {
  protected tableName = "admins";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
