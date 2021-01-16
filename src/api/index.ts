import request from "./request";
import store from "../store";

export const getSession = () =>
  request({
    method: "post",
    data: { method: "session-get", arguments: {}, tag: "" },
    headers: {
      "x-transmission-session-id": store.getState().root.sessionId,
    },
  });

export const getAllTorrents = () =>
  request({
    method: "post",
    data: {
      method: "torrent-get",
      arguments: {
        fields: [
          "id",
          "name",
          "status",
          "hashString",
          "totalSize",
          "percentDone",
          "addedDate",
          "trackerStats",
          "leftUntilDone",
          "rateDownload",
          "rateUpload",
          "recheckProgress",
          "rateDownload",
          "rateUpload",
          "peersGettingFromUs",
          "peersSendingToUs",
          "uploadRatio",
          "uploadedEver",
          "downloadedEver",
          "downloadDir",
          "error",
          "errorString",
          "doneDate",
          "queuePosition",
          "activityDate",
        ],
      },
      tag: "",
    },
  });

export const addTorrent = (filename: string, downloadDir: string) =>
  request({
    method: "post",
    data: {
      method: "torrent-add",
      arguments: {
        filename,
        paused: false,
        "download-dir": downloadDir,
      },
      tag: "",
    },
  });
