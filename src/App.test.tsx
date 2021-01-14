import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Transmission", () => {
  render(<App />);
  const linkElement = screen.getByText(/transmission/i);
  expect(linkElement).toBeInTheDocument();
});
