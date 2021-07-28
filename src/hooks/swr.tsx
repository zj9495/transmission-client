import useSWR from "swr";

import { getTorrent, getTorrentSettings } from "src/api";
import type { TorrentId } from "src/types";
import { REFRESH_INTERVAL } from "src/constants";

export const useTorrent = (
  id: TorrentId | null,
  refreshInterval = REFRESH_INTERVAL
) => {
  const { data, error } = useSWR(
    id ? `torrent-detail-${id}` : null,
    () => getTorrent(id as TorrentId),
    { refreshInterval }
  );

  return {
    torrent: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useTorrentSettings = (id: TorrentId | null) => {
  const { data, error } = useSWR(id ? `torrent-settings-${id}` : null, () =>
    getTorrentSettings(id as TorrentId)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
