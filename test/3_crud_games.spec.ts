import test from "japa";
import supertest from "supertest";

// Run tests: node -r @adonisjs/assembler/build/register japaFile.ts

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;

test.group("Create Game", () => {
  test("with valid fields should succeed with status code 200", async (assert) => {
    const response = await supertest(BASE_URL).post("/games").send({
        type: "Lotomania",
        description: "Mark as many numbers as you want up to a maximum of 50. Win by hitting 15, 16, 17, 18, 19, 20 or none of the 20 numbers drawn.",
        range: 100,
        price: 2.5,
        max_number: 50,
        color: "#EC4C40",
        min_cart_value: 30
    });
    assert.equal(response.status, 200);
  });
});

test.group("List All Games", () => {
  test("with valid fields should succeed with status code 200", async (assert) => {
    const response = await supertest(BASE_URL).get("/games")
    assert.equal(response.status, 200);
  });
});

test.group("Show a game", () => {
  test("with valid fields should succeed with status code 200", async (assert) => {
    const response = await supertest(BASE_URL).get("/games/1")
    assert.equal(response.status, 200);
  });
});

test.group("Update Game", () => {
  test("with valid fields should succeed with status code 200", async (assert) => {
    const response = await supertest(BASE_URL).put("/games").send({
        type: "Mega-sena",
        description: "Mark as many numbers as you want up to a maximum of 50. Win by hitting 15, 16, 17, 18, 19, 20 or none of the 20 numbers drawn.",
        range: 50,
        price: 5,
        max_number: 25,
        color: "#000",
        min_cart_value: 10
    });
    assert.equal(response.status, 200);
  });
});

test.group("Delete Game", () => {
  test("with valid fields should succeed with status code 200", async (assert) => {
    const response = await supertest(BASE_URL).del("/games/1")
    assert.equal(response.status, 200);
  });
});
