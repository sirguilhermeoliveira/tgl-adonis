import { DateTime } from "luxon";
import { BelongsTo, belongsTo, BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import Game from "App/Models/Game";

export default class Bet extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: number;

  @column()
  public game_id: number;

  @column()
  public game_numbers: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User, { foreignKey: "user_id" })
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Game, { foreignKey: "game_id" })
  public game: BelongsTo<typeof Game>;
}
