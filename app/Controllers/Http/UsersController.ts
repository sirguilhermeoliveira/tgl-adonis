import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all();
    return response.json(users);
  }

  /*   public async store({ request }: HttpContextContract) {
    console.log(request);
    const data = request.only(["username", "email", "password"]);
    console.log(data);
    const user = await User.create(data);
    return user;
  } */

  public async store({ request, response }: HttpContextContract) {
    const { username, email, password } = request.all();
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    console.log(user);
    console.log(request);
    console.log(response);
    await user.save();
    return response.json(user.$isPersisted);
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;
    const user = await User.find(id);
    return response.json(user);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const { username, password } = request.all();
    const user = await User.findOrFail(id);
    user.username = username || user.username;
    user.email = user.email || user.email;
    user.password = password || user.password;

    await user.save();
    return response.json(user);
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;
    const user = await User.findOrFail(id);

    await user.delete();
    return response.status(204);
  }
}
