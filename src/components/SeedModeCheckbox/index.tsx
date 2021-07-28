import React from "react";
import { Checkbox, CheckboxProps } from "@material-ui/core";

import { ModeValue, SEED_MODE, getNextValue } from "./constants";

type Props = CheckboxProps & {
  value: ModeValue;
  onChange: (value: ModeValue) => void;
};

const SeedModeCheckbox = (props: Props) => {
  const { value, onChange } = props;

  const handleChange = () => {
    onChange && onChange(getNextValue(value));
  };
  return (
    <Checkbox
      color="primary"
      {...props}
      indeterminate={value === SEED_MODE.GLOBAL}
      checked={value === SEED_MODE.SINGLE}
      onChange={handleChange}
    />
  );
};

export default SeedModeCheckbox;
