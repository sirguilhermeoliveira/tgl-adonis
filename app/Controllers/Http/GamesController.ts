import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Game from "App/Models/Game";

export default class GamesController {
  public async index({ response }: HttpContextContract) {
    const games = await Game.all();
    return response.json(games);
  }

  public async store({ request, response }: HttpContextContract) {
    const {
      type,
      description,
      range,
      price,
      max_number,
      color,
      min_cart_value,
    } = request.all();
    const game = new Game();
    game.type = type;
    game.description = description;
    game.range = range;
    game.price = price;
    game.max_number = max_number;
    game.color = color;
    game.min_cart_value = min_cart_value;

    await game.save();
    return response.json(game.$isPersisted);
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;
    const game = await Game.find(id);
    return response.json(game);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const {
      type,
      description,
      range,
      price,
      max_number,
      color,
      min_cart_value,
    } = request.all();
    const game = await Game.findOrFail(id);
    game.type = type || game.type;
    game.description = description || game.description;
    game.range = range || game.range;
    game.price = price || game.price;
    game.max_number = max_number || game.max_number;
    game.color = color || game.color;
    game.min_cart_value = min_cart_value || game.min_cart_value;

    await game.save();
    return response.json(game);
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;
    const game = await Game.findOrFail(id);

    await game.delete();
    return response.status(204);
  }
}
