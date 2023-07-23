import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import supertest from "supertest";
import App from "../app";
import Data from "../data";

const mockedGetAll = jest.fn();

jest.mock("../data");

describe("Grocery list tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("General Tests", () => {
    test("jest works", () => {
      expect(true).toBeTruthy();
    });

    test("App can be defined", () => {
      const { app } = new App();
      expect(app).toBeDefined();
    });
  });

  describe("GET /", () => {
    test("Express app responds to GET request", async () => {
      const { app } = new App();
      const response = await supertest(app).get("/");

      expect(app).not.toBeNull();
      expect(response).toBeDefined();
      expect(response.statusCode).not.toBe(404);
    });

    test("returns an array of length 0", async () => {
      jest.spyOn(Data.prototype, "getAll").mockReturnValueOnce([]);

      const { app } = new App();
      const response = await supertest(app).get("/");

      expect(response.body).toEqual([]);
      expect<Array<any>>(response.body).toHaveLength(0);
    });

    test("returns an array of items held in the database", async () => {
      jest.spyOn(Data.prototype, "getAll").mockReturnValueOnce([
        { id: 1, name: "first item", isPurchased: false },
        { id: 2, name: "second item", isPurchased: false },
      ]);

      const { app } = new App();
      const response = await supertest(app).get("/");

      expect<Array<any>>(response.body).toHaveLength(2);
      expect<any>(response.body[0]).toEqual({
        id: 1,
        name: "first item",
        isPurchased: false,
      });
    });
  });

  describe("POST /", () => {
    test("responds to post request", async () => {
      const { app } = new App();
      const response = await supertest(app).post("/");

      expect(response.statusCode).not.toBe(404);
    });

    test("returns 400 if name is empty", async () => {
      const mockedFn = jest.spyOn(Data.prototype, "addItem");

      const { app } = new App();
      const response = await supertest(app).post("/").send({});

      expect(response.statusCode).toBe(400);
      expect(mockedFn).not.toBeCalled();
    });

    test("returns 201 if name is valid", async () => {
      const mockedFn = jest.spyOn(Data.prototype, "addItem");

      const { app } = new App();
      const response = await supertest(app).post("/").send({ name: "cheese" });

      expect(response.statusCode).toBe(201);
    });

    test("adds new item to database", async () => {
      const mockedFn = jest.spyOn(Data.prototype, "addItem");

      const { app } = new App();
      await supertest(app).post("/").send({ name: "cheese" });

      expect(mockedFn).toBeCalledTimes(1);
    });

    test("returns a new grocery item", async () => {
      jest.spyOn(Data.prototype, "addItem").mockReturnValueOnce(1);

      const groceryItem = { id: 1, name: "cheese", isPurchased: false };

      const { app } = new App();
      const response = await supertest(app).post("/").send({ name: "cheese" });

      expect(response.body).toMatchObject(groceryItem);
    });
  });

  describe("PUT /:id/purchase", () => {
    test("responds to request", async () => {
      const { app } = new App();
      const response = await supertest(app).put("/1/purchase");

      expect(response.statusCode).not.toBe(404);
    });

    test("returns 400 error status", async () => {
      const { app } = new App();
      const response = await supertest(app).put("/1/purchase");

      expect(response.statusCode).toBe(400);
    });

    test("returns 400 error status", async () => {
      const { app } = new App();
      const response = await supertest(app).put("/XXX/purchase");

      expect(response.statusCode).toBe(400);
    });

    test("returns 200 status", async () => {
      const groceryItem = { id: 1, name: "cheese", isPurchased: false };
      jest.spyOn(Data.prototype, "getOne").mockReturnValueOnce(groceryItem);

      const { app } = new App();
      const response = await supertest(app).put("/1/purchase");

      expect(response.statusCode).toBe(200);
    });

    test("returns purchased grocery item", async () => {
      const groceryItem = { id: 1, name: "cheese", isPurchased: false };
      jest.spyOn(Data.prototype, "getOne").mockReturnValueOnce(groceryItem);

      const { app } = new App();
      const response = await supertest(app).put("/1/purchase");

      expect(response.body).toEqual({ ...groceryItem, isPurchased: true });
    });

    test("calls updateOne with changes", async () => {
      const groceryItem = { id: 1, name: "cheese", isPurchased: false };
      jest.spyOn(Data.prototype, "getOne").mockReturnValueOnce(groceryItem);
      const mockedFn = jest.spyOn(Data.prototype, "updateOne");

      const { app } = new App();
      await supertest(app).put("/1/purchase");

      expect(mockedFn).toBeCalledTimes(1);
      expect(mockedFn).toBeCalledWith({
        ...groceryItem,
        isPurchased: true,
      });
    });
  });
});
