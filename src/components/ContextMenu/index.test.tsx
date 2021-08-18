import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Providers } from "src/components/renderWithProviders";

import * as api from "src/api";
import { STATUS_TYPES } from "src/constants";
import { torrent } from "src/test/fixtures/torrent";
import ContextMenu, { ContextMenuProps } from "./index";

jest.mock("src/api/request");

const defaultProps: ContextMenuProps & {
  onClose: jest.Mock<any, any>;
} = {
  id: 1,
  open: true,
  x: 1,
  y: 1,
  torrent,
  onClose: jest.fn(),
};

describe("test ContextMenu", () => {
  const originalClipboard = { ...global.navigator.clipboard };

  beforeEach(() => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.navigator.clipboard = mockClipboard;
  });

  afterEach(() => {
    jest.resetAllMocks();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.navigator.clipboard = originalClipboard;
  });

  it("test visibility", () => {
    const { getByTestId, rerender } = render(
      <Providers>
        <ContextMenu {...defaultProps} open={false} />
      </Providers>
    );
    expect(getByTestId("context-menu").style.visibility).toBe("hidden");

    rerender(
      <Providers>
        <ContextMenu {...defaultProps} open />
      </Providers>
    );
    expect(getByTestId("context-menu").style.visibility).toBe("");
  });

  it("test position", () => {
    const { getByTestId } = render(
      <Providers>
        <ContextMenu {...defaultProps} open x={100} y={200} />
      </Providers>
    );
    expect(getByTestId("context-menu-transition").style.top).toBe("200px");
    expect(getByTestId("context-menu-transition").style.left).toBe("100px");
  });

  describe.each`
    status                       | disableStart | disablePause | disableRecheck | disableMorePeers
    ${STATUS_TYPES.download}     | ${true}      | ${false}     | ${true}        | ${false}
    ${STATUS_TYPES.downloadwait} | ${true}      | ${false}     | ${true}        | ${false}
    ${STATUS_TYPES.paused}       | ${false}     | ${true}      | ${false}       | ${true}
    ${STATUS_TYPES.check}        | ${true}      | ${true}      | ${true}        | ${true}
    ${STATUS_TYPES.seed}         | ${true}      | ${false}     | ${true}        | ${false}
    ${STATUS_TYPES.seedwait}     | ${true}      | ${false}     | ${true}        | ${false}
  `(
    "test MenuItem disabled when torrent status is $status",
    ({
      status,
      disableStart,
      disablePause,
      disableRecheck,
      disableMorePeers,
    }) => {
      test(`start should be ${disableStart}, pause should be ${disablePause}, recheck should be ${disableRecheck}, morePeers should be ${disableMorePeers}`, () => {
        const { getByTestId } = render(
          <Providers>
            <ContextMenu {...defaultProps} torrent={{ ...torrent, status }} />
          </Providers>
        );
        expect(
          getByTestId("context-menu-start").classList.contains("Mui-disabled")
        ).toBe(disableStart);
        expect(
          getByTestId("context-menu-pause").classList.contains("Mui-disabled")
        ).toBe(disablePause);
        expect(
          getByTestId("context-menu-recheck").classList.contains("Mui-disabled")
        ).toBe(disableRecheck);
        expect(
          getByTestId("context-menu-more-peers").classList.contains(
            "Mui-disabled"
          )
        ).toBe(disableMorePeers);
      });
    }
  );

  it("test every action", () => {
    const { getByText } = render(
      <Providers>
        <ContextMenu {...defaultProps} />
      </Providers>
    );
    defaultProps.onClose.mockClear();

    const startTorrentSpy = jest.spyOn(api, "startTorrents");
    const stopTorrentSpy = jest.spyOn(api, "stopTorrents");
    const reannounceTorrentSpy = jest.spyOn(api, "reannounceTorrents");
    const verifyTorrentSpy = jest.spyOn(api, "verifyTorrents");
    const removeTorrentSpy = jest.spyOn(api, "removeTorrents");
    const moveQueueSpy = jest.spyOn(api, "moveQueue");

    fireEvent.click(getByText(/Start/));
    expect(startTorrentSpy).toBeCalledTimes(1);
    expect(startTorrentSpy).toHaveBeenCalledWith([defaultProps.id]);
    expect(defaultProps.onClose).toBeCalledTimes(1);
    startTorrentSpy.mockClear();
    defaultProps.onClose.mockClear();

    fireEvent.click(getByText(/Pause/));
    expect(stopTorrentSpy).toBeCalledTimes(1);
    expect(stopTorrentSpy).toHaveBeenCalledWith([defaultProps.id]);
    expect(defaultProps.onClose).toBeCalledTimes(1);
    stopTorrentSpy.mockClear();
    defaultProps.onClose.mockClear();

    fireEvent.click(getByText(/Remove/));
    expect(removeTorrentSpy).toBeCalledTimes(1);
    expect(removeTorrentSpy).toHaveBeenCalledWith([defaultProps.id]);
    expect(defaultProps.onClose).toBeCalledTimes(1);
    removeTorrentSpy.mockClear();
    defaultProps.onClose.mockClear();

    fireEvent.click(getByText(/Recheck/));
    expect(verifyTorrentSpy).toBeCalledTimes(1);
    expect(verifyTorrentSpy).toHaveBeenCalledWith([defaultProps.id]);
    expect(defaultProps.onClose).toBeCalledTimes(1);
    verifyTorrentSpy.mockClear();
    defaultProps.onClose.mockClear();

    fireEvent.click(getByText(/Ask tracker/));
    expect(reannounceTorrentSpy).toBeCalledTimes(1);
    expect(reannounceTorrentSpy).toHaveBeenCalledWith([defaultProps.id]);
    expect(defaultProps.onClose).toBeCalledTimes(1);
    reannounceTorrentSpy.mockClear();
    defaultProps.onClose.mockClear();

    fireEvent.click(getByText("Move to top"));
    expect(moveQueueSpy).toBeCalledTimes(1);
    expect(moveQueueSpy).toHaveBeenCalledWith("top", [defaultProps.id]);
    expect(defaultProps.onClose).toBeCalledTimes(1);
    moveQueueSpy.mockClear();
    defaultProps.onClose.mockClear();

    fireEvent.click(getByText("Move up"));
    expect(moveQueueSpy).toBeCalledTimes(1);
    expect(moveQueueSpy).toHaveBeenCalledWith("up", [defaultProps.id]);
    expect(defaultProps.onClose).toBeCalledTimes(1);
    moveQueueSpy.mockClear();
    defaultProps.onClose.mockClear();

    fireEvent.click(getByText("Move down"));
    expect(moveQueueSpy).toBeCalledTimes(1);
    expect(moveQueueSpy).toHaveBeenCalledWith("down", [defaultProps.id]);
    expect(defaultProps.onClose).toBeCalledTimes(1);
    moveQueueSpy.mockClear();
    defaultProps.onClose.mockClear();

    fireEvent.click(getByText("Move to bottom"));
    expect(moveQueueSpy).toBeCalledTimes(1);
    expect(moveQueueSpy).toHaveBeenCalledWith("bottom", [defaultProps.id]);
    expect(defaultProps.onClose).toBeCalledTimes(1);
    moveQueueSpy.mockClear();
    defaultProps.onClose.mockClear();

    const copySpy = jest.spyOn(global.navigator.clipboard, "writeText");

    fireEvent.click(getByText(/Copy download location/));
    expect(copySpy).toBeCalledTimes(1);
    expect(copySpy).toHaveBeenCalledWith(torrent.downloadDir);
    expect(defaultProps.onClose).toBeCalledTimes(1);
    copySpy.mockClear();
    defaultProps.onClose.mockClear();

    fireEvent.click(getByText(/Copy magnetLink/));
    expect(copySpy).toBeCalledTimes(1);
    expect(copySpy).toHaveBeenCalledWith(torrent.magnetLink);
    expect(defaultProps.onClose).toBeCalledTimes(1);
    copySpy.mockClear();
    defaultProps.onClose.mockClear();
  });
});
