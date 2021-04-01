import React from "react";
import { screen, render, fireEvent, act } from "@testing-library/react";

import { Providers } from "src/components/renderWithProviders";

import * as api from "src/api";
import AddTorrentDialog from "./index";

jest.mock("src/api/request");

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

  it("auto start should be disabled in advanced mode", () => {
    const state = {
      app: { open: true },
      rpc: {
        session: {
          downloadDir: "",
        },
      },
    };
    render(
      <Providers state={state}>
        <AddTorrentDialog />
      </Providers>
    );
    const downloadDirInput = screen.getByTestId(
      "auto-start"
    ) as HTMLInputElement;

    expect(downloadDirInput.disabled).toBe(true);

    // switch to basic mode
    fireEvent.click(screen.getByTestId("advanced-mode"));

    expect(downloadDirInput.disabled).toBe(false);
  });

  it("auto start should be enabled by default in basic mode", () => {
    const state = {
      app: { open: true },
      rpc: {
        session: {
          downloadDir: "",
        },
      },
    };
    render(
      <Providers state={state}>
        <AddTorrentDialog />
      </Providers>
    );

    // switch to basic mode
    fireEvent.click(screen.getByTestId("advanced-mode"));

    const downloadDirInput = screen.getByTestId(
      "auto-start"
    ) as HTMLInputElement;

    expect(downloadDirInput.checked).toBe(true);
  });

  it("test auto start in basic mode", async () => {
    const state = {
      app: {
        open: true,
      },
      rpc: {
        session: {
          downloadDir: "/download/compelete",
        },
      },
    };
    const addTorrentSpy = jest.spyOn(api, "addTorrent");
    render(
      <Providers state={state}>
        <AddTorrentDialog />
      </Providers>
    );

    // switch to basic mode
    fireEvent.click(screen.getByTestId("advanced-mode"));
    fireEvent.change(screen.getByTestId("torrent-link"), {
      target: { value: "MOCK_INPUT" },
    });
    await act(async () => {
      fireEvent.submit(screen.getByTestId("add-form-submit"));
    });

    expect(addTorrentSpy).toHaveBeenCalled();
    expect(addTorrentSpy.mock.calls[0][2]).toBe(false);
    addTorrentSpy.mockRestore();
  });

  it("test disable auto start in basic mode", async () => {
    const state = {
      app: {
        open: true,
      },
      rpc: {
        session: {
          downloadDir: "/download/compelete",
        },
      },
    };
    const addTorrentSpy = jest.spyOn(api, "addTorrent");
    render(
      <Providers state={state}>
        <AddTorrentDialog />
      </Providers>
    );

    // switch to basic mode
    fireEvent.click(screen.getByTestId("advanced-mode"));
    fireEvent.change(screen.getByTestId("torrent-link"), {
      target: { value: "MOCK_INPUT" },
    });
    fireEvent.click(screen.getByTestId("auto-start"));
    await act(async () => {
      fireEvent.submit(screen.getByTestId("add-form-submit"));
    });

    expect(addTorrentSpy).toHaveBeenCalled();
    expect(addTorrentSpy.mock.calls[0][2]).toBe(true);
    addTorrentSpy.mockRestore();
  });

  it("test auto start in advanced mode", async () => {
    const state = {
      app: {
        open: true,
      },
      rpc: {
        session: {
          downloadDir: "/download/compelete",
        },
      },
    };
    const addTorrentSpy = jest.spyOn(api, "addTorrent");
    render(
      <Providers state={state}>
        <AddTorrentDialog />
      </Providers>
    );

    fireEvent.change(screen.getByTestId("torrent-link"), {
      target: { value: "MOCK_INPUT" },
    });
    await act(async () => {
      fireEvent.submit(screen.getByTestId("add-form-submit"));
    });

    expect(addTorrentSpy).toHaveBeenCalled();
    expect(addTorrentSpy.mock.calls[0][2]).toBe(true);
    addTorrentSpy.mockRestore();
  });
});
