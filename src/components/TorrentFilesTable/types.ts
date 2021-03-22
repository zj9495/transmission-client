import { GridCellParams } from "@material-ui/x-grid";

export type SelectChange = (
  event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  params: GridCellParams
) => void;
