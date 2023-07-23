import { GroceryItem } from "./grocery-item";

export interface IData {
  getAll(): Array<GroceryItem>;
  addItem(newItem: Partial<GroceryItem>): number;
  getOne(id: number): GroceryItem | undefined;
  updateOne(itemToUpdate: GroceryItem): void;
}

class Data implements IData {
  private _items: Array<GroceryItem> = [];

  getAll(): Array<GroceryItem> {
    return this._items;
  }

  addItem(newItem: Partial<GroceryItem>): number {
    const id = this._items.length + 1;

    this._items.push({
      ...newItem,
      id,
    } as GroceryItem);

    return id;
  }

  getOne(id: number): GroceryItem | undefined {
    return this._items.find((i) => i.id == id);
  }

  updateOne(itemToUpdate: GroceryItem): void {
    this._items = this._items.map((i) =>
      i.id === itemToUpdate.id ? itemToUpdate : i
    );
  }
}

export default Data;
