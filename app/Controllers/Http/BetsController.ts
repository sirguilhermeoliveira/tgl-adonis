import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Bet from "App/Models/Bet";
import User from "App/Models/User";
import Mail from "@ioc:Adonis/Addons/Mail";
import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";
export default class BetsController {
  public async index({ params, request }: HttpContextContract) {
    const page = request.input("page", 1);
    const filter = request.input("filter");
    const limit = 10;
    let bets;
    if (filter === String(0)) {
      bets = await Bet.query()
        .where("user_id", params.user_id)
        .preload("user")
        .preload("game")
        .paginate(page, limit);
    } else {
      bets = await Bet.query()
        .where("user_id", params.user_id)
        .where("game_id", Number(filter))
        .preload("user")
        .preload("game")
        .paginate(page, limit);
    }

    return bets;
  }

  public async store({ params, request, response }: HttpContextContract) {
    const user = await User.findOrFail(params.user_id);

    const data = request.only(["bets"]);

    const betSchema = schema.create({
      game_id: schema.number([rules.required()]),
      game_numbers: schema.string({}, [rules.required()]),
    });

    data.bets.forEach(async (data) => {
      try {
        await validator.validate({
          schema: betSchema,
          data,
          messages: {
            "game_id.required": "Game Id is required",
            "game_numbers.required": "Game Numbers is required",
          },
        });
      } catch (error) {
        return response.status(400).send({ error });
      }
    });

    data.bets.forEach(async (data) => {
      try {
        await Bet.create({ ...data, user_id: params.user_id });
      } catch (error) {
        return response.status(400).send({ error });
      }
    });

    await Mail.send((message) => {
      message
        .to(user.email)
        .from("sirguilhermeoliveira@gmail.com")
        .subject("New Bet")
        .htmlView("emails/new_bets");
    });
    return response.status(200).send("Bet added with sucess!");
  }

  public async show({ params }: HttpContextContract) {
    const bet = await Bet.query()
      .where("id", params.id)
      .preload("user")
      .preload("game");
    return bet;
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
