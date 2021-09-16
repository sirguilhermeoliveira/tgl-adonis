import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Mail from "@ioc:Adonis/Addons/Mail";
import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all();
    return response.json(users);
  }

  public async store({ request, response }: HttpContextContract) {
    const { username, email, password } = request.all();
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    const userSchema = schema.create({
      username: schema.string({}, [rules.required()]),
      email: schema.string({}, [rules.email()]),
      password: schema.string({}, [rules.minLength(6)]),
    });

    await validator.validate({
      schema: userSchema,
      data: { username, email, password },
      messages: {
        "username.required": "Username is required",
        "email.email": "You have to use a valid email",
        "password.minLength": "Password need 6 characters minimum.",
      },
    });

    await user.save();
    await Mail.send((message) => {
      message
        .to(user.email)
        .from("sirguilhermeoliveira@gmail.com")
        .subject("New Account")
        .htmlView("emails/new_users");
    });
    return response.json(user.$isPersisted);
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;
    const user = await User.find(id);
    return response.json(user);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const { username, password, email } = request.all();
    const user = await User.findOrFail(id);

    const userSchema = schema.create({
      username: schema.string({}, [rules.required()]),
      email: schema.string({}, [rules.email()]),
      password: schema.string({}, [rules.minLength(6)]),
    });

    await validator.validate({
      schema: userSchema,
      data: { username, email, password },
      messages: {
        "username.required": "Username is required",
        "email.email": "You have to use a valid email",
        "password.minLength": "Password need 6 characters minimum.",
      },
    });

    user.username = username || user.username;
    user.email = email || user.email;
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
