/* eslint-disable testing-library/prefer-screen-queries */
import { beforeEach, describe, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import List from ".";
import * as api from "../../app/api";
import ListItem from "../list-item";

jest.mock("../../app/api");
jest.mock("../list-item");

describe("List component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading text", () => {
    jest
      .spyOn(api, "useGetListQuery")
      .mockImplementation(jest.fn().mockReturnValueOnce({ isLoading: true }));

    render(<List />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("renders an empty list", () => {
    jest
      .spyOn(api, "useGetListQuery")
      .mockImplementation(
        jest.fn().mockReturnValueOnce({ data: [], isLoading: false })
      );

    render(<List />);

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test("renders one item in the list", () => {
    const groceryItem = { id: 1, name: "eggs", isPurchased: false };

    jest.spyOn(api, "useGetListQuery").mockImplementation(
      jest.fn().mockReturnValueOnce({
        data: [groceryItem],
        isLoading: false,
      })
    );

    render(<List />);

    expect(ListItem).toBeCalledTimes(1);
    expect(ListItem).toBeCalledWith(
      expect.objectContaining(groceryItem),
      expect.anything()
    );
  });

  test("renders two list item components", () => {
    const groceryItemOne = { id: 1, name: "eggs", isPurchased: false };
    const groceryItemTwo = { id: 2, name: "cheese", isPurchased: false };

    jest.spyOn(api, "useGetListQuery").mockImplementation(
      jest.fn().mockReturnValueOnce({
        data: [groceryItemOne, groceryItemTwo],
        isLoading: false,
      })
    );

    render(<List />);

    expect(ListItem).toBeCalledTimes(2);
    expect(ListItem).toHaveBeenCalledWith(
      expect.objectContaining(groceryItemOne),
      expect.anything()
    );
    expect(ListItem).toHaveBeenLastCalledWith(
      expect.objectContaining(groceryItemTwo),
      expect.anything()
    );
  });
});
