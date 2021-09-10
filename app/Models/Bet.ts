import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Bet extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public game_id: number;

  @column()
  public game_numbers: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
