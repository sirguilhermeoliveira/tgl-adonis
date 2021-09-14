import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { sign } from "jsonwebtoken";
import Auth from "App/Models/User";

export default class AuthController {
  public async store({ request }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    const userAlreadyExists = await Auth.findBy("email", email);
    const passwordAlreadyExists = await Auth.findBy("password", password);
    if (!userAlreadyExists || !passwordAlreadyExists) {
      throw new Error("User or password incorrect.");
    }
    const token = sign({}, "c751a07a-50b8-4313-bd51-2d382fefe470", {
      subject: email,
      expiresIn: "20s",
    });

    return {
      token,
    };
  }
}
