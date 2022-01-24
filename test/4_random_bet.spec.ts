import test from "japa";
import supertest from "supertest";

// Run tests: node -r @adonisjs/assembler/build/register japaFile.ts

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;

test.group("Random Game 1 Bet", () => {
  test("with valid fields should succeed with status code 200", async (assert) => {
    const randomNumber = Math.floor(Math.random() * 60) + 1;
    const response = await supertest(BASE_URL).post("/users/1/bets").send({
        game_id: 1,
        game_numbers: String(randomNumber)
    });
    assert.equal(response.status, 200);
  });
});
