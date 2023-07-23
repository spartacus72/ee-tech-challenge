import { render, screen } from "@testing-library/react";
import Header from ".";
import { test } from "@jest/globals";
import '@testing-library/jest-dom/matchers';

test("renders equal experts home link", () => {
  render(<Header />);
  const linkElement = screen.getByTitle(/EE homepage/i);
  expect(linkElement).toBeInTheDocument();
});

test("has equal experts branding", () => {
  render(<Header />);

  const imageElement = screen.getByAltText("[=] Equal Experts");
  expect(imageElement).toBeInTheDocument();
});
