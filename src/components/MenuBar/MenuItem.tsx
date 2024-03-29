import React from "react";

// import { makeStyles, createStyles } from "@mui/styles";
// import type { Theme } from "@mui/material";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
} from "@mui/material";
import { ListItemProps } from "@mui/material/ListItem";
import { omit } from "lodash";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     nested: {
//       paddingLeft: theme.spacing(4),
//     },
//     num: {
//       marginLeft: theme.spacing(1.5)
//     }
//   })
// );

export default function MenuItem(
  props: ListItemProps<
    "div",
    {
      button?: true;
      text: React.ReactNode;
      icon: React.ReactNode;
      menuOpen: boolean;
      num: number;
    }
  >
) {
  // const classes = useStyles();

  const { text, icon, num, menuOpen } = props;

  const listItemProps = omit(props, ["text", "icon", "menuOpen", "num"]);

  return (
    <ListItem button component="div" {...listItemProps}>
      <ListItemIcon>
        <Badge badgeContent={menuOpen ? 0 : num} max={999} color="primary">
          {icon}
        </Badge>
      </ListItemIcon>
      <ListItemText primary={text} />
      <ListItemSecondaryAction>
        <Badge badgeContent={menuOpen ? num : 0} max={999} color="primary" />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
