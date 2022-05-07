import useSWR from "swr";

import {
  getTorrent,
  getTorrentSettings,
  getFreeSpace,
  getSession,
} from "src/api";
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
    isLoading: error || !data,
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

export const useFreeSpace = (path: string) => {
  const { data, error } = useSWR(path, () => getFreeSpace(path));

  return {
    data: data?.data.arguments.sizeBytes as number,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSession = (open: boolean) => {
  const { data, error } = useSWR(open ? "session" : null, () => getSession());

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
