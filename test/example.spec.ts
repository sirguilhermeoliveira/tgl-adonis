/* import test from "japa";
import { JSDOM } from "jsdom";
import supertest from "supertest";
import User from "App/Models/User";
import Database from "@ioc:Adonis/Lucid/Database";

// Run tests: node -r @adonisjs/assembler/build/register japaFile.ts

// Sum test
test.group("Example", () => {
  test("assert sum", (assert) => {
    assert.equal(2 + 2, 4);
  });
});

//Testing HTTP Calls
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;

test.group("Welcome", () => {
  test("ensure home page works", async (assert) => {
    const { text } = await supertest(BASE_URL).get("/").expect(200);

    const { document } = new JSDOM(text).window;

    const title = document.querySelector(".title");
    assert.exists(title);
    assert.equal(title!.textContent!.trim(), "It Works!");
  });
});

//Interacting with the database

test.group("Welcome", () => {
  test("ensure home page works", async (assert) => {
    const { text } = await supertest(BASE_URL).get("/").expect(200);
    const { document } = new JSDOM(text).window;
    const title = document.querySelector(".title");

    assert.exists(title);
    assert.equal(title!.textContent!.trim(), "It Works!");
  });

  test("ensure user password gets hashed during save", async (assert) => {
    const user = new User();
    user.email = "virk@adonisjs.com";
    user.password = "secret";
    await user.save();

    assert.notEqual(user.password, "secret");
  });
});

//Running a single test(other half in the japaFile.ts)

test.only("ensure user password gets hashed during save", async (assert) => {
  const user = new User();
  user.email = "virk@adonisjs.com";
  user.password = "secret";
  await user.save();

  assert.notEqual(user.password, "secret");
});

//Wrapping Up

test.group("Example", (group) => {
  group.before(async () => {
    console.log("before all tests");
  });

  group.beforeEach(async () => {
    console.log("before every test");
  });

  group.after(async () => {
    console.log("after all tests");
  });

  group.afterEach(async () => {
    console.log("after every test");
  });
});

//Using global database transactions

test.group("Example", (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction();
  });

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction();
  });
});
 */
