import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title", () => {
  render(<App />);
  const linkElement = screen.getByText(/TensorFlow/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders image", () => {
  render(<App />);

  const fileUpload = screen.getByRole(/img/);
  expect(fileUpload).toBeInTheDocument();
});
