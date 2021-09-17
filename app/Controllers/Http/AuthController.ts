import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { sign } from "jsonwebtoken";
import Auth from "App/Models/User";
import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";

export default class AuthController {
  public async store({ request }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    const userAlreadyExists = await Auth.findBy("email", email);
    const passwordAlreadyExists = await Auth.findBy("password", password);

    if (!userAlreadyExists || !passwordAlreadyExists) {
      throw new Error("User or password incorrect.");
    }

    const authSchema = schema.create({
      email: schema.string({}, [rules.required()]),
      password: schema.string({}, [rules.required()]),
    });

    await validator.validate({
      schema: authSchema,
      data: { email, password },
      messages: {
        "email.required": "Email is required",
        "password.required": "Password is required",
      },
    });

    const token = sign({}, "c751a07a-50b8-4313-bd51-2d382fefe470", {
      subject: email,
      expiresIn: "20s",
    });

    return {
      token,
      user_id: userAlreadyExists.id,
    };
  }
}
