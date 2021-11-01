import * as React from "react";
import { GridCellParams } from "@mui/x-data-grid-pro";
import { makeStyles, createStyles } from "@mui/styles";
import type { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: `1px solid ${theme.palette.divider}`,
      position: "relative",
      overflow: "hidden",
      width: "100%",
      height: 26,
      borderRadius: 2,
    },
    value: {
      position: "absolute",
      lineHeight: "24px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    bar: {
      height: "100%",
      backgroundColor: "#088208a3",
    },
  })
);

interface ProgressBarProps {
  value: number;
}

// eslint-disable-next-line react/display-name
const ProgressBar = React.memo((props: ProgressBarProps) => {
  const { value } = props;
  const valueInPercent = value * 100;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        className={classes.value}
      >{`${valueInPercent.toLocaleString()} %`}</div>
      <div className={classes.bar} style={{ maxWidth: `${valueInPercent}%` }} />
    </div>
  );
});

export default function renderProgress(params: GridCellParams) {
  return <ProgressBar value={Number(params.value)!} />;
}
