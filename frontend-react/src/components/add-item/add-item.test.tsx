import { describe, it, test } from "@jest/globals";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom/matchers";
import * as api from "../../app/api";
import AddItem from ".";
import React from "react";

const setStateMock = jest.fn();
const useAddItemMutationMock = jest.fn();
const addItemeMock = jest.fn();

jest.mock("../../app/api");

jest.mock("react", () => ({
  ...jest.requireActual("react"),
}));

describe("add item form tests", () => {
  beforeEach(() => {
    const useStateMock: any = (initial: any) => [initial, setStateMock];

    jest.clearAllMocks();

    jest
      .spyOn(api, "useAddItemMutation")
      .mockImplementation(
        useAddItemMutationMock.mockReturnValueOnce([addItemeMock])
      );

    jest.spyOn(React, "useState").mockImplementation(useStateMock);
  });

  test("jest is configured", () => {
    expect(true).toBe(true);
  });

  it("renders a form with a textBox and submitButton", () => {
    render(<AddItem />);

    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();

    const submitButton = within(formElement).getByRole("button");
    expect(submitButton).toBeInTheDocument();

    expect(within(formElement).getByRole("textbox")).toBeInTheDocument();
  });

  test("textbox is initially empty and has focxus", () => {
    render(<AddItem />);

    const input = screen.getByRole<HTMLInputElement>("textbox");

    expect(input.value).toEqual("");
    expect(input).toHaveFocus();
  });

  it("updates state", () => {
    render(<AddItem />);

    const input = screen.getByRole<HTMLInputElement>("textbox");

    fireEvent.change(input, { target: { value: "eggs" } });

    expect(setStateMock).toBeCalled();
    expect(setStateMock).toBeCalledWith("eggs");
  });

  it("displays value from state", () => {
    const useStateMock: any = (useState: any) => ["eggs", setStateMock];
    jest.spyOn(React, "useState").mockImplementationOnce(useStateMock);

    render(<AddItem />);

    const input = screen.getByRole<HTMLInputElement>("textbox");

    expect(input).toHaveValue("eggs");
  });

  it("calls useAddItemMutation", () => {
    render(<AddItem />);

    expect(useAddItemMutationMock).toBeCalled();
  });

  it("calls add item with correct value from state when submit button is clicked", () => {
    const useStateMock: any = (useState: any) => ["cheese", setStateMock];
    jest.spyOn(React, "useState").mockImplementationOnce(useStateMock);

    render(<AddItem />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(addItemeMock).toBeCalled();
    expect(addItemeMock).toBeCalledWith({ name: "cheese" });
  });
});
