import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { DateTime } from "luxon";
import Mail from "@ioc:Adonis/Addons/Mail";
const crypto = require("crypto");
const moment = require("moment");

export default class ForgotPasswordsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);

      user.reset_token = crypto.randomBytes(10).toString("hex");
      user.reset_token_created_at = DateTime.now();

      await user.save();

      await Mail.send((message) => {
        message
          .to(user.email)
          .from("sirguilhermeoliveira@gmail.com")
          .subject("Recovery Password")
          .htmlView("emails/forgot_password", {
            email,
            token: user.reset_token,
            link: `${request.input("redirect_url")}?token=${user.reset_token}`,
          });
      });
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Something is wrong, this email exists?" } });
    }
  }
  public async update({ request, response }: HttpContextContract) {
    try {
      const { token, password } = request.all();

      const user = await User.findByOrFail("reset_token", token);

      const tokenExpired = moment()
        .subtract("2", "days")
        .isAfter(user.reset_token_created_at);

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: "The token has expired." } });
      }

      user.reset_token = "";
      user.password = password;

      await user.save();
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Something is wrong, this token exists?" } });
    }
  }
}
