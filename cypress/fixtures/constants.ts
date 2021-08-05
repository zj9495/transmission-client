export const DOWNLOAD_DIR = "/downloads/complete";
export const TEST_TORRENT = {
  URL:
    "https://pt.hdupt.com/download.php?id=30675&passkey=b4ab64d2f26b9134e00899443f2dd209",
  NAME:
    "Daft Punk - TRON Legacy - The Complete Edition (2020) Mp3 320kbps [PMEDIA]",
};
export const COLUMNS = {
  DISPLAY: ["name", "totalSize", "percentDone", "leftUntilDone", "uploadRatio", "status", "seederCount", "leecherCount", "rateDownload", "rateUpload", "addedDate", "downloadDir"],
  HIDE: ["completeSize", "uploadedEver", "queuePosition", "trackers", "activityDate", "labels", "doneDate"],
  ALL: []
}

COLUMNS.ALL = [...COLUMNS.DISPLAY, ...COLUMNS.HIDE]