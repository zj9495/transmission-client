/// <reference types="cypress" />
import * as moment from "moment";

import { TEST_URL, addTestTorrent, removeTestTorrent } from "./common";
import { TEST_TORRENT } from "../fixtures/constants";

context("test torrent detail", () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.verifyConnected();
  });

  before(() => {
    cy.visit(TEST_URL);
    cy.verifyConnected();
    addTestTorrent();
  });

  after(() => {
    cy.visit(TEST_URL);
    cy.verifyConnected();
    removeTestTorrent();
  });

  it("should show torrent detail when click torrent name", () => {
    cy.getByTestId("torrent-table").contains(TEST_TORRENT.NAME).click();
    cy.getByTestId("torrent-detail-title").contains(TEST_TORRENT.NAME);
    cy.contains("Base");
    cy.contains("Trackers");
    cy.contains("Files");
    cy.contains("Peers");
    cy.contains("Config");
  });

  it("should show Base as the default tab", () => {
    cy.getByTestId("torrent-table").contains(TEST_TORRENT.NAME).click();
    cy.getByTestId("torrent-detail-tabs")
      .find(".Mui-selected")
      .contains("Base");

    // switch to Trackers tab
    cy.contains("Trackers").click();

    // close detail dialog
    cy.getByTestId("torrent-detail-drawer")
      .find(".MuiBackdrop-root")
      .click({ force: true });

    cy.getByTestId("torrent-table").contains(TEST_TORRENT.NAME).click();
    // should show Base as the default tab
    cy.getByTestId("torrent-detail-tabs")
      .find(".Mui-selected")
      .contains("Base");
  });

  it("test torrent base info", () => {
    cy.intercept(
      {
        pathname: "/transmission/rpc",
        headers: {
          "x-request-method": "get-torrent-detail",
        },
      },
      { fixture: "torrent/detail.json" }
    ).as("getDetail");

    cy.getByTestId("torrent-table").contains(TEST_TORRENT.NAME).click();
    cy.getByTestId("torrent-detail-tabs")
      .find(".Mui-selected")
      .contains("Base");

    cy.getByTestId("torrent-detail-addedDate").contains("Added date");
    cy.getByTestId("torrent-detail-addedDate").contains(
      moment.unix(1627629688).format("YYYY-MM-DD HH:mm:ss")
    );

    cy.getByTestId("torrent-detail-downloadDir").contains("Download dir");
    cy.getByTestId("torrent-detail-downloadDir").contains(
      "/downloads/complete"
    );

    cy.getByTestId("torrent-detail-labels").contains("Tags");
    cy.getByTestId("torrent-detail-labels").contains("无");

    cy.getByTestId("torrent-detail-doneDate").contains("Finish Time");
    cy.getByTestId("torrent-detail-doneDate").contains(
      moment.unix(1627630823).format("YYYY-MM-DD HH:mm:ss")
    );

    cy.getByTestId("torrent-detail-percentDone").contains("Downloaded");
    cy.getByTestId("torrent-detail-percentDone").contains("100%");

    cy.getByTestId("torrent-detail-leecherCount").contains("Peers");
    cy.getByTestId("torrent-detail-leecherCount").contains("3 connected of 5");

    cy.getByTestId("torrent-detail-seederCount").contains("Seeds");
    cy.getByTestId("torrent-detail-seederCount").contains("2 connected of 4");

    cy.getByTestId("torrent-detail-activityDate").contains("Last Activity");
    cy.getByTestId("torrent-detail-activityDate").contains(
      moment.unix(1627629708).format("YYYY-MM-DD HH:mm:ss")
    );

    cy.getByTestId("torrent-detail-dateCreated").contains("Date created");
    cy.getByTestId("torrent-detail-dateCreated").contains(
      moment.unix(1612675639).format("YYYY-MM-DD HH:mm:ss")
    );

    cy.getByTestId("torrent-detail-hashString").contains("HASH");
    cy.getByTestId("torrent-detail-hashString").contains(
      "d3d0774b8d3d1389a956899250de94d5f11b29be"
    );

    cy.getByTestId("torrent-detail-totalSize").contains("Total size");
    cy.getByTestId("torrent-detail-totalSize").contains("245.81MB");

    cy.getByTestId("torrent-detail-type").contains("Type");
    cy.getByTestId("torrent-detail-type").contains("Private");

    cy.getByTestId("torrent-detail-comment").contains("Comment");
    cy.getByTestId("torrent-detail-comment").contains("This is comment");
  });

  it("test torrent trackers info", () => {
    cy.intercept(
      {
        pathname: "/transmission/rpc",
        headers: {
          "x-request-method": "get-torrent-detail",
        },
      },
      { fixture: "torrent/detail.json" }
    ).as("getDetail");

    cy.getByTestId("torrent-table").contains(TEST_TORRENT.NAME).click();
    cy.contains("Trackers").click();

    cy.getByTestId("torrent-tracker-announce").contains("Announce");
    cy.getByTestId("torrent-tracker-announce").contains(
      "http://www.hdarea.co/announce.php?passkey=ddeb644cd5dac0c3c3b00152e415fdf8"
    );

    cy.getByTestId("torrent-tracker-announceState").contains("Status");
    cy.getByTestId("torrent-tracker-announceState").contains("Waiting");

    cy.getByTestId("torrent-tracker-lastAnnounceResult").contains("Info");
    cy.getByTestId("torrent-tracker-lastAnnounceResult").contains("Success");

    cy.getByTestId("torrent-tracker-downloadCount").contains("Download count");
    cy.getByTestId("torrent-tracker-downloadCount").contains("35");

    cy.getByTestId("torrent-tracker-leecherCount").contains("Leecher count");
    cy.getByTestId("torrent-tracker-leecherCount").contains("5");

    cy.getByTestId("torrent-tracker-seederCount").contains("Seeder count");
    cy.getByTestId("torrent-tracker-seederCount").contains("4");

    cy.getByTestId("torrent-tracker-lastAnnounceSucceeded").contains(
      "Succeeded"
    );
    cy.getByTestId("torrent-tracker-lastAnnounceSucceeded").contains("True");

    cy.getByTestId("torrent-tracker-lastAnnounceTime").contains("AnnounceTime");
    cy.getByTestId("torrent-tracker-lastAnnounceTime").contains(
      moment.unix(1627629696).format("YYYY-MM-DD HH:mm:ss")
    );

    cy.getByTestId("torrent-tracker-lastAnnounceTimedOut").contains("TimedOut");
    cy.getByTestId("torrent-tracker-lastAnnounceTimedOut").contains("False");

    cy.getByTestId("torrent-tracker-nextAnnounceTime").contains(
      "Next announce"
    );
    cy.getByTestId("torrent-tracker-nextAnnounceTime").contains(
      moment.unix(1627633296).format("YYYY-MM-DD HH:mm:ss")
    );
  });
});
