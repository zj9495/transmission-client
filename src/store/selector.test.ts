import { merge, cloneDeep } from "lodash";

import { getSelectedTorrents } from "./selector";
import initialState from "./initialState";

describe("test selector", () => {
  it("test getSelectedTorrents", () => {
    const state = merge(cloneDeep(initialState), {
      rpc: {
        selectedIds: [1, 3, 5],
        torrents: {
          all: [
            {
              id: 1,
              name: "torrent 1",
            },
            {
              id: 2,
              name: "torrent 2",
            },
            {
              id: 3,
              name: "torrent 3",
            },
            {
              id: 4,
              name: "torrent 4",
            },
            {
              id: 5,
              name: "torrent 5",
            },
            {
              id: 6,
              name: "torrent 6",
            },
          ],
        },
      },
    });

    const expected = [
      {
        id: 1,
        name: "torrent 1",
      },
      {
        id: 3,
        name: "torrent 3",
      },
      {
        id: 5,
        name: "torrent 5",
      },
    ];
    expect(getSelectedTorrents(state)).toEqual(expected);
  });
});
