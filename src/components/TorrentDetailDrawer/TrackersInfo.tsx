import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";

import { TrackerStats } from "src/types";
import { formatUnixTimeStamp } from "src/utils/formatter";

export type ServerInfoProp = {
  isLoading: boolean;
  trackerStats: TrackerStats;
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

const formatCount = (count: number) => {
  if (count === -1) {
    return <FormattedMessage id="public.textUnknown" />;
  }
  return count;
};

const ServerInfo = (props: ServerInfoProp) => {
  const { isLoading, trackerStats } = props;
  const classes = useStyles();

  return (
    <>
      {trackerStats.map((tracker) => (
        <Grid key={tracker.id} className={classes.container} container>
          <Grid item xs={12}>
            <Typography variant="h6">Tracker</Typography>
          </Grid>
          <Grid container data-testid="torrent-tracker-announce">
            <Grid item xs={3}>
              <Typography>
                <FormattedMessage id="torrent.attribute.serversFields.announce" />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography className={classes.value}>
                {isLoading ? <Skeleton /> : tracker.announce}
              </Typography>
            </Grid>
          </Grid>
          <Grid container data-testid="torrent-tracker-announceState">
            <Grid item xs={3}>
              <Typography>
                <FormattedMessage id="torrent.attribute.serversFields.announceState" />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <FormattedMessage
                    id={`torrent.attribute.serversFields.announceStateText.${tracker.announceState}`}
                  />
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid container data-testid="torrent-tracker-lastAnnounceResult">
            <Grid item xs={3}>
              <Typography>
                <FormattedMessage id="torrent.attribute.serversFields.lastAnnounceResult" />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {isLoading ? <Skeleton /> : tracker.lastAnnounceResult}
              </Typography>
            </Grid>
          </Grid>
          <Grid container data-testid="torrent-tracker-downloadCount">
            <Grid item xs={3}>
              <Typography>
                <FormattedMessage id="torrent.attribute.serversFields.downloadCount" />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {isLoading ? <Skeleton /> : formatCount(tracker.downloadCount)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container data-testid="torrent-tracker-leecherCount">
            <Grid item xs={3}>
              <Typography>
                <FormattedMessage id="torrent.attribute.serversFields.leecherCount" />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {isLoading ? <Skeleton /> : formatCount(tracker.leecherCount)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container data-testid="torrent-tracker-seederCount">
            <Grid item xs={3}>
              <Typography>
                <FormattedMessage id="torrent.attribute.serversFields.seederCount" />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {isLoading ? <Skeleton /> : formatCount(tracker.seederCount)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container data-testid="torrent-tracker-lastAnnounceSucceeded">
            <Grid item xs={3}>
              <Typography>
                <FormattedMessage id="torrent.attribute.serversFields.lastAnnounceSucceeded" />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <FormattedMessage
                    id={`torrent.attribute.status.${tracker.lastAnnounceSucceeded}`}
                  />
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid container data-testid="torrent-tracker-lastAnnounceTime">
            <Grid item xs={3}>
              <Typography>
                <FormattedMessage id="torrent.attribute.serversFields.lastAnnounceTime" />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  formatUnixTimeStamp(tracker.lastAnnounceTime)
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid container data-testid="torrent-tracker-lastAnnounceTimedOut">
            <Grid item xs={3}>
              <Typography>
                <FormattedMessage id="torrent.attribute.serversFields.lastAnnounceTimedOut" />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <FormattedMessage
                    id={`torrent.attribute.status.${tracker.lastAnnounceTimedOut}`}
                  />
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid container data-testid="torrent-tracker-nextAnnounceTime">
            <Grid item xs={3}>
              <Typography>
                <FormattedMessage id="torrent.attribute.serversFields.nextAnnounceTime" />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  formatUnixTimeStamp(tracker.nextAnnounceTime)
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default React.memo(ServerInfo);
