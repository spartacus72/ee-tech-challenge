import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { ReactNode } from "react";
import { store } from "./app/store";

export function wrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState: any = {},
    // Automatically create a store instance if no store was passed in
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch);

  return { ...render(ui, { wrapper, ...renderOptions }) };
}
