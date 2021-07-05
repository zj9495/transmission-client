export const DOWNLOAD_DIR = "/downloads/complete";
export const TEST_TORRENT = {
  URL:
    "https://www.hdarea.co/download.php?id=39380&passkey=ddeb644cd5dac0c3c3b00152e415fdf8",
  NAME:
    "Beethoven - Piano Trio in C minor, Triple Concerto [Oborin, Oistrakh, Knushevitskiy] (2011) [FLAC]",
};
export const COLUMNS = {
  DISPLAY: ["name", "totalSize", "percentDone", "leftUntilDone", "uploadRatio", "status", "seederCount", "leecherCount", "rateDownload", "rateUpload", "addedDate", "downloadDir"],
  HIDE: ["completeSize", "uploadedEver", "queuePosition", "trackers", "activityDate", "labels", "doneDate"],
  ALL: []
}

COLUMNS.ALL = [...COLUMNS.DISPLAY, ...COLUMNS.HIDE]