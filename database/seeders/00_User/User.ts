import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

//node -r @adonisjs/assembler/build/register japaFile.ts

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      id: 1,
      username: "Usuário",
      email: "user@user.com",
      password: "123456",
    });
  }
}
