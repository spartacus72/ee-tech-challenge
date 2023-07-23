import express, { json } from "express";
import cors from "cors";
import Data, { IData } from "./data";
import { GroceryItem } from "./grocery-item";

export interface IApp {
  app: express.Application;
}

type PostRequestBody = {
  name: string;
};

type PurchaseParams = {
  id: number;
};

class App implements IApp {
  private _app: express.Application = express();
  private _data: IData = new Data();

  constructor() {
    // middlewares
    // json and cors do npt use TDD!  Something to figure out!
    this._app
      .use(json())
      .use(cors())

      .get<never, Array<GroceryItem>, never>("/", (req, res, next) => {
        res.send(this._data.getAll());
      })

      .post<never, GroceryItem, { name: string }>("/", (req, res, next) => {
        const { name } = req.body;
        if (!name) res.sendStatus(400);
        else {
          const groceryItem = { name, isPurchased: false };
          const id = this._data.addItem(groceryItem);

          res.status(201).send({
            ...groceryItem,
            id,
          });
        }
      })

      .put<PurchaseParams, GroceryItem, never>(
        "/:id/purchase",
        (req, res, next) => {
          const { id } = req.params;
          const groceryItem = this._data.getOne(id);

          if (!groceryItem) res.sendStatus(400);
          else {
            groceryItem.isPurchased = true;

            this._data.updateOne(groceryItem);

            res.status(200).send(groceryItem);
          }
        }
      );
  }

  get app() {
    return this._app;
  }
}

export default App;
