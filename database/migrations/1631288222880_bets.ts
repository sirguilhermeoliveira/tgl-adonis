import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Bets extends BaseSchema {
  protected tableName = "bets";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("game_id")
        .unsigned()
        .notNullable()
        .references("games.id")
        .onDelete("CASCADE")
        .onDelete("CASCADE");
      table.string("game_numbers").notNullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
