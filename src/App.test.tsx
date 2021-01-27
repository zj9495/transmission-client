import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Transmission", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/transmission/i)[0];
  expect(linkElement).toBeInTheDocument();
});
