import { render } from "@testing-library/react";
import App from ".";
import Header from "../header";
import { test } from "@jest/globals";
import List from "../list";
import AddItem from "../add-item";

jest.mock("../header");
jest.mock("../list");
jest.mock("../add-item");

test("renders header component", () => {
  render(<App />);

  expect(Header).toBeCalled();
});

test("renders list component", () => {
  render(<App />);

  expect(List).toBeCalled();
});

test("renders form component", () => {
  render(<App />);

  expect(AddItem).toBeCalled();
});