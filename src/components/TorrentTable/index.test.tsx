import React from "react";
import routeData from "react-router";

import renderWithProviders from "src/components/renderWithProviders";

import TorrentTable from "./index";

describe("renders TorrentTable", () => {
  describe("test format ratio", () => {
    jest.spyOn(routeData, "useParams").mockReturnValue({
      torrentStatus: "all",
    });
    const state = {
      rpc: {
        torrents: {
          all: [
            {
              activityDate: 0,
              addedDate: 1618543449,
              doneDate: 0,
              downloadDir: "/downloads/complete",
              downloadedEver: 0,
              error: 0,
              errorString: "",
              hashString: "d3d0774b8d3d1389a956899250de94d5f11b29be",
              id: 60,
              leftUntilDone: 257751467,
              name:
                "Beethoven - Piano Trio in C minor, Triple Concerto [Oborin, Oistrakh, Knushevitskiy] (2011) [FLAC]",
              peersGettingFromUs: 0,
              peersSendingToUs: 0,
              percentDone: 0,
              queuePosition: 0,
              rateDownload: 0,
              rateUpload: 0,
              recheckProgress: 0,
              status: 0,
              totalSize: 257751467,
              trackerStats: [
                {
                  announce:
                    "http://www.hdarea.co/announce.php?passkey=ddeb644cd5dac0c3c3b00152e415fdf8",
                  announceState: 0,
                  downloadCount: 25,
                  hasAnnounced: false,
                  hasScraped: true,
                  host: "http://www.hdarea.co:80",
                  id: 0,
                  isBackup: false,
                  lastAnnouncePeerCount: 0,
                  lastAnnounceResult: "",
                  lastAnnounceStartTime: 0,
                  lastAnnounceSucceeded: false,
                  lastAnnounceTime: 0,
                  lastAnnounceTimedOut: false,
                  lastScrapeResult: "",
                  lastScrapeStartTime: 1618550740,
                  lastScrapeSucceeded: true,
                  lastScrapeTime: 1618550741,
                  lastScrapeTimedOut: false,
                  leecherCount: 0,
                  nextAnnounceTime: 0,
                  nextScrapeTime: 1618552550,
                  scrape:
                    "http://www.hdarea.co/scrape.php?passkey=ddeb644cd5dac0c3c3b00152e415fdf8",
                  scrapeState: 1,
                  seederCount: 8,
                  tier: 0,
                },
              ],
              uploadRatio: -1,
              uploadedEver: 0,
            },
          ],
        },
      },
    };
    const { container } = renderWithProviders(<TorrentTable />, state);
    expect(
      container.querySelector("[data-field='uploadRatio'][data-rowindex='0']")
        ?.textContent
    ).toBe("0");
  });
});
