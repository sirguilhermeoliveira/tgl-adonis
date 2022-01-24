import test from "japa";
import supertest from "supertest";

// Run tests: node -r @adonisjs/assembler/build/register japaFile.ts

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;

test.group("User Authentication", () => {
  test("with valid fields should succeed with status code 200", async (assert) => {
    const response = await supertest(BASE_URL).post("/login").send({
      email: "admin@admin.com",
      password: "123456",
    });
    assert.equal(response.status, 200);
  });
});
