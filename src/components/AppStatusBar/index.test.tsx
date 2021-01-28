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
        downloadSpeed: 100000,
        uploadSpeed: 200000,
      },
      session: {
        downloadDirFreeSpace: 500000000000,
        version: "MOCK_VERSION",
        rpcVersion: 10,
      },
    },
  };
  renderWithProviders(<AppStatusBar />, state);
  expect(screen.getByText("Download speed:100kB/s")).toBeInTheDocument();
  expect(screen.getByText("Seed speed:200kB/s")).toBeInTheDocument();
  expect(screen.getByText("Free space:500GB")).toBeInTheDocument();
  expect(
    screen.getByText("Transmission Version:MOCK_VERSION")
  ).toBeInTheDocument();
  expect(screen.getByText("RPC: 10")).toBeInTheDocument();
});
