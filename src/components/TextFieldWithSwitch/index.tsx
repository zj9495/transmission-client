import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import type { RegisterOptions } from "react-hook-form";
import { useIntl, FormattedMessage } from "react-intl";

import { TextField, InputAdornment, Switch } from "@mui/material";
import type { SwitchProps, TextFieldProps } from "@mui/material";

type Props = {
  textFieldName: string;
  switchName: string;
  labelId: string;
  readonlyOn?: "checked" | "unChecked";
  TextFieldProps?: Partial<TextFieldProps>;
  SwitchProps?: Partial<SwitchProps>;
  registerOptions?: RegisterOptions;
};

const TextFieldWithSwitch = (props: Props) => {
  const intl = useIntl();
  const {
    textFieldName,
    switchName,
    labelId,
    readonlyOn = "unChecked",
    registerOptions,
  } = props;
  const { register, control, errors, watch } = useFormContext();

  const checked = watch(switchName);
  const message = intl.formatMessage({ id: "message.validation.required" });

  const shouldRequired = readonlyOn === "unChecked" ? checked : !checked;
  const inputRequired = shouldRequired ? message : false;

  return (
    <TextField
      error={!!errors[textFieldName]}
      name={textFieldName}
      label={<FormattedMessage id={labelId} />}
      fullWidth
      size="small"
      variant="outlined"
      inputRef={register({
        required: inputRequired,
        ...registerOptions,
      })}
      required={Boolean(inputRequired)}
      {...props.TextFieldProps}
      helperText={
        errors[textFieldName]?.message || props.TextFieldProps?.helperText
      }
      InputProps={{
        readOnly: readonlyOn === "unChecked" ? !checked : checked,
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
