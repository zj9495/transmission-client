/// <reference types="cypress" />

import {
  removeTestTorrent,
  addTestTorrent,
  TEST_URL,
  showAllColumns,
} from "./common";
import { TEST_TORRENT, COLUMNS } from "../fixtures/constants";

context("test torrent list", () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.verifyConnected();
  });

  it("should format ratio if ratio < 0", () => {
    addTestTorrent(false);

    cy.getByTestId("torrent-table")
      .contains(TEST_TORRENT.NAME)
      .closest(".MuiDataGrid-row")
      .find("[data-field=uploadRatio]")
      .contains("0");

    removeTestTorrent();
  });

  it("test the default display columns", () => {
    cy.viewport(1920, 1080);

    COLUMNS.DISPLAY.forEach((name) => {
      // should be display
      cy.get(`[data-field=${name}]`).should("be.exist");
    });
    COLUMNS.HIDE.forEach((name) => {
      // should not be display
      cy.get(`[data-field=${name}]`).should("not.exist");
    });
  });

  it("test all fields are displayed correctly", () => {
    cy.viewport(3840, 2160);
    cy.intercept(
      {
        pathname: "/transmission/rpc",
        headers: {
          "x-request-method": "get-torrent-list",
        },
      },
      { fixture: "torrent/list.json" }
    ).as("getTorrents");
    showAllColumns();

    const torrents = [
      {
        fileds: [
          [
            "name",
            "The.Wire.S01-S05.BluRay.1080p.DTS-HD.MA.5.1.x265.10bit-CHD",
          ],
          ["totalSize", "264.25GB"],
          ["percentDone", "100 %"],
          ["leftUntilDone", " "],
          ["uploadRatio", "0.3114"],
          ["status", "Seeding"],
          ["seederCount", "52 (0)"],
          ["leecherCount", "2 (1)"],
          ["rateDownload", " "],
          ["rateUpload", "28.32kB/s"],
          ["addedDate", "2022-03-04 11:47:23"],
          ["downloadDir", "/volume1/video"],
          ["completeSize", " "],
          ["uploadedEver", "82.31GB"],
          ["queuePosition", "79"],
          // todo: 显示正确的 tracker 服务器
          // ["trackers", " "],
          ["activityDate", "2022-05-11 10:59:13"],
          ["labels", ""],
          ["doneDate", " "],
        ],
      },
      {
        fileds: [
          ["name", "The.Bad.Guys.2022.2160p.WEB-DL.HEVC.Atmos.DDP5.1-HDH"],
          ["totalSize", "36.57GB"],
          ["percentDone", "100 %"],
          ["leftUntilDone", " "],
          ["uploadRatio", "1.0535"],
          ["status", "Seeding"],
          ["seederCount", "155 (0)"],
          ["leecherCount", "23 (1)"],
          ["rateDownload", " "],
          ["rateUpload", "439.45kB/s"],
          ["addedDate", "2022-05-08 12:46:59"],
          ["downloadDir", "/volume1/video"],
          ["completeSize", " "],
          ["uploadedEver", "38.61GB"],
          ["queuePosition", "141"],
          // todo: 显示正确的 tracker 服务器
          // ["trackers", " "],
          ["activityDate", "2022-05-11 10:59:14"],
          ["labels", ""],
          ["doneDate", "2022-05-08 13:04:59"],
        ],
      },
      {
        fileds: [
          ["name", "abcd"],
          ["totalSize", "10.27GB"],
          ["percentDone", "1.03 %"],
          ["leftUntilDone", "1010:47:50"],
          ["uploadRatio", "0.0911"],
          ["status", "Downloading"],
          ["seederCount", "0 (2)"],
          ["leecherCount", "0 (1)"],
          ["rateDownload", "2.93kB/s"],
          ["rateUpload", " "],
          ["addedDate", "2022-05-08 23:05:52"],
          ["downloadDir", "/volume1/downloads"],
          ["completeSize", " "],
          ["uploadedEver", "9.98MB"],
          ["queuePosition", "143"],
          // todo: 显示正确的 tracker 服务器
          // ["trackers", " "],
          ["activityDate", "2022-05-11 10:59:14"],
          ["labels", ""],
          ["doneDate", " "],
        ],
      },
    ];
    torrents.forEach((torrent, index) => {
      cy.getByTestId("torrent-table")
        .get(`[data-rowindex=${index}]`)
        .within(() => {
          torrent.fileds.forEach(([name, value]) => {
            cy.get(`[data-field="${name}"]`).should("have.text", value);
          });
        });
    });
  });
});
