import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Admin from "App/Models/Admin";
import Mail from "@ioc:Adonis/Addons/Mail";
import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";

export default class AdminsController {
  public async index({ response }: HttpContextContract) {
    const users = await Admin.all();
    return response.json(users);
  }

  public async store({ request, response }: HttpContextContract) {
    const { username, email, password } = request.all();
    const admin = new Admin();
    admin.username = username;
    admin.email = email;
    admin.password = password;

    const adminSchema = schema.create({
      username: schema.string({}, [rules.required()]),
      email: schema.string({}, [rules.email()]),
      password: schema.string({}, [rules.minLength(6)]),
    });

    await validator.validate({
      schema: adminSchema,
      data: { username, email, password },
      messages: {
        "username.required": "Username is required",
        "email.email": "You have to use a valid email",
        "password.minLength": "Password need 6 characters minimum.",
      },
    });

    await admin.save();
    await Mail.sendLater((message) => {
      message
        .to(admin.email)
        .from("sirguilhermeoliveira@gmail.com")
        .subject("New Admin")
        .htmlView("emails/new_admins");
    });
    return response.json(admin.$isPersisted);
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;
    const admin = await Admin.find(id);
    return response.json(admin);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const { username, password, email } = request.all();
    const admin = await Admin.findOrFail(id);

    const adminSchema = schema.create({
      username: schema.string.optional({}, [rules.minLength(3)]),
      email: schema.string.optional({}, [
        rules.email(),
        rules.unique({ table: "users", column: "email" }),
      ]),
      password: schema.string.optional({}, [rules.minLength(6)]),
    });

    await validator.validate({
      schema: adminSchema,
      data: { username, email, password },
      messages: {
        "username.minLength": "Username need 3 character minimum",
        "email.email": "You have to use a valid email",
        "email.unique": "Email already exists",
        "password.minLength": "Password need 6 characters minimum.",
      },
    });

    admin.username = username || admin.username;
    admin.email = email || admin.email;
    admin.password = password || admin.password;

    await admin.save();
    return response.json(admin);
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;
    const admin = await Admin.findOrFail(id);

    await admin.delete();
    return response.status(204);
  }
}
