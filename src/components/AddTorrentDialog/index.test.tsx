import React from "react";
import { screen, render } from "@testing-library/react";

import { Providers } from "src/components/renderWithProviders";

import AddTorrentDialog from "./index";

describe("test AddTorrentDialog", () => {
  it("render AddTorrentDialog", () => {
    const state = {
      app: { open: true },
      rpc: {
        session: {
          downloadDir: "",
        },
      },
    };
    const { rerender } = render(
      <Providers state={state}>
        <AddTorrentDialog />
      </Providers>
    );

    const downloadDirInput = screen.getByTestId(
      "download-dir"
    ) as HTMLInputElement;

    expect(screen.queryAllByTestId("add-torrent-dialog").length).toBe(1);
    expect(downloadDirInput.value).toBe("");

    state.rpc.session.downloadDir = "MOCK_DIR";
    rerender(
      <Providers state={state}>
        <AddTorrentDialog />
      </Providers>
    );

    expect(downloadDirInput.value).toBe("MOCK_DIR");
  });

  it("should not render dialog if open is false", () => {
    const state = {
      app: { open: false },
      rpc: {
        session: {
          downloadDir: "",
        },
      },
    };
    const { rerender } = render(
      <Providers state={state}>
        <AddTorrentDialog />
      </Providers>
    );

    expect(screen.queryAllByTestId("add-torrent-dialog").length).toBe(0);

    state.app.open = true;
    rerender(
      <Providers state={state}>
        <AddTorrentDialog />
      </Providers>
    );

    expect(screen.queryAllByTestId("add-torrent-dialog").length).toBe(1);
  });

  it("should update download dir when downloadDir state change", () => {
    const state = {
      app: { open: true },
      rpc: {
        session: {
          downloadDir: "",
        },
      },
    };
    const { rerender } = render(
      <Providers state={state}>
        <AddTorrentDialog />
      </Providers>
    );
    const downloadDirInput = screen.getByTestId(
      "download-dir"
    ) as HTMLInputElement;

    expect(downloadDirInput.value).toBe("");

    state.rpc.session.downloadDir = "MOCK_DIR";

    rerender(
      <Providers state={state}>
        <AddTorrentDialog />
      </Providers>
    );

    expect(downloadDirInput.value).toBe("MOCK_DIR");
  });
});
