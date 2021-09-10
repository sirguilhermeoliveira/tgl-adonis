import Route from "@ioc:Adonis/Core/Route";

Route.resource("/users", "UsersController").apiOnly();
Route.resource("/games", "GamesController").apiOnly();
Route.resource("/bets", "BetsController").apiOnly();

//.prefix("/api")
