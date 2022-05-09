import React from "react";
import { Grid, Typography } from "@mui/material";
import type { Theme } from "@mui/material";
import { Skeleton } from "@mui/lab";
import { makeStyles, createStyles } from "@mui/styles";
import { FormattedMessage } from "react-intl";

import { Torrent } from "src/types";
import { formatUnixTimeStamp, formatSize } from "src/utils/formatter";

export type BasicInfoProp = {
  isLoading: boolean;
  torrent?: Torrent;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(1.5),
    },
    value: {
      wordBreak: "break-all",
    },
  })
);

const BasicInfo = (props: BasicInfoProp) => {
  const { isLoading, torrent } = props;
  const classes = useStyles();
  const info = [
    {
      key: "general",
      title: <FormattedMessage id="torrents.details.general.heading.general" />,
      children: [
        {
          key: "addedDate",
          color: "text",
          title: <FormattedMessage id="torrent.attribute.label.addedDate" />,
          value: torrent && formatUnixTimeStamp(torrent.addedDate),
        },
        {
          key: "downloadDir",
          color: "text",
          title: <FormattedMessage id="torrent.attribute.label.downloadDir" />,
          value: torrent?.downloadDir,
        },
        {
          key: "labels",
          color: "text",
          title: <FormattedMessage id="torrents.properties.tags" />,
          value: torrent?.labels.join(",") || "无",
        },
      ],
    },
    {
      key: "transfer",
      title: (
        <FormattedMessage id="torrents.details.general.heading.transfer" />
      ),
      children: [
        {
          key: "doneDate",
          color: "text",
          title: <FormattedMessage id="torrent.attribute.label.doneDate" />,
          value: torrent && formatUnixTimeStamp(torrent.doneDate),
        },
        {
          key: "percentDone",
          color: "text",
          title: <FormattedMessage id="torrents.details.general.downloaded" />,
          value: `${(torrent?.percentDone || 0) * 100}%`,
        },
        {
          key: "leecherCount",
          color: "text",
          title: <FormattedMessage id="torrents.details.peers" />,
          value: (
            <FormattedMessage
              id="torrents.details.general.connected"
              values={{
                connected: torrent?.peersGettingFromUs,
                total: torrent?.trackerStats[0]?.leecherCount || 0,
              }}
            />
          ),
        },
        {
          key: "seederCount",
          color: "text",
          title: <FormattedMessage id="torrents.details.general.seeds" />,
          value: (
            <FormattedMessage
              id="torrents.details.general.connected"
              values={{
                connected: torrent?.peersSendingToUs,
                total: torrent?.trackerStats[0]?.seederCount || 0,
              }}
            />
          ),
        },
        {
          key: "activityDate",
          color: "text",
          title: <FormattedMessage id="torrents.details.general.date.active" />,
          value: torrent && formatUnixTimeStamp(torrent.activityDate),
        },
      ],
    },
    {
      key: "torrent",
      title: <FormattedMessage id="torrents.details.general.heading.torrent" />,
      children: [
        {
          key: "dateCreated",
          color: "text",
          title: <FormattedMessage id="torrent.attribute.label.dateCreated" />,
          value: torrent && formatUnixTimeStamp(torrent.dateCreated),
        },
        {
          key: "hashString",
          color: "text",
          title: <FormattedMessage id="torrent.attribute.label.hashString" />,
          value: torrent?.hashString,
        },
        {
          key: "totalSize",
          color: "text",
          title: <FormattedMessage id="torrent.attribute.label.totalSize" />,
          value: torrent && formatSize(torrent.totalSize),
        },
        {
          key: "type",
          color: "text",
          title: <FormattedMessage id="torrents.details.general.type" />,
          value: torrent?.isPrivate ? (
            <FormattedMessage id="torrents.details.general.type.private" />
          ) : (
            <FormattedMessage id="torrents.details.general.type.public" />
          ),
        },
        {
          key: "comment",
          color: "text",
          title: <FormattedMessage id="torrent.attribute.label.comment" />,
          value: torrent?.comment,
        },
      ],
    },
  ];

  if (torrent?.errorString) {
    info[0].children.push({
      key: "errorString",
      color: "error.main",
      title: <FormattedMessage id="torrent.attribute.label.errorString" />,
      value: torrent?.errorString,
    });
  }
  return (
    <div data-testid="base-info-container">
      {info.map((group) => (
        <Grid className={classes.container} key={group.key} container>
          <Grid item xs={12}>
            <Typography variant="h6">{group.title}</Typography>
          </Grid>
          {group.children.map((item) => (
            <Grid
              container
              key={item.key}
              sx={{ color: item.color }}
              data-testid={`torrent-detail-${item.key}`}
            >
              <Grid item xs={3}>
                <Typography>{item.title}</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.value}>
                  {isLoading ? <Skeleton /> : item.value}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      ))}
    </div>
  );
};

export default React.memo(BasicInfo);
