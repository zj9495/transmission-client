import * as React from 'react';
import { CellParams } from '@material-ui/x-grid';
import { Link } from '@material-ui/core'

interface NameLinkProps {
  value: string;
  id: number;
}

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();


const NameLink = React.memo(function NameLink(props: NameLinkProps) {
  const { value } = props;

  return (
    <Link href="#" onClick={preventDefault}>{value}</Link>
  );
});

export default function renderName(params: CellParams) {
  return <NameLink value={params.value as string} id={params.row.id as number}/>;
}
