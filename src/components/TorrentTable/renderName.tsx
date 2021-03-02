import * as React from "react";
import { GridCellParams } from "@material-ui/x-grid";
import { Link } from "@material-ui/core";

interface NameLinkProps {
  value: string;
  // eslint-disable-next-line react/no-unused-prop-types
  id: number;
}

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

// eslint-disable-next-line react/display-name
const NameLink = React.memo((props: NameLinkProps) => {
  const { value } = props;

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link href="#" onClick={preventDefault}>
      {value}
    </Link>
  );
});

export default function renderName(params: GridCellParams) {
  return (
    <NameLink value={params.value as string} id={params.row.id as number} />
  );
}
