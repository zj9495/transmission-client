import store from "src/store";
import type {
  Torrent,
  TorrentId,
  TorrentSettings,
  OriginTorrentSettings,
} from "src/types";
import request from "./request";

export const getSession = () =>
  request({
    method: "post",
    data: { method: "session-get", arguments: {}, tag: "" },
    headers: {
      "x-transmission-session-id": store.getState().rpc.sessionId,
    },
  });

export const getSessionStats = () =>
  request({
    method: "post",
    data: { method: "session-stats", arguments: {}, tag: "" },
  });

export const getTorrents = () =>
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

export const addTorrent = (
  filename: string,
  downloadDir: string,
  paused = false
) =>
  request({
    method: "post",
    data: {
      method: "torrent-add",
      arguments: {
        filename,
        paused,
        "download-dir": downloadDir,
      },
      tag: "",
    },
  });

export const startTorrents = (ids: number[]) =>
  request({
    method: "post",
    data: {
      method: "torrent-start",
      arguments: {
        ids,
      },
    },
  });

export const stopTorrents = (ids: number[]) =>
  request({
    method: "post",
    data: {
      method: "torrent-stop",
      arguments: {
        ids,
      },
    },
  });

export const verifyTorrents = (ids: number[]) =>
  request({
    method: "post",
    data: {
      method: "torrent-verify",
      arguments: {
        ids,
      },
    },
  });

export const reannounceTorrents = (ids: number[]) =>
  request({
    method: "post",
    data: {
      method: "torrent-reannounce",
      arguments: {
        ids,
      },
    },
  });

export const removeTorrents = (ids: number[], deleteLocalData = false) =>
  request({
    method: "post",
    data: {
      method: "torrent-remove",
      arguments: {
        ids,
        "delete-local-data": deleteLocalData,
      },
    },
  });

export const getTorrent = (id: number): Promise<Torrent> =>
  request({
    method: "post",
    data: {
      method: "torrent-get",
      arguments: {
        ids: id,
        fields: [
          "bandwidthPriority",
          "downloadDir",
          "downloadLimited",
          "downloadLimit",
          "fileStats",
          "files",
          "hashString",
          "id",
          "isPrivate",
          "addedDate",
          "doneDate",
          "labels",
          "magnetLink",
          "metadataPercentComplete",
          "name",
          "peer-limit",
          "queuePosition",
          "seedIdleMode",
          "seedIdleLimit",
          "seedRatioMode",
          "seedRatioLimit",
          "status",
          "totalSize",
          "uploadLimited",
          "uploadLimit",
          "wanted",
          "percentDone",
          "peersGettingFromUs",
          "peersSendingToUs",
          "seederCount",
          "leecherCount",
          "activityDate",
          "dateCreated",
          "trackerStats",
          "peers",
          "comment",
          "downloadLimit",
          "downloadLimited",
          "peer-limit",
          "seedIdleLimit",
          "seedIdleMode",
          "seedRatioLimit",
          "seedRatioMode",
          "uploadLimit",
          "uploadLimited",
        ],
      },
    },
    headers: {
      "x-request-method": "get-torrent-detail",
    },
  }).then((res) => res.data.arguments.torrents[0]);

export const setTorrent = ({
  id,
  location,
  filesWanted,
  filesUnwanted,
  priorityHigh,
  priorityNormal,
  priorityLow,
}: {
  id: number;
  location?: string;
  filesWanted?: number[];
  filesUnwanted?: number[];
  priorityHigh?: number[];
  priorityNormal?: number[];
  priorityLow?: number[];
}) =>
  request({
    method: "post",
    data: {
      method: "torrent-set",
      arguments: {
        ids: id,
        location,
        "files-wanted": filesWanted,
        "files-unwanted": filesUnwanted,
        "priority-high": priorityHigh,
        "priority-normal": priorityNormal,
        "priority-low": priorityLow,
      },
    },
  });

export const renameTorrent = ({
  id,
  path,
  name,
}: {
  id: number;
  path: string;
  name: string;
}) =>
  request({
    method: "post",
    data: {
      method: "torrent-rename-path",
      arguments: {
        ids: id,
        path,
        name,
      },
    },
  });

export const getFreeSpace = ({ path }: { path: string }) =>
  request({
    method: "post",
    data: {
      method: "free-space",
      arguments: {
        path,
      },
    },
  });

export const getTorrentSettings = (id: TorrentId): Promise<TorrentSettings> =>
  request({
    method: "post",
    data: {
      method: "torrent-get",
      arguments: {
        fields: [
          "downloadLimit",
          "downloadLimited",
          "peer-limit",
          "seedIdleLimit",
          "seedIdleMode",
          "seedRatioLimit",
          "seedRatioMode",
          "uploadLimit",
          "uploadLimited",
        ],
        ids: id,
      },
    },
  }).then((res) => res.data.arguments.torrents[0]);

export const setTorrentSettings = (
  id: TorrentId,
  data: OriginTorrentSettings
) =>
  request({
    method: "post",
    data: {
      method: "torrent-set",
      arguments: data,
      ids: id,
      tag: "",
    },
  });
