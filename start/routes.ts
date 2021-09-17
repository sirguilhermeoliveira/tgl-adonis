import Route from "@ioc:Adonis/Core/Route";

Route.resource("/users", "UsersController").apiOnly();
Route.resource("/games", "GamesController").apiOnly();
Route.resource("users.bets", "BetsController").apiOnly();
Route.resource("/login", "AuthController").apiOnly();
Route.post("passwords", "ForgotPasswordController.store");
Route.put("passwords", "ForgotPasswordController.update");
//.prefix("/api")
