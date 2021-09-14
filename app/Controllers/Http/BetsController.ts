import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Bet from "App/Models/Bet";
export default class BetsController {
  public async index({ response }: HttpContextContract) {
    const bets = await Bet.all();
    return response.json(bets);
  }

  public async store({ request, response }: HttpContextContract) {
    const { game_id, game_numbers } = request.all();
    const bet = new Bet();
    bet.game_id = game_id;
    bet.game_numbers = game_numbers;

    await bet.save();
    return response.json(bet.$isPersisted);
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;
    const bet = await Bet.find(id);
    return response.json(bet);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const { game_id, game_numbers } = request.all();
    const bet = await Bet.findOrFail(id);
    bet.game_id = game_id || bet.game_id;
    bet.game_numbers = game_numbers || bet.game_numbers;

    await bet.save();
    return response.json(bet);
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;
    const bet = await Bet.findOrFail(id);

    await bet.delete();
    return response.status(204);
  }
}
