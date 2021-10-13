import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";

import { TextField, InputAdornment, Switch } from "@material-ui/core";
import type { SwitchProps, TextFieldProps } from "@material-ui/core";

type Props = {
  textFieldName: string;
  switchName: string;
  labelId: string;
  readonlyOn?: "checked" | "unChecked";
  TextFieldProps?: Partial<TextFieldProps>;
  SwitchProps?: Partial<SwitchProps>;
};

const TextFieldWithSwitch = (props: Props) => {
  const { textFieldName, switchName, labelId, readonlyOn = "checked" } = props;
  const { register, control, errors, watch } = useFormContext();

  const checked = watch(switchName);

  return (
    <TextField
      error={!!errors[textFieldName]}
      name={textFieldName}
      label={<FormattedMessage id={labelId} />}
      fullWidth
      size="small"
      variant="outlined"
      inputRef={register}
      {...props.TextFieldProps}
      helperText={
        errors[textFieldName]?.message || props.TextFieldProps?.helperText
      }
      InputProps={{
        readOnly: readonlyOn === "checked" ? !checked : checked,
        startAdornment: (
          <InputAdornment position="start">
            <Controller
              name={switchName}
              control={control}
              render={({ value, onChange }) => (
                <Switch
                  color="primary"
                  checked={Boolean(value)}
                  size="small"
                  {...props.SwitchProps}
                  onChange={(e) => onChange(e.target.checked)}
                />
              )}
            />
          </InputAdornment>
        ),
        ...props.TextFieldProps?.InputProps,
      }}
    />
  );
};

export default TextFieldWithSwitch;
