import React from "react";
import clsx from "clsx";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import { ListItemProps } from "@material-ui/core/ListItem";

import { ExpandLess, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export default function renderListItem(
  props: ListItemProps<
    "div",
    {
      button?: true;
      text: React.ReactNode;
      icon: React.ReactNode;
      num: number;
      isChildren?: false | boolean;
    }
  >
) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const { children, text, icon, num, isChildren } = props;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem
        button
        component="div"
        className={clsx({ [classes.nested]: isChildren })}
        {...props}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
        {num}
        <span className="MuiLabel-amount" />
        {children ? (
          open ? (
            <ExpandLess onClick={handleClick} />
          ) : (
            <ExpandMore onClick={handleClick} />
          )
        ) : null}
      </ListItem>
      {children ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      ) : null}
    </>
  );
}
