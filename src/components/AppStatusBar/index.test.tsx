import React from "react";
import { screen } from "@testing-library/react";
import renderWithProviders from "../renderWithProviders";

import AppStatusBar from "./index";

test("renders Transmission", () => {
  const state = {
    app: { open: true },
    rpc: {
      locale: "en-US",
      stats: {
        downloadSpeed: 102400,
        uploadSpeed: 102400,
      },
      session: {
        downloadDirFreeSpace: 102400,
        version: "MOCK_VERSION",
        rpcVersion: 10,
      },
    },
  };
  renderWithProviders(<AppStatusBar />, state);
  const linkElement = screen.getByText(/Transmission/i);
  expect(linkElement).toBeInTheDocument();
});
