import { describe, it } from "@jest/globals";
import ListItem from ".";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/matchers";
import * as api from "../../app/api";

const purchaseMock = jest.fn();

jest.mock("../../app/api");

describe("list item tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest
      .spyOn(api, "usePurchaseMutation")
      .mockImplementation(jest.fn().mockReturnValueOnce([purchaseMock]));
  });

  describe("List item tests", () => {
    it("renders empty when no props provided", () => {
      const { container } = render(<ListItem />);

      expect(container).toBeEmptyDOMElement();
    });

    it("renders a grocery item when provided", () => {
      const groceryItem = { id: 1, name: "eggs", isPurchased: false };

      render(<ListItem {...groceryItem} />);

      const element = screen.getByRole("listitem");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("eggs");
    });

    it("does not have strikethrough if not purchased", () => {
      const groceryItem = { id: 1, name: "eggs", isPurchased: false };

      render(<ListItem {...groceryItem} />);
      const element = screen.getByRole("listitem");

      expect(element).not.toHaveStyle({ textDecoration: "line-through" });
    });

    it("has strikethrough when purhased", () => {
      const groceryItem = { id: 1, name: "eggs", isPurchased: true };

      render(<ListItem {...groceryItem} />);
      const element = screen.getByRole("listitem");

      expect(element).toHaveStyle({ textDecoration: "line-through" });
    });

    it("click calls purchase", () => {
      const groceryItem = { id: 1, name: "eggs", isPurchased: true };

      render(<ListItem {...groceryItem} />);

      const listItem = screen.getByRole("listitem");
      fireEvent.click(listItem);

      expect(purchaseMock).toBeCalledTimes(1);
    });
  });
});
